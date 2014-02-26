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
                    'name'      => 'Center Container',
                    'clsName'   => 'center-container'
                ),
                array(
                    'name'      => 'Grey Background',
                    'clsName'   => 'grey-background'
                ),
                array(
                    'name'      => 'Shaded Background',
                    'clsName'   => 'shaded-background'
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
            )
);
