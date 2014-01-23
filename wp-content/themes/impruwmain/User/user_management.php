<?php

/*
 * File name : user_management.php
 * Description :  Contains a list of functions to manage user data
 * 1) wp_impruw_create_user - Function to insert registered user's data into the database and return the user_id.
 * 2) create_new_site - Function to create a new blog and return the blog id.
 * 3) assign_theme_to_site - Function to assign a theme to the new site created.
 * 4) toggle_plugin - Function to activate the wpml and wpml string plugin
 * 5) assign_default_language - Function to assign the default language of WPML forthe site created.
 * 6) assign_active_languages - Function to assign active languages to a site.
 * 7) add_new_post_to_blog - Function to create a new post of type page.
 * 8) mwm_wpml_translate_post - Creates a translation of a post (to be used with WPML.
 * 9) add_layout_site - Function to assign the json layouyt to a page
 * 10) create_tariff_table_for_blog - Function to create a table for room tariffs every time a site is created.
 * 11) check_email_exists   - Function to check if email id already registered(check done on registration page)
 * 12) check_sitename_exists - Function to check if sitename already exists(check done on registration page)
 * 13)  user_activation - Function to activate new useres
 *
 *
 */

//require_once '../Communication_module/communication_functions.php';
require_once ABSPATH."/wp-content/themes/impruwmain/Communication_module/communication_functions.php";

/**
 *  New user sign up process started
 *
 * @param type    $user_data_array
 * @param type    $blog_id
 * @param type    $blog_name
 * @param type    $blog_title
 * @param type    $user_id
 * @param type    $file_name
 */
function user_signup( $user_data_array, $blog_id, $blog_name, $blog_title, $file_name, $user_default_language ) {
    
    $user_id = wp_impruw_create_user( $user_data_array, $user_default_language );

    $data = array();
    
    $data['user_id'] = $user_id;
    
    $site_id = create_new_site( $blog_id, $blog_name, $blog_title, $user_id, $file_name, $user_default_language, $data );
    
    return $site_id;
}

/**
 * wp_impruw_create_user
 * Function to insert registered user's data into the database and return the user_id.
 *
 * @param array   $user_data_array-Array containing user information(email, password, name)
 */
function wp_impruw_create_user( $user_data_array, $user_default_language ) {
    
    $last_name      = '';
    
    $user_login     = wp_slash( $user_data_array['email'] );
    
    $user_email     = wp_slash( $user_data_array['email'] );
    
    $user_pass      = $user_data_array['password'];
    
    $user_nicename  = wp_slash( $user_data_array['name']    );
    
    $users_name_array =  explode( ' ', $user_data_array['name'] );
    
    $first_name = wp_slash( $users_name_array[0]    );
    
    if ( count( $users_name_array )>1 )
        $last_name = wp_slash( $users_name_array[1]    );
    
    $role = $user_data_array['role'];
    
    $activation_key = generate_user_activation_key( $user_data_array['email'] );
    
    $userdata = compact( 'user_login', 'user_email', 'user_pass', 'user_nicename', 'first_name', 'last_name', 'role' );
    
    $user_id = wp_insert_user( $userdata );
    
    global $wpdb;
    
    $wpdb->update(
        $wpdb->prefix.'users',
        array(
            'user_activation_key' => $activation_key,
            'user_status' => 2
        ),
        array( 'ID' => $user_id )
    );

    update_user_meta( $user_id, 'user_default_language', $user_default_language );
    
    //check if admin is registering the user or the user is signing up.
    if ( is_user_logged_in() )
        $initiator_id =  get_current_user_id ();
    else
        $initiator_id = $user_id;
    
    $data = array();
    
    $data['user_id'] = $user_id;
    
    send_email( $initiator_id, 'registration', $data );
    
    return $user_id;
}

/**
 * create_new_site
 * Function to create a new blog
 *
 * @param int     $blog_id    - current blogs id.
 * @param text    $blog_name  - domain name of the new blog.
 * @param text    $blog_title - title of the new blog.
 * @param int     $user_id    - the user id/ owner of the new blog.
 * @return type
 */
