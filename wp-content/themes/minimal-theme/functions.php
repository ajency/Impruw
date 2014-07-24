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

        return site_url('wp-content/themes/minimal-theme');
    }

    add_filter('template_directory_uri', 'site_template_directory_uri', 10, 3);

    define('CURRENTTHEMEPATH', ABSPATH . 'wp-content/themes/minimal-theme/');

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
                    'color' => '#24D07C',
                    'title' => 'First Colour',
                    'tooltip' => 'Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background',
                    'description' => 'Used in Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#E223A1',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings',
                    'description' => 'Used in Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings'
                ),
                'tertiary1' => array(
                    'color' => '#39435C',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Site Background, Social Links',
                    'description' => 'Used in Menu, Room Elements, Site Background, Social Links'
                ),
                'quarternary1' => array(
                    'color' => '#545D73',
                    'title' => 'Fourth Colour',
                    'tooltip' => 'Address, Menu, Room Elements, Row Elements, Social Links, Slider, Text Element',
                    'description' => 'Used in Address, Menu, Room Elements, Row Elements, Social Links, Slider, Text Element'
                ),
                'quinary1' => array(
                    'color' => '#E1E1E1',
                    'title' => 'Fifth Colour',
                    'tooltip' => 'Slider',
                    'description' => 'Used in Slider'
                ),
                'text-color' => array(
                    'color' => '#FFFFFF',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#E223A1',
                    'title' => 'Button Colour',
                    'tooltip' => 'Button Elements',
                    'description' => 'Used in Buttons'
                )
            ),
            array(
                'name' => 'Lemon Dash',
                'primary1' => array(
                    'color' => '#ECFF33',
                    'title' => 'First Colour',
                    'tooltip' => 'Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background',
                    'description' => 'Used in Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#212121',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings',
                    'description' => 'Used in Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings'
                ),
                'tertiary1' => array(
                    'color' => '#2F8F74',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Site Background, Social Links',
                    'description' => 'Used in Menu, Room Elements, Site Background, Social Links'
                ),
                'quarternary1' => array(
                    'color' => '#A0FB70',
                    'title' => 'Fourth Colour',
                    'tooltip' => 'Address, Menu, Room Elements, Row Elements, Social Links, Slider, Text Element',
                    'description' => 'Used in Address, Menu, Room Elements, Row Elements, Social Links, Slider, Text Element'
                ),
                'quinary1' => array(
                    'color' => '#E1E1E1',
                    'title' => 'Fifth Colour',
                    'tooltip' => 'Slider',
                    'description' => 'Used in Slider'
                ),
                'text-color' => array(
                    'color' => '#FFFFFF',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#212121',
                    'title' => 'Button Colour',
                    'tooltip' => 'Button Elements',
                    'description' => 'Used in Buttons'
                )
            ),
            array(
                'name' => 'Desert Song',
                'primary1' => array(
                    'color' => '#72451E',
                    'title' => 'First Colour',
                    'tooltip' => 'Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background',
                    'description' => 'Used in Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#E7512E',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings',
                    'description' => 'Used in Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings'
                ),
                'tertiary1' => array(
                    'color' => '#B6AEA1',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Site Background, Social Links',
                    'description' => 'Used in Menu, Room Elements, Site Background, Social Links'
                ),
                'quarternary1' => array(
                    'color' => '#CBCBC1',
                    'title' => 'Fourth Colour',
                    'tooltip' => 'Address, Menu, Room Elements, Row Elements, Social Links, Slider, Text Element',
                    'description' => 'Used in Address, Menu, Room Elements, Row Elements, Social Links, Slider, Text Element'
                ),
                'quinary1' => array(
                    'color' => '#F6F6F6',
                    'title' => 'Fifth Colour',
                    'tooltip' => 'Slider',
                    'description' => 'Used in Slider'
                ),
                'text-color' => array(
                    'color' => '#3A361C',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#E7512E',
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
    function get_logo_size(){
        return array(312,40);
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
        update_option('large_size_w', 800);
        update_option('large_size_h', 800);
        update_option('large_crop', 0);

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
                        'name'      => 'Line Title',
                    ),
                    array(
                        'name'      => 'Footer Title'
                    )
                  ),
        'Row' => array(
                    array(
                        'name'      => 'Top Bar'
                    ),
                    array(
                        'name'      => 'Footer Columns'
                    ),
                    array(
                        'name'      => 'Menu Bar'
                    ),
                    array(
                        'name'      => 'Footer Bar'
                    ),
                    array(
                        'name'      => 'Padded Container'
                    ),
                    array(
                        'name'      => 'Shadow Box'
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
                    'name' => 'Default Style'
                )
            ),
        'ImageWithText' => array(
                array(
                    'name' => 'Default Style'
                )
            ),
        'Address' => array(
                array(
                    'name' => 'Top Bar Contact',
                    'template' => '<div class="info"><span class="glyphicon glyphicon-envelope"></span> {{email}}</div><div class="info"><span class="glyphicon glyphicon-phone-alt"></span> {{phone_no}}</div>' 
                )			
            )
    );
