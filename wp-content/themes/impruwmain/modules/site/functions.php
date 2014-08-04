<?php

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) )
    exit();

/**
 * Create a new site
 *
 * @param type $site_name
 *            Name of the site.
 * @param type $user_id
 *            the owner id
 *
 * @return type
 */
function create_new_site( $site_name, $user_id ) {

    // get the path and domain
    $path = get_site_path( $site_name );
    $domain = get_site_domain( $site_name );

    // set meta
    $meta = array( 'public' => 1 );

    $site_id = wpmu_create_blog( $domain, $path, $site_name, $user_id, $meta );

    if ( is_wp_error( $site_id ) )
        return FALSE;

    // when a new site is created, it must be marked as comming soon. lets add a meta
    set_site_status( $site_id, 'coming_soon' );

    // set the tracking status of the site created to false
    set_statistics_status( $site_id );

    // set default currency for the site
    set_currency( $site_id );

    assign_theme_to_site( $site_id, 'impruwclientparent' );

    // hack to create revslider plugin tables
    create_revslider_tables( $site_id );

    // create custom tables
    create_additional_tables( $site_id );

    //set up wpml for the site
    wpml_setup($site_id,$user_id);

    // add pages to site
    $pages = array(
        array( 'post_title' => 'Dashboard', 'template' => 'new-dashboard.php' ),
        array( 'post_title' => 'Site Builder', 'template' => 'new-builder.php' ),
        array( 'post_title' => 'Coming Soon', 'template' => 'coming-soon.php' ),
        array( 'post_title' => 'Sign In', 'template' => 'page-login.php' ),
        array( 'post_title' => 'Reset Password', 'template' => 'page-reset-password.php' ),
        array( 'post_title' => 'Support' ) );

    add_pages_to_site( $site_id, $user_id, $pages );

    // set comming soon as default page for the site
    set_front_page_of_site( 'Coming Soon', $site_id );

    return $site_id;
}

/**
 * Ugly hack to create revslider tables
 *
 * @param type $site_id
 */
function create_revslider_tables( $site_id ) {

    switch_to_blog( $site_id );

    // get admin url
    $url = admin_url();

    // simply trigger the admin_url through CURL
    // this will create the table for revslider plugin
    $ch = curl_init( $url );
    curl_exec( $ch );
    curl_close( $ch );

    restore_current_blog();
}

/**
 * Activate the passed plugins
 *
 * @param type $plugins
 *
 * @return boolean
 */
function activate_site_plugins( $site_id, $plugins ) {

    if ( !is_array( $plugins ) && !is_string( $plugins ) )
        return FALSE;

    switch_to_blog( $site_id );

    $_REQUEST [ 'action' ] = 'activate';
    $_REQUEST [ '_wpnonce' ] = wp_create_nonce();

    activate_plugins( $plugins );

    // create rev slider tables
    require_once ABSPATH . PLUGINDIR . '/revslider/revslider_admin.php';
    RevSliderAdmin::createDBTables();

    restore_current_blog();
}

/**
 * Adds new pages to the passed site_id
 *
 * @param type $site_id
 *            The site to create pages
 * @param type $user_id
 *            The user_id to mark as creator
 * @param type $pages
 *            array of pages to create
 *
 * @return boolean
 */
function add_pages_to_site( $site_id, $user_id, $pages ) {

    if ( !is_array( $pages ) )
        return FALSE;

    switch_to_blog( $site_id );

    foreach ( $pages as $page ) {

        // page array
        $page_arr = array( 'post_title' => $page [ 'post_title' ], 'post_content' => '', 'post_status' => 'publish', 'post_author' => $user_id, 'post_type' => 'page' );

        // Insert the post into the database
        $post_id = wp_insert_post( $page_arr );

        // assign the template if passed
        if ( isset( $page [ 'template' ] ) )
            update_post_meta( $post_id, '_wp_page_template', $page [ 'template' ] );
    }

    restore_current_blog();

    return TRUE;
}

