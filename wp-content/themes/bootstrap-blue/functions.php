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

    return site_url('wp-content/themes/bootstrap-blue');
}

add_filter('template_directory_uri', 'site_template_directory_uri', 10, 3);

define('CURRENTTHEMEPATH', ABSPATH . 'wp-content/themes/bootstrap-blue/');

global $element_templates;

$element_templates = array(
    'Menu' => array(
                array(
                    'name'      => 'Slimmenu',
                    'clsName'   => 'slimmenu'
                ),
                array(
                    'name'      => 'Footer Menu',
                    'clsName'   => 'footer-links'
                )
              ),
    'Title' => array(
                array(
                    'name'      => 'Box Title',
                    'clsName'   => 'box-title'
                )
              ),
    'Row' => array(
                array(
                    'name'      => 'Green Background',
                    'clsName'   => 'green-background'
                ),
                array(
                    'name'      => 'Grey Background',
                    'clsName'   => 'grey-background'
                )
             )
);
