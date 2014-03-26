<?php

// function to insert a new plan
// returns plan id 
function  wp_insert_plan($formdata){
  
  global $wpdb;
  
  $table_name= $wpdb->prefix.'plans';
  
  $wpdb->insert($table_name, $formdata);
  
  return $wpdb->insert_id;
}