<?php

/**
 * @returns the room id for the new room created
 *
 * @param postdata passes the form data into the form
 *
 */
include_once PARENTTHEMEPATH . 'modules/slider/functions.php';

function updateroom( $room_data ) {

    if ( $room_data[ 'post_status' ] === 'auto-draft' ) {
        $post_id = create_draft_room();

        return $post_id;
    }


    // set the params
    $post_title   = $room_data[ 'post_title' ];
    $post_content = $room_data[ 'post_content' ];
    $post_type    = 'impruw_room';
    $post_status  = 'publish';
    $slider_id    = $room_data[ 'slider_id' ];
    $no_of_rooms  = $room_data[ 'no_of_rooms' ];


    // prepare facility array
    $facility = isset( $room_data[ 'facility' ] ) ? $room_data[ 'facility' ] : array();

    $facility_ids = array();

    // get selected facilities
    foreach ( $facility as $key => $value ) {
        if ( $value == "true" ) {
            $facility_ids[ ] = $key;
        }
    }


    // prepare the data array
    $data = array(
        'ID'           => $room_data[ 'ID' ],
        'post_title'   => $post_title,
        'post_content' => $post_content,
        'post_type'    => $post_type,
        'post_status'  => $post_status,
    );

    //insert data array into the post table using wp function
    $post_id = wp_update_post( $data, FALSE );


    // if post insert succesfull
    if ( $post_id != 0 ) {

        //check if slider exsists
        $slider_return = slider_exists( $slider_id );

        if ( $slider_return == TRUE ) {

            update_post_meta( $post_id, 'slider_id', $slider_id );

            $all_slides = get_slides( $slider_id );

            if ( !empty( $all_slides ) )
                $slide_random_key = array_rand( $all_slides );

            $slide = $all_slides[ $slide_random_key ];

            set_post_thumbnail( $post_id, $slide[ 'image_id' ] );
        } else {

            update_post_meta( $post_id, 'slider_id', 0 );
        }


        update_post_meta( $post_id, 'no_of_rooms', $no_of_rooms );


        // set the facilities selected for the room
        wp_set_post_terms( $post_id, $facility_ids, 'impruw_room_facility' );
    }

    //return the room id
    return $post_id;
}

function create_draft_room() {

    $data = array(
        'post_type'   => 'impruw_room',
        'post_status' => 'auto-draft'
    );

    //insert data array into the post table using wp function
    $post_id = wp_insert_post( $data, FALSE );

    return $post_id;
}

// Function returns the data for the new room created
// @param room ID

function get_room( $roomid ) {

    $room_id = $roomid;

    $room_post = get_post( $room_id, ARRAY_A );

    if ( $room_post === null )
        return array();

    // returns a string of the post meta value
    $room_slider_id = get_post_meta( $room_id, 'slider_id', TRUE );

    $no_of_rooms = get_post_meta( $room_id, 'no_of_rooms', TRUE );

    $attachment_id = get_post_thumbnail_id( $room_id );

    $image = (int) $attachment_id > 0 ? wp_get_attachment_image_src( $attachment_id, 'medium' ) : array();

    $check_in = get_option( 'checkin-time', 'none' );

    $additional_policy = get_option( 'additional-policy', 'none' );

    // prepare the post meta strings to array
    $room_post_meta = array( 'slider_id'         => $room_slider_id,
                             'no_of_rooms'       => $no_of_rooms,
                             'thumbnail_id'      => (int) $attachment_id,
                             'post_excerpt'      => '',
                             'check-in'          => $check_in,
                             'additional-policy' => $additional_policy,
                             'image_url'         => is_array( $image ) && count( $image ) > 0 ? $image[ 0 ] : '' );


    // returns an array of the post terms(facilities) of the room
    $room_term_names = wp_get_post_terms( $room_id, 'impruw_room_facility' );

    $room_terms = array();

    if ( !empty( $room_term_names ) )

        // loop the array and get prepare a facilities array
        foreach ( $room_term_names as $key => $value ) {

            $room_terms[ 'facilities' ][ $room_term_names[ $key ]->term_id ] = $room_term_names[ $key ]->name;
        } else {
        // get all facilities
        $taxonomies = array( 'impruw_room_facility' );

        $room_facilities = get_terms( $taxonomies, array( 'hide_empty' => 0 ) );

        foreach ( $room_facilities as $key => $value ) {

            $room_terms[ 'facilities' ][ $room_facilities[ $key ]->term_id ] = $room_facilities[ $key ]->name;
        }
    }

    // merge the array
    $merge_first = array_merge( $room_post, $room_post_meta );

    $roomdata = array_merge( $merge_first, $room_terms );

    return $roomdata;
}

function get_roomss() {

    $rooms = new WP_Query( array( 'post_type' => 'impruw_room', 'posts_per_page' => -1, 'post_status' => 'publish' ) );

    $room_data = array();

    while ( $rooms->have_posts() ): $rooms->the_post();

        $room_data[ ] = get_room( get_the_ID() );

    endwhile;

    return $room_data;
}

/**
 * Function to get all room data
 *  returns only the title and ID
 */
function get_all_rooms() {

    $rooms = new WP_Query( array( 'post_type' => 'impruw_room', 'posts_per_page' => -1, 'post_status' => 'publish' ) );

    $room_data = array();

    while ( $rooms->have_posts() ): $rooms->the_post();

        $room_data [ ] = array( 'ID' => get_the_ID(), 'post_title' => get_the_title() );

    endwhile;

    return $room_data;
}

/**
 * Function to delete all room data
 *
 * @param type $formdata
 */
function delete_room( $formdata ) {

    $room_id = $formdata[ 'ID' ];

    delete_room_bookings( $room_id );

    delete_room_tariffs( $room_id );

    delete_room_postdata( $room_id );

    return $room_id;
}

/**
 *
 * @global type $wpdb
 *
 * @param type  $room_id
 */
function delete_room_bookings( $room_id ) {

    global $wpdb;

    $table_name = $wpdb->prefix . 'bookings';

    $query1 = "SELECT COUNT(*) FROM $table_name WHERE room_id = %d";

    $count = $wpdb->get_var( $wpdb->prepare( $query1, $room_id ) );

    if ( $count != 0 )
        $wpdb->delete( $table_name, array( 'room_id' => $room_id ) );
}

/**
 *
 * @global type $wpdb
 *
 * @param type  $room_id
 */
function delete_room_tariffs( $room_id ) {

    global $wpdb;

    $table_name = $wpdb->prefix . 'tariffs';

    $query1 = "SELECT COUNT(*) FROM $table_name WHERE room_id = %d";

    $count = $wpdb->get_var( $wpdb->prepare( $query1, $room_id ) );

    if ( $count != 0 )
        $wpdb->delete( $table_name, array( 'room_id' => $room_id ) );
}

/**
 *
 * @param type $room_id
 */
function delete_room_postdata( $room_id ) {

    if ( get_post_status( $room_id ) ) {

        wp_delete_post( $room_id );
    }
}
