<?php 

include_once 'functions.php';

function ajax_update_media() {

    $data = $_POST;

    $media_id = $_POST[ 'id' ];

    unset( $data[ 'action' ] );
    unset( $data[ 'id' ] );

    update_media( $data, $media_id );

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $media_id ) ) );
}

add_action( 'wp_ajax_update-media', 'ajax_update_media' );

function ajax_delete_media() {

    $media_id = $_POST[ 'id' ];

    // delete the image from the media in db
    wp_delete_attachment( $media_id, true );

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $media_id ) ) );
}

add_action( 'wp_ajax_delete-media', 'ajax_delete_media' );
