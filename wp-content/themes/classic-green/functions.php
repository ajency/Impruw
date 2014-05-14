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

    function site_template_directory_uri($template_dir_uri, $template, $theme_root_uri)
    {

        return site_url('wp-content/themes/classic-green');
    }

    add_filter('template_directory_uri', 'site_template_directory_uri', 10, 3);

    define('CURRENTTHEMEPATH', ABSPATH . 'wp-content/themes/classic-green/');

    /**
     * Function to return the theme set colors
     *
     * @return colors array
     */
    function theme_color_sets(){

        $set_color = array(
            array(
                'name' => 'Default',
                'primary1' => '#5ca9a1',
                'secondary1' => '#656565',
                'tertiary1' => '#E1E1E1',
                'text-color' => '#7F7F7F',
                'button-color' => '#5ca9a1'
            ),
            array(
                'name' => 'Dark Royalty',
                'primary1' => '#8A0651',
                'secondary1' => '#424242',
                'tertiary1' => '#E1E1E1',
                'text-color' => '#7F7F7F',
                'button-color' => '#8A0651'
            ),
            array(
                'name' => 'Light & Breezy',
                'primary1' => '#99D2D0',
                'secondary1' => '#EB593C',
                'tertiary1' => '#E1E1E1',
                'text-color' => '#7F7F7F',
                'button-color' => '#99D2D0'
            )
        );

        return $set_color;
    }

    /**
     * Logo size for the theme
     **/
    function get_logo_size()
    {
        return array(312, 40);
    }

    global $element_templates;

    $element_templates = array('Title' => array(array('name' => 'Box Title'), array('name' => 'White Title'), array('name' => 'Center Title'), array('name' => 'Small Grey Title')), 'Row' => array(array('name' => 'Green Background'), array('name' => 'Shaded Background')), 'Link' => array(array('name' => 'Default Style'), array('name' => 'Button'), array('name' => 'Header Button')), 'ContactForm' => array(array('name' => 'Style One'), array('name' => 'Style Two')), 'ImageWithText' => array(array('name' => 'Style One'), array('name' => 'Style Two')));
