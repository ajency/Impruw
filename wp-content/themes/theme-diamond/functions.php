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

function site_template_directory_uri($template_dir_uri, $template, $theme_root_uri) {

    return site_url('wp-content/themes/theme-diamond');
}

add_filter('template_directory_uri', 'site_template_directory_uri', 10, 3);

define('CURRENTTHEMEPATH', ABSPATH . 'wp-content/themes/theme-diamond/');

/**
 * Logo size for the theme 
 **/
function get_logo_size(){
    return array(312,40);
}

global $element_templates;

$element_templates = array(
    'Menu' => array(
                array(
                    'name'      => 'Footer Menu 2'
                )
              ),
    'Title' => array(
                array(
                    'name'      => 'Site Title'
                ),
                array(
                    'name'      => 'Page Title',
                ),
                array(
                    'name'      => 'Box Title',
                ),
                array(
                    'name'      => 'Footer Title'
                )
              ),
    'Row' => array(
                array(
                    'name'      => 'Pattern BG'
                ),
                array(
                    'name'      => 'Highlight Box'
                ),
                array(
                    'name'      => 'White Box'
                ),
                array(
                    'name'      => 'Menu Bar'
                )
             ),
    'Social' => array(
                array(
                    'name' => 'Default Style'
                ),
                array(
                    'name' => 'Small Social'
                )
            ),
    'Link' => array(
                array(
                    'name' => 'Default Style'
                ),
                array(
                    'name' => 'Button'
                )
            ),
    'ContactForm' => array(
            array(
                'name' => 'Style One'
            ),
            array(
                'name' => 'Style Two'
            )
        ),
    'ImageWithText' => array(
            array(
                'name' => 'Style One'
            ),
            array(
                'name' => 'Style Two'
            )
        ),
    'Address' => array(
            array(
                'name' => 'Menu Number',
                'template' => '<div><span class="glyphicon glyphicon-phone"></span> Phone: {{phone_no}}</div>' 
            )			
        )
);
