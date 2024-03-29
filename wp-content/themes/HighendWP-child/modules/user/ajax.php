<?php

/*
 * To change this license header, choose License Headers in Project Properties. To change this template file, choose Tools | Templates and open the template in the editor.
 */

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) )
    exit();

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
    if ( 'POST' !== $_SERVER [ 'REQUEST_METHOD' ] )
        wp_send_json_error( 'Invalid request' );

    // verify the nonce else return error code
    if ( !check_ajax_referer( 'new_user_registration', '_nonce' ) )
        wp_send_json_error( 'Wrong request' );

    $form_data = $_POST;

    // check done. now get the form data. pick the user specific fields and
    // store in $user_data
    $user_data = pick_user_fields( $form_data );

    $validated_user_email = validate_user_email( $user_data );
    if ( !$validated_user_email )
        wp_send_json( array( 'success' => FALSE, 'ERROR' => 'email', 'msg' => 'Email ID already exists' ) );

    $validated_sitename = validate_site_name( $form_data [ 'site_name' ] );
    if ( !$validated_sitename )
        wp_send_json( array( 'success' => FALSE, 'ERROR' => 'sitename', 'msg' => 'Sitename already exists' ) );


    // pass the data to create_new_user function capture return data
    $user_id = create_new_user( $user_data );

    // if int = $user_id return success else return error
    if ( is_wp_error( $user_id ) )
        wp_send_json_error( 'User not created' );

    // user created now lets create the site
    $site_id = create_new_site( $form_data [ 'site_name' ], $user_id,$form_data [ 'site_country'] );

    if ( is_wp_error( $site_id ) )
        wp_send_json_error( 'Failed to create site' );

    $user_selected_language = get_user_meta($user_id,'user_lang',true);

    if (isset($form_data [ 'site_package']) && ($form_data [ 'site_package']=="assisted_setup") ) {
        $redirect_url =  get_site_url(1,'assisted-setup?site='.$site_id.'&user='.$user_id.'&language='.$user_selected_language); 
    }
    else{
        //Based on user selected language, the url would be sign-in or logg-inn
        $sign_in_path = 'sign-in';
        if ($user_selected_language === 'nb') {
            $sign_in_path = 'logg-inn';
        }
        else{
            $sign_in_path = 'sign-in';
        }

        $redirect_url = get_site_url($site_id, $sign_in_path); 
     }
     
    wp_send_json_success($redirect_url);
}

add_action( 'wp_ajax_nopriv_new_user_registration', 'new_user_registration' );

function new_user_assisted_setup(){
    // check if its a POST request else return
    if ( 'POST' !== $_SERVER [ 'REQUEST_METHOD' ] )
        wp_send_json_error( 'Invalid request' );

    // verify the nonce else return error code
    if ( !check_ajax_referer( 'new_user_assisted_setup', '_nonce' ) )
        wp_send_json_error( 'Wrong request' );

    $form_data = $_POST;

    // on successful sending of email to admin redirect to the correct path
    $assisted_setup_details = array('assisted_setup_contact_mode' =>$form_data['assisted_setup_contact_mode'], 'assisted_setup_contact_phone' =>$form_data['phone_number']);

    assisted_setup_contact_email($form_data['user_id'],$form_data['site_id'],$assisted_setup_details);

    //Based on user selected language, the url would be sign-in or logg-inn
    $sign_in_path = 'sign-in';
    if ($form_data['language']  === 'nb') {
        $sign_in_path = 'logg-inn';
    }
    else{
        $sign_in_path = 'sign-in';
    }

    $redirect_url = get_site_url($form_data['site_id'], $sign_in_path); 
    wp_send_json_success($redirect_url);
}
add_action( 'wp_ajax_nopriv_new_user_assisted_setup', 'new_user_assisted_setup' );

// Check if the email id is available
function validate_user_email( $userdata ) {

    $check_email_exists = email_exists( $userdata[ 'user_email' ] );

    if ( $check_email_exists == FALSE ) {
        // email does not exists
        return TRUE;
    } else {
        // email  exists
        return FALSE;
    }

}

function validate_site_name( $sitename ) {

    $path   = get_site_path( $sitename );
    $domain = get_site_domain( $sitename );

    $check_site = domain_exists( $domain, $path );

    if ( is_null( $check_site ) )
        // site does not exists
        return TRUE;
    else
        // site exists
        return FALSE;
}

/**
 * Function to check if email id already exist( Registration page)
 * Returns
 */
