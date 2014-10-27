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
    // print_r($_POST);

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

    /**LANGUAGE related modification while creating slides begins**/
    $parent_slide_id = $d['id'];

    //Get all enabled languages
    $enabled_languages = get_enabled_languages();
    $translated_slides = array($parent_slide_id);

    //For each enabled language, Create translated version of the slide
    foreach ($enabled_languages as $enabled_language) {
        $translated_slide_id = create_translated_slide($slider_id,$parent_slide_id,$enabled_language,'add') ;
        array_push($translated_slides , $translated_slide_id); 
    }
    /**LANGUAGE related modification while creating slides ends**/

    wp_send_json( array( 'code' => 'OK', 'data' => $d, 'translated_slides'=>$translated_slides ) );
}

add_action( 'wp_ajax_create-slide', 'create_slide' );

function update_slide_ajax() {

    $slide_id = $_POST[ 'id' ];

    $data = $_POST;
    // $data = array(
    //     'image' => 'http://localhost/impruw/childsite/wp-content/uploads/sites/81/2014/03/freeproductsamples.jpg',
    //     'title' => 'myslide'
    // );

    unset( $data[ 'action' ] );

    $parent_id = $slide_id_ret = update_slide( $data, $slide_id );

    /***********UPDATE MULTILINGUAL SLIDES***************/
    //Update translated child slides as well
    $slider_id = $_POST[ 'slider_id' ];
    $childslide_ids = array();

    //update translated slides for that slider id
    $childslide_ids = update_translated_slides($data, $slider_id,$parent_id);
    
    /***********UPDATE MULTILINGUAL SLIDES***************/

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $slide_id_ret, 'translated_slides'=>$childslide_ids ) ) );
}

// function update_slide_ajax() {

//     $slide_id = $_POST[ 'id' ];

//     //$data = $_POST;
//     $data = array(
//         'image' => 'http://localhost/impruw/childsite/wp-content/uploads/sites/81/2014/03/freeproductsamples.jpg',
//         'title' => 'myslide'
//     );

//     unset( $data[ 'action' ] );

//     $slide_id_ret = update_slide( $data, $slide_id );

//     wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $slide_id_ret ) ) );
// }

add_action( 'wp_ajax_update-slide', 'update_slide_ajax' );


function update_translated_page_slide_ajax(){

    $parent_slide_id = $_POST[ 'slideParentId' ];
    $slider_id = $_POST[ 'sliderId' ];
    $new_caption_title = $_POST[ 'newCaptionTitle' ];
    $new_caption_desc = $_POST[ 'newCaptionDesc' ];
    $slide_language = $_POST[ 'language' ];

    //Check if translated slide exists -> get slide id
    //If not then create a translated slide -> get slide id
    if(!slide_exists_in_lang($parent_slide_id, $slide_language)){
        $translated_slide_id = create_translated_slide($slider_id,$parent_slide_id,$slide_language,'add') ;
    }
    else{
        //get all child slides
        $child_slides = get_childslides_of_slide($parent_slide_id);

        foreach ($child_slides as $order => $child_slide) {
            if($child_slide['lang']==$slide_language){
                 $translated_slide_id = $child_slide['slideid'];
            }
        }
    }

    //Using translated slide id -> get slide $data
    $data = slide_details_array( $translated_slide_id );

    //modify $data['layers'][0]['text'] to reflect $new_caption_title and $new_caption_desc
    $reference_slide_caption =  get_slide_captionhtml($parent_slide_id);
    //newcaption = reference caption with new title and desc
    if ($reference_slide_caption=="") {
        $reference_slide_caption_title_class = "";
    }
    else{
        $reference_slide_caption_details = get_slide_caption_details($reference_slide_caption);
        $reference_slide_caption_title_class = $reference_slide_caption_details['caption_title_class'];

        if ($reference_slide_caption_details['caption_title_link']!="") {
            $reference_slide_title_link =$reference_slide_caption_details['caption_title_link'];
        }
        if ($reference_slide_caption_details['caption_title_link_target']!="") {
            $reference_slide_title_link_target = $reference_slide_caption_details['caption_title_link_target'];
        }
    }

    // $new_caption =  "<h3 class='".$reference_slide_caption_title_class."' data-title='".$new_caption_title."'>".$new_caption_title."</h3><div class='text' data-capdesc='".$new_caption_desc."'>".$new_caption_desc."</div>";

    $new_caption = "<h3 class='".$reference_slide_caption_title_class."' data-title='".$new_caption_title."'>";

    if(isset($reference_slide_title_link)){
        $new_caption .=  "<a href='".$reference_slide_title_link."' target='".$reference_slide_title_link_target."'>";
    }
    
    $new_caption .=  $new_caption_title;

    if(isset($reference_slide_title_link)){
        $new_caption .=  "</a>" ;
    }
    $new_caption .=  "</h3><div class='text' data-capdesc='".$new_caption_desc."'>".$new_caption_desc."</div>";

    $data['layers'][0]['text'] = $new_caption;
    
    //Using slide data -> update_language_slide( $data, $slide_id, $slide_language, $parent_slide_id)

    $updated_slide_id = update_slide_by_language( $data , $slide_language, $parent_slide_id );

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $updated_slide_id ) ) );

}
add_action( 'wp_ajax_update-translated-page-slide', 'update_translated_page_slide_ajax' );

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
