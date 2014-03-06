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

    return site_url('wp-content/themes/blue-bold');
}

add_filter('template_directory_uri', 'site_template_directory_uri', 10, 3);

define('CURRENTTHEMEPATH', ABSPATH . 'wp-content/themes/blue-bold/');

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
                    'name'      => 'Slimmenu'
                ),
                array(
                    'name'      => 'Footer Menu'
                )
              ),
    'Title' => array(
                array(
                    'name'      => 'Box Title'
                )
              ),
    'Row' => array(
                array(
                    'name'      => 'Blue Background'
                ),
                array(
                    'name'      => 'Center Container'
                ),
                array(
                    'name'      => 'Grey Background'
                ),
                array(
                    'name'      => 'White Shaded Background'
                )
                ,
                array(
                    'name'      => 'Column Dividers'
                )
             ),
    'Address' => array(
                array(
                    'name' => 'Default Style',
                    'template' => '<ul><li><span class="fui-home"></span> {{address}}</li><li><span class="glyphicon glyphicon-earphone"></span> {{phoneno}}</li><li><span class="fui-mail"></span> {{email}}</li></ul>'
                ),
                array(
                    'name' => 'Small Address',
                    'template' => '<div><div class="info"><span class="fui-home"></span> {{address}}</div><div class="info"><span class="glyphicon glyphicon-earphone"></span> {{phoneno}}</div><div class="info"><span class="fui-mail"></span> {{email}}</div></div>'
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
        )
);
