<?php

/*
 * File name : user_management.php
 * Description :  Contains a list of functions to manage user data
 * 1) wp_impruw_create_user - Function to insert registered user's data into the database and return the user_id.
 * 2) create_new_site - Function to create a new blog and return the blog id.
 * 3) assign_theme_to_site - Function to assign a theme to the new site created.
 * 4) add_new_post_to_blog - Function to create a new post of type page. 
 * 5) assign_active_languages - Function to assign active languages toa  site.
 * 6) check_email_exists	- Function to check if email id already registered(check done on registration page) 
 * 7) check_sitename_exists - Function to check if sitename already exists(check done on registration page)
 * 
 * 
 * 	
 */
 
//require_once '../Communication_module/communication_functions.php';
require_once ABSPATH."/wp-content/themes/impruwmain/Communication_module/communication_functions.php";

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
   // echo $post_site_builder_id;exit;
    
    //exit;//create a new post
    
    //echo $new_blog_id;
    return $new_blog_id;
    
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



/**
 * Function to check if email id already exist( Registration page)
 * Returns
 */
function check_email_exists()
{ 
	 
	$tbl_fieldvalue = $_POST['email'];

	if(useremail_exists($tbl_fieldvalue))
	{
		header('Content-Type: application/json');
		echo json_encode(array('code' =>'000', 'msg'=>"Email Id Already Exists."));
		die();
	}
	else
	{
		header('Content-Type: application/json');
		echo json_encode(array('code' => '001', 'msg'=>"Email Id Does Not Exists."));
		die();
	} 
}
add_action('wp_ajax_check_email_exists','check_email_exists');
add_action('wp_ajax_nopriv_check_email_exists','check_email_exists');

 

/**
 * Function to check if email id is already registered
 * @param string $email
 * @return boolean
 */
