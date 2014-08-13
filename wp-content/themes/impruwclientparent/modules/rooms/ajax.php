<?php

/**
 * All Room ajax goes here
 */
// Incluse all files
include_once 'functions.php';
/**
 * Define all ajax handlers here
 */

/**
 * Function to create new rooms from the dashboard
 * returns all the post data of the room created
 *
 */
function create_room_ajax() {

    // get all form data
    $formdata = $_POST;

    // unset the action
    unset( $formdata[ 'action' ] );

    if ( $formdata[ 'post_status' ] === 'auto-draft' ) {
        $room_id = create_draft_room();
    }

    // get all room post data
    $room_data = get_room( $room_id );

    wp_send_json( array( 'code' => 'OK', 'data' => $room_data ) );
}

add_action( 'wp_ajax_create-room', 'create_room_ajax' );

/**
 *
 */
function update_room_ajax() {

    // get all form data
    $formdata = $_POST;

    // unset the action
    unset( $formdata[ 'action' ] );

    // returns the room id
    $room_id = updateroom( $formdata );
    //wp_send_json(array('code' => 'OK', 'data' => $formdata));
    // get all room post data
    $room_data = get_room( $room_id );

    wp_send_json( array( 'code' => 'OK', 'data' => $room_data ) );
}

add_action( 'wp_ajax_update-room', 'update_room_ajax' );

function read_room_ajax() {

    // returns the room id
    $room_id = $_REQUEST[ 'ID' ];

    // get all room post data
    $room_data = get_room( $room_id );

    wp_send_json( array( 'code' => 'OK', 'data' => $room_data ) );
}

add_action( 'wp_ajax_read-room', 'read_room_ajax' );

/**
 * Function to get all room data
 *  returns all the post data of the room created
 */
function get_rooms_ajax() {

    //returns all rooms
    $data = get_roomss();

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}

add_action( 'wp_ajax_get-rooms', 'get_rooms_ajax' );

/**
 * Function to get all room data
 *  returns only the title and ID
 */
function get_all_rooms_ajax() {

    //returns all rooms
    $data = get_all_rooms();

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}

add_action( 'wp_ajax_get-all-rooms', 'get_all_rooms_ajax' );

/**
 * Function to delete room
 *  returns deleted room ID
 */
function delete_room_ajax() {

    // get all form data
    $formdata = $_POST;

    // unset the action
    unset( $formdata[ 'action' ] );

    $room_id = delete_room( $formdata );


    wp_send_json( array( 'code' => 'OK', 'data' => $room_id ) );
}

add_action( 'wp_ajax_delete-room', 'delete_room_ajax' );


function read_language_room(){

    $room_id = $_REQUEST['roomId'];

    $data = get_default_language_room($room_id);

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
    
}
add_action( 'wp_ajax_read-language-room', 'read_language_room' );


function update_translated_room(){

    $room_title = $_REQUEST['room_title'];
    $room_desc = $_REQUEST['room_desc'];
    $room_id = $_REQUEST['room_id'];
    $room_slug = sanitize_title($room_title);

    // Update post with id = $room_id
    $room_post = array(
      'ID'           => $room_id,
      'post_title'   => $room_title,
      'post_content' => $room_desc,
      'post_name' => $room_slug
      );

    // Update the post into the database
    $return_post_id = wp_update_post( $room_post );

    $data['post_id'] = $return_post_id;
    $data['room_slug'] = $room_slug;

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
    
}
add_action( 'wp_ajax_update-translated-room', 'update_translated_room' );


function read_translated_room(){
    $room_id = $_REQUEST['roomId'];
    $editing_language = $_REQUEST['editingLang'];

    $data = get_language_translated_room($room_id, $editing_language);
    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );

}
add_action( 'wp_ajax_read-translated-room', 'read_translated_room' );

