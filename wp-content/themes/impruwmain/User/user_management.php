<?php

/*
 * File name : user_management.php
 * Description :  Contains a list of functions to manage user data
 * 1) wp_impruw_create_user - Function to insert registered user's data into the database and return the user_id.
 * 2) create_new_site - Function to create a new blog and return the blog id.
 * 3) assign_theme_to_site - Function to assign a theme to the new site created.
 * 4) add_new_post_to_blog - Function to create a new post of type page. 
 * 5) assign_active_languages - Function to assign active languages toa  site.
 * 
 * 
 */
require_once '../Communication_module/communication_functions.php';

/**
 * wp_impruw_create_user
 * Function to insert registered user's data into the database and return the user_id.
 * @param array $user_data_array-Array containing user information(email, password, name)
 */
function wp_impruw_create_user($user_data_array) {
	$user_login = wp_slash( $user_data_array['email'] );
	$user_email = wp_slash( $user_data_array['email']    );
	$user_pass = $user_data_array['password'];
        $user_nicename = wp_slash( $user_data_array['name']    );
        $users_name_array =  explode(' ',$user_data_array['name'] );
        $first_name = wp_slash( $users_name_array[0]    );
        $last_name = wp_slash( $users_name_array[1]    );
        $role = $user_data_array['role'];             

	$userdata = compact('user_login', 'user_email', 'user_pass','user_nicename','first_name','last_name','role');
        $user_id = wp_insert_user($userdata);
        //check if admin is registering the user or the user is signing up.
        if(is_user_logged_in())
            $initiator_id =  get_current_user_id ();
        else
            $initiator_id = $user_id;
        $data = array();
        $data['user_id'] = $user_id;
        send_email($initiator_id, 'registration', $data);
	return $user_id;
}

/**
 * 
 * create_new_site
 * Function to create a new blog
 * @param int $blog_id - current blogs id.
 * @param text $blog_name - domain name of the new blog.
 * @param text $blog_title - title of the new blog.
 * @param int $user_id - the user id/ owner of the new blog.
 * @return type
 */
function create_new_site($blog_id,$blog_name,$blog_title,$user_id,$file_name)
{
   // if ( ! current_user_can( 'manage_sites' ) )
		//return( 'You do not have permission to access this page.' );
    
    $blog = $blog_name;
    $domain = '';
    if ( preg_match( '|^([a-zA-Z0-9-])+$|', $blog_name ) )
	$domain = strtolower( $blog_name );
    
    // If not a subdomain install, make sure the domain isn't a reserved word
    if ( ! is_subdomain_install() ) 
        {
		$subdirectory_reserved_names = apply_filters( 'subdirectory_reserved_names', array( 'page', 'comments', 'blog', 'files', 'feed' ) );
		if ( in_array( $domain, $subdirectory_reserved_names ) )
			wp_die( sprintf( __('The following words are reserved for use by WordPress functions and cannot be used as blog names: <code>%s</code>' ), implode( '</code>, <code>', $subdirectory_reserved_names ) ) );
	}
        
    $title = $blog_title;    
    if ( empty( $domain ) )
	return('Missing or invalid site address.' );
    $current_site=get_blog_details($blog_id);
    if ( is_subdomain_install() ) 
        {
		$newdomain = $domain . '.' . preg_replace( '|^www\.|', '', $current_site->domain );
		$path      = $current_site->path;
	} else {
		$newdomain = $current_site->domain;
		$path      = $current_site->path . $domain . '/';
	}
        
    $new_blog_id = wpmu_create_blog( $newdomain, $path, $title, $user_id , array( 'public' => 1 ), $current_site->blog_id ); 
    
    assign_theme_to_site($new_blog_id,'impruwclientchild1');//assign a theme to the new site created
    toggle_plugin($new_blog_id);//activating the wpml plugin for the current site.
    assign_default_language($new_blog_id,'en');
    assign_active_languages($new_blog_id);
    $post_id = add_new_post_to_blog($new_blog_id,$user_id,'Home','Home Content','page','');
    $post_nb_id = mwm_wpml_translate_post( $new_blog_id,$post_id, 'page', 'nb',$user_id);
    add_layout_site($new_blog_id,$post_id,$file_name);
    $post_site_builder_id = add_new_post_to_blog($new_blog_id,$user_id,'Site Builder','Site Builder Content.','page','site-builder.php');
    echo $post_site_builder_id;exit;
    
    //exit;//create a new post
    
    //echo $new_blog_id;
    
}

/**
 * assign_theme_to_site
 * Function to assign a theme to the new site created.
 * @param int $blog_id - id of the blogto which theme needs to be assigned..
 * @param text $theme_name - name of theme to assign to the new blog created.
 */
function assign_theme_to_site($blog_id,$theme_name)
{   
    switch_to_blog($blog_id);
    $theme = wp_get_theme($theme_name); //Change the name here to change the theme
    if ( $theme->exists() || $theme->is_allowed() )
    switch_theme( $theme->get_template(), $theme->get_stylesheet() );
    restore_current_blog();
}

