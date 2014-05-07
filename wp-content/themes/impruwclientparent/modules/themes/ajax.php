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
 * 
 * @return color array
 */
function get_default_theme_color_set() {

    $set_color = array(
        'set1' => array(
            'name' =>'set1',
            '@primary1' => 'yellow',
            '@secondary1' => 'green'
        ),
        'set2' => array(
            'name' =>'set2',
            '@primary1' => 'pink',
            '@secondary1' => 'grey'
        )
    );

    wp_send_json(array('code'=>'OK','data' =>$set_color));
}
add_action('wp_ajax_get-default-theme-color-set', 'get_default_theme_color_set');
