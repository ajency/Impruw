<?php

require_once 'functions.php';

/**
 * Ajax handler to get all themes
 */
function ajax_get_theme() {

    $themes = get_impruw_themes();

    wp_send_json(array('code' => 'OK', 'data' => $themes));
}

add_action('wp_ajax_get-themes', 'ajax_get_theme');

/**
 * Function to return the default color sets for changing theme colors
 * 
 * @return color array
 */
function ajax_get_default_theme_color_set() {

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
add_action('wp_ajax_get-default-theme-color-set', 'ajax_get_default_theme_color_set');

/**
 *
 * Function to change the theme color based on sets selected
 *  
 */
function ajax_change_theme_color() {
    $colors= array();
    
    unset($_POST['action']);

    update_option('current_color_set',$_POST['formdata']['name']);

    unset($_POST['formdata']['name']);
   
    foreach($_POST['formdata'] as $key=>$value){
        $colors[$key] = $value;
    }

    switch_theme_colour($colors);
 
    wp_send_json(array('code'=>'OK'));
}
add_action('wp_ajax_change-theme-color', 'ajax_change_theme_color');