function create_new_site( $blog_id, $blog_name, $blog_title, $user_id, $file_name, $user_default_language, $data ) {
    
    $blog = $blog_name;
    
    $domain = '';

    if ( preg_match( '|^([a-zA-Z0-9-])+$|', $blog_name ) )
        $domain = strtolower( $blog_name );

    // If not a subdomain install, make sure the domain isn't a reserved word
    if ( ! is_subdomain_install() ) {
        
        $subdirectory_reserved_names = apply_filters( 'subdirectory_reserved_names', array( 'page', 'comments', 'blog', 'files', 'feed' ) );
        
        if ( in_array( $domain, $subdirectory_reserved_names ) )
            wp_die( sprintf( __( 'The following words are reserved for use by WordPress functions and cannot be used as blog names: <code>%s</code>' ), implode( '</code>, <code>', $subdirectory_reserved_names ) ) );
    
    }

    $title = $blog_title;
    
    if ( empty( $domain ) )
        return 'Missing or invalid site address.';
    
    $current_site=get_blog_details( $blog_id );
    
    if ( is_subdomain_install() ) {
    
        $newdomain = $domain . '.' . preg_replace( '|^www\.|', '', $current_site->domain );
        $path      = $current_site->path;
    
    } else {
    
        $newdomain = $current_site->domain;
        $path      = $current_site->path . $domain . '/';
    
    }



    $new_blog_id = wpmu_create_blog( $newdomain, $path, $title, $user_id , array( 'public' => 1 ), $current_site->blog_id );
    
    switch_to_blog( $new_blog_id );
    
    assign_theme_to_site( $new_blog_id, 'impruw-default' );//assign a theme to the new site created
    
    restore_current_blog();
    
    //toggle_plugin( $new_blog_id );//activating the wpml plugin for the current site.
    
    assign_default_language( $new_blog_id, $user_default_language );
    
    assign_active_languages( $new_blog_id );


    $pages =    array(  
                        'Dashboard'     => array('content' => 'Dashboard Content', 'template' => 'page-dashboard.php'),
                        'Home'          => array('content' => 'Home Content', 'template' => ''),
                        'About Us'      => array('content' => 'About Content', 'template' => ''),
                        'Contact Us'    => array('content' => 'Contact Content', 'template' => ''),
                        'Site Builder'  => array('content' => 'Site Builder Content', 'template' => 'site-build.php'),
                        'Single Room'   => array('content' => 'Single Room', 'template' => ''),
                        'Rooms'         => array('content' => 'Rooms', 'template' => '')
                    );
    
    //start creating initial pages
    foreach ($pages as $key => $value) {

        $post_id = add_new_post_to_blog( $new_blog_id, 
                                         $user_id, $key, 
                                         $value['content'],
                                         'page', 
                                         $value['template']);
    
        $post_nb_id = mwm_wpml_translate_post( $new_blog_id, $post_id, 'page', 'nb', $user_id );
    
        //commented the template part 5dec2013 to bypass
        if($value['template'] === '')
            add_layout_site( $new_blog_id, $post_id, $key);
    }

    //set header and footer
     $clone_blog = CLONEBLOG; //server
	//$clone_blog = 81; //local
	
    switch_to_blog($clone_blog);

    $theme_header = get_option('theme-header');
    $theme_footer = get_option('theme-footer');

    restore_current_blog();

    switch_to_blog($new_blog_id);

    update_option('theme-header', $theme_header);
    update_option('theme-footer', $theme_footer);

    restore_current_blog();
    
    create_tariff_table_for_blog( $new_blog_id );
    
    create_daterange_table_for_blog( $new_blog_id );
    
    create_datetariff_table_for_blog( $new_blog_id );

    add_menu_to_blog( $user_id, $new_blog_id );
    
    //exit;//create a new post

    //echo $new_blog_id;
    $data['blog_id'] = $new_blog_id;
    
    if ( is_user_logged_in() )
        $initiator_id =  get_current_user_id ();
    else
        $initiator_id = $user_id;
    
    switch_to_blog(BLOG_ID_CURRENT_SITE);    
    send_email( $initiator_id, 'site_creation', $data );
    restore_current_blog(); 
        
    return $new_blog_id;

}

/**
 * assign_theme_to_site
 * Function to assign a theme to the new site created.
 *
 * @param int     $blog_id    - id of the blogto which theme needs to be assigned..
 * @param text    $theme_name - name of theme to assign to the new blog created.
 */
function assign_theme_to_site( $blog_id, $theme_name ) {
    
    switch_to_blog( $blog_id );

    $theme = wp_get_theme( $theme_name ); //Change the name here to change the theme
    
    if ( $theme->exists() || $theme->is_allowed() )
        switch_theme( $theme->get_template(), $theme->get_stylesheet() );
    
    restore_current_blog();
}

