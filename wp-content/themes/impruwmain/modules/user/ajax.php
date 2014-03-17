<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor. 
 */

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

/*********************** load other files **************/
require_once 'functions.php';

/**
 * New User registration ajax handler
 * This ajax action will accept a POST request.
 * This action will always be triggerd by a non logged in user
 * hence, add_action("wp_aja_nopriv_*")
 * @return JSON success / or / failure 
 */
function new_user_registration(){
    
    // check if its a POST request else return
    if('POST' !== $_SERVER['REQUEST_METHOD'])
        wp_send_json_error('Invalid reuest');
    
    // verify the nonce else return error code
    if(!check_ajax_referer( 'new_user_registration', '_nonce' ))
        wp_send_json_error('Wrong request');
    
    $form_data = $_POST;
    
    // check done. now get the form data. pick the user specific fields and 
    // store in $user_data
    $user_data = pick_user_fields($form_data);
            
    //pass the data to create_new_user function capture return data
    $user_id = create_new_user($user_data);
    
    // if int = $user_id return success else return error
    if(is_wp_error($user_id))
        wp_send_json_error ();
   
    // user created now lets create the site
    
    $site_id = create_new_site($form_data['site_name'], $user_id);
    
    if(is_wp_error($site_id))
        wp_send_json_success ('Failed to create site');
    
    wp_send_json_success();
}
add_action('wp_ajax_nopriv_new_user_registration', 'new_user_registration');