/**
 * Sets the front page of the site
 *
 * @param type $page_name
 * @param type $site_id
 */
function set_front_page_of_site( $page_name, $site_id ) {

    switch_to_blog( $site_id );

    // Use a static front page
    $page = get_page_by_title( $page_name );
    update_option( 'page_on_front', $page->ID );
    update_option( 'show_on_front', 'page' );

    restore_current_blog();
}

/**
 * Creates the additional tables for each site
 *
 * @param type $site_id
 */
function create_additional_tables( $site_id ) {

    switch_to_blog( $site_id );

    global $wpdb;

    // tariff table
    $query = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}tariffs(
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                room_id INT,
                daterange_id INT,
        		plan_id INT,
        		weekday TEXT,
        		weekend TEXT)";

    $wpdb->query( $query );

    // plan table
    $query = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}plans(
			    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
			    plan_name VARCHAR(100),
			    plan_description VARCHAR(200))";

    $wpdb->query( $query );

    // date range table
    $query = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}daterange(
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                from_date DATE,
                to_date DATE,
                daterange_name VARCHAR(100),
                daterange_colour VARCHAR(20))";

    $wpdb->query( $query );

    // booking table
    $query = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}bookings(
				id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
				room_id INT,
				bdate DATE,
				status VARCHAR(100))";

    $wpdb->query( $query );

    // cancel subscription table
    $query = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}cancel_subscription(
				id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
				old_subscription_id VARCHAR(50),
				new_subscription_id VARCHAR(50),
				cancel_date DATE,
				status INT ";

    $wpdb->query( $query );

    restore_current_blog();
}

/**
 * Set up wpml for a given site
 *
 * @param int $site_id
 * @param int $user_id
 */
function wpml_setup($site_id, $user_id){
    //Get user preferred language
    $user_language = get_user_meta($user_id,'user_lang',true);

    switch_to_blog( $site_id );

    wpml_setup_step_one($user_language);

    $enabled_languages = array('en','nb');
    wpml_setup_step_two($enabled_languages);

    wpml_setup_step_three();

    restore_current_blog();


}

/**
 * WPML setup - Step 1: Set the initial language
 *
 * @param string $initial_language_code
 */
function wpml_setup_step_one($initial_language_code){

    global $sitepress, $wpdb;
    $iclsettings = array();

    //echo "<br/>Step 1: Initial language setup";

    $sitepress->prepopulate_translations($initial_language_code);
    $wpdb->update($wpdb->prefix . 'icl_languages', array('active'=>'1'), array('code'=>$initial_language_code));
    $blog_default_cat = get_option('default_category');
    $blog_default_cat_tax_id = $wpdb->get_var("SELECT term_taxonomy_id FROM {$wpdb->term_taxonomy} WHERE term_id='{$blog_default_cat}' AND taxonomy='category'");

    $iclsettings['setup_wizard_step'] = 2;


    $iclsettings['default_categories'] = array($initial_language_code => $blog_default_cat_tax_id);
    $iclsettings['existing_content_language_verified'] = 1;
    $iclsettings['default_language'] = $initial_language_code;
    $iclsettings['admin_default_language'] = $initial_language_code;

    // set the locale in the icl_locale_map (if it's not set)
    if(!$wpdb->get_var("SELECT code FROM {$wpdb->prefix}icl_locale_map WHERE code='{$initial_language_code}'")){
        $default_locale = $wpdb->get_var("SELECT default_locale FROM {$wpdb->prefix}icl_languages WHERE code='{$initial_language_code}'");
        if($default_locale){
            $wpdb->insert($wpdb->prefix.'icl_locale_map', array('code'=>$initial_language_code, 'locale'=>$default_locale));

        }
    }

    $sitepress->save_settings($iclsettings);
    global $sitepress_settings;
    $sitepress_settings = $iclsettings;
    $sitepress->get_active_languages(true); //refresh active languages list

}

/**
 * WPML setup - Step 2: Enable languages
 *
 * @param string $language_codes
 */
