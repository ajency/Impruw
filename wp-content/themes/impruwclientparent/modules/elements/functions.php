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
        $element = get_element_by_id( $id );
        if( $element !== false)
            $elements[ ] = $element;
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

    if ( $meta_value['element'] !== 'Title' &&
         $meta_value['element'] !== 'Text' &&
         $meta_value['element'] !== 'ImageWithText' &&
         $meta_value['element'] !== 'Table'
        )
        return false;

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


function create_page_element_array($page_json){
    global $wpdb;

    // $page_id = (int) icl_object_id($ln_page_id, 'page', true,'en');
    // $layout = get_post_meta($page_id,'page-json',true);
    // if($layout == null)
    //     return false;
    if ($page_json != '')
        $element_ids = pluck_meta_ids_from_json($page_json);
    else
        return array();
    
    $elements = array();
    foreach ($element_ids as $element_id) {
        # code...
        $meta = get_metadata_by_mid( 'post', $element_id );
        if (!array_key_exists('meta_id',$meta->meta_value))
            $meta->meta_value['meta_id'] = $meta->meta_id;
        
        $element = maybe_unserialize($meta->meta_value);
        // print_r($element);
        $elements[] = $element;
    }
    return $elements;
}

function update_page_elements($page_id, $page_elements){
    update_post_meta($page_id,'page-elements',$page_elements);
}

function set_page_elements_global($page_id,$revision_id = FALSE){
    global $impruw_page_elements;
    if(!$revision_id)
        $impruw_page_elements = get_post_meta($page_id,'page-elements',true);
    else
        $impruw_page_elements = get_post_meta($revision_id,'page-elements',true);
    $impruw_page_elements= is_array($impruw_page_elements) ? $impruw_page_elements : array();

    if (empty($impruw_page_elements)){
        $page_json = get_post_meta($page_id,'page-json',true);
        $page_elements = create_page_element_array($page_json);
        // update post meta page-elements
        update_page_elements($page_id,$page_elements);
        $impruw_page_elements = $page_elements;
    }

    $header_elements = get_header_footer_elements_published(THEME_HEADER_KEY,$revision_id);
    $footer_elements = get_header_footer_elements_published(THEME_FOOTER_KEY,$revision_id);

    $impruw_page_elements = array_merge( $impruw_page_elements, $header_elements, $footer_elements );

   
    
}

function get_element_from_global_page_elements($meta_id){
    global $impruw_page_elements;
    // print_r($impruw_page_elements);
    $ele = false;

    if(!is_array($impruw_page_elements))
        return false;

    foreach ($impruw_page_elements as $element) {
        # code...
        if ($element['meta_id'] == $meta_id){
            $ele = $element;
            break;
        }
    }
   

    return $ele;
}

