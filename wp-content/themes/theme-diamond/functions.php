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
 * Function to return the theme set colors
 *
 * @return colors array
 */
function theme_color_sets(){

    $set_color = array(
        array(
            'name' => 'Default',
            'primary1' => '#DC6868',
            'secondary1' => '#483535',
            'tertiary1' => '#D7D3CA',
            'quarternary1' => '#BEBEBE',
            'quinary1' => '#F9F8F4',
            'text-color' => '#989898',
            'button-color' => '#DC6868'
        ),
        array(
            'name' => 'Cerulean Surprise',
            'primary1' => '#93B2C7',
            'secondary1' => '#ED583A',
            'tertiary1' => '#C7D0D5',
            'quarternary1' => '#BEBEBE',
            'quinary1' => '#F5F5F5',
            'text-color' => '#666666',
            'button-color' => '#FF7247'
        ),
        array(
            'name' => 'Aqua Dream',
            'primary1' => '#665BC4',
            'secondary1' => '#51B4AF',
            'tertiary1' => '#B6DEDD',
            'quarternary1' => '#BEBEBE',
            'quinary1' => '#FAF9F4',
            'text-color' => '#666666',
            'button-color' => '#665BC4'
        )
    );

    return $set_color;
}

/**
 * Logo size for the theme 
 **/
function get_logo_size(){
    return array(312,40);
}

global $element_templates;

$element_templates = array(
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
                    'name'      => 'Small Title',
                ),
                array(
                    'name'      => 'Action Title'
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
                ,
                array(
                    'name'      => 'Footer Text'
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
                    'name' => 'Capitalized Link'
                ),
                array(
                    'name' => 'Button'
                ),
                array(
                    'name' => 'Action Button'
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