function wpml_setup_step_two($language_codes){
    global $sitepress;
    $iclsettings = array();

    //echo "<br/>Step 2: Enable Languages";

    if($sitepress->set_active_languages($language_codes)){
        $active_langs = $sitepress->get_active_languages();

        if(count($active_langs) > 1){
            $iclsettings['dont_show_help_admin_notice'] = true;
            $sitepress->save_settings($iclsettings);
        }

    }
    else{
        echo "Active languages could not be updated during wpml setup";
    }

    if(empty($iclsettings['setup_complete'])){
        $iclsettings['setup_wizard_step'] = 3;
        $sitepress->save_settings($iclsettings);
    }

}

/**
 * WPML setup - Step 3: Default wpml settings
 *
 */

function wpml_setup_step_three(){

    global $sitepress;
    $iclsettings = array();

    //echo "<br/>Step 3: Language Switcher";

    $iclsettings['setup_wizard_step'] = 3;
    $iclsettings['setup_complete'] = 1;

    $sitepress->save_settings($iclsettings);
}

/**
 * Set the status for the passed site
 *
 * @param type $site_id
 * @param type $status
 *            status to set (coming soon/ available)
 */
function set_site_status( $site_id, $status ) {

    switch_to_blog( $site_id );

    update_option( 'site_status', $status );

    restore_current_blog();
}

function set_statistics_status( $site_id ) {

    switch_to_blog( $site_id );

    update_option( 'statistics_enabled', 'false' );

    restore_current_blog();
}

function set_currency( $site_id ) {

    switch_to_blog( $site_id );

    update_option( 'currency', 'NOK' );

    restore_current_blog();
}

/**
 * Assigns the passed theme to site
 *
 * @param type $site_id
 * @param type $theme_name
 */
function assign_theme_to_site( $site_id, $theme_name ) {

    switch_to_blog( $site_id );

    $theme = wp_get_theme( $theme_name ); // Change the name here to change the theme

    $set_status = FALSE;

    if ( $theme->exists() && $theme->is_allowed() ) {
        switch_theme( $theme->get_template(), $theme->get_stylesheet() );
        $set_status = TRUE;
    }

    restore_current_blog();

    return $set_status;
}

/**
 * returns the path of the new domain
 * checks if subdomain install is on or else appends to current site
 *
 * @param string $name
 *
 * @return string
 */
function get_site_path( $name ) {

    // new site will be created from main site always. hence, blog_id is 1
    $current_site = get_blog_details( 1 );

    $path = $name;

    if ( is_subdomain_install() )
        $path = $current_site->path; else
        $path = $current_site->path . $name . '/';

    return $path;
}

/**
 * Returns the domain of the site
 *
 * @param type $domain
 *
 * @return string
 */
function get_site_domain( $domain ) {

    $newdomain = $domain;

    // new site will be created from main site always. hence, blog_id is 1
    $current_site = get_blog_details( 1 );

    if ( is_subdomain_install() )
        $newdomain = $domain . '.' . preg_replace( '|^www\.|', '', $current_site->domain ); else
        $newdomain = $current_site->domain;

    return $newdomain;
}

/**
 * Function to check if the sitename already exists
 *
 * @param string $blog_name
 * @param int $mainblog_id
 *
 * @return array containing status, message
 */
