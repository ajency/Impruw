<?php

require_once 'functions.php';

/**
 * Ajax handler to get all themes
 */
function get_theme_ajax() {

    $themes = get_impruw_themes();

    wp_send_json(array('code' => 'OK', 'data' => $themes));
}

add_action('wp_ajax_get-themes', 'get_theme_ajax');

/**
 * Function to return the default color sets for changing theme colors
 * 
 * @return color array
 */
function get_default_theme_color_set() {

    $set_color = array(
            array(
                  'name' =>'set1',
                  'primary1' => 'orange',
                  'secondary1' => 'green'
              ),
           array(
                  'name' =>'set2',
                  'primary1' => 'red',
                  'secondary1' => 'black'
              )
         );
   
    wp_send_json(array('code'=>'OK','data' =>$set_color));
}
add_action('wp_ajax_get-default-theme-color-set', 'get_default_theme_color_set');

/**
 *
 * Function to change the theme color based on sets selected
 *  
 */
function change_theme_color() {
    $colors= array();
    
    unset($_POST['action']);
    unset($_POST['formdata']['name']);
   
    foreach($_POST['formdata'] as $key=>$value){
        $colors[$key] = $value;
    }

    switch_theme_colour($colors);
 
    wp_send_json(array('code'=>'OK'));
}
add_action('wp_ajax_change-theme-color', 'change_theme_color');
