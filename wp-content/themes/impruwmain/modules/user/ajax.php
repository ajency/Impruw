<?php

/*
 * To change this license header, choose License Headers in Project Properties. To change this template file, choose Tools | Templates and open the template in the editor.
 */

// Exit if accessed directly
if (! defined ( 'ABSPATH' ))
	exit ();

/**
 * ********************* load other files *************
 */
require_once 'functions.php';

/**
 * New User registration ajax handler
 * This ajax action will accept a POST request.
 * This action will always be triggerd by a non logged in user
 * hence, add_action("wp_aja_nopriv_*")
 * 
 * @return JSON success / or / failure
 */
function new_user_registration() {
        
	// check if its a POST request else return
	if ('POST' !== $_SERVER ['REQUEST_METHOD'])
		wp_send_json_error ( 'Invalid reuest' );
		
		// verify the nonce else return error code
	if (! check_ajax_referer ( 'new_user_registration', '_nonce' ))
		wp_send_json_error ( 'Wrong request' );
	
	$form_data = $_POST;
	
	// check done. now get the form data. pick the user specific fields and
	// store in $user_data
	$user_data = pick_user_fields ( $form_data );
	
	// pass the data to create_new_user function capture return data
	$user_id = create_new_user ( $user_data );
	
	// if int = $user_id return success else return error
	if (is_wp_error ( $user_id ))
		wp_send_json_error ();
		
		// user created now lets create the site
	
	$site_id = create_new_site ( $form_data ['site_name'], $user_id );
	
	if (is_wp_error ( $site_id ))
		wp_send_json_error( 'Failed to create site' );
	
	wp_send_json_success ();
}
add_action ( 'wp_ajax_nopriv_new_user_registration', 'new_user_registration' );

/**
 * Function to check if email id already exist( Registration page)
 * Returns
 */
function check_email_exists() {
	
	$email = $_GET ['user_email'];
	header ( 'Content-Type: application/json' );
	
	if (! filter_var ( $email, FILTER_VALIDATE_EMAIL )) {
		echo json_encode ( array (
				"message" => "Invalid email Id" 
		) );
	} else if (email_exists ( $email )) {
		echo json_encode ( array (
				"message" => "Email Id Already Exists." 
		) );
	} else {
		echo json_encode ( true );
	}
	die ();
}
add_action ( 'wp_ajax_check_email_exists', 'check_email_exists' );
add_action ( 'wp_ajax_nopriv_check_email_exists', 'check_email_exists' );

/**
 * Function to check if sitename already exists (used on registration page)
 * returns 000 & msg on success
 * returns 001 & msg on fail
 */
function check_sitename_exists() {
	$blog_name = $_GET ['site_name'];
	
	global $user_id;
	$blog_id = 1;
	$site_exist = sitename_exists ( $blog_name, $blog_id );
	
	if ($site_exist ['CODE'] == "ERROR") {
		header ( 'Content-Type: application/json' );
		echo json_encode ( array (
				"error" => __ ( $site_exist ['message'] ) 
		) );
		die ();
	} else if ($site_exist ['CODE'] == "OK") {
		header ( 'Content-Type: application/json' );
		echo json_encode ( array (
				"error" => __ ( $site_exist ['message'] ) 
		) );
		die ();
	} else {
		header ( 'Content-Type: application/json' );
		echo json_encode ( true );
		die ();
	}
}
add_action ( 'wp_ajax_check_sitename_exists', 'check_sitename_exists' );
add_action ( 'wp_ajax_nopriv_check_sitename_exists', 'check_sitename_exists' );


//function to log in user
function user_login() {

	if ( is_user_logged_in() ) {
		global $user;

		$blog = get_active_blog_for_user( get_current_user_id() );
		$blogUrl = $blog->siteurl; /* or $blog->path, together with $blog->siteurl */
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

