<?php

/**
 *
 * @global type $wpdb
 *
 * @param type  $formdata
 *
 * @return Daterange ID
 */
function wp_insert_daterange( $formdata ) {

    global $wpdb;

    $table_name = $wpdb->prefix . 'daterange';

    $data = array();

    $data[ 'from_date' ]        = date( 'Y-m-d', strtotime( $formdata[ 'from_date' ] ) );
    $data[ 'to_date' ]          = date( 'Y-m-d', strtotime( $formdata[ 'to_date' ] ) );
    $data[ 'daterange_name' ]   = $formdata[ 'daterange_name' ];
    $data[ 'daterange_colour' ] = $formdata[ 'daterange_colour' ];

    $wpdb->insert( $table_name, $data );

    return $wpdb->insert_id;
}

/**
 *
 * @return Ambigous <mixed, NULL, multitype:, multitype:multitype: , multitype:Ambigous <multitype:, NULL> >
 */
function get_date_range() {

    global $wpdb;

    $table_name = $wpdb->prefix . 'daterange';

    $query = "SELECT * FROM $table_name ORDER BY from_date ASC";

    $date_range = $wpdb->get_results( $query, ARRAY_A );

    return $date_range;
}

/**
 *
 * @global type $wpdb
 *
 * @param type  $formdata
 *
 * @return daterange ID of updated record
 */
function wp_update_daterange( $formdata ) {

    global $wpdb;

    $table_name = $wpdb->prefix . 'daterange';

    $data = array();

    $data[ 'from_date' ]        = date( 'Y-m-d', strtotime( $formdata[ 'from_date' ] ) );
    $data[ 'to_date' ]          = date( 'Y-m-d', strtotime( $formdata[ 'to_date' ] ) );
    $data[ 'daterange_name' ]   = $formdata[ 'daterange_name' ];
    $data[ 'daterange_colour' ] = $formdata[ 'daterange_colour' ];
    $data[ 'id' ]               = $formdata[ 'id' ];

    $wpdb->update( $table_name, $data, array( 'id' => $data[ 'id' ] ) );

    return $data[ 'id' ];
}

/**
 *
 * @global type $wpdb
 *
 * @param type  $formdata
 *
 * @return daterange ID of deleted daterange
 */
function wp_delete_daterange( $formdata ) {

    global $wpdb;

    $table_name = $wpdb->prefix . 'daterange';

    $wpdb->delete( $table_name, array( 'id' => $formdata[ 'id' ] ) );

    return $formdata[ 'id' ];
}
