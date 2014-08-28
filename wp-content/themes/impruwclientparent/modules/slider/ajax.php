<?php

/**
 * All Slider ajax goes here
 */
// Incluse all files
include_once 'functions.php';

/**
 * Define all ajax handlers here
 */
function fetch_sliders() {

    $data = get_all_sliders();

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}

add_action( 'wp_ajax_fetch-sliders', 'fetch_sliders' );

/**
 *
 */
function create_slider() {

    $data = $_POST;

    unset( $data[ 'action' ] );

    $id = create_new_slider( $data );

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $id ) ) );
}

add_action( 'wp_ajax_create-slider', 'create_slider' );

function update_slider_ajax() {

    $data = $_POST;
    print_r($_POST);

    $slider_id = $_POST[ 'id' ];

    unset( $data[ 'action' ] );
    unset( $data[ 'id' ] );

    update_slider( $data, $slider_id );

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $slider_id ) ) );
}

add_action( 'wp_ajax_update-slider', 'update_slider_ajax' );

/**
 *
 */
function delete_slider() {

    $slider_id = $_POST[ 'slider_id' ];

    unset( $data[ 'action' ] );

    $id = delete_slider( $slider_id );

    wp_send_json( array( 'code' => 'OK' ) );
}

add_action( 'wp_ajax_delete-slider', 'delete_slider' );

/**
 * Fetching the details of all the slides
 * for a specified slider. Slider ID should be passed
 * to the function and it returns a json array containing
 * all the details of the slides present in the specified
 * slider.
 *
 * @param string $slider_id is the ID of the slider
 * @param        function   fetch_slide() returns a json array containing
 *                          the slider name,transistions,slot amount,rotation,transition duration,
 *                          delay,enable link and thumbnail of each slide in the slider specified.
 *
 */
function fetch_slides() {

    // get the slider ID from the call
    $slider_id = $_GET[ 'slider_id' ];

    // call the get_slides function in the functions.php file along with the slider ID.
    // The function will return an array containing the slides data
    $slides_arr = get_slides( $slider_id );

    wp_send_json( array( 'code' => 'OK', 'data' => $slides_arr ) );
}

add_action( 'wp_ajax_fetch-slides', 'fetch_slides' );

/**
 * Create new slides for the slider
 */
function create_slide() {


    $image_path = $_POST[ 'image' ];
    $image_id   = $_POST[ 'image_id' ];

    $data = array( 'image'    => $image_path,
                   'image_id' => $image_id );


    //$data contains the image path and the image id
    /* $data = array( 'image' => 'http://localhost/impruw/childsite/wp-content/uploads/sites/81/2014/03/images-2.jpg',
      'image_id' => "300"); */
    //$slider_id =1;
    //unset($data['action']);
    //unset($data['wait']);
    // check if slider is present if no create new
    $slider_id = isset( $_POST[ 'slider_id' ] ) ? $_POST[ 'slider_id' ] : create_new_slider( array( 'title' => 'Slider Title', 'alias' => 'slider-alias' ) );

    // returns the new slide ID
    $d = create_new_slide( $data, $slider_id );

    wp_send_json( array( 'code' => 'OK', 'data' => $d ) );
}

add_action( 'wp_ajax_create-slide', 'create_slide' );

function update_slide_ajax() {

    $slide_id = $_POST[ 'id' ];

    //$data = $_POST;
    $data = array(
        'image' => 'http://localhost/impruw/childsite/wp-content/uploads/sites/81/2014/03/freeproductsamples.jpg',
        'title' => 'myslide'
    );

    unset( $data[ 'action' ] );

    $slide_id_ret = update_slide( $data, $slide_id );

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $slide_id_ret ) ) );
}

add_action( 'wp_ajax_update-slide', 'update_slide_ajax' );

function delete_slide() {

    $slider_id = $_POST[ 'slider_id' ];
    $slide_id  = $_POST[ 'id' ];

    $data = array( 'sliderID' => $slider_id, 'slideID' => $slide_id );

    $slide_id_ret = delete_slide_ajax( $data );

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $slide_id_ret ) ) );
}

add_action( 'wp_ajax_delete-slide', 'delete_slide' );

function test() {

    $slide_id = 53;

    $slide_id_ret = slide_details_array( $slide_id );

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $slide_id_ret ) ) );
}

add_action( 'wp_ajax_test', 'test' );
