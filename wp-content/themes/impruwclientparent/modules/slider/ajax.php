<?php

/**
 * All Slider ajax goes here
 */

// Incluse all files
include_once 'functions.php';
include_once 'models.php';

/**
 * Define all ajax handlers here
 */
function fetch_sliders(){

    $data = get_all_sliders();

    wp_send_json(array('code' => 'OK', 'data' => $data));
}
add_action('wp_ajax_fetch-sliders', 'fetch_sliders'); 

/**
 * 
 */ 
function create_slider(){

	$data = $_POST;

	unset($data['action']);
        unset($data['wait']);

	$id = create_new_slider($data);

	wp_send_json(array('code' => 'OK', 'data' => array ('id' => $id)));
}
add_action('wp_ajax_create-slider', 'create_slider'); 

/**
 * 
 */ 
function delete_slider(){

	$slider_id = $_POST['slider_id'];

	unset($data['action']);
        unset($data['wait']);

	$id = delete_slider($slider_id);

	wp_send_json(array('code' => 'OK'));
}
add_action('wp_ajax_delete-slider', 'delete_slider'); 
