<?php

/*
 * File name : user_management.php
 * Description :  Contains a list of functions to manage user data
 * 1) wp_impruw_create_user - Function to insert registered user's data into the database and return the user_id.
 * 2) create_new_site - Function to create a new blog and return the blog id.
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
function create_new_site($blog_id,$blog_name,$blog_title,$user_id)
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
    switch_to_blog($new_blog_id);
    //start of assigning the theme when site is created.
    $theme = wp_get_theme('impruwclientchild1'); //Change the name here to change the theme
    if ( $theme->exists() || $theme->is_allowed() )
    switch_theme( $theme->get_template(), $theme->get_stylesheet() );
    //end of assigning the theme when site is created.
    restore_current_blog();
    echo $new_blog_id;
    
}