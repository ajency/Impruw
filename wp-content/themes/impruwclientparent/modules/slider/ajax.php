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

/**
* Fetching the details of all the slides 
* for a specified slider. Slider ID should be passed
* to the function and it returns a json array containing 
* all the details of the slides present in the specified 
* slider.
*
* @param string $slider_id is the ID of the slider
* @param function fetch_slide() returns a json array containing 
* the slider name,transistions,slot amount,rotation,transition duration,
* delay,enable link and thumbnail of each slide in the slider specified.
*  
*/

function fetch_slides(){
    
    // get the slider ID from the call
    $slider_id = $_GET['slider_id'];
    
    // call the get_slides function in the functions.php file along with the slider ID.
	// The function will return an array containing the slides data 
    $slides_arr = get_slides($slider_id);
    
    wp_send_json(array('code' => 'OK', 'data' => $slides_arr));
}
add_action('wp_ajax_fetch-slides','fetch_slides');


function create_slide(){


	//$data = $_POST;
	$data = array(
		          'image_id' => 100,
		          'image'=> 'http://localhost/impruw/childsite/wp-content/uploads/sites/81/2014/03/freeproductsamples.jpg',
		          'title' =>'Slide',
	              'background_type' => 'image'
		          );

	//unset($data['action']);
    //unset($data['wait']);

	$d = create_new_slide($data,$slider_id,$slide_order);
    
	wp_send_json(array('code' => 'OK', 'data' => $d));

	
	
}
add_action('wp_ajax_create-slide', 'create_slide'); 
    
   


function update_slide_ajax(){
    
    $slide_id = $_POST['id'];

    $data = $_POST;

    unset($data['action']);
    
    #$slide_data= create_new_slide($data, $slider_id);
    
    wp_send_json(array('code' => 'OK', 'data' => array('id' => $slide_id)));
}
add_action('wp_ajax_update-slide','update_slide_ajax');

function delete_slide(){
    
    $slide_id = $_POST['id'];
    
    // $slides_arr = get_slides($slider_id);
    
    wp_send_json(array('code' => 'OK', 'data' => array('id' => $slide_id)));
}
add_action('wp_ajax_delete-slide','delete_slide');

