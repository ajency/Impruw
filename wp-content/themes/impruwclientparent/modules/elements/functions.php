<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function get_elements_by_ids( $ids ) {

    if ( !is_array( $ids ) )
        return array();

    $elements = array();

    foreach ( $ids as $id ) {
        $elements[ ] = get_element_by_id( $id );
    }

    return $elements;

}

/**
 *
 * @global type $wpdb
 *
 * @param type  $meta_id
 *
 * @return type
 */
function get_element_by_id( $meta_id ) {

    global $wpdb;

    $query = $wpdb->prepare( "SELECT meta_value FROM {$wpdb->postmeta} WHERE meta_id=%d", $meta_id );

    $meta_value = $wpdb->get_var( $query );

    $meta_value = maybe_unserialize( $meta_value );

    $meta_value = is_array( $meta_value ) ? $meta_value : array();

    $meta_value[ 'meta_id' ] = $meta_id;

    return $meta_value;
}


function store_unused_elements( $page_id ) {

    $current_json = get_post_meta( $page_id, 'page-json', TRUE );

    $element_ids = pluck_meta_ids_from_json( $current_json );

    update_post_meta( $page_id, "unused-elements", $element_ids );
}


function remove_element_from_unused_list( $page_id, $meta_id ) {

    $elements_ids = get_post_meta( $page_id, "unused-elements", TRUE );

    $elements_ids = !is_array( $elements_ids ) ? array() : $elements_ids;

    $new_ids_list = array();

    for ( $i = 0, $len = count( $elements_ids ); $i < $len; $i++ ) {
        if ( $meta_id != $elements_ids[ $i ] ) {
            $new_ids_list[ ] = $elements_ids[ $i ];
        }
    }

    update_post_meta( $page_id, "unused-elements", $new_ids_list );

    return TRUE;
}