/**
 * toggle_plugin
 * function to activate the wpml and wpml string plugin
 */
function toggle_plugin( $blog_id ) {
    switch_to_blog( $blog_id );
    
    $my_plugin = 'sitepress-multilingual-cms/sitepress.php';

    // Check to see if plugin is already active
    if ( !is_plugin_active( $my_plugin ) ) {

        $_REQUEST['action'] = 'activate';
        $_REQUEST['_wpnonce'] = wp_create_nonce();
        activate_plugin( $my_plugin );
        //activate_plugin( $my_plugin );
        icl_sitepress_activate();
    }
    /*$my_plugin = 'wpml-string-translation/plugin.php';

    // Check to see if plugin is already active
    if(!is_plugin_active($my_plugin)) {

                $_REQUEST['action'] = 'activate';
                $_REQUEST['_wpnonce'] = wp_create_nonce();
        activate_plugin($my_plugin);
                activate_plugin($my_plugin);
                //icl_sitepress_activate();

    }*/
    restore_current_blog();
}


/**
 * assign_default_language
 * Function to assign the default language of WPML forthe site created.
 *
 * @param int     $blog_id       - the id of the new blog
 * @param text    $language_code - the code of the language which is assigned as default.
 */
function assign_default_language( $blog_id, $language_code ) {
    global $wpdb;
    switch_to_blog( $blog_id );

    $sitepress= new SitePress;

    $sitepress->initialize_cache();
    
    $settings = get_option( 'icl_sitepress_settings' );
    
    $sitepress->prepopulate_translations( $language_code );
    
    $wpdb->update( $wpdb->prefix . 'icl_languages', array( 'active'=>'1' ), array( 'code'=>$language_code ) );
    
    $blog_default_cat = get_option( 'default_category' );
    
    $blog_default_cat_tax_id = $wpdb->get_var( "SELECT term_taxonomy_id FROM {$wpdb->term_taxonomy} WHERE term_id='{$blog_default_cat}' AND taxonomy='category'" );

    if ( isset( $_POST['save_one_language'] ) ) {
    
        $settings['setup_wizard_step'] = 0;
    
        $settings['setup_complete'] = 1;
    
    }else {
    
        $settings['setup_wizard_step'] = 2;
    
    }

    $settings['default_categories'] = array( $language_code => $blog_default_cat_tax_id );
    
    $settings['existing_content_language_verified'] = 1;
    
    $settings['default_language'] = $language_code;
    
    $settings['admin_default_language'] =  $language_code;

    // set the locale in the icl_locale_map (if it's not set)
    if ( !$wpdb->get_var( "SELECT code FROM {$wpdb->prefix}icl_locale_map WHERE code='{$language_code}'" ) ) {
        $default_locale = $wpdb->get_var( "SELECT default_locale FROM {$wpdb->prefix}icl_languages WHERE code='{$language_code}'" );
        
        if ( $default_locale ) {
        
            $wpdb->insert( $wpdb->prefix.'icl_locale_map', array( 'code'=>$language_code, 'locale'=>$default_locale ) );

        }
    }

    $sitepress->save_settings( $settings );
    
    $sitepress->set_admin_language();
    
    global $sitepress_settings;
    
    $sitepress_settings = $settings;
    
    //$sitepress->get_active_languages(true); //refresh active languages list
    //do_action('icl_initial_language_set');
    restore_current_blog();

}


/**
 * assign_active_languages
 * Function to assign active languages toa  site.
 *
 * @param int     $blog_id - the id of the blog in which the active languages need to be assigned.
 */
function assign_active_languages( $blog_id ) {
    
    $languages_array = array( "en", "nb" );
    
    switch_to_blog( $blog_id );
    
    $sitepress= new SitePress();
    
    $sitepress->initialize_cache();
    
    $sitepress->set_active_languages( $languages_array );
    
    $sitepress->verify_settings();
    
    restore_current_blog();

}

/**
 * add_new_post_to_blog
 * Function to create a new post of type page.
 *
 * @param int     $blog_id - id of the blog in which the post has to be created.
 * @param int     $user_id - id of user who will be assigned the author of the post.
 * @return type
 */
