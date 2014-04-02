<?php

include_once 'functions.php';

function fetch_bookings(){
	
	$room_id = 2;
	
	$data = get_bookings($room_id);
	
	wp_send_json(array('code' => 'OK', 'data' => $data));
}
add_action('wp_ajax_fetch-bookings','fetch_bookings');