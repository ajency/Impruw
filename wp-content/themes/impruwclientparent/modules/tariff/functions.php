<?php

/*
 * Function to update the tariff plans
 * returns the tariff Id
 *
 */

function update_tariff( $formdata ) {

    global $wpdb;

    $table_name = $wpdb->prefix . 'tariffs';

    // serializing the weekend and weekday array
    foreach ( $formdata as $key => $value ) {

        if ( $key == "weekend" || $key == "weekday" ) {
            $formdata[ $key ] = maybe_serialize( $value );
        }

        //Check for the language of the passed room
        //if it is english do nothing 
        //else if it is in norwegian, get english room id and associate tarrif to that room id

        if( $key == "room_id") {
            $current_room_id = $formdata[ $key ];

            $english_room_id = icl_object_id($current_room_id, 'impruw_room', true,'en');

            //Set room_id of formdata to english room id
            $formdata[ $key ] = $english_room_id;
        }
    }

    $wpdb->update( $table_name, $formdata, array( 'id' => $formdata[ 'id' ] ) );

    return $formdata[ 'id' ];
}

/**
 *
 * @param unknown $formdata
 *
 * @return number
 */
function add_tariff( $formdata ) {

    global $wpdb, $sitepress;

    $table_name = $wpdb->prefix . 'tariffs';

    //get current default language
    $current_default_language = wpml_get_default_language();

    // serializing the weekend and weekday array
    foreach ( $formdata as $key => $value ) {

        if ( $key == "weekend" || $key == "weekday" ) {
            $formdata[ $key ] = maybe_serialize( $value );
        }

        //Check for the language of the passed room
        //if it is english do nothing 
        //else if it is in norwegian, get english room id and associate tarrif to that room id

        if( $key == "room_id") {
            $current_room_id = $formdata[ $key ];

            $english_room_id = icl_object_id($current_room_id, 'impruw_room', true,'en');

            //Set room_id of formdata to english room id
            $formdata[ $key ] = $english_room_id;
        }
    }

    $wpdb->insert( $table_name, $formdata );

    return $wpdb->insert_id;
}

/**
 *
 * @param unknown $room_id
 *
 * @return Ambigous <mixed, NULL, multitype:, multitype:multitype: , multitype:Ambigous <multitype:, NULL> >
 */
function get_tariff( $room_id = 0 ) {

    global $wpdb;

    if ( $room_id === 0 )
        $room_id = get_the_ID();

    $room_id = icl_object_id($room_id, 'impruw_room', true,'en');

    $table_name = $wpdb->prefix . 'tariffs';

    $query = "SELECT * FROM $table_name WHERE room_id = $room_id ";

    $tariff = $wpdb->get_results( $query, ARRAY_A );

    foreach ( $tariff as $key => $value ) {

        $tariff[ $key ][ 'weekday' ] = maybe_unserialize( $tariff[ $key ][ 'weekday' ] );

        $tariff[ $key ][ 'weekend' ] = maybe_unserialize( $tariff[ $key ][ 'weekend' ] );
    }

    return $tariff;
}

/**
 *
 * @global type $wpdb
 *
 * @param type  $formdata
 *
 * @return type
 */
function delete_tariff( $formdata ) {

    global $wpdb;

    $table_name = $wpdb->prefix . 'tariffs';

    $wpdb->delete( $table_name, array( 'id' => $formdata[ 'id' ] ) );

    return $formdata[ 'id' ];
}
