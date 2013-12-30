<?php

/*
  File Name: user_shortcodes.php
  Description: This file has a list of the following shortcodes used to retrieve user information.
  1)  retrieve_user_information - shortcode to retrieve user data based on the attribute passed.
  2)  retrieve_initiator_information - Function to retrieve information related to inititator of an action.
  3)  retrieve_data_array_information - Function to retrieve information related to data array.
 */

  /* ============================================================= */

/**
 * 
 * retrieve_user_information
 * shortcode to retrieve user's data based on the attribute passed
 * 
 */
function retrieve_user_information($atts) 
{
   
            global $wpdb;
            if (isset($atts['field'])) 
                {
                    $user_id = $atts['user_id'];
                    $user_info_array = get_userdata($user_id);     
                    if($atts['field'] == 'user_activation_key')
                    {
                      $user_default_language = get_user_meta($user_id, 'user_default_language', true);
                      global $wpdb;
                      $slug = 'user-activation';
                      $page_id = $wpdb->get_var("SELECT ID FROM $wpdb->posts WHERE post_name = '$slug'");
                      $user_activation_id = icl_object_id($page_id, 'page', true,$user_default_language);
                      $post_object = get_post( $user_activation_id );
                      $activation_page_name = $post_object->post_name;
                      $activation_key = $wpdb->get_var("SELECT user_activation_key FROM $wpdb->users WHERE ID =".$user_id);
                      return $activation_link = get_template_directory_uri().'/'.$activation_page_name.'/?lang='.$user_default_language.'&email='.$user_info_array->user_email.'&key='.$activation_key;  
                    }
                    else
                    return $user_info_array->$atts['field'];
                }       
    
}

add_shortcode('user_info', 'retrieve_user_information');

/**
 * retrieve_initiator_information
 * Function to retrieve information related to inititator of an action.
 * @global type $wpdb
 * @param type $atts
 * @return type
 */
function retrieve_initiator_information($atts) 
{
   
            global $wpdb;
            if (isset($atts['field'])) 
                {
                    $user_id = $atts['user_id'];
                    $user_id = maybe_serialize($user_id);
                    $user_id = $user_id['user_id'];
                    $user_info_array = get_userdata($user_id);
                    return $user_info_array->$atts['field'];
                }       
    
}

add_shortcode('initiator_info', 'retrieve_initiator_information');

/**
 * 
 * retrieve_data_array_information
 * Function to retrieve information related to data array.
 * @global type $wpdb
 * @param type $atts
 * @return type
 */
function retrieve_data_array_information($atts) 
{
   
    global $wpdb;
    if (isset($atts['field'])) {
      
        $data_array       = $atts['data'];
        $data_array       = maybe_unserialize($data_array);
        
        if($atts['field'] == "user_nicename")
          $user_info_array = get_userdata($data_array['user_id']);
        
        return $user_info_array->$atts['field'];
    }       
    
}

add_shortcode('data_array_info', 'retrieve_data_array_information');