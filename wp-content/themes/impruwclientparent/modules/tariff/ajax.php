<?php

include 'functions.php';


function fetch_tariffs(){
	
	$room_id =(int)$_REQUEST['room_id'];
	
	$tariffs = get_tariff($room_id);
	
	wp_send_json(array('code' => 'OK','data' => $tariffs));
}
add_action('wp_ajax_fetch-tariffs','fetch_tariffs');

# function to fetch packages
function read_tariff(){

	$data = array(		'id' => 1, 
						'start_date' => strtotime('1/1/2014'),
						'end_date' 	=> strtotime('31/3/2014'),
						'plan_name' => 'Package 1',
						'weekdays' => array('charge' => 100, 'extra_adult' => 20, 'extra_child'=> 10),
						'weekends' => array('charge' => 200, 'extra_adult' => 30, 'extra_child'=> 15),
				);

	wp_send_json(array('code' => 'OK', 'data' => $data) );

}
add_action('wp_ajax_read-tariff', 'read_tariff');

/*
* Function to update the tariff plans 
* returns the tariff Id
*
*/
function update_tariff_ajax(){
    
    $id= 12;
    
    $daterange_id = 1;

    $plan_id = 1;

    $weekday = $_POST['weekdays'];

    $weekend = $_POST['weekends'];

    $room_id = 2;

    $formdata= array(
    			'id' => $id,
    			'daterange_id' => $daterange_id,
    			'weekend' => $weekend,
    			'weekday' => $weekday,
    			'plan_id' => $plan_id,
    			'room_id' => $room_id
    			);

     $tariff_id = update_tariff($formdata);

	wp_send_json(array('code' => 'OK','id'=> $tariff_id));
}
add_action('wp_ajax_update-tariff','update_tariff_ajax');