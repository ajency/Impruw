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
    $data [ 'currency' ] = get_option( 'currency', 'NOK' );
    $data [ 'braintree_customer_id' ] = get_option( 'braintree-customer-id', '' );
    $data [ 'braintree_subscription' ] = get_option( 'braintree-subscription', null );
    $data [ 'domain_name' ] = get_option( 'domain-name', get_option( 'blogname' ) . '.impruw.com' );
    $data [ 'hotel_name' ] = get_option( 'hotel_name', '' );
    $data [ 'piwik_path' ] = PIWIK_PATH;
    $data [ 'piwik_token' ] = PIWIK_AUTH_TOKEN;

    //Get site default language
    $wpml_options = get_option( 'icl_sitepress_settings' );
    $default_language_code = $wpml_options['default_language'];

    $data[ 'default_language' ] = get_language_names($default_language_code);

    if ( is_array( $data ) )
        wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
    else
        wp_send_json( array( 'code' => 'ERROR', 'message' => 'Failed to fetch data' ) );
}

add_action( 'wp_ajax_read-site', 'read_site_ajax' );

function read_language_based_site_ajax(){

    if(isset($_REQUEST['language'])){
        $language = $_REQUEST['language'];
    }

    else{
        $language = wpml_get_default_language();
    }
    
    $site_id = get_current_blog_id();
    $data = get_site_details( $site_id, $language );

    $data [ 'checkin_time' ] = get_option( 'checkin-time', '' );
    $data [ 'checkout_time' ] = get_option( 'checkout-time', '' );
    $data [ 'time_format' ] = get_option( 'time-format', '' );

    $original_policy = get_option('additional-policy','');
    //Check if present in string translation table , ie if it is registered 
    $policy_string_id = icl_get_string_id( $original_policy, 'Site Profile');
    $translated_policy = impruw_wpml_get_string_translation($original_policy, $language);
    $data [ 'additional_policy' ] = $translated_policy;
    $data [ 'policy_string_id' ] =  $policy_string_id;

    $data [ 'statistics_enabled' ] = get_option( 'statistics_enabled' );
    $data [ 'currency' ] = get_option( 'currency','NOK' );
//    $data [ 'braintree_plan_id' ] = get_option( 'braintree-plan','hn62' );
    $data [ 'braintree_customer_id' ] = get_option( 'braintree-customer-id','');
//    $data [ 'braintree_plan_name' ] = get_option( 'braintree-plan-name','Free' );
    $data [ 'braintree_subscription' ] = get_option( 'braintree-subscription',null );
//    $data [ 'braintree_client_token' ] = generate_client_token();
//    $data ['subscription_start_date'] = get_option('subscription-start-date');
    $data [ 'hotel_name' ] = get_option( 'hotel_name','' );
    $data [ 'piwik_path' ] = PIWIK_PATH;
    $data [ 'piwik_token' ] = PIWIK_AUTH_TOKEN;

    $data[ 'default_language' ] = get_native_language_name(wpml_get_default_language());
    $data['translation_language'] = get_native_language_name($language);

     if ( is_array( $data ) )
        wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
    else
        wp_send_json( array( 'code' => 'ERROR', 'message' => 'Failed to fetch data' ) );


}

add_action( 'wp_ajax_read-language-based-site', 'read_language_based_site_ajax' );


/**
 *
 */
function assign_theme_to_site_ajax() {

    global $sitepress;
    $site_id = get_current_blog_id();
    $site_current_language = wpml_get_current_language();
    $site_default_language = wpml_get_default_language();

    //Change site's default language to English
    $sitepress->set_default_language('en');
    $sitepress->switch_lang('en');

    $new_theme_id = $_POST[ 'new_theme_id' ];
    $clone_pages = !isset( $_POST[ 'clone_pages' ] ) ? TRUE : FALSE;

    assign_theme_to_site( $new_theme_id, $clone_pages );

    //Restore default language back to original
    $sitepress->switch_lang($site_current_language);
    $sitepress->set_default_language($site_default_language);

    wp_send_json( array( 'code' => 'OK' ) );
}

add_action( 'wp_ajax_assign-theme-to-site', 'assign_theme_to_site_ajax' );


/**
 * Function to change default language at the time of theme selection in site builder
 */
function choose_site_language_ajax() {
    global $sitepress;

    $chosen_site_language = $_REQUEST[ 'site_language' ];

    $default_language = get_language_code( $chosen_site_language );

    $sitepress->set_default_language( $default_language );

    wp_send_json( array( 'code' => 'OK', 'language' => $chosen_site_language ) );
}

add_action( 'wp_ajax_choose-site-language', 'choose_site_language_ajax' );

/**
 * Function to get all pages of the child site 
 */
function get_childsite_pages() {
   $data = get_all_childsite_pages();

   wp_send_json( array( 'code' => 'OK' , 'data' => $data));
}
add_action('wp_ajax_get-childsite-pages', 'get_childsite_pages');

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



function update_translated_siteprofile_ajax(){
    $translatedSiteprofile = $_REQUEST['translatedSiteprofile'];
    $editing_language = $_REQUEST['editingLanguage'];
    $i =0;
    $updated_string_ids = array();

    while($i<sizeof($translatedSiteprofile)) {

        $option_to_be_translated = $translatedSiteprofile[$i]['translation_of_option'];
        
        $original_option_value = get_option($option_to_be_translated, '');

        $translated_option_value = $translatedSiteprofile[$i]['translated_option'];

        $original_string_id = icl_get_string_id($original_option_value, 'Site Profile');


        $string_id = icl_add_string_translation( $original_string_id, $editing_language, $translated_option_value, ICL_STRING_TRANSLATION_COMPLETE );

        array_push($updated_string_ids,$string_id);

        $i++;
    }

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'string_id' => $updated_string_ids ) ) );

}

add_action( 'wp_ajax_update-translated-siteprofile', 'update_translated_siteprofile_ajax' );


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


function ajax_update_domain_mapping() {

    unset( $_POST[ 'action' ] );
    $domain_name = $_POST[ 'name' ];

    if ( check_domain_name_exists( $domain_name ) )
        wp_send_json( array( 'code' => 'ERROR', 'msg' => "Domain name already taken" ) );

    add_domain_for_mapping( $domain_name );

    wp_send_json( array( 'code' => 'OK' ) );
}

add_action( 'wp_ajax_update-domain-name', 'ajax_update_domain_mapping' );