/**
 *
 * add_new_post_to_blog
 * Function to create a new post of type page. 
 * @param int $blog_id - id of the blog in which the post has to be created.
 * @param int $user_id - id of user who will be assigned the author of the post.
 * @return type
 */
function add_new_post_to_blog($blog_id,$user_id,$post_title,$post_content,$post_type,$post_template)
{
     switch_to_blog($blog_id);
     $my_post = array(
       'post_title'    => $post_title,
       'post_content'  => $post_content,
       'post_status'   => 'publish',
       'post_author'   => $user_id,
       'post_type'     => $post_type
     );

     // Insert the post into the database
    $post_id = wp_insert_post( $my_post );
    update_post_meta($post_id, '_wp_page_template', $post_template);
    
    //$test=icl_sitepress_activate();var_dump($test);exit;
   // echo mwm_wpml_translate_post( $post_id, 'page', 'nb' );exit;
    restore_current_blog();
    
    return $post_id;
}

/**
 * Creates a translation of a post (to be used with WPML)
 *  
 * @param int $post_id The ID of the post to be translated.
 * @param string $post_type The post type of the post to be transaled (ie. 'post', 'page', 'custom type', etc.).
 * @param string $lang The language of the translated post (ie 'fr', 'de', etc.).
 * @param string $user_id - id of user who will be assigned the author of the post.
 *    
 * @return the translated post ID
 *  */
function mwm_wpml_translate_post( $blog_id,$post_id, $post_type, $lang,$user_id ){
    switch_to_blog($blog_id);
    // Include WPML API
    include_once( WP_PLUGIN_DIR . '/sitepress-multilingual-cms/inc/wpml-api.php' );

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



function toggle_plugin($blog_id) {
    switch_to_blog($blog_id);
    $my_plugin = 'sitepress-multilingual-cms/sitepress.php';

    // Check to see if plugin is already active
    if(!is_plugin_active($my_plugin)) {

                $_REQUEST['action'] = 'activate';
                $_REQUEST['_wpnonce'] = wp_create_nonce();
		activate_plugin($my_plugin);
                activate_plugin($my_plugin);
                //icl_sitepress_activate();
               
	}
    $my_plugin = 'wpml-string-translation/plugin.php';

    // Check to see if plugin is already active
    if(!is_plugin_active($my_plugin)) {

                $_REQUEST['action'] = 'activate';
                $_REQUEST['_wpnonce'] = wp_create_nonce();
		activate_plugin($my_plugin);
                activate_plugin($my_plugin);
                //icl_sitepress_activate();
               
	}
	 restore_current_blog();
}

/**
 * 
 * @param int $blog_id - the id of the new blog
 * @param text $language_code - the code of the language which is assigned as default.
 */
function assign_default_language($blog_id,$language_code)
{
    global $wpdb;
    switch_to_blog($blog_id);
    $sitepress= new SitePress;
    $sitepress->initialize_cache();
    $settings = get_option('icl_sitepress_settings');
            $sitepress->prepopulate_translations($language_code);
            $wpdb->update($wpdb->prefix . 'icl_languages', array('active'=>'1'), array('code'=>$language_code));
            $blog_default_cat = get_option('default_category');
            $blog_default_cat_tax_id = $wpdb->get_var("SELECT term_taxonomy_id FROM {$wpdb->term_taxonomy} WHERE term_id='{$blog_default_cat}' AND taxonomy='category'");

            if(isset($_POST['save_one_language'])){
                $settings['setup_wizard_step'] = 0;
                $settings['setup_complete'] = 1;
            }else{
                $settings['setup_wizard_step'] = 2;
            }

            $settings['default_categories'] = array($language_code => $blog_default_cat_tax_id);
            $settings['existing_content_language_verified'] = 1;
            $settings['default_language'] = $language_code;
            $settings['admin_default_language'] =  $language_code;

            // set the locale in the icl_locale_map (if it's not set)
            if(!$wpdb->get_var("SELECT code FROM {$wpdb->prefix}icl_locale_map WHERE code='{$language_code}'")){
                $default_locale = $wpdb->get_var("SELECT default_locale FROM {$wpdb->prefix}icl_languages WHERE code='{$language_code}'");
                if($default_locale){
                    $wpdb->insert($wpdb->prefix.'icl_locale_map', array('code'=>$language_code, 'locale'=>$default_locale));

                }
            }

            $sitepress->save_settings($settings);
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
 * @param int $blog_id - the id of the blog in which the active languages need to be assigned.
 */
function assign_active_languages($blog_id)
{
    $languages_array = array("en","nb");
    switch_to_blog($blog_id);
    $sitepress= new SitePress();
    $sitepress->initialize_cache();
    $sitepress->set_active_languages($languages_array);
    $sitepress->verify_settings();
    restore_current_blog();
}

function  add_layout_site($blog_id,$post_id,$file_name)
{
    switch_to_blog($blog_id);
    $file_path = ABSPATH."/wp-content/themes/impruwclientparent/page_layouts/".$file_name;
    include($file_path);
    update_post_meta($post_id, 'layout_json', $json);
    restore_current_blog();
}

