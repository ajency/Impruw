<?php

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