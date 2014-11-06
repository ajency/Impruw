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
                'primary1' => array(
                    'color' => '#5ca9a1',
                    'title' => 'First Colour',
                    'tooltip' => 'Buttons, Room Elements, Footer Background, Social Links, Titles',
                    'description' => 'Used in Buttons, Room Elements, Footer Background, Social Links, Titles'
                ),
                'secondary1' => array(
                    'color' => '#656565',
                    'title' => 'Second Colour',
                    'tooltip' => 'Buttons, Room Elements, Footer Background, Social Links, Titles, Selection Background',
                    'description' => 'Used in Buttons, Room Elements, Footer Background, Social Links, Titles, Selection Background'
                ),
                'tertiary1' => array(
                    'color' => '#E1E1E1',
                    'title' => 'Third Colour',
                    'tooltip' => 'Room Elements, Headings',
                    'description' => 'Used in Room Elements, Headings'
                ),
                'text-color' => array(
                    'color' => '#7F7F7F',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#5ca9a1',
                    'title' => 'Button Colour',
                    'tooltip' => 'Button Elements',
                    'description' => 'Used in Buttons'
                )
            ),
            array(
                'name' => 'Dark Royalty',
                'primary1' => array(
                    'color' => '#8A0651',
                    'title' => 'First Colour',
                    'tooltip' => 'Buttons, Room Elements, Footer Background, Social Links, Titles',
                    'description' => 'Used in Buttons, Room Elements, Footer Background, Social Links, Titles'
                ),
                'secondary1' => array(
                    'color' => '#424242',
                    'title' => 'Second Colour',
                    'tooltip' => 'Buttons, Room Elements, Footer Background, Social Links, Titles, Selection Background',
                    'description' => 'Used in Buttons, Room Elements, Footer Background, Social Links, Titles, Selection Background'
                ),
                'tertiary1' => array(
                    'color' => '#E1E1E1',
                    'title' => 'Third Colour',
                    'tooltip' => 'Room Elements, Headings',
                    'description' => 'Used in Room Elements, Headings'
                ),
                'text-color' => array(
                    'color' => '#7F7F7F',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#8A0651',
                    'title' => 'Button Colour',
                    'tooltip' => 'Button Elements',
                    'description' => 'Used in Buttons'
                )
            ),
            array(
                'name' => 'Light & Breezy',
                'primary1' => array(
                    'color' => '#99D2D0',
                    'title' => 'First Colour',
                    'tooltip' => 'Buttons, Room Elements, Footer Background, Social Links, Titles',
                    'description' => 'Used in Buttons, Room Elements, Footer Background, Social Links, Titles'
                ),
                'secondary1' => array(
                    'color' => '#EB593C',
                    'title' => 'Second Colour',
                    'tooltip' => 'Buttons, Room Elements, Footer Background, Social Links, Titles, Selection Background',
                    'description' => 'Used in Buttons, Room Elements, Footer Background, Social Links, Titles, Selection Background'
                ),
                'tertiary1' => array(
                    'color' => '#AAAAAA',
                    'title' => 'Third Colour',
                    'tooltip' => 'Room Elements, Headings',
                    'description' => 'Used in Room Elements, Headings'
                ),
                'text-color' => array(
                    'color' => '#7F7F7F',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#99D2D0',
                    'title' => 'Button Colour',
                    'tooltip' => 'Button Elements',
                    'description' => 'Used in Buttons'
                )
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

    /**
     * Image sizes for the theme 
     **/
        // Thumbnails
        update_option('thumbnail_size_w', 200);
        update_option('thumbnail_size_h', 200);
        update_option('thumbnail_crop', array('center', 'center'));

        // Medium
        update_option('medium_size_w', 400);
        update_option('medium_size_h', 400);
        update_option('thumbnail_crop', 0);

        add_image_size( 'medium_img', 600, 450 );

        // Large
        update_option('large_size_w', 1200);
        update_option('large_size_h', 1200);
        update_option('large_crop', 0);
    

    global $element_templates;

    $element_templates = array('Title' => array(array('name' => 'Box Title'), array('name' => 'White Title'), array('name' => 'Center Title'), array('name' => 'Small Grey Title')), 
        'Row' => array(
            array(
                'name' => 'Green Background',
                'desc' => 'this is description for Green Background'
                ), 
            array(
                'name' => 'Shaded Background',
                'desc' => 'this is description for Shaded Background'                
                )
            ), 
        'Link' => array(array('name' => 'Default Style'), array('name' => 'Button'), array('name' => 'Header Button')), 'ContactForm' => array(array('name' => 'Style One'), array('name' => 'Style Two')), 'ImageWithText' => array(array('name' => 'Style One'), array('name' => 'Style Two')));

     /**
     * Footer selector for the theme powered by Impruw message
     **/
    function impruw_footer_selector(){
        return ".site-footer >.row:last-child";
    }
    add_filter('impruw_footer_selector', 'impruw_footer_selector');