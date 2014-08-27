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

    $feature_image_id  = 0;
    
    if(isset($room_data['feature_image_id']))
        $feature_image_id = $room_data[ 'feature_image_id' ];


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

    $english_post_id = icl_object_id($post_id, 'impruw_room', true,'en');


    // if post insert succesfull
    if ( $post_id != 0 ) {

        //check if slider exsists
        $slider_return = slider_exists( $slider_id );

        if ( $slider_return == TRUE ) {

            update_post_meta( $english_post_id, 'slider_id', $slider_id );

            $all_slides = get_slides( $slider_id );

            if ( !empty( $all_slides ) )
                $slide_random_key = array_rand( $all_slides );

            $slide = $all_slides[ $slide_random_key ];

            set_post_thumbnail( $english_post_id, $slide[ 'image_id' ] );
        } else {

            update_post_meta( $english_post_id, 'slider_id', 0 );
        }


        update_post_meta( $english_post_id, 'no_of_rooms', $no_of_rooms );

        // set the feature image for the post
        update_post_meta( $english_post_id, '_thumbnail_id', $feature_image_id );


        // set the facilities selected for the room
        wp_set_post_terms( $post_id, $facility_ids, 'impruw_room_facility' );
    }

    //Create english room if it does not already exist and if current default language is not english
    $current_default_language = wpml_get_default_language();
    $english_room_id = icl_object_id($post_id, 'impruw_room', false,'en');

    if(($current_default_language != 'en')&& is_null($english_room_id)){
        $data = get_language_translated_room($post_id, 'en');
        $english_room_id = $data['translatedPostID'];

        //check if slider exsists
        $slider_return = slider_exists( $slider_id );

        if ( $slider_return == TRUE ) {

            update_post_meta( $english_room_id, 'slider_id', $slider_id );

            $all_slides = get_slides( $slider_id );

            if ( !empty( $all_slides ) )
                $slide_random_key = array_rand( $all_slides );

            $slide = $all_slides[ $slide_random_key ];

            set_post_thumbnail( $english_room_id, $slide[ 'image_id' ] );
        } else {

            update_post_meta( $english_room_id, 'slider_id', 0 );
        }


        update_post_meta( $english_room_id, 'no_of_rooms', $no_of_rooms );

        // set the feature image for the english post
        update_post_meta( $english_room_id, '_thumbnail_id', $feature_image_id );

        //if tariff is assigned to room in $current_default_language, 
        //then update it to have english room id instead
        $updated_tariff = update_english_room_tariff($post_id, $english_room_id);

        //if booking is assigned to room in $current_default_language, 
        //then update it to have english room id instead
        $updated_booking = update_english_room_booking($post_id, $english_room_id);

    }

    //return the room id
    return $post_id;
}

function update_english_room_tariff($original_room_id, $english_room_id){

    global $wpdb;
    $table_name = $wpdb->prefix . 'tariffs';
    $tariff_ids = array();

    //Current room tariff
    $query = "SELECT * FROM $table_name WHERE room_id = $original_room_id ";

    $tariffs = $wpdb->get_results( $query);

    if($wpdb->num_rows>0){

        foreach ($tariffs as $tariff) {
            //get tariff id
            $tariff_id = $tariff->id;
            
            //update
            $wpdb->update(
                $table_name, 
                array('room_id'  => $english_room_id), 
                array( 'id' => $tariff_id ) 
                );
            $tariff_ids[] = $tariff_id;
        }

    }

    return $tariff_ids ;

}

