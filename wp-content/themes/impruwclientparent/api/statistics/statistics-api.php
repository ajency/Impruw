<?php

/**
 * All of the stattistics related code goes here
 *///initial google setup










//defining ajax
//// url to test this function :
///http://localhost/impruw/wp-admin/admin-ajax.php?action=get-unique-page-views
function get_unique_page_views(){

	//call the google API method here to fetch the data
	

	// format the returned data according to required model/collection. (this u can ignore for now)
	$data = '';//formated data

	wp_send_json(array('code' => 'OK', 'data' => $data));
}
add_action('wp_ajax_get-unique-page-views', 'get_unique_page_views');

// //defining ajax
// function get_unique_page_views(){

// 	//call the google API method here to fetch the data
	

// 	// format the returned data according to required model/collection. (this u can ignore for now)
// 	$data = '';//formated data

// 	wp_send_json(array('code' => 'OK', 'data' => $data));
// }
// add_action('wp_ajax_get-unique-page-views', 'get_unique_page_views');