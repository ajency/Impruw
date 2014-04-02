<?php

/**
 *  @returns the room id for the new room created
 *  @param postdata passes the form data into the form
 * 
 */
include_once PARENTTHEMEPATH . 'modules/slider/functions.php';

function create_room($formdata) {

    // set the params
    $post_title = $formdata['post_title'];
    $post_content = $formdata['post_content'];
    $post_type = 'impruw_room';
    $post_status = 'publish';
    $slider_id = $formdata['slider_id'];
    $no_of_rooms = $formdata['no_of_rooms'];


    // prepare facility array
    $facility = $formdata['facility'];

    // get selected facilities
    foreach ($facility as $key => $value) {
        if ($value == "true") {
            $facility_ids[] = $key;
        }
    }


    // prepare the data array
    $data = array(
        'post_title' => $post_title,
        'post_content' => $post_content,
        'post_type' => $post_type,
        'post_status' => $post_status,
    );

    //insert data array into the post table using wp function
    $post_id = wp_insert_post($data, false);


    if ($post_id != 0) {

        //check if slider exsists
        $slider_return = slider_exists($slider_id);
        
        if ($slider_return == TRUE) 
            
            update_post_meta($post_id, 'slider_id', $slider_id);
        
        else{ 
            update_post_meta($post_id, 'slider_id', 0);
        }
        
        update_post_meta($post_id, 'no_of_rooms', $no_of_rooms);

      
        update_post_meta($post_id, '_thumbnail_id', $slider_id);
        

        // set the facilities selected for the room
        wp_set_post_terms($post_id, $facility_ids, 'impruw_room_facility');
    }

    //return the room id
    return $post_id;
}

// Function returns the data for the new room created
// @param room ID
function get_room($roomid) {

    $room_id = $roomid;

    // returns an array of values from post table
    $room_post = get_post($room_id, ARRAY_A);

    // returns a string of the post meta value
    $room_slider_id = get_post_meta($room_id, 'slider_id', true);
    $no_of_rooms = get_post_meta($room_id, 'no_of_rooms', true);
    $thumbnail = get_post_meta($room_id, '_thumbnail_id', true);

    if (empty($no_of_rooms)) {
        $no_of_rooms = '0';
    }

    // prepare the post meta string to array
    $room_post_meta = array('slider_id' => $room_slider_id,
        'no_of_rooms' => $no_of_rooms,
        '_thumbnail_id' => $thumbnail);

    // returns an array of the post terms(facilities) of the room
    $room_term_names = wp_get_post_terms($room_id, 'impruw_room_facility');


    if (!empty($room_term_names))

    // loop the array and get prepare a facilities array
        foreach ($room_term_names as $key => $value) {
            $room_terms['facilities'][$room_term_names[$key]->term_id] = $room_term_names[$key]->name;
        } else {
        // get all facilities 
        $taxonomies = array('impruw_room_facility');

        $room_facilities = get_terms($taxonomies, array('hide_empty' => 0));

        foreach ($room_facilities as $key => $value) {
            $room_terms['facilities'][$room_facilities[$key]->term_id] = $room_facilities[$key]->name;
        }
    }

    // merge the array  
    $merge_first = array_merge($room_post, $room_post_meta);

    $roomdata = array_merge($merge_first, $room_terms);

    return $roomdata;
}

function get_roomss() {

    $rooms = new WP_Query(array('post_type' => 'impruw_room', 'posts_per_page' => -1));

    $room_data = array();

    while ($rooms->have_posts()): $rooms->the_post();

        $room_data[] = get_room(get_the_ID());

    endwhile;

    return $room_data;
}

/**
 * Function to get all room data 
 *  returns only the title and ID
 */
function get_all_rooms() {
    $rooms = new WP_Query(array('post_type' => 'impruw_room', 'posts_per_page' => -1));

    $room_data = array();

    while ($rooms->have_posts()): $rooms->the_post();

        $room_data [] = array('ID' => get_the_ID(), 'post_title' => get_the_title());

    endwhile;

    return $room_data;
}