function add_new_post_to_blog( $blog_id, $user_id, $post_title, $post_content, $post_type, $post_template ) {

    switch_to_blog( $blog_id );

    $my_post = array(
        'post_title'    => $post_title,
        'post_content'  => $post_content,
        'post_status'   => 'publish',
        'post_author'   => $user_id,
        'post_type'     => $post_type
    );

    // Insert the post into the database
    $post_id = wp_insert_post( $my_post );

    update_post_meta( $post_id, '_wp_page_template', $post_template );

    //$test=icl_sitepress_activate();var_dump($test);exit;
    // echo mwm_wpml_translate_post( $post_id, 'page', 'nb' );exit;
    restore_current_blog();

    return $post_id;
}

/**
 * mwm_wpml_translate_post
 * Creates a translation of a post (to be used with WPML)
 *
 * @param int     $post_id   The ID of the post to be translated.
 * @param string  $post_type The post type of the post to be transaled (ie. 'post', 'page', 'custom type', etc.).
 * @param string  $lang      The language of the translated post (ie 'fr', 'de', etc.).
 * @param string  $user_id   - id of user who will be assigned the author of the post.
 *
 * @return the translated post ID
 *  */
function mwm_wpml_translate_post( $blog_id, $post_id, $post_type, $lang, $user_id ) {

    switch_to_blog( $blog_id );

    // Include WPML API
    include_once WP_PLUGIN_DIR . '/sitepress-multilingual-cms/inc/wpml-api.php';

    // Define title of translated post
    $post_translated_title = get_post( $post_id )->post_title . ' (' . $lang . ')';

    // Insert translated post
    $post_translated_id = wp_insert_post( array( 'post_title' => $post_translated_title, 'post_type' => $post_type, 'post_status' => 'publish', 'post_author' => $user_id ) );

    // Get trid of original post
    $trid = wpml_get_content_trid( 'post_' . $post_type, $post_id );

    // Get default language
    $default_lang = wpml_get_default_language();

    // Associate original post and translated post
    global $wpdb;

    $wpdb->update( $wpdb->prefix.'icl_translations', array( 'trid' => $trid, 'language_code' => $lang, 'source_language_code' => $default_lang ), array( 'element_id' => $post_translated_id ) );

    restore_current_blog();
    // Return translated post ID
    return $post_translated_id;

}




/**
 * add_layout_site
 * Function to assign the json layouyt to a page
 *
 * @param type    $blog_id
 * @param type    $post_id
 * @param type    $file_name
 */
function add_layout_site( $blog_id, $post_id, $name ) {
    
    //site to clone from
     $clone_blog = CLONEBLOG;  //server
	//$clone_blog = 81;  //local
	
    switch_to_blog($clone_blog);

    $page = get_page_by_title($name);

    $page_json = get_post_meta($page->ID ,'page-json', true);

    if($page_json == null)
        return;

    restore_current_blog();        
   
    switch_to_blog($blog_id);

    update_post_meta($post_id, 'page-json', $page_json);

    restore_current_blog();

}

/**
 * create_tariff_table_for_blog
 * Function to create a table for room tariffs every time a site is created.
 *
 * @global type $wpdb
 * @param int     $blog_id - id of the blog in which changes need to be done
 */
function create_tariff_table_for_blog( $blog_id ) {
    switch_to_blog( $blog_id );
    global $wpdb;
    $query_email_actions=( "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}room_tariffs(
                tariff_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                post_id INT,
                                start_data DATE,
                                end_date DATE,
                                attributes TEXT,
                                add_ons TEXT)" );
    $wpdb->query( $query_email_actions );
    restore_current_blog();
}


/**
 * create_daterange_table_for_blog
 * Function to create a table for daterange for room tariff plans every time a site is created.
 *
 * @global type $wpdb
 * @param int     $blog_id - id of the blog in which changes need to be done
 */
function create_daterange_table_for_blog( $blog_id ) {
    switch_to_blog( $blog_id );
    global $wpdb;

    $query_daterange = ( "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}daterange (
                            id int(11) NOT NULL AUTO_INCREMENT,
                            from_date datetime NOT NULL,
                            to_date datetime NOT NULL,
                            label varchar(250) CHARACTER SET utf8 NOT NULL,
                                PRIMARY KEY (id)
                            )" );

    $wpdb->query( $query_daterange );
    restore_current_blog();
}




/**
 * create_datetariff_table_for_blog
 * Function to create a table for date tariff for room tariff plans every time a site is created.
 *
 * @global type $wpdb
 * @param int     $blog_id - id of the blog in which changes need to be done
 */
