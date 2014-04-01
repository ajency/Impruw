<?php
// function to insert the new date range into the database
// returns the new date range id
function  wp_insert_daterange($formdata){
  
  global $wpdb;
  
  $table_name= $wpdb->prefix.'daterange';
  
  $data = array();
  
  $data['from_date'] = strtotime($formdata['from_date']);
  $data['to_date'] = strtotime($formdata['to_date']);
  $data['daterange_name'] = $formdata['daterange_name'];

  $wpdb->insert($table_name, $data);
  
  return $wpdb->insert_id;
}