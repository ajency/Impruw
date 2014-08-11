<?php

/**
 * All Facilities ajax goes here
 */
// Include all files
include_once 'functions.php';
/**
 * Define all ajax handlers here
 */

/**
 * Function to add new facilities for the rooms from the dashboard
 * Returns the term_id and term_taxonomy_id on successful insert
 *
 */
function create_facility_ajax() {

    // form data
    $name = $_POST[ 'name' ];

    // function call with the new facility as argument 
    $facility_id = create_facility( $name );

    wp_send_json( array( 'code' => 'OK', 'data' => $facility_id ) );
}

add_action( 'wp_ajax_create-facility', 'create_facility_ajax' );

/**
 * Function to  delete a facility for a room from the dashboard
 *
 */
function delete_facility_ajax() {

    //posting the term_id
    $term_id = $_POST[ 'term_id' ];

    //call the delete facility function passing the term id
    $ret = delete_facility( $term_id );

    wp_send_json( array( 'code' => 'OK', 'data' => $ret ) );
}

add_action( 'wp_ajax_delete-facility', 'delete_facility_ajax' );

/**
 * Function to update the facility for a room from the dashboard
 */
function update_facility_ajax() {

    //fetching the post data
    $postdata = array( 'term_name'         => $_POST[ 'name' ],
                       'term_id'           => $_POST[ 'term_id' ],
                       'new_facility_name' => $_POST[ 'facility_name' ] );

    // call the update function and passing the term id to
    $ret = update_facility( $postdata );

    wp_send_json( array( 'code' => 'OK', 'data' => $ret ) );
}

add_action( 'wp_ajax_update-languagefacility', 'update_facility_ajax' );


function fetch_default_facilities(){

    if(isset($_REQUEST['editLang'])){
         $language = $_REQUEST['editLang'];
    }
    else{
         $language = wpml_get_default_language();
    }
   
    $data = get_language_based_facilities($language);
    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );

}
add_action( 'wp_ajax_fetch-default-facilities', 'fetch_default_facilities' );


function update_translated_facilities(){
    //translatedFacilityTerms[0][name], translatedFacilityTerms[0][id]
    $translatedFacilityTerms = $_REQUEST['translatedFacilityTerms'];
    $editing_language = $_REQUEST['editingLanguage'];
    $updated_term_ids = array();
    $term_update_errors = array();
    $i = 0;

    while($i<sizeof($translatedFacilityTerms)) {
        $facility_name = $translatedFacilityTerms[$i]['name'];
        $facility_id = $translatedFacilityTerms[$i]['id'];
        $original_facility_id = $translatedFacilityTerms[$i]['translation_of'];
        $taxonomy_name = "impruw_room_facility";
        $element_type = "tax_".$taxonomy_name;

        $translated_term = save_term_translation_wpml($editing_language, $original_facility_id, $facility_name,$taxonomy_name);

        array_push($updated_term_ids,$translated_term['term_id']);
        array_push($term_update_errors,$translated_term['term_error']);

        $i++;
    }

    if (strlen(implode($term_update_errors)) == 0){
        $errormsg = "Translation successfully updated";
    }
    else{
        $errormsg = "Translation Failed";
    }

    wp_send_json( array( 'code' => 'OK', 'data' => $updated_term_ids, 'msg' => $errormsg) );
}
add_action( 'wp_ajax_update-translated-facilities', 'update_translated_facilities' );