function create_datetariff_table_for_blog( $blog_id ) {
    switch_to_blog( $blog_id );
    global $wpdb;

    $query_datetariff = ( "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}datetarriff (
                          id int(11) NOT NULL AUTO_INCREMENT,
                          daterange_id int(11) NOT NULL,
                          plan_id int(11) NOT NULL,
                          tarriff longtext CHARACTER SET utf8 NOT NULL,
                          PRIMARY KEY (id)
                        )" );

    $wpdb->query( $query_datetariff );
    restore_current_blog();
}



/**
 * add_menu_to_blog
 * Function to create 2 menu's for the new blog created
 *
 * @param type    $blog_id - the idof blog to add menu to.
 */
function add_menu_to_blog( $user_id, $blog_id ) {
    switch_to_blog( $blog_id );

    $run_once = get_option( 'menu_check' );
    if ( !$run_once ) {
        //give your menu a name
        $name = 'Main Menu';
        //create the menu
        $menu_id = wp_create_nav_menu( $name );
        //then get the menu object by its name
        $menu = get_term_by( 'name', $name, 'nav_menu' );

        foreach(get_all_menu_pages() as $page):

            //then add the actuall link/ menu item and you do this for each item you want to add
            wp_update_nav_menu_item( $menu->term_id, 0, array(
                'menu-item-title'   => $page->post_title,
                'menu-item-classes' => $page->post_name ,
                'menu-item-url'     => get_permalink( $page->ID),
                'menu-item-status'  => 'publish' ) );

        endforeach;

        //then you set the wanted theme  location
        $locations = get_theme_mod( 'nav_menu_locations' );
        $locations['header_menu'] = $menu->term_id;
        set_theme_mod( 'nav_menu_locations', $locations );


        //give your menu a name
        $name_footer = 'Footet Menu';
        //create the menu
        $menu_id_footer = wp_create_nav_menu( $name_footer );
        //then get the menu object by its name
        $menu_footer = get_term_by( 'name', $name_footer, 'nav_menu' );

        foreach(get_all_menu_pages() as $page):

            //then add the actuall link/ menu item and you do this for each item you want to add
            wp_update_nav_menu_item( $name_footer->term_id, 0, array(
                'menu-item-title'   => $page->post_title,
                'menu-item-classes' => $page->post_name ,
                'menu-item-url'     => get_permalink( $page->ID),
                'menu-item-status'  => 'publish' ) );

        endforeach;

        //then you set the wanted theme  location
        $locations_footer = get_theme_mod( 'nav_menu_locations' );
        $locations_footer['footer_menu'] = $menu_footer->term_id;
        set_theme_mod( 'nav_menu_locations', $locations_footer );


        // then update the menu_check option to make sure this code only runs once
        update_option( 'menu_check', true );
    }
    restore_current_blog();
}



/**
 * Function to check if email id already exist( Registration page)
 * Returns
 */
function check_email_exists() {

    $email = $_GET['inputEmail'];
    header( 'Content-Type: application/json' );

    if ( !filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
        echo json_encode( array( "message"=>"Invalid email Id" ) );
    }
    else if ( email_exists( $email ) ) {
            echo json_encode( array( "message"=>"Email Id Already Exists." ) );
        }
    else {
        echo json_encode( true );
    }
    die();
}
add_action( 'wp_ajax_check_email_exists', 'check_email_exists' );
add_action( 'wp_ajax_nopriv_check_email_exists', 'check_email_exists' );




/**
 * Function to check if sitename already exists (used on registration page)
 *  returns 000 & msg  on success
 *  returns 001 & msg on fail
 */
function check_sitename_exists() {
    $blog_name = $_GET['inputSitename'];


    global $user_id;
    $blog_id = 1;
    $site_exist = sitename_exists( $blog_name, $blog_id );


    if ( $site_exist['CODE']=="ERROR" ) {
        header( 'Content-Type: application/json' );
        echo json_encode( array( "error"=>__( $site_exist['message'] ) ) );
        die();
    }
    else if ( $site_exist['CODE']=="OK" ) {
            header( 'Content-Type: application/json' );
            echo json_encode( array( "error"=>__( $site_exist['message'] ) ) );
            die();

        }
    else {
        header( 'Content-Type: application/json' );
        echo json_encode( true );
        die();


    }


}
add_action( 'wp_ajax_check_sitename_exists', 'check_sitename_exists' );
add_action( 'wp_ajax_nopriv_check_sitename_exists', 'check_sitename_exists' );



