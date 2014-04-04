<?php

include_once 'functions.php';

# function to fetch packages
function fetch_daterange(){

	$data = array(	array('id' => 1, 
						'start_date' => strtotime('1/1/2014') * 1000,
						'end_date' 	=> strtotime('3/31/2014') * 1000,
						'tariffs' => array(
										array(
											'id' => 1,
											'weekdays' => array('charge' => '$100', 'extra_adult' => '$20', 'extra_child'=> '$10'),
											'weekends' => array('charge' => '$200', 'extra_adult' => '$30', 'extra_child'=> '$15')
										),
										array(
											'id' => 2,	
											'weekdays' => array('charge' => '$100', 'extra_adult' => '$20', 'extra_child'=> '$10'),
											'weekends' => array('charge' => '$200', 'extra_adult' => '$30', 'extra_child'=> '$15')
										),
										array(
											'id' => 3,	
											'weekdays' => array('charge' => '$100', 'extra_adult' => '$20', 'extra_child'=> '$10'),
											'weekends' => array('charge' => '$200', 'extra_adult' => '$30', 'extra_child'=> '$15')
										)
									)
						),
					array('id' => 2, 
						'start_date' => strtotime('4/1/2014') * 1000,
						'end_date' 	=> strtotime('6/31/2014') * 1000,
						'tariffs' => array(
										array(
											'id' => 1,
											'weekdays' => array('charge' => '$100', 'extra_adult' => '$20', 'extra_child'=> '$10'),
											'weekends' => array('charge' => '$200', 'extra_adult' => '$30', 'extra_child'=> '$15')
										),
										array(
											'id' => 2,
											'weekdays' => array('charge' => '$100', 'extra_adult' => '$20', 'extra_child'=> '$10'),
											'weekends' => array('charge' => '$200', 'extra_adult' => '$30', 'extra_child'=> '$15')
										),
										array(
											'id' => 3,
											'weekdays' => array('charge' => '$100', 'extra_adult' => '$20', 'extra_child'=> '$10'),
											'weekends' => array('charge' => '$200', 'extra_adult' => '$30', 'extra_child'=> '$15')
										)
									)
						));

	wp_send_json(array('code' => 'OK', 'data' => $data) );

}
add_action('wp_ajax_fetch-daterange', 'fetch_daterange');

// function to create new date range
function create_daterange_ajax(){

	//convert the string to date time format
	$from_date= date("Y-m-d",strtotime($_POST['from_date']));
	$to_date= date("Y-m-d",strtotime($_POST['to_date']));

	$formdata = array('from_date' => $from_date,'to_date' => $to_date,'daterange_name'=>$_POST['daterange_name']);

	// pass the form data to the insert function, returns the date range id 
	$daterange_id = wp_insert_daterange($formdata);

	wp_send_json(array('code' => 'OK', 'id'=> $daterange_id));

}
add_action('wp_ajax_create-daterange', 'create_daterange_ajax');