<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Function to actually register a new user in system
 * Calls wp_insert_user WP function to make the record
 * @return int|WP_Error new user_id or WP_Error object
 */
function create_new_user($userdata){
    
    // extract indivisual variable of array
    extract( $userdata, EXTR_SKIP );
    
    return $user_id;
}

/**
 * This function will pick the user specific fields from an array and return
 * @param array $data_array array of data
 * @return array user_data fields
 */
function pick_user_fields($data_array){
    
    // return if passed argument is not an array
    if(!is_array($data_array))
        return array();
    
    // the user fields. May have more as required
    $user_fields = array('user_name','user_email','user_pass','display_name');
    
    $user_data = array();
    
    // map  the $data_array and pick user fields
    foreach($data_array as  $field => $value){
        
        if(in_array($field, $user_fields))
            $user_data[$field] = $value;
                
    }
    
    return $user_data;
}

/**
 * Sanitizes the user name to take format as "user_name"
 * First sanitizes the string with sanitize_title() and then replaces '-' with '_'
 * @param type $user_name
 * @return type
 */
function sanitize_username($user_name){
    
    // sanitize title
    $user_name = sanitize_title($user_name);
    
    // replace '-' with '_'
    $user_name = str_replace('-', '_', $user_name);
    
    return $user_name;
}

