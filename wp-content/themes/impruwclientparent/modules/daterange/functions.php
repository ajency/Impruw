<?php
// function to insert the new date range into the database
// returns the new date range id
function  wp_insert_daterange($formdata){
  
  global $wpdb;
  
  $table_name= $wpdb->prefix.'daterange';
  
  $data = array();
  
  $data['from_date'] = date('Y-m-d', strtotime($formdata['from_date']));
  $data['to_date'] = date('Y-m-d', strtotime($formdata['to_date']));
  $data['daterange_name'] = $formdata['daterange_name'];

  $wpdb->insert($table_name, $data);
  
  return $wpdb->insert_id;
}

/**
 * 
 * @return Ambigous <mixed, NULL, multitype:, multitype:multitype: , multitype:Ambigous <multitype:, NULL> >
 */
function get_date_range() {
	global $wpdb;

	$table_name = $wpdb->prefix . 'daterange';

	$query = "SELECT * FROM $table_name ORDER BY from_date ASC";

	$date_range = $wpdb->get_results($query, ARRAY_A);

	return $date_range;
}