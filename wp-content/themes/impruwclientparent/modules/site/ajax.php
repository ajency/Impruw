<?php

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) )
    exit;

require_once 'functions.php';

function read_site_ajax() {

    $site_id = get_current_blog_id();

    $data = get_site_details( $site_id );
    $data [ 'checkin_time' ] = get_option( 'checkin-time', '' );
    $data [ 'checkout_time' ] = get_option( 'checkout-time', '' );
    $data [ 'time_format' ] = get_option( 'time-format', '' );
    $data [ 'additional_policy' ] = get_option( 'additional-policy', '' );
    $data [ 'statistics_enabled' ] = get_option( 'statistics_enabled' );
    $data [ 'currency' ] = get_option( 'currency','NOK' );
//    $data [ 'braintree_plan_id' ] = get_option( 'braintree-plan','hn62' );
    $data [ 'braintree_customer_id' ] = get_option( 'braintree-customer-id','');
//    $data [ 'braintree_plan_name' ] = get_option( 'braintree-plan-name','Free' );
    $data [ 'braintree_subscription' ] = get_option( 'braintree-subscription',null );
    $data [ 'braintree_client_token' ] = generate_client_token();
//    $data ['subscription_start_date'] = get_option('subscription-start-date');
    $data [ 'hotel_name' ] = get_option( 'hotel_name','' );
    $data [ 'piwik_path' ] = PIWIK_PATH;
    $data [ 'piwik_token' ] = PIWIK_AUTH_TOKEN;

    if ( is_array( $data ) )
        wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
    else
        wp_send_json( array( 'code' => 'ERROR', 'message' => 'Failed to fetch data' ) );
}

add_action( 'wp_ajax_read-site', 'read_site_ajax' );

/**
 *
 */
function assign_theme_to_site_ajax() {

    $site_id = get_current_blog_id();

    $new_theme_id = $_POST[ 'new_theme_id' ];
    $clone_pages = !isset( $_POST[ 'clone_pages' ] ) ? TRUE : FALSE;

    assign_theme_to_site( $new_theme_id, $clone_pages );

    wp_send_json( array( 'code' => 'OK' ) );
}

add_action( 'wp_ajax_assign-theme-to-site', 'assign_theme_to_site_ajax' );


/**
 * Function to change default language at the time of theme selection in site builder
 */
function choose_site_language_ajax() {
    global $sitepress;

    $chosen_site_language = $_REQUEST['site_language'];

    $default_language = get_language_code($chosen_site_language);

    $sitepress->set_default_language($default_language);

    wp_send_json( array( 'code' => 'OK' , 'language' => $chosen_site_language));
}

add_action('wp_ajax_choose-site-language', 'choose_site_language_ajax');

/**
 * Function to add site profile details
 * returns all the form data passed
 *
 */
function update_site_ajax() {

    // fetching all the form data
    $formdata = $_POST;

    // passing all the form data to the function to insert the values into the options table
    $form_data = update_site( $formdata );

    wp_send_json( array( 'code' => 'OK', 'data' => $form_data ) );
}

add_action( 'wp_ajax_update-site', 'update_site_ajax' );


function update_tracking() {

    $site_id = get_current_blog_id();

    $tracking_code = create_piwik_site( $site_id );

    $piwik_site_id = $tracking_code[ 'id' ];

    update_option( 'statistics_enabled', $piwik_site_id );

    wp_send_json( array( 'code' => 'OK', 'tracking_code' => $tracking_code ) );
}

add_action( 'wp_ajax_update-tracking', 'update_tracking' );



function ajax_site_logout() {

    wp_logout();

    wp_send_json( array( 'code' => 'OK', 'redirect_url' => network_home_url() ) );
}

add_action( 'wp_ajax_site-logout', 'ajax_site_logout' );