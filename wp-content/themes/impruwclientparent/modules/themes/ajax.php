<?php


require_once 'functions.php';

/**
 * Ajax handler to get all themes
 */
function get_theme_ajax(){
    
    $themes = get_impruw_themes();
    
    wp_send_json(array('code' => 'OK', 'data' => $themes));
    
}
add_action('wp_ajax_get-themes','get_theme_ajax');

