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
function create_room_ajax(){
    
    // get all form data
    $formdata = $_POST;

    // unset the action 
    unset($formdata['action']);
    
    // returns the room id
    $room_id = create_room($formdata);
        
    // get all room post data
    $room_data = get_post_room($room_id);

    wp_send_json(array('code' => 'OK', 'data' => $room_data));
}
add_action('wp_ajax_create-room','create_room_ajax');
