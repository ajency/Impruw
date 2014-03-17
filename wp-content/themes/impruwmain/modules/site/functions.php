<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * Create a new site
 * @param type $site_name Name of the site.
 * @param type $user_id the owner id
 * @return type
 */
function create_new_site($site_name, $user_id){
    
    //get the path and domain
    $path = get_site_path($site_name);
    $domain = get_site_domain($site_name);
    
    // set meta
    $meta = array('public' => 1);
    
    $site_id = wpmu_create_blog($domain, $path, 'New Site', $user_id, $meta);
    
    // when a new site is created, it must be marked as comming soon. lets add a meta
    set_site_status($site_id, 'coming_soon');
    
    assign_theme_to_site($site_id, 'impruwclientparent');
    
    //add pages to site
    $pages = array(
                array('post_title' => 'Dashboard',      'template' => 'new-dashboard.php'),
                array('post_title' => 'Site Builder',   'template' => 'new-builder.php'),
                array('post_title' => 'Coming Soon',    'template' => 'coming-soon.php'),
                array('post_title' => 'Support')
            );
    
    add_pages_to_site($site_id, $user_id, $pages);
    
    // activate the plugins. add more if required
    $plugins = array('revslider/revslider.php');
    
    activate_site_plugins($site_id, $plugins);
    
    // create custom tables
    create_additional_tables($site_id);
    
    //set comming soon as default page for the site
    //set_front_page_of_site('Coming Soon', $site_id);
    
    return $site_id;
}

/**
 * 
 * @param type $plugins
 * @return boolean
 */
function activate_site_plugins($site_id, $plugins){
    
    if(!is_array($plugins) && !is_string($plugins))
        return false;
    
    switch_to_blog($site_id);
    
    $_REQUEST['action'] = 'activate';
    $_REQUEST['_wpnonce'] = wp_create_nonce();
   
    activate_plugins($plugins);
    
    // create rev slider tables
    require_once ABSPATH . PLUGINDIR . '/revslider/revslider_admin.php';
    RevSliderAdmin::createDBTables();
    
    restore_current_blog();

}

/**
 * Adds new pages to the passed site_id
 * @param type $site_id The site to create pages
 * @param type $user_id The user_id to mark as creator
 * @param type $pages array of pages to create
 * @return boolean
 */
function add_pages_to_site($site_id, $user_id, $pages ){
    
    if(!is_array($pages))
        return false;
    
    switch_to_blog( $site_id );
    
    foreach ($pages as $page) {
        
        // page array
        $page_arr = array(
            'post_title'    => $page['post_title'],
            'post_content'  => '',
            'post_status'   => 'publish',
            'post_author'   => $user_id,
            'post_type'     => 'page'
        );

        // Insert the post into the database
        $post_id = wp_insert_post( $page_arr );
        
        // assign the template if passed
        if(isset($page['template']))
            update_post_meta( $post_id, '_wp_page_template', $page['template'] );
    
    }
    
    restore_current_blog();

    return true;
}

/**
 * Sets the front page of the site
 * @param type $page_name
 * @param type $site_id
 */
function set_front_page_of_site($page_name, $site_id){
    
    switch_to_blog($site_id);
    
    // Use a static front page
    $page = get_page_by_title( $page_name );
    update_option( 'page_on_front', $page->ID );
    update_option( 'show_on_front', 'page' );
    
    restore_current_blog();
    
}

/**
 * Creates the additional tables for each site
 * @param type $site_id
 */
function create_additional_tables($site_id){
    
    switch_to_blog( $site_id );
    
    // read schema file 
    // require '';
    
    // run queries
    
    restore_current_blog();
    
}

/**
 * Set the status for the passed site
 * @param type $site_id
 * @param type $status status to set (coming soon/ available)
 */
function set_site_status($site_id, $status){
    
    switch_to_blog($site_id);
    
    update_option('site_status', $status);
    
    restore_current_blog();
    
}

/**
 * Assigns the passed theme to site
 * @param type $site_id
 * @param type $theme_name
 */
function assign_theme_to_site($site_id, $theme_name){
    
    switch_to_blog( $site_id );

    $theme = wp_get_theme( $theme_name ); //Change the name here to change the theme
    
    $set_status = false;
    
    if ( $theme->exists() && $theme->is_allowed() ){
        switch_theme( $theme->get_template(), $theme->get_stylesheet() );
        $set_status = true;
    }
        
    restore_current_blog();
        
    return $set_status;
}

/**
 * returns the path of the new domain
 * checks if subdomain install is on or else appends to current site
 * @param string $name
 * @return string
 */
function get_site_path($name){
    // new site will be created from main site always. hence, blog_id is 1
    $current_site = get_blog_details(1);
    
    $path = $name;
    
    if (is_subdomain_install() )
        $path      = $current_site->path;
    else 
        $path      = $current_site->path . $name . '/';
    
    return $path;
}

/**
 * Returns the domain of the site
 * @param type $domain
 * @return string
 */
function get_site_domain($domain){
    
    $newdomain = $domain;
    
    // new site will be created from main site always. hence, blog_id is 1
    $current_site = get_blog_details(1);
    
    if (is_subdomain_install() )
        $newdomain = $domain . '.' . preg_replace( '|^www\.|', '', $current_site->domain );    
    else 
        $newdomain = $current_site->domain;
    
    return $newdomain;
}
