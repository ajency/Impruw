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

	$data = get_sliders();

	wp_send_json(array('code' => 'OK', 'data' => $data));
}
add_action('wp_ajax_fetch-sliders', 'fetch_sliders'); 

/**
 * 
 */ 
function create_slider(){

	$data = $_POST;

	unset($data['action']);

	$id = create_new_slider($data);

	wp_send_json(array('code' => 'OK', 'data' => array ('id' => $id)));
}
add_action('wp_ajax_create-slider', 'create_slider'); 
