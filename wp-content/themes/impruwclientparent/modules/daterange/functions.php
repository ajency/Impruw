<?php

function  wp_insert_daterange($formdata){
  
  global $wpdb;
  
  $table_name= $wpdb->prefix.'daterange';
  
  $wpdb->insert($table_name, $formdata);
  
  return $wpdb->insert_id;
}