<?php
/*
File Name: functions.php
Description: This file has a list of the following functions used in this theme

1)  site_template_directory_uri - Function to change the default template uri.

/**
 * 
 * site_template_directory_uri
 * Function to change the default template uri.
 * @param type $template_dir_uri
 * @param type $template
 * @param type $theme_root_uri
 * @return text
 */
function site_template_directory_uri($template_dir_uri, $template, $theme_root_uri){
    
    return site_url('wp-content/themes/impruwclientchild2');
    
}
add_filter('template_directory_uri','site_template_directory_uri',10,3);
?>