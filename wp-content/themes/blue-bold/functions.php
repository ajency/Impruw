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

        return site_url('wp-content/themes/blue-bold');
    }

    add_filter('template_directory_uri', 'site_template_directory_uri', 10, 3);

    define('CURRENTTHEMEPATH', ABSPATH . 'wp-content/themes/blue-bold/');

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
                    'color' => '#07669E',
                    'title' => 'First Colour',
                    'tooltip' => 'Buttons, Headings, Links, Main Menu, Room Elements, Site Top Border, Social Links, Selection Background',
                    'description' => 'Used in Buttons, Headings, Links, Main Menu, Room Elements, Site Top Border, Social Links, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#555555',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Element, Image with Text, Menu, Room Elements, Social Links, Titles',
                    'description' => 'Used in Address Element, Image with Text, Menu, Room Elements, Social Links, Titles'
                ),
                'tertiary1' => array(
                    'color' => '#F2F2F2',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Row Element, Titles',
                    'description' => 'Used in Menu, Room Elements, Row Element, Titles'
                ),
                'text-color' => array(
                    'color' => '#989898',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#07669E',
                    'title' => 'Button Colour',
                    'tooltip' => 'Button Elements',
                    'description' => 'Used in Buttons'
                )
            ),
            array(
                'name' => 'Summer Heat',
                'primary1' => array(
                    'color' => '#DC3D24',
                    'title' => 'First Colour',
                    'tooltip' => 'Buttons, Headings, Links, Main Menu, Room Elements, Site Top Border, Social Links, Selection Background',
                    'description' => 'Used in Buttons, Headings, Links, Main Menu, Room Elements, Site Top Border, Social Links, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#232B2B',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Element, Image with Text, Menu, Room Elements, Social Links, Titles',
                    'description' => 'Used in Address Element, Image with Text, Menu, Room Elements, Social Links, Titles'
                ),
                'tertiary1' => array(
                    'color' => '#E3AE57',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Row Element, Titles',
                    'description' => 'Used in Menu, Room Elements, Row Element, Titles'
                ),
                'text-color' => array(
                    'color' => '#444444',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#DC3D24',
                    'title' => 'Button Colour',
                    'tooltip' => 'Button Elements',
                    'description' => 'Used in Buttons'
                )
            ),
            array(
                'name' => 'Mint Fresh',
                'primary1' => array(
                    'color' => '#99CD4E',
                    'title' => 'First Colour',
                    'tooltip' => 'Buttons, Headings, Links, Main Menu, Room Elements, Site Top Border, Social Links, Selection Background',
                    'description' => 'Used in Buttons, Headings, Links, Main Menu, Room Elements, Site Top Border, Social Links, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#343434',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Element, Image with Text, Menu, Room Elements, Social Links, Titles',
                    'description' => 'Used in Address Element, Image with Text, Menu, Room Elements, Social Links, Titles'
                ),
                'tertiary1' => array(
                    'color' => '#E1E1E1',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Row Element, Titles',
                    'description' => 'Used in Menu, Room Elements, Row Element, Titles'
                ),
                'text-color' => array(
                    'color' => '#989898',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#99CD4E',
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
        update_option('thumbnail_size_w', 180);
        update_option('thumbnail_size_h', 180);
        update_option('thumbnail_crop', array('center', 'center'));

        add_image_size( 'small_img', 140, 43 );

        // Medium
        update_option('medium_size_w', 400);
        update_option('medium_size_h', 400);
        update_option('thumbnail_crop', 0);

        add_image_size( 'medium_img', 400, 168 );

        // Large
        update_option('large_size_w', 800);
        update_option('large_size_h', 800);
        update_option('large_crop', 0);

        // Long
        add_image_size( 'long_img', 360, 670 );
        add_image_size( 'longsmall_img', 200, 372 );

    global $element_templates;

    $element_templates = array('Menu' => array(array('name' => 'Footer Menu 2')), 'Title' => array(array('name' => 'Title Super Text'), array('name' => 'Page Title',), array('name' => 'Footer Title'), array('name' => 'Footer Sub Title'), array('name' => 'Small Title'), array('name' => 'Grey Title Text'), array('name' => 'Emphasis Text'), array('name' => 'Inner Title'), array('name' => 'Thumb Title'), array('name' => 'Thumb Main Title')), 'Row' => array(array('name' => 'Blue Strip Top'), array('name' => 'White Shaded Background')), 'Social' => array(array('name' => 'Default Style'), array('name' => 'Small Social')), 'Link' => array(array('name' => 'Default Style'), array('name' => 'Button')), 'ContactForm' => array(array('name' => 'Style One'), array('name' => 'Style Two')), 'ImageWithText' => array(array('name' => 'Style One'), array('name' => 'Style Two')));
