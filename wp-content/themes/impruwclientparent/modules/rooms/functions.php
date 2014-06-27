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
    $facility = $room_data[ 'facility' ];

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


function get_language_default_room($room_id)
{    
    global $sitepress;

    $default_language_code = $sitepress->get_default_language();
    $langdetails = $sitepress->get_language_details($default_language_code);
    $language_name = $langdetails['english_name'];

    //$lang_post_id = icl_object_id($room_id,'post',true,$default_language_code);
    $lang_post_id = get_language_post($room_id, $default_language_code);

    //TODO Check for fetching posts for changing default language
    $room_post = get_post($lang_post_id);
    $data = array();
    $data['roomTitle'] = $room_post->post_title;
    $data['roomDesc'] = $room_post->post_content;
    $data['defaultLangCode'] = $default_language_code;
    $data['defaultLanguage'] = $language_name;
    $data['lang_post_id'] = $lang_post_id;
    return $data;

}

function get_language_translated_room($room_id, $editing_language)
{
    global $sitepress;
    $data = array();

    $default_language_code = $sitepress->get_default_language();
    $editing_language_code = $editing_language;

    //English display name of the editing language code
    $langdetails = $sitepress->get_language_details($editing_language_code);
    $language_name = $langdetails['english_name'];

    $lang_post_id = get_language_post($room_id, $editing_language_code);

    if($lang_post_id!=null){
        $room_post = get_post($lang_post_id);
        $data['translatedRoomTitle'] = $room_post->post_title;
        $data['translatedRoomDesc'] = $room_post->post_content;
        $data['defaultLangCode'] = $default_language_code;
        $data['editingLanguage'] = $language_name;
        $data['translatedPostID'] = $lang_post_id;
        $data['isTranslated'] = true;

    }
    else{
        $translated_room_id = duplicate_language_post($room_id, "impruw_room", $editing_language_code);
        $room_post = get_post($translated_room_id);
        $data['translatedRoomTitle'] = $room_post->post_title;
        $data['translatedRoomDesc'] = $room_post->post_content;
        $data['defaultLangCode'] = $default_language_code;
        $data['editingLanguage'] = $language_name;
        $data['translatedPostID'] = $lang_post_id;
        $data['isTranslated'] = false;       

    }

    return $data;

}

/**
 *Get the translated id of a post based on post id of source and the destination language
 * 
 */
function get_language_post($src_post, $destination_language_code){

            $post_id = $src_post;
            $language_code = $destination_language_code;
            
            global $wpdb;
            $tbl_icl_translations  = $wpdb->prefix ."icl_translations";

            $select_trid = $wpdb->get_row( "SELECT trid FROM $tbl_icl_translations WHERE element_id =".$post_id);
            $trid = $select_trid->trid;

            $select_translate_id = $wpdb->get_row("SELECT * FROM $tbl_icl_translations WHERE trid =".$trid." AND language_code = '".$language_code."'");

            if ( $select_translate_id != null ){
                $destination_post_id = $select_translate_id->element_id;
            }
            else{
                $destination_post_id = null;
            }

            return $destination_post_id;

}

/**
 *Duplicate a post and create its translated version
 * 
 */
function duplicate_language_post($post_id, $post_type, $lang){

    global $wpdb, $sitepress;

    $tbl_icl_translations = $wpdb->prefix ."icl_translations";

    // Define title of translated post
    $post_translated_title = get_post( $post_id )->post_title . ' (' . $lang . ')';

    // Insert translated post
    $post_translated_id = wp_insert_post( array( 'post_title' =>$post_translated_title , 'post_type' =>$post_type, 'post_status'=> 'publish' ) );

    // Get trid of original post
    $select_trid = $wpdb->get_row( "SELECT trid FROM $tbl_icl_translations WHERE element_id =".$post_id);
    $trid = $select_trid->trid;

    // Get language code of original
    $lang_code_original = $sitepress->get_default_language();

    //element type
    $element_type = 'post_'.$post_type;

    // Associate original post and translated post
    //update icl_translation table
    $updateQuery = $wpdb->update(
        $tbl_icl_translations, array(
            'trid' => $trid,
            'language_code' => $lang,
            'source_language_code' => $lang_code_original,
            'element_type' => $element_type
            ), array( 'element_id' => $post_translated_id ) ); 

    return  $post_translated_id;

}

