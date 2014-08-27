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
function get_date_range($dashboard=TRUE) {

    global $wpdb;

    $table_name = $wpdb->prefix . 'daterange';

    $query = "SELECT * FROM $table_name ORDER BY from_date ASC";

    $date_ranges = $wpdb->get_results( $query, ARRAY_A );

    $date_range_array = array();

    $language = '';

    if($dashboard===FALSE){
        $default_language = wpml_get_current_language();
        $language =  wpml_get_default_language();
    }
    else{
        $default_language = wpml_get_default_language();

        if($default_language==='en'){

            $language = 'nb';
        }
        else{
            $language = 'en';
        }
    }

    foreach ($date_ranges as $date_range) {
        
        //unserialize plan_name and plan_description 
        $daterange_name_unserialized = maybe_unserialize( $date_range['daterange_name'] );
        
        if(is_array($daterange_name_unserialized)){
            $daterange_name = isset($daterange_name_unserialized[$default_language]) ? $daterange_name_unserialized[$default_language] : $daterange_name_unserialized[$language];
        }
        else{
            $daterange_name = $daterange_name_unserialized;
        }

        $date_range_array[ ] = array(
            'id' => $date_range['id'],
            'from_date' =>  $date_range['from_date'],
            'to_date' => $date_range['to_date'],
            'daterange_name' => $daterange_name,
            'daterange_colour' => $date_range['daterange_colour']
            );
    }

    return $date_range_array;
}


function get_date_range_by_id($date_range_id) {

    global $wpdb;

    $table_name = $wpdb->prefix . 'daterange';

    $query = "SELECT * FROM $table_name WHERE id=".$date_range_id." ORDER BY from_date ASC";

    $date_range = $wpdb->get_row($query);
    
    return $date_range;
}


/**
 *
 * @return Ambigous <mixed, NULL, multitype:, multitype:multitype: , multitype:Ambigous <multitype:, NULL> >
 */
function get_date_range_by_language($language) {

    global $wpdb;

    $table_name = $wpdb->prefix . 'daterange';

    $query = "SELECT * FROM $table_name ORDER BY from_date ASC";

    $date_ranges = $wpdb->get_results( $query, ARRAY_A );

    $date_range_array = array();
    $default_language = $language;

    foreach ($date_ranges as $date_range) {
        
        //unserialize plan_name and plan_description 
        $daterange_name_unserialized = maybe_unserialize( $date_range['daterange_name'] );
        
        if(is_array($daterange_name_unserialized)){
            $daterange_name = isset($daterange_name_unserialized[$default_language]) ? $daterange_name_unserialized[$default_language] : '';
        }
        else{
            $daterange_name = $daterange_name_unserialized;
        }

        $date_range_array[ ] = array(
            'id' => $date_range['id'],
            'from_date' =>  $date_range['id'],
            'to_date' => $date_range['id'],
            'daterange_name' => $daterange_name,
            'daterange_colour' => $date_range['id']
            );
    }

    return $date_range_array;
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