/**
 * Function to check if the sitename already exists
 *
 * @param string  $blog_name
 * @param int     $mainblog_id
 * @return array containing status, message
 */
function sitename_exists( $blog_name, $mainblog_id ) {

    global $user_id;
    //var_dump("test");
    $blog = $blog_name;
    $domain = '';
    if ( preg_match( '|^([a-zA-Z0-9-])+$|', $blog_name ) )
        $domain = strtolower( $blog_name );

    // If not a subdomain install, make sure the domain isn't a reserved word
    if ( ! is_subdomain_install() ) {
        //$subdirectory_reserved_names = apply_filters( 'subdirectory_reserved_names', array( 'page', 'comments', 'blog', 'files', 'feed','impruw','admin','administrator', ) );

        $subdirectory_reserved_names = apply_filters( 'subdirectory_reserved_names', array( 'about', 'account', 'activate', 'add', 'admin', 'administrator', 'android', 'api',
                'app', 'apps', 'archive', 'archives', 'auth', 'better', 'blog', 'cache',
                'cache', 'cancel', 'careers', 'cart', 'change', 'changelog', 'checkout', 'codereview',
                'compare', 'config', 'configuration', 'connect', 'contact', 'create', 'css', 'delete',
                'direct_messages', 'documentation', 'download', 'downloads', 'edit', 'email', 'employment',
                'enterprise', 'error', 'example', 'facebook', 'faq', 'favorites', 'feed', 'feedback', 'feeds',
                'fleet', 'fleets', 'follow', 'followers', 'following', 'form', 'friend', 'friends', 'gist',
                'group', 'groups', 'help', 'home', 'hosting', 'hostmaster', 'htc', 'idea', 'ideas', 'image(s)',
                'index', 'info', 'invitations', 'invite', 'iphone', 'is', 'it', 'job', 'jobs', 'js',
                'json', 'lists', 'log', 'login', 'logout', 'logs', 'mail', 'map', 'maps', 'mine', 'mis',
                'news', 'nokia', 'oauth', 'oauth_clients', 'offers', 'openid', 'order', 'orders', 'organizations',
                'page', 'plans', 'popular', 'post', 'postmaster', 'privacy', 'projects', 'put', 'recruitment',
                'register', 'remove', 'replies', 'root', 'rss', 'sales', 'sample', 'samsung', 'save', 'search',
                'secure', 'security', 'service(s)', 'sessions', 'settings', 'shop', 'signup', 'sitemap', 'ssl',
                'ssladmin', 'ssladministrator', 'sslwebmaster', 'status', 'stories', 'styleguide', 'subscribe',
                'subscriptions', 'support', 'sysadmin', 'sysadministrator', 'terms', 'test', 'tour', 'translations',
                'trends', 'twitter', 'twittr', 'unfollow', 'unsubscribe', 'update', 'url', 'user', 'video', 'weather',
                'webmaster', 'webpage', 'website', 'widget', 'widgets', 'wiki', 'ww', 'www', 'wwww', 'xfn', 'xml', 'xmpp',
                'yaml', 'yml'
            ) );
        if ( in_array( $domain, $subdirectory_reserved_names ) ) {

            $site_exists['CODE'] = 'Oops you cannot use this name. It\'s already taken.';
            //$site_exists['message'] =  __('The following words are reserved for use by WordPress functions and cannot be used as blog names: '.implode(",",$subdirectory_reserved_names)) ;
            $site_exists['message'] =  __( 'It is a reserved word and cannot be used as site names: ' ) ;

            return $site_exists;

        }
    }

    $current_site=get_blog_details( $mainblog_id );
    $site_id = $current_site->blog_id;

    if ( empty( $domain ) ) {
        $site_exists['CODE'] = 'ERROR';
        $site_exists['message'] =  __( 'Missing or invalid site address.' ) ;
        return $site_exists;
    }

    if ( is_subdomain_install() ) {
        $newdomain = $domain . '.' . preg_replace( '|^www\.|', '', $current_site->domain );
        $path      = $current_site->path;
    } else {
        $newdomain = $current_site->domain;
        $path      = $current_site->path . $domain . '/';
    }


    $domain = preg_replace( '/\s+/', '', sanitize_user( $newdomain, true ) );

    if ( is_subdomain_install() )
        $domain = str_replace( '@', '', $domain );


    $user_id = (int) $user_id;

    if ( empty( $path ) )
        $path = '/';

    // Check if the domain has been used already.
    if ( domain_exists( $domain, $path, $site_id ) ) {
        $site_exists['CODE'] = 'OK';
        $site_exists['message'] =  __( 'Oops you cannot use this name. It\'s already taken.' ) ;
        return $site_exists;
    }
    else {
        $site_exists['CODE'] = 'FAILED';
        $site_exists['message'] =  __( 'Site Name is available.' ) ;
        return $site_exists;
    }

}




