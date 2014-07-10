<?php

// Incluse all files
include_once 'functions.php';

/**
 * [get_pages description]
 * @return [type] [description]
 */
function get_pages1() {

    // check the request for layouts/ or / pages
    $templates = isset( $_GET[ 'meta_key' ] ) ? TRUE : FALSE;

    if ( !$templates )
        $pages = get_all_menu_pages();
    else
        $pages = get_all_menu_pages();

    wp_send_json( array( 'code' => 'OK', 'data' => $pages ) );
}

add_action( 'wp_ajax_get-pages', 'get_pages1' );

/**
 * Create a new page
 */
function create_page_ajax() {

    $data = $_POST;
    //unset action param
    unset( $data[ 'action' ] );

    //pass remaining data to create a new page
    $id_or_error = create_new_page( $data );

    if ( is_wp_error( $id_or_error ) )
        wp_send_json( array( 'code' => 'ERROR', 'message' => $id_or_error->get_error_message() ) );
    else
        $page_data = get_post( $id_or_error, ARRAY_A );

    wp_send_json( array( 'code' => 'OK', 'data' => $page_data ) );
}

add_action( 'wp_ajax_create-page', 'create_page_ajax' );

/**
 * Publish page
 */
function publish_page_ajax() {

    $page_id = $_REQUEST[ 'page_id' ];

    $header_json = $_REQUEST[ 'header-json' ];
    update_header_json( $header_json );
    $header_json = convert_json_to_array( $header_json );
    update_option( "theme-header-autosave", $header_json );

    $footer_json = $_REQUEST[ 'footer-json' ];
    update_footer_json( $footer_json );
    $footer_json = convert_json_to_array( $footer_json );
    update_option( "theme-footer-autosave", $footer_json );

    remove_all_actions( 'post_updated' );

    //set page json
    publish_page( $page_id );

    $page_json_string = $_REQUEST[ 'page-content-json' ];
    $page_json = convert_json_to_array( $page_json_string );
    add_page_json( $page_id, $page_json );

    $revision_post_id = add_page_revision( $page_id, $page_json );

    update_page_autosave( $page_id, $page_json );

    $revision_data = get_post( $revision_post_id );

    wp_send_json( $revision_data );
}

add_action( 'wp_ajax_publish-page', 'publish_page_ajax' );

/**
 * [save_page_json description]
 *
 * @return [type] [description]
 */
function auto_save() {

    $page_id = $_REQUEST[ 'page_id' ];

    $header_json = $_REQUEST[ 'header-json' ];
    update_header_json( $header_json, true );

    $footer_json = $_REQUEST[ 'footer-json' ];
    update_footer_json( $footer_json, true );

    $page_json_string = $_REQUEST[ 'page-content-json' ];
    $page_json = convert_json_to_array( $page_json_string );
    $autosave_id = update_page_autosave( $page_id, $page_json );

    wp_send_json_success( $autosave_id );
}

add_action( 'wp_ajax_auto-save', 'auto_save' );

/**
 * Function to read a single page data
 */
function ajax_read_page() {
    $page_id = $_GET[ 'ID' ];

    $page_data = get_post( $page_id, ARRAY_A );

    wp_send_json( array( 'code' => 'OK', 'data' => $page_data ) );

}

add_action( 'wp_ajax_read-page', 'ajax_read_page' );

/**
 * Function to update the name of a page
 */
function ajax_update_page() {
    $page_id = $_POST[ 'ID' ];
    $page_name = $_POST[ 'post_title' ];

    wp_update_post( array( 'ID' => $page_id, 'post_title' => $page_name ) );

    $page_data = get_post( $page_id, ARRAY_A );

    wp_send_json( array( 'code' => 'OK', 'data' => $page_data ) );

}

add_action( 'wp_ajax_update-page', 'ajax_update_page' );

