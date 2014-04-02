<?php

// function to insert a new plan
// returns plan id 
function  wp_insert_plan($formdata){
  
  global $wpdb;
  
  $table_name= $wpdb->prefix.'plans';
  
  $wpdb->insert($table_name, $formdata);
  
  return $wpdb->insert_id;
}


function get_plans() {
	global $wpdb;

	$table_name = $wpdb->prefix . 'plans';

	$query = "SELECT * FROM $table_name ORDER BY id ASC";

	$plans = $wpdb->get_results($query, ARRAY_A);

	return $plans;
}