function check_email_exists() {

    $email = $_GET [ 'user_email' ];
    header( 'Content-Type: application/json' );

    if ( !filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
        echo json_encode( array( "message" => "Invalid email Id" ) );
    } else if ( email_exists( $email ) ) {
        echo json_encode( array( "message" => "Email Id Already Exists." ) );
    } else {
        echo json_encode( TRUE );
    }
    die();
}

add_action( 'wp_ajax_check_email_exists', 'check_email_exists' );
add_action( 'wp_ajax_nopriv_check_email_exists', 'check_email_exists' );

/**
 * Function to check if sitename already exists (used on registration page)
 * returns 000 & msg on success
 * returns 001 & msg on fail
 */
function check_sitename_exists() {

    $blog_name = $_GET [ 'site_name' ];

    global $user_id;
    $blog_id    = 1;
    $site_exist = sitename_exists( $blog_name, $blog_id );

    if ( $site_exist [ 'CODE' ] == "ERROR" ) {
        header( 'Content-Type: application/json' );
        echo json_encode( array( "error" => __( $site_exist [ 'message' ] ) ) );
        die();
    } else if ( $site_exist [ 'CODE' ] == "OK" ) {
        header( 'Content-Type: application/json' );
        echo json_encode( array( "error" => __( $site_exist [ 'message' ] ) ) );
        die();
    } else {
        header( 'Content-Type: application/json' );
        echo json_encode( TRUE );
        die();
    }
}

add_action( 'wp_ajax_check_sitename_exists', 'check_sitename_exists' );
add_action( 'wp_ajax_nopriv_check_sitename_exists', 'check_sitename_exists' );

//function for interim login byu the user
function ajax_user_interim_login() {

    if ( is_user_logged_in() ) {
        global $user;

        $blog     = get_active_blog_for_user( get_current_user_id() );
        $blogUrl  = $blog->siteurl; /* or $blog->path, together with $blog->siteurl */
        $response = array( "code" => "OK", 'blog_url' => $blogUrl, 'msg' => 'User already logged in' );
        wp_send_json( $response );
    }

    $user_email = trim( $_POST[ 'pdemail' ] );


    /*if (!check_ajax_referer('frm_login', 'ajax_nonce')) {
        header('Content-Type: application/json');
        echo json_encode(array('code' => 'ERROR', 'msg' => _("Invalid Form Data")));
        die();
    }*/


    /*global $wpdb;*/
    $user_data = get_user_by( 'email', $user_email );
    if ( $user_data ) {

        $primary_blog_id = get_user_meta( $user_data->ID, 'primary_blog', TRUE );

        if ( !empty( $primary_blog_id ) ) {

            $site_url = get_site_url( $primary_blog_id );
            $response = array( "code"     => "OK",
                               'blog_url' => $site_url,
                               'msg'      => 'Redirecting to website login page',
                               'email'    => rawurlencode( $user_data->data->user_email ) );
            wp_send_json( $response );
        } else {
            $msg      = __("No website found for the email id.", "impruwmain");
            $response = array( 'code' => "ERROR", 'msg' => $msg );
            wp_send_json( $response );
        }

    } else {
        $msg      = __("The email doesn't seem right. Check if your caps is on and try again.","impruwmain");
        $response = array( 'code' => "FAILED", 'msg' => $msg );
        wp_send_json( $response );
    }
}

add_action( 'wp_ajax_user_interim_login', 'ajax_user_interim_login' );
add_action( 'wp_ajax_nopriv_user_interim_login', 'ajax_user_interim_login' );


//function to log in user
function user_login() {

    if ( is_user_logged_in() ) {
        global $user;

        $blog     = get_active_blog_for_user( get_current_user_id() );
        $blogUrl  = $blog->siteurl; /* or $blog->path, together with $blog->siteurl */
        $response = array( "code" => "OK", 'blog_url' => $blogUrl, 'msg' => 'User already logged in' );
        wp_send_json( $response );
    }


    $pd_email = trim( $_POST[ 'pdemail' ] );
    $pd_pass  = trim( $_POST[ 'pdpass' ] );

    $credentials = array();

    $credentials[ 'user_login' ]    = $pd_email;
    $credentials[ 'user_password' ] = $pd_pass;


    if ( !check_ajax_referer( 'frm_login', 'ajax_nonce' ) ) {
        header( 'Content-Type: application/json' );
        echo json_encode( array( 'code' => 'ERROR', 'msg' => _( "Invalid Form Data" ) ) );
        die();
    }


    global $wpdb;
    $user_ = get_user_by( 'email', $pd_email );
    if ( $user_ ) {
        $user = wp_signon( $credentials );

        if ( is_wp_error( $user ) ) {
            $msg      = __("The email / password doesn't seem right. Check if your caps is on and try again.","impruwmain");
            $response = array( 'code' => "FAILED", 'user' => $user_->user_login . $pd_pass, 'msg' => $msg );
            wp_send_json( $response );
        } else {
            $blog     = get_active_blog_for_user( $user->ID );
            $blog_url = $blog->siteurl;
            $response = array( "code" => "OK", 'blog_url' => $blog_url, 'msg' => 'Successful Login' );
            wp_send_json( $response );
        }
    } else {
        $msg      = __("The email / password doesn't seem right. Check if your caps is on and try again.","impruwmain");
        $response = array( 'code' => "FAILED", 'msg' => $msg );
        wp_send_json( $response );
    }
}