function update_english_room_booking($original_room_id, $english_room_id){

    global $wpdb;
    $table_name = $wpdb->prefix . 'bookings';
    $booking_ids = array();

    //Current room tariff
    $query = "SELECT * FROM $table_name WHERE room_id = $original_room_id ";

    $bookings = $wpdb->get_results( $query);

    if($wpdb->num_rows>0){

        foreach ($bookings as $booking) {
            //get tariff id
            $booking_id = $booking->id;
            
            //update
            $wpdb->update(
                $table_name, 
                array('room_id'  => $english_room_id), 
                array( 'id' => $booking_id ) 
                );
            $booking_ids[] = $booking_id;
        }

    }

    return $booking_ids ;

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

    $english_room_id = icl_object_id($room_id, 'impruw_room', true,'en');

    // returns a string of the post meta value
    $room_slider_id = get_post_meta( $english_room_id, 'slider_id', TRUE );

    $no_of_rooms = get_post_meta( $english_room_id, 'no_of_rooms', TRUE );

    $attachment_id = get_post_thumbnail_id( $english_room_id );

    $image = (int) $attachment_id > 0 ? wp_get_attachment_image_src( $attachment_id, 'medium' ) : array();

    $check_in = get_option( 'checkin-time', 'none' );
    $check_out = get_option( 'checkout-time', 'none' );

    $additional_policy = get_option( 'additional-policy', 'none' );

    // prepare the post meta strings to array
    $room_post_meta = array( 'slider_id'         => $room_slider_id,
                             'no_of_rooms'       => $no_of_rooms,
                             'feature_image_id'  => (int) $attachment_id,
                             'post_excerpt'      => '',
                             'check-in'          => $check_in,
                             'check-out'          => $check_out,
                             'additional-policy' => $additional_policy,
                             'image_url'         => is_array( $image ) && count( $image ) > 0 ? $image[ 0 ] :
                                     false );


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
    $default_language = wpml_get_default_language();

    while ( $rooms->have_posts() ): $rooms->the_post();

        /*Code to display rooms based on the default language*/
        $post_id = get_the_ID();
        // Get the post ID based on language so that only pages of default language could be listed
        $post_id_based_on_lang = icl_object_id( $post_id, 'impruw_room', false, $default_language);
        $post_title_based_on_lang =  get_the_title($post_id_based_on_lang);

        $room_data[ ] = get_room( $post_id_based_on_lang );

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

    $default_language = wpml_get_default_language();

    while ( $rooms->have_posts() ): $rooms->the_post();

        /*Code to diaplay rooms based on the default language*/
        $post_id = get_the_ID();
        // Get the post ID based on language so that only pages of default language could be listed
        $post_id_based_on_lang = icl_object_id( $post_id, 'impruw_room', false, $default_language);
        $post_title_based_on_lang =  get_the_title($post_id_based_on_lang);

        $room_data [ ] = array( 'ID' => $post_id_based_on_lang, 'post_title' => $post_title_based_on_lang );

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

    //Delete using english room id
    $room_id = icl_object_id($room_id, 'impruw_room', true,'en');

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
        global $sitepress, $wpdb;
        $element_type = 'post_impruw_room';

        $post_id = $room_id;

        $trid         = $sitepress->get_element_trid( $post_id, $element_type );
        
        $translations = $sitepress->get_element_translations( $trid, $element_type );

        foreach ( $translations as $t ) {

            $deleted_posts[ ] = $post_id;
            $post_exists_sql  = $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE id = %d", array( $t->element_id ) );
            $post_exists      = $wpdb->get_col( $post_exists_sql );
            if ( $post_exists ) {
                wp_delete_post( $t->element_id );
            }
            
        }

    }
}


