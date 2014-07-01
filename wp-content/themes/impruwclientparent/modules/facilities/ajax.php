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

add_action( 'wp_ajax_update-facility', 'update_facility_ajax' );


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
    $updated_term_ids = array();
    $i = 0;

    while($i<sizeof($translatedFacilityTerms)) {
        $facility_name = $translatedFacilityTerms[$i]['name'];
        $facility_id = $translatedFacilityTerms[$i]['id'];
        $taxonomy_name = "impruw_room_facility";
        $element_type = "tax_".$taxonomy_name;


        global $wpdb;
        $tbl_icl_translations  = $wpdb->prefix ."icl_translations";

        $select_trid = $wpdb->get_row( "SELECT * FROM $tbl_icl_translations WHERE element_id =".
            $facility_id." AND element_type='".$element_type."'");
        $trid = $select_trid->trid;
        $language_code = $select_trid->language_code; 
        $source_language_code =$select_trid->source_language_code;


        //Update term
        $term_id = wp_update_term($facility_id, $taxonomy_name, array(
                'name' => $facility_name
            ));


        //Now update the term in icl_translation table to associate it to the original term
        $updateQuery = $wpdb->update(
            $tbl_icl_translations, array(
                'trid' => $trid,
                'language_code' => $language_code ,
                'source_language_code' => $source_language_code,
                'element_type' => $element_type
                ), array( 'element_id' => $facility_id ) );


        array_push($updated_term_ids,$term_id); 
        $i++;
    } 

    wp_send_json( array( 'code' => 'OK', 'data' => $updated_term_ids ) );
}
add_action( 'wp_ajax_update-translated-facilities', 'update_translated_facilities' );
