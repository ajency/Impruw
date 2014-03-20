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
    $data = $_POST;

    // unset the action 
    unset($data['action']);
    
    // returns the room id
    $room_id = create_room($data);
        
    // get all room post data
    $room = get_post($room_id);

    wp_send_json(array('code' => 'OK', 'data' => $room));
}
add_action('wp_ajax_create-room','create_room_ajax');