function get_default_language_room($room_id)
{    
    global $sitepress;

    $default_language_code = $sitepress->get_default_language();

    $post_type = "impruw_room";
    $element_type = "post_".$post_type;

    $langdetails = $sitepress->get_language_details($default_language_code);
    $language_name = $langdetails['english_name'];

    //$lang_post_id = icl_object_id($room_id,'post',true,$default_language_code);
    $lang_post_id = get_translated_id($room_id, $default_language_code,$element_type);

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
    $post_type = "impruw_room";
    $element_type = "post_".$post_type;

    //English display name of the editing language code
    $langdetails = $sitepress->get_language_details($editing_language_code);
    $language_name = $langdetails['english_name'];

    $lang_post_id = get_translated_id($room_id, $editing_language_code,$element_type);

    // $original_room_count = get_post_meta( $room_id, 'no_of_rooms', true );

    if($lang_post_id!=null){
        $room_post = get_post($lang_post_id);
        set_translated_facilities($room_id,$editing_language_code, $lang_post_id);
        $data['translatedRoomTitle'] = $room_post->post_title;
        $data['translatedRoomDesc'] = $room_post->post_content;
        $data['defaultLangCode'] = $default_language_code;
        $data['editingLanguage'] = $language_name;
        $data['translatedPostID'] = $lang_post_id;
        $data['isTranslated'] = true;

        // //Update room count for Translated room
        // update_post_meta( $lang_post_id, 'no_of_rooms', $original_room_count );
        // $data['roomCount'] = get_post_meta( $lang_post_id, 'no_of_rooms', true );

    }
    else{
        $translated_room_id = duplicate_language_post($room_id, "impruw_room", $editing_language_code);
        set_translated_facilities($room_id,$editing_language_code, $translated_room_id);
        $room_post = get_post($translated_room_id);
        $data['translatedRoomTitle'] = $room_post->post_title;
        $data['translatedRoomDesc'] = $room_post->post_content;
        $data['defaultLangCode'] = $default_language_code;
        $data['editingLanguage'] = $language_name;
        $data['translatedPostID'] = $translated_room_id;
        $data['isTranslated'] = false;  

        // //Update room count for Translated room
        // update_post_meta( $translated_room_id, 'no_of_rooms', $original_room_count ); 
        // $data['roomCount'] = get_post_meta( $translated_room_id, 'no_of_rooms', true );    

    }

    return $data;

}

/**
 *Get the translated id of a post or term based on post id/term id of original post/term and the destination language
 * 
 */
function get_translated_id($original_id, $destination_language_code,$element_type){

            $language_code = $destination_language_code;
            
            global $wpdb;
            $tbl_icl_translations  = $wpdb->prefix ."icl_translations";

            $select_trid = $wpdb->get_row( "SELECT trid FROM $tbl_icl_translations WHERE element_id =".$original_id." AND element_type='".$element_type."'");
            $trid = $select_trid->trid;

            $select_translate_id = $wpdb->get_row("SELECT * FROM $tbl_icl_translations WHERE trid =".$trid." AND language_code = '".$language_code."'");

            if ( $select_translate_id != null ){
                $translated_id = $select_translate_id->element_id;
            }
            else{
                $translated_id = null;
            }

            return $translated_id;

}

/**
 *Duplicate a post and create its translated version
 * 
 */
function duplicate_language_post($post_id, $post_type, $lang){

    global $wpdb, $sitepress;

    $tbl_icl_translations = $wpdb->prefix ."icl_translations";

    // Define title of translated post
    $post_translated_title = get_post( $post_id )->post_title .' ( not translated )';
    $post_translated_desc = get_post( $post_id )->post_content .' ( not translated )';

    //element type
    $element_type = 'post_'.$post_type;

    // Insert translated post
    $post_translated_id = wp_insert_post( array( 'post_title' =>$post_translated_title , 'post_content'  => $post_translated_desc , 'post_type' =>$post_type, 'post_status'=> 'publish' ) );

    // Get trid of original post
    $select_trid = $wpdb->get_row( "SELECT trid FROM $tbl_icl_translations WHERE element_id =".$post_id." AND element_type='".$element_type."'");
    $trid = $select_trid->trid;

    // Get language code of original
    $lang_code_original = $sitepress->get_default_language();

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

/*
* Set translated versions of facilities to the translated rooms
*/
function set_translated_facilities($post_id,$lang, $translated_post_id){
    //Get facility terms associated with original room_id 
    $room_terms = wp_get_object_terms($post_id, 'impruw_room_facility');
    $translated_facility_ids = array();
    
    //and for each such facility term get the translated facility term
    if(!empty($room_terms)){
        if(!is_wp_error( $room_terms )){
            foreach($room_terms as $term){
                $original_term_id = $term->term_id;
                $translated_term_id = icl_object_id($original_term_id, 'impruw_room_facility', false,$lang);
                
                if($translated_term_id!='')
                    $translated_facility_ids[ ] = $translated_term_id;
            }
        }
    }
    $translated_facility_ids = array_map( 'intval', $translated_facility_ids );
    $translated_facility_ids = array_unique( $translated_facility_ids );
    
    //link translated facilities to the translated room
    wp_set_object_terms( $translated_post_id, $translated_facility_ids, 'impruw_room_facility' );
}

