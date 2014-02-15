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
    
    return site_url('wp-content/themes/bootstrap-blue');
    
}
add_filter('template_directory_uri','site_template_directory_uri',10,3);

define( 'CURRENTTHEMEPATH', ABSPATH . 'wp-content/themes/bootstrap-blue/' );

global $element_templates;

$element_templates = array(
						'Menu' => array(
									'header' => array(
										className 	=> 'nav-pills',
										menuItemTpl => '<a href="#{{link}}">{{post_title}}</a>',
										submenuTpl  => ''	
									),
									'footer' => array(
										className 	=> 'nav-tabs',
										menuItemTpl => '<a href="#">{{post_title}}</a>',
										submenuTpl  => ''	
									)
							)
					);