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

function update_slider_ajax(){

	$data = $_POST;
        
        $slider_id = $_POST['id'];
        
	unset($data['action']);
        unset($data['wait']);
        unset($data['success']);
        unset($data['id']);

	update_slider($data, $slider_id);

	wp_send_json(array('code' => 'OK', 'data' => array ('id' => $slider_id)));
}
add_action('wp_ajax_update-slider', 'update_slider_ajax');

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


/********** Slides ******************/

function fetch_slides(){
    
    $slider_id = $_GET['slider_id'];
    
    $slides_arr = get_slides($slider_id);
    
    wp_send_json(array('code' => 'OK', 'data' => $slides_arr));
}
add_action('wp_ajax_fetch-slides','fetch_slides');


function create_slide(){
    
    $slider_id = $_POST['slider_id'];

    /**
     * $data = array('title' => 'dsdsd'
     *                'link' = ''dsd)
     *                'background_type' = 'image'
     *                'image' = imageurl
     *                'image_id' = 232) 
     */

    $data = $_POST;

    unset($data['action']);
    unset($data['wait']);
    unset($data['success']);
    
    #$slide_data= create_new_slide($data, $slider_id);
    
    wp_send_json(array('code' => 'OK', 'data' => $slide_data = array()));
}
add_action('wp_ajax_create-slide','create_slide');