function useremail_exists($email)
{
	global $wpdb;
	$user_table = $wpdb->base_prefix . 'users';
	$res_verify_user = $wpdb->get_results("SELECT count(*) as user_exist FROM $user_table WHERE user_email ='" . $email."'", 
			OBJECT);
	
	
	if ($res_verify_user)
	{
		foreach ($res_verify_user as $res_verify_usr) {
			if ($res_verify_usr->user_exist>0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}
}


/**
 * Function to check if sitename already exists (used on registration page)
 *  returns 000 & msg  on success
 *  returns 001 & msg on fail
 */ 
function check_sitename_exists()
{
	$blog_name = $_POST['sitename'];
	global $user_id;	
	$blog_id = 1;
	
	if ( sitename_exists($blog_name,$blog_id) )
	{
		header('Content-Type: application/json');
		echo json_encode(array('code' =>'000', 'msg'=>'Sorry, that site already exists!' ) );
		die();
	}
	else
	{
		header('Content-Type: application/json');
		echo json_encode(array('code' => '001', 'msg'=>'Site Name does not Exist' ) );
		die();
	}
	

}
add_action('wp_ajax_check_sitename_exists','check_sitename_exists');
add_action('wp_ajax_nopriv_check_sitename_exists','check_sitename_exists');



/**
 * Function to check if the sitename already exists
 * @param string $blog_name 
 * @param int $mainblog_id
 * @return string|boolean 
 */
function sitename_exists($blog_name,$mainblog_id)
{
	
	global $user_id;
	//var_dump("test");
	$blog = $blog_name;
	$domain = '';
	if ( preg_match( '|^([a-zA-Z0-9-])+$|', $blog_name ) )
		$domain = strtolower( $blog_name );
	
	// If not a subdomain install, make sure the domain isn't a reserved word
	if ( ! is_subdomain_install() )
	{
		$subdirectory_reserved_names = apply_filters( 'subdirectory_reserved_names', array( 'page', 'comments', 'blog', 'files', 'feed','impruw','admin','administrator', ) );
		if ( in_array( $domain, $subdirectory_reserved_names ) )
		{
			header('Content-Type: application/json');
			echo json_encode(array('code' => '000', 'msg'=> __('The following words are reserved for use by WordPress functions and cannot be used as blog names: '.implode(",",$subdirectory_reserved_names)) ) );
			die();
			
		}
	}
	
	$current_site=get_blog_details($mainblog_id);
	$site_id = $current_site->blog_id;
	 
	if ( empty( $domain ) )
		return(__('Missing or invalid site address.') );

	if ( is_subdomain_install() )
	{
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
	
	if ( empty($path) )
		$path = '/';
	
	// Check if the domain has been used already.  
	if ( domain_exists($domain, $path, $site_id) )
	{
		return true;
	}
	else
	{
		return false;
	}
	
}
 



/**
 * Function to add new user
 * @param string $email
 * @return boolean
 */
function save_new_user()
{
	global $wpdb;
	$form_data = $_POST['frmdata'];
	//var_dump($_POST['frmdata']);
	
	
	foreach($_POST['frmdata'] as $frm_element_key => $frm_element_val)
	{
		//echo "key : ".$frm_element_key;
		//echo "<br/>Value ".$frm_element_key;
		switch($frm_element_val['name'])
		{
			case 'inputName'				:	$name = $frm_element_val['value'];
												break;
			case 'inputEmail'				:	$email = $frm_element_val['value'];
												break;	
			case 'inputSitename'			:	$sitename = $frm_element_val['value'];
												break;	
			case 'inputPass'				:	$pass = $frm_element_val['value'];
												break;						
			case 'recaptcha_challenge_field':	$recaptcha_challenge_field = $frm_element_val['value'];
												break;		
			case 'recaptcha_response_field' :	$recaptcha_response_field = $frm_element_val['value'];
												break;
			case 'inputCaptcha'				:	$inputCaptcha = $frm_element_val['value'];
												break;
			 					
		}		
		
	}
	
 
	
	
	require_once('recaptchalib.php');
	$privatekey = "6LdRNusSAAAAADn2sxpPbMH6U9G2-MnBmslyi_WH";
	$resp = recaptcha_check_answer ($privatekey,
			$_SERVER["REMOTE_ADDR"],
			$recaptcha_challenge_field,
			$recaptcha_response_field);
	
	if (!$resp->is_valid) 
	{
			
		header('Content-Type: application/json');
		echo json_encode(array('code' => '002', 'msg'=>"Invalid captcha.Please Renter the Captcha Code")  );
		die();
			
			
			// What happens when the CAPTCHA was entered incorrectly
		 
	} 
	else
	{
		// Your code here to handle a successful verification
		
		$user_data_array['name'] = $name;
		$user_data_array['email'] = $email;
		$user_data_array['password'] =$pass;
		$user_data_array['role'] = 'admin';
		
		$blog_id = 1;
		$new_userid = wp_impruw_create_user($user_data_array);
		
		if(!empty($new_userid))
			$new_blog_id = create_new_site($blog_id,$sitename,$sitename,$new_userid,'');
			
		if(!empty($new_blog_id))
		{
			header('Content-Type: application/json');
			echo json_encode(array('code' => '000', 'msg'=>"The User registration successfull. And the site created successfully")  );
			die();
		}
		
		
		
		
	/*	var_dump("captcha success");
		header('Content-Type: application/json');
		echo json_encode(array('success' => false, 'msg'=>'valid captcha' ) );
		die();
		
		*/
		
		//register the user
		
	}
	
	
	
	/*
	
	
	$user_table = $wpdb->base_prefix . 'users';
	$res_verify_user = $wpdb->get_results("SELECT count(*) as user_exist FROM $user_table WHERE user_email ='" . $email."'", OBJECT);


	if ($res_verify_user)
	{
		foreach ($res_verify_user as $res_verify_usr)
		{
			if ($res_verify_usr->user_exist>0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}*/
}
add_action('wp_ajax_save_new_user','save_new_user');
add_action('wp_ajax_nopriv_save_new_user','save_new_user');