/**
 * Function to add new user and site on registration
 *
 * @param string  $email
 * @return boolean
 */
function save_new_user() {

    $form_data = $_POST['frmdata'];

    if ( !check_ajax_referer( 'frm_registration', 'ajax_nonce' ) ) {
        header( 'Content-Type: application/json' );
        echo json_encode( array( 'code' => 'ERROR', 'msg'=>_( "Looks like some of fields have been filled incorrectly. Please check again and submit." ) )  );
        die();
    }
    
    

    foreach ( $_POST['frmdata'] as $frm_element_key => $frm_element_val ) {

        switch ( $frm_element_val['name'] ) {
        case 'inputName'    : 
            $name = $frm_element_val['value'];
            break;
        case 'inputEmail'    : 
            $email = $frm_element_val['value'];
            break;
        case 'inputLanguage'   : 
            $inputLanguage = $frm_element_val['value'];
            break;
        case 'inputSitename'   : 
            $sitename = $frm_element_val['value'];
            break;
        case 'inputPass'    : 
            $pass = $frm_element_val['value'];
            break;
        /*case 'recaptcha_challenge_field': 
            $recaptcha_challenge_field = $frm_element_val['value'];
            break;
        case 'recaptcha_response_field' : 
            $recaptcha_response_field = $frm_element_val['value'];
            break;
        case 'inputCaptcha'    : 
            $inputCaptcha = $frm_element_val['value'];
            break;*/
        case 'inputHoney'    : 
            $inputHoney = $frm_element_val['value'];
            break;
        }

    }

    /*require_once 'recaptchalib.php';
    $privatekey = "6LciY-sSAAAAAFSFuy0xsQEpuN3l_zREo9KnpwCj";
    $resp = recaptcha_check_answer ( $privatekey,
        $_SERVER["REMOTE_ADDR"],
        $recaptcha_challenge_field,
        $recaptcha_response_field );*/

    if ( $inputHoney != '' ) {

        header( 'Content-Type: application/json' );
        echo json_encode( array( 'code' => 'ERROR', 'msg'=>_( "Oops! Please contact a human." ) )  );
        die();

    }
    else {

        // Your code here to handle a successful verification
        $user_data_array['name'] = $name;
        $user_data_array['email'] = $email;
        $user_data_array['password'] =$pass;
        $user_data_array['role'] = 'admin';

        $blog_id = 1;


        $new_blog_id = user_signup( $user_data_array, $blog_id, $sitename, $sitename, 'home1_layout.php', $inputLanguage );

        if ( isset( $new_blog_id ) ) {

            wp_send_json( array( 'code' => 'OK', 'msg'=>_( "Great!  Now activate your account by clicking on the link sent you by email in next  5 minutes. If you don't see it there check your spam folder." ) ) );
        }
        else {
            wp_send_json( array( 'code' => 'ERROR', 'msg'=>_( "Looks like some of fields have been filled incorrectly. Please check again and submit." ) )  );

        }
    }
}
add_action( 'wp_ajax_save_new_user', 'save_new_user' );
add_action( 'wp_ajax_nopriv_save_new_user', 'save_new_user' );

/**
 *
 *
 * @param type    $user_email
 * @return type
 */
function generate_user_activation_key( $user_email ) {
    $salt = wp_generate_password( 20 ); // 20 character "random" string
    $key = sha1( $salt . $user_email . uniqid( time(), true ) );
    return $key;
}




