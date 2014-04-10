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

    return site_url('wp-content/themes/pink-theme');
}

add_filter('template_directory_uri', 'site_template_directory_uri', 10, 3);

define('CURRENTTHEMEPATH', ABSPATH . 'wp-content/themes/pink-theme/');

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
                    'name'      => 'Left Menu'
                )
              ),
    'Title' => array(
                array(
                    'name'      => 'Page Title',
                ),
                array(
                    'name'      => 'Blue Capital Title',
                )
              ),
    'Row' => array(
                array(
                    'name'      => 'Slideshow Container'
                ),
                array(
                    'name'      => 'Long Bar'
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
        )
);

/**** Custom Markup for Responsive Panel Menu ****/
function add_menu_markup($html, $element){

    if(sanitize_title($element['style']) !== 'long-bar')
        return $html;
    
    return $html . '<div id="left-bar-open">
                        <a href="#fakelink" class="left-menu-trigger"><span class="glyphicon glyphicon-chevron-right"></span></a>
                        <a href="#fakelink" class="logo"><img class="img-responsive" src="http://pinkthemeclone.unpruwen.com/wp-content/uploads/sites/75/2014/04/t2-logo.png"></a>
                    </div>';
    
}
add_filter('row_markup', 'add_menu_markup', 20, 2);

/**** Add Custom JS for This Theme ****/
function theme_specific_js() {
    echo '<script src=" '. get_stylesheet_directory_uri() .'/js/jquery.jpanelmenu.min.js"></script>';
    echo '<script src=" '. get_stylesheet_directory_uri() .'/js/theme.js"></script>';
    echo '<script>
            jQuery(document).ready(function(){
                var jPM = jQuery.jPanelMenu({
                    menu: ".left-menu",
                    trigger: ".left-menu-trigger",
                    excludedPanelContent : "script, style"
                });

                jPM.on();
            });
          </script>';
}
add_action('wp_footer', 'theme_specific_js');