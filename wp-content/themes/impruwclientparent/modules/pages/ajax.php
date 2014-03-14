<?php

// Incluse all files
include_once 'functions.php';

/**
 * [get_pages description]
 * @return [type] [description]
 */
function get_pages1() {

	// check the request for layouts/ or / pages
	$templates = isset($_GET['meta_key']) ? true : false;

	if(!$templates)	
	    $pages = get_all_menu_pages();
	else
		$pages = get_all_menu_pages();

    wp_send_json(array('code' => 'OK', 'data' => $pages));
}

add_action('wp_ajax_get-pages', 'get_pages1');


/**
 * Create a new page
 */
function create_page_ajax(){

	$data = $_POST;
	//unset action param
	unset($data['action']);

	// pass remaining data to create a new page
	$id = create_new_page($data);

	if(is_wp_error($id))
		wp_send_json(array('code' => 'ERROR', 'message' => $id->get_error_message()));
	else	
		wp_send_json(array('code' => 'OK', 'data' => array('ID' => $id)));
}
add_action('wp_ajax_create-page','create_page_ajax');