function sitename_exists( $blog_name, $mainblog_id ) {

    global $user_id;
    // var_dump("test");
    $blog = $blog_name;
    $domain = '';
    if ( preg_match( '|^([a-zA-Z0-9-])+$|', $blog_name ) )
        $domain = strtolower( $blog_name );

    // If not a subdomain install, make sure the domain isn't a reserved word
    if ( !is_subdomain_install() ) {
        // $subdirectory_reserved_names = apply_filters( 'subdirectory_reserved_names', array( 'page', 'comments', 'blog', 'files', 'feed','impruw','admin','administrator', ) );

        $subdirectory_reserved_names = apply_filters( 'subdirectory_reserved_names', array( 'about', 'account', 'activate', 'add', 'admin', 'administrator', 'android', 'api', 'app', 'apps', 'archive', 'archives', 'auth', 'better', 'blog', 'cache', 'cache', 'cancel', 'careers', 'cart', 'change', 'changelog', 'checkout', 'codereview', 'compare', 'config', 'configuration', 'connect', 'contact', 'create', 'css', 'delete', 'direct_messages', 'documentation', 'download', 'downloads', 'edit', 'email', 'employment', 'enterprise', 'error', 'example', 'facebook', 'faq', 'favorites', 'feed', 'feedback', 'feeds', 'fleet', 'fleets', 'follow', 'followers', 'following', 'form', 'friend', 'friends', 'gist', 'group', 'groups', 'help', 'home', 'hosting', 'hostmaster', 'htc', 'idea', 'ideas', 'image(s)', 'index', 'info', 'invitations', 'invite', 'iphone', 'is', 'it', 'job', 'jobs', 'js', 'json', 'lists', 'log', 'login', 'logout', 'logs', 'mail', 'map', 'maps', 'mine', 'mis', 'news', 'nokia', 'oauth', 'oauth_clients', 'offers', 'openid', 'order', 'orders', 'organizations', 'page', 'plans', 'popular', 'post', 'postmaster', 'privacy', 'projects', 'put', 'recruitment', 'register', 'remove', 'replies', 'root', 'rss', 'sales', 'sample', 'samsung', 'save', 'search', 'secure', 'security', 'service(s)', 'sessions', 'settings', 'shop', 'signup', 'sitemap', 'ssl', 'ssladmin', 'ssladministrator', 'sslwebmaster', 'status', 'stories', 'styleguide', 'subscribe', 'subscriptions', 'support', 'sysadmin', 'sysadministrator', 'terms', 'test', 'tour', 'translations', 'trends', 'twitter', 'twittr', 'unfollow', 'unsubscribe', 'update', 'url', 'user', 'video', 'weather', 'webmaster', 'webpage', 'website', 'widget', 'widgets', 'wiki', 'ww', 'www', 'wwww', 'xfn', 'xml', 'xmpp', 'yaml', 'yml' ) );
        if ( in_array( $domain, $subdirectory_reserved_names ) ) {

            $site_exists [ 'CODE' ] = 'Oops you cannot use this name. It\'s already taken.';
            // $site_exists['message'] = __('The following words are reserved for use by WordPress functions and cannot be used as blog names: '.implode(",",$subdirectory_reserved_names)) ;
            $site_exists [ 'message' ] = __( 'It is a reserved word and cannot be used as site names: ' );

            return $site_exists;
        }
    }

    $current_site = get_blog_details( $mainblog_id );
    $site_id = $current_site->blog_id;

    if ( empty( $domain ) ) {
        $site_exists [ 'CODE' ] = 'ERROR';
        $site_exists [ 'message' ] = __( 'Missing or invalid site address.' );

        return $site_exists;
    }

    if ( is_subdomain_install() ) {
        $newdomain = $domain . '.' . preg_replace( '|^www\.|', '', $current_site->domain );
        $path = $current_site->path;
    } else {
        $newdomain = $current_site->domain;
        $path = $current_site->path . $domain . '/';
    }

    $domain = preg_replace( '/\s+/', '', sanitize_user( $newdomain, TRUE ) );

    if ( is_subdomain_install() )
        $domain = str_replace( '@', '', $domain );

    $user_id = (int)$user_id;

    if ( empty( $path ) )
        $path = '/';

    // Check if the domain has been used already.
    if ( domain_exists( $domain, $path, $site_id ) ) {
        $site_exists [ 'CODE' ] = 'OK';
        $site_exists [ 'message' ] = __( 'Oops you cannot use this name. It\'s already taken.' );

        return $site_exists;
    } else {
        $site_exists [ 'CODE' ] = 'FAILED';
        $site_exists [ 'message' ] = __( 'Site Name is available.' );

        return $site_exists;
    }
}
