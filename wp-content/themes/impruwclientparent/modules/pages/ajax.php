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
	$id_or_error = create_new_page($data);

	if(is_wp_error($id_or_error))
            wp_send_json(array('code' => 'ERROR', 'message' => $id_or_error->get_error_message()));
	else	
            wp_send_json(array('code' => 'OK', 'data' => array('ID' => $id_or_error)));
}
add_action('wp_ajax_create-page','create_page_ajax');

/**
 * Publish page 
 */
function publish_page_ajax(){
    
    $page_id = $_REQUEST['page_id'];
    
    $header_json = $_REQUEST['header-json'];
    update_option('theme-header', $header_json);
    
    $footer_json = $_REQUEST['footer-json'];
    update_option('theme-footer', $footer_json);
    
    //set page json
    publish_page($page_id);
    
    $page_json = $_REQUEST['page-json'];
    add_page_json($json);
    
    add_page_revision($page_id);
    
    update_page_autosave($page_id, $page_json);
    
}
add_action('wp_ajax_publish-page','publish_page_ajax');

/**
 * [save_page_json description]
 *
 * @return [type] [description]
 */
function save_page_json() {
    
    $page_json      = isset($_POST['page-content-json']) ? $_POST['page-content-json'] : false;
    $header_json 	= isset($_POST['header-json']) ? $_POST['header-json'] : false;
    $footer_json 	= isset($_POST['footer-json']) ? $_POST['footer-json'] : false;
    $page_id 	= $_POST ['page_id'];

    if($page_json !== false){
        $page_json = convert_json_to_array($page_json);
        add_page_json($page_id, $page_json);

        if($revision === true)
                $revision_data = add_page_revision($page_id);
    }
    if($header_json !== false){
        $header_json = convert_json_to_array($header_json);
        update_option("theme-header", $header_json);
    }
    if($footer_json !== false){
        $footer_json = convert_json_to_array($footer_json);
        update_option("theme-footer", $footer_json);
    }

    if($revision === true)
        wp_send_json($revision_data);
    else 
        wp_send_json ( array ('code' => 'OK') );
    
}
add_action ( 'wp_ajax_save-page-json', 'save_page_json' );