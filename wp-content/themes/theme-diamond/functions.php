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
                'primary1' => array(
                    'color' => '#DC6868',
                    'title' => 'First Colour',
                    'tooltip' => 'Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background',
                    'description' => 'Used in Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#483535',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings',
                    'description' => 'Used in Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings'
                ),
                'tertiary1' => array(
                    'color' => '#D7D3CA',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Site Background, Social Links',
                    'description' => 'Used in Menu, Room Elements, Site Background, Social Links'
                ),
                'quarternary1' => array(
                    'color' => '#BEBEBE',
                    'title' => 'Fourth Colour',
                    'tooltip' => 'Address, Menu, Room Elements, Row Elements, Social Links, Slider, Text Element',
                    'description' => 'Used in Address, Menu, Room Elements, Row Elements, Social Links, Slider, Text Element'
                ),
                'quinary1' => array(
                    'color' => '#F5F5F5',
                    'title' => 'Fifth Colour',
                    'tooltip' => 'Slider',
                    'description' => 'Used in Slider'
                ),
                'text-color' => array(
                    'color' => '#989898',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#DC6868',
                    'title' => 'Button Colour',
                    'tooltip' => 'Button Elements',
                    'description' => 'Used in Buttons'
                )
            ),
            array(
                'name' => 'Cerulean Surprise',
                'primary1' => array(
                    'color' => '#93B2C7',
                    'title' => 'First Colour',
                    'tooltip' => 'Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background',
                    'description' => 'Used in Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#ED583A',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings',
                    'description' => 'Used in Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings'
                ),
                'tertiary1' => array(
                    'color' => '#C7D0D5',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Site Background, Social Links',
                    'description' => 'Used in Menu, Room Elements, Site Background, Social Links'
                ),
                'quarternary1' => array(
                    'color' => '#BEBEBE',
                    'title' => 'Fourth Colour',
                    'tooltip' => 'Address, Menu, Room Elements, Row Elements, Social Links, Slider, Text Element',
                    'description' => 'Used in Address, Menu, Room Elements, Row Elements, Social Links, Slider, Text Element'
                ),
                'quinary1' => array(
                    'color' => '#F5F5F5',
                    'title' => 'Fifth Colour',
                    'tooltip' => 'Slider',
                    'description' => 'Used in Slider'
                ),
                'text-color' => array(
                    'color' => '#666666',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#FF7247',
                    'title' => 'Button Colour',
                    'tooltip' => 'Button Elements',
                    'description' => 'Used in Buttons'
                )
            ),
            array(
                'name' => 'Aqua Dream',
                'primary1' => array(
                    'color' => '#665BC4',
                    'title' => 'First Colour',
                    'tooltip' => 'Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background',
                    'description' => 'Used in Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#51B4AF',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings',
                    'description' => 'Used in Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings'
                ),
                'tertiary1' => array(
                    'color' => '#B6DEDD',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Site Background, Social Links',
                    'description' => 'Used in Menu, Room Elements, Site Background, Social Links'
                ),
                'quarternary1' => array(
                    'color' => '#BEBEBE',
                    'title' => 'Fourth Colour',
                    'tooltip' => 'Address, Menu, Room Elements, Row Elements, Social Links, Slider, Text Element',
                    'description' => 'Used in Address, Menu, Room Elements, Row Elements, Social Links, Slider, Text Element'
                ),
                'quinary1' => array(
                    'color' => '#FAF9F4',
                    'title' => 'Fifth Colour',
                    'tooltip' => 'Slider',
                    'description' => 'Used in Slider'
                ),
                'text-color' => array(
                    'color' => '#666666',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#665BC4',
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
        update_option('medium_size_w', 350);
        update_option('medium_size_h', 350);
        update_option('thumbnail_crop', 0);

        add_image_size( 'medium_img', 600, 450 );

        // Large
        update_option('large_size_w', 1200);
        update_option('large_size_h', 1200);
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
    
     /**
     * Footer selector for the theme powered by Impruw message
     **/
    function impruw_footer_selector(){
        return ">.row:last-child";
    }
    add_filter('impruw_footer_selector', 'impruw_footer_selector');