//function to log in user
function user_login() {

    if ( is_user_logged_in() ) {
        global $user;

        $blog = get_active_blog_for_user( get_current_user_id() );
        $blogUrl = $blog->siteurl.'/dashboard/'; /* or $blog->path, together with $blog->siteurl */
        $response = array( "code" => "OK", 'blog_url' => $blogUrl, 'msg'=>'User already logged in' );
        wp_send_json( $response );
    }


    $pd_email = trim( $_POST['pdemail'] );
    $pd_pass = trim( $_POST['pdpass'] );

    if ( !check_ajax_referer( 'frm_login', 'ajax_nonce' ) ) {
        header( 'Content-Type: application/json' );
        echo json_encode( array( 'code' => 'ERROR', 'msg'=>_( "Invalid Form Data" ) )  );
        die();
    }




    global $wpdb;
    $user_ = get_user_by( 'email', $pd_email );
    if ( $user_ ) {
        $user = wp_authenticate( $user_->user_login, $pd_pass );

        if ( is_wp_error( $user ) ) {
            $msg = "Invalid email/password ";
            $response = array( 'code' => "FAILED", 'user' => $user_->user_login . $pd_pass, 'msg' => $msg );
            wp_send_json( $response );
        } else {
            wp_set_auth_cookie( $user->ID );

            /*  $user_data = array(
                "user_id" => $user->ID,
                "user_login" => $user->user_login,
                "user_email" => $user->user_email,
                "user_role" => $user->roles,
                "logged_in" => true
        );*/


            $blog = get_active_blog_for_user( $user->ID );
            $blog_url = $blog->siteurl; /* or $blog->path, together with $blog->siteurl */
            //var_dump($blog_url);
            //wp_redirect( $blog_url );
            //exit;
            $response = array( "code" => "OK", 'blog_url' => $blog_url, 'msg'=>'Successful Login' );
            wp_send_json( $response );
        }
    }
    else {
        $msg = "Invalid email/password ";
        $response = array( 'code' => "FAILED",  'msg' => $msg );
        wp_send_json( $response );
    }


}

add_action( 'wp_ajax_user_login', 'user_login' );
add_action( 'wp_ajax_nopriv_user_login', 'user_login' );



/*
 * Function to activate new users
 */
function user_activation( $email, $key ) {
    global $wpdb;

    $user_table = $wpdb->base_prefix.'users';
    $res_verify_user =    $wpdb->get_results( $wpdb->prepare( "SELECT ID  FROM $user_table WHERE user_email = %s AND user_status=%f and user_activation_key = '%s'", $email, 2, $key ), OBJECT );

    if ( count( $res_verify_user )>0 ) {

        foreach ( $res_verify_user as $res_verify_usr ) {
            //var_dump($res_verify_usr);
            $wpdb->update( $wpdb->users, array( 'user_activation_key' => "" ), array( 'user_email' =>$email ) );
            $wpdb->update( $wpdb->users, array( 'user_status' => 0 ), array( 'user_email' => $email ) );


            $blog = get_active_blog_for_user( $res_verify_usr->ID );
            $blog_url = $blog->siteurl; /* or $blog->path, together with $blog->siteurl */
            //var_dump($blog_url);
            wp_redirect( $blog_url );
            exit;


        }


    }
    else {
        return false;
    }

}



/**
 * Function to delete custom blog tables on site deletion
 * Enter description here ...
 * @param unknown_type $blog_id
 */
function  remove_custom_blog_tables($blog_id) {
	global $wpdb;
	$tables_to_drop[] = $wpdb->get_blog_prefix($blog_id)."room_tariffs";
	$tables_to_drop[] = $wpdb->get_blog_prefix($blog_id)."datetarriff";
	$tables_to_drop[] = $wpdb->get_blog_prefix($blog_id)."daterange";
	
	$table__to_drop = '';
	
	foreach (   $tables_to_drop as $drop_table ) {
			$wpdb->query( "DROP TABLE IF EXISTS `$drop_table`" );
			//$table__to_drop = $table__to_drop. " name : ".$drop_table;
		}
		
		
	//wp_mail('parag@ajency.in', 'test delete tables', 'deleting blog'.$blog_id.'--'.$table__to_drop);

}
add_filter('delete_blog', 'remove_custom_blog_tables');

//Function to delete custom blog tables on site deletion
/*function remove_custom_blog_tables1() {
   global $wpdb;
   
  $message =  '<br/> request id '. $_REQUEST['id']; 
   $message.= $wpdb->get_blog_prefix($id);
   
   wp_mail('parag@ajency.in', 'test delete tables', $message);
   
   /*$id = isset( $_REQUEST['id'] ) ? intval( $_REQUEST['id'] ) : 0;
   $tables[] = $wpdb->get_blog_prefix($id).'table_xyz';
   return $tables;* /
}
add_filter('wpmu_drop_tables', 'remove_custom_blog_tables1');*/