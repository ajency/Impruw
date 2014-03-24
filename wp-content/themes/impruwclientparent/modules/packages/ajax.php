<?php

// function to fetch packages
function fetch_packages(){

	$data = array(array('id' => 1, 'package_name' => 'Package 1', 'package_description' => 'Lorem Ipsum'),
				array('id' => 2, 'package_name' => 'Package 2', 'package_description' => 'Lorem Ipsum'),
				array('id' => 3, 'package_name' => 'Package 3', 'package_description' => 'Lorem Ipsum'));

	wp_send_json(array('code' => 'OK', 'data' => $data) );

}
add_action('wp_ajax_fetch-packages', 'fetch_packages');