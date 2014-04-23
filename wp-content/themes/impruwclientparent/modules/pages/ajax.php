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


/**
 * [save_page_json description]
 *
 * @return [type] [description]
 */
function save_page_json() {
	$page_json 		= isset($_POST['page-content-json']) ? $_POST['page-content-json'] : false;
	$header_json 	= isset($_POST['header-json']) ? $_POST['header-json'] : false;
	$footer_json 	= isset($_POST['footer-json']) ? $_POST['footer-json'] : false;
	
	$page_id = $_POST ['page_id'];
	
	if($page_json !== false){
		$page_json = convert_json_to_array($page_json);
		add_page_json($page_id, $page_json);
	}
	if($header_json !== false){
		$header_json = convert_json_to_array($header_json);
		add_header_footer_revision('header', $header_json);
	}
	if($footer_json !== false){
		$footer_json = convert_json_to_array($footer_json);
		add_header_footer_revision('footer', $footer_json);
	}
	
	add_page_revision();
	
	wp_send_json ( array ('code' => 'OK') );
}
add_action ( 'wp_ajax_save-page-json', 'save_page_json' );