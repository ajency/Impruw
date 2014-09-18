<?php

include_once 'functions.php';

function ajax_get_unused_elements() {

    $page_id = 0;

    if ( isset( $_REQUEST ) ) {
        $page_id = $_REQUEST[ 'page_id' ];
    }

    //$revision_id_to_compare = (int)$_REQUEST['revision_id'] == 0 ? get_last_revision_id($page_id) : (int)$_REQUEST['revision_id'];

    $data = get_recovered_elements( $page_id );

    wp_send_success_json( $data );
}

add_action( 'wp_ajax_get-unused-elements', 'ajax_get_unused_elements' );


function ajax_remove_unused_element() {

    $page_id = $_REQUEST[ 'page_id' ];

    $meta_id = $_REQUEST[ 'element_meta_id' ];

    $result = remove_element_from_unused_list( $page_id, $meta_id );

    wp_send_success_json( $result );

}

add_action( 'wp_ajax_remove-unused-element', 'ajax_remove_unused_element' );

function clear_all_unused_elements(){
    $page_id = $_REQUEST[ 'page_id' ];

    $page_id = icl_object_id($page_id, 'page', true, 'en');

    update_post_meta( $page_id, "unused-elements", array() );

    wp_send_json(array('success' => true));
}
add_action('wp_ajax_clear-all-elements', 'clear_all_unused_elements');
