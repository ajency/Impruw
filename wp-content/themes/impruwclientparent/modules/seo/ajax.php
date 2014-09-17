<?php

require "functions.php";

/**
 * Function to get page seo details - title , description
 */
function ajax_read_page_seo() {

    $page_id = $_REQUEST[ 'post_id' ];

    $seo_data = get_page_seo( $page_id );

    wp_send_json( array( 'code' => 'OK', 'data' => $seo_data ) );
}

add_action( 'wp_ajax_read-page-seo', 'ajax_read_page_seo' );

/**
 * Function to update page seo details - title , description
 */
function ajax_update_page_seo() {
    $seo_data = $_POST;

    $data = update_page_seo( $seo_data );

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}

add_action( 'wp_ajax_update-page-seo', 'ajax_update_page_seo' );