add_action( 'wp_ajax_user_login', 'user_login' );
add_action( 'wp_ajax_nopriv_user_login', 'user_login' );


function ajax_reset_password_user_request() {

    global $wpdb;

    $user_email = trim( $_POST[ 'user_email' ] );
    $user_data  = get_user_by( 'email', $user_email );

    //check if the user-email exists
    if ( !$user_data ) {
        $msg = __("Email does not exist","impruwmain");
        wp_send_json( array( 'code' => 'ERROR', 'data' => $msg ) );
    }

    //take the user creds fron the user object
    $user_login = $user_data->user_login;
    $user_email = $user_data->user_email;

    //check if password reset allowed for user
    $allow = apply_filters( 'allow_password_reset', TRUE, $user_data->ID );

    if ( !$allow ) {
        $msg = __("Password reset is not allowed for this user","impruwmain");
        wp_send_json( array( 'code' => 'ERROR', 'data' => $msg ) );
    } else if ( is_wp_error( $allow ) )
        wp_send_json( array( 'code' => 'ERROR', 'data' => $allow ) );

    //generate the random key to be used for new password
    $key = wp_generate_password( 20, FALSE );

    // generate the hash key and new hash password
    if ( empty( $wp_hasher ) ) {
        require_once ABSPATH . 'wp-includes/class-phpass.php';
        $wp_hasher = new PasswordHash( 8, TRUE );
    }
    $hashed_password = $wp_hasher->HashPassword( $key );

    //insert the new user password in the db
    $wpdb->update( $wpdb->users, array(
            'user_activation_key' => $hashed_password ),
        array( 'user_login' => $user_login ) );

    //get the site name
    if ( is_multisite() )
        $blogname = $GLOBALS[ 'current_site' ]->site_name;
    else
        // The blogname option is escaped with esc_html on the way into the database in sanitize_option
        // we want to reverse this for the plain text arena of emails.
        $blogname = wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES );

    $title = sprintf( __( '[%s] Password Reset' ), $blogname );

    $message = __( 'Someone requested that the password be reset for the following account:' ) . "\r\n\r\n";
    $message .= network_home_url( '/' ) . "\r\n\r\n";
    $message .= sprintf( __( 'Username: %s' ), $user_login ) . "\r\n\r\n";
    $message .= __( 'If this was a mistake, just ignore this email and nothing will happen.' ) . "\r\n\r\n";
    $message .= __( 'To reset your password, visit the following address:' ) . "\r\n\r\n";
    $message .= '<' . network_site_url( "reset-password?action=reset_password&key=$key&login=" . rawurlencode( $user_login ), 'login' ) . ">\r\n";

    if ( $message && !wp_mail( $user_email, wp_specialchars_decode( $title ), $message ) )
        wp_die( __( 'The e-mail could not be sent.' ) . "<br />\n" . __( 'Possible reason: your host may have disabled the mail() function.' ) );


    wp_send_json( array( 'code' => 'OK' ) );

}

add_action( 'wp_ajax_reset_password_user_request', 'ajax_reset_password_user_request' );
add_action( 'wp_ajax_nopriv_reset_password_user_request', 'ajax_reset_password_user_request' );



    function sending_contact_mail() {

        
        $site     = get_site_url();
        $subject  = __('New Message!', 'hbthemes');
        $email    = $_POST['contact_email'];
        $email_s  = filter_var($email, FILTER_SANITIZE_EMAIL);
        $comments = stripslashes($_POST['contact_comments']);
        $name     = stripslashes($_POST['contact_name']);
        $to       = hb_options('hb_contact_settings_email');
        $message  = $comments;
        //$headers  = 'From: ' . $name . ' <' . $email_s . '>' . "\r\n" . 'Reply-To: ' . $email_s;
        //mail($to, $subject, $message, $headers);
        contact_us_email($name,$email,$subject,$message);
        exit();
    }

    add_action('wp_ajax_mail_action', 'sending_contact_mail');
    add_action('wp_ajax_nopriv_mail_action', 'sending_contact_mail');


