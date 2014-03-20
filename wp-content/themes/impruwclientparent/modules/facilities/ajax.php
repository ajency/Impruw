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
function create_facility_ajax(){
    
	// form data
    $name = $_POST['name'];
    
    // function call with the new facility as argument 
    $facility_id = create_facility($name);  

    wp_send_json(array('code' => 'OK','data' => $facility_id));
}
add_action('wp_ajax_create-facility','create_facility_ajax');

/**
* Function to  delete a facility for a room from the dashboard
*  
 */ 

function delete_facility_ajax(){

	//posting the term_id
	$term_id = $_POST['term_id'];
    
    //call the delete facility function passing the term id
    $ret= delete_facility($term_id);

    wp_send_json(array('code'=>'OK','data'=> $ret));

}
add_action('wp_ajax_delete-facility','delete_facility_ajax');


/**
* Function to update the facility for a room from the dashboard
*/
function update_facility_ajax(){

	//fetching the post data
	$postdata= array('term_name' => $_POST['name'] ,
					 'term_id' => $_POST['term_id'],
					 'new_facility_name' => $_POST['facility_name']);
	
	// call the update function and passing the term id to
	$ret = update_facility($postdata);

	wp_send_json(array('code'=>'OK','data'=>$ret));

}
add_action('wp_ajax_update-facility','update_facility_ajax');