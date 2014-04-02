<?php

include_once 'functions.php';

function fetch_bookings(){
	
	$room_id = 2;
	
	$data = get_bookings($room_id);
	
	wp_send_json(array('code' => 'OK', 'data' => $data));
}
add_action('wp_ajax_fetch-bookings','fetch_bookings');

/**
 * 
 */
function create_booking(){
	
	$data = array();
	
	$data['bdate'] 	= $_POST['bdate'];
	$data['room_id'] 	= $_POST['room_id'];
	$data['status']		= $_POST['status'];
	$id = create_new_booking($data);
	
	wp_send_json(array('code' => 'OK', 'data' => array('id' => $id)));
	
}
add_action('wp_ajax_create-booking', 'create_booking');

/**
 * 
 */
function update_booking_ajax(){

	$data = array();

	$data['bdate'] 		= $_POST['bdate'];
	$data['room_id'] 	= $_POST['room_id'];
	$data['status']		= $_POST['status'];
	
	$id = $_POST['id'];
	
	update_booking($data, $id);

	wp_send_json(array('code' => 'OK', 'data' => array('id' => $id)));

}
add_action('wp_ajax_update-booking', 'update_booking_ajax');