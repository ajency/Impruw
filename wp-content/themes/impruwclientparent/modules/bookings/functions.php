<?php
/**
 *
 * @return Ambigous <mixed, NULL, multitype:, multitype:multitype: , multitype:Ambigous <multitype:, NULL> >
 */
function get_bookings( $room_id = 0 ) {

    if ( $room_id === 0 )
        $room_id = get_the_ID();

    $room_id = icl_object_id($room_id, 'impruw_room', true,'en');

    global $wpdb;

    $table_name = $wpdb->prefix . 'bookings';

    $sql = "SELECT * FROM $table_name WHERE room_id=%d";

    $query = $wpdb->prepare( $sql, $room_id );

    $bookings = $wpdb->get_results( $query, ARRAY_A );

    return $bookings;
}

/**
 *
 * @param unknown $data
 */
function create_new_booking( $data ) {

    $data[ 'bdate' ] = date( 'Y-m-d', strtotime( $data[ 'bdate' ] ) );

    global $wpdb;

    $table_name = $wpdb->prefix . 'bookings';

    $wpdb->insert( $table_name, $data );

    return $wpdb->insert_id;

}

/**
 *
 * @param unknown $data
 */
function update_booking( $data, $id ) {

    $data[ 'bdate' ] = date( 'Y-m-d', strtotime( $data[ 'bdate' ] ) );

    global $wpdb;

    $table_name = $wpdb->prefix . 'bookings';

    $wpdb->update( $table_name, $data, array( 'id' => $id ) );

    return TRUE;

}