<?php
// function to insert the new date range into the database
// returns the new date range id
function  wp_insert_daterange($formdata){
  
  global $wpdb;
  
  $table_name= $wpdb->prefix.'daterange';
  
  $wpdb->insert($table_name, $formdata);
  
  return $wpdb->insert_id;
}