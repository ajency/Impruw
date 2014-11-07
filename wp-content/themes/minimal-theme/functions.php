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
                    'color' => '#ED1C24',
                    'title' => 'First Colour',
                    'tooltip' => 'Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background',
                    'description' => 'Used in Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#831618',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings',
                    'description' => 'Used in Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings'
                ),
                'tertiary1' => array(
                    'color' => '#FFFFFF',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Site Background, Social Links',
                    'description' => 'Used in Menu, Room Elements, Site Background, Social Links'
                ),
                'quarternary1' => array(
                    'color' => '#282827',
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
                    'color' => '#282827',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#ED1C24',
                    'title' => 'Button Colour',
                    'tooltip' => 'Button Elements',
                    'description' => 'Used in Buttons'
                )
            ),
            array(
                'name' => 'Something Blue',
                'primary1' => array(
                    'color' => '#3B5997',
                    'title' => 'First Colour',
                    'tooltip' => 'Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background',
                    'description' => 'Used in Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#293E6B',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings',
                    'description' => 'Used in Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings'
                ),
                'tertiary1' => array(
                    'color' => '#FFFFFF',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Site Background, Social Links',
                    'description' => 'Used in Menu, Room Elements, Site Background, Social Links'
                ),
                'quarternary1' => array(
                    'color' => '#282827',
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
                    'color' => '#282827',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#3B5997',
                    'title' => 'Button Colour',
                    'tooltip' => 'Button Elements',
                    'description' => 'Used in Buttons'
                )
            ),
            array(
                'name' => 'Aquamarine',
                'primary1' => array(
                    'color' => '#7EC2AB',
                    'title' => 'First Colour',
                    'tooltip' => 'Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background',
                    'description' => 'Used in Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#4DA8A1',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings',
                    'description' => 'Used in Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings'
                ),
                'tertiary1' => array(
                    'color' => '#FFFFFF',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Site Background, Social Links',
                    'description' => 'Used in Menu, Room Elements, Site Background, Social Links'
                ),
                'quarternary1' => array(
                    'color' => '#282827',
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
                    'color' => '#282827',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#7EC2AB',
                    'title' => 'Button Colour',
                    'tooltip' => 'Button Elements',
                    'description' => 'Used in Buttons'
                )
            ),
            array(
                'name' => 'Earth Tones',
                'primary1' => array(
                    'color' => '#776251',
                    'title' => 'First Colour',
                    'tooltip' => 'Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background',
                    'description' => 'Used in Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#48372F',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings',
                    'description' => 'Used in Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings'
                ),
                'tertiary1' => array(
                    'color' => '#FFFFFF',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Site Background, Social Links',
                    'description' => 'Used in Menu, Room Elements, Site Background, Social Links'
                ),
                'quarternary1' => array(
                    'color' => '#282827',
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
                    'color' => '#282827',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#776251',
                    'title' => 'Button Colour',
                    'tooltip' => 'Button Elements',
                    'description' => 'Used in Buttons'
                )
            ),
            array(
                'name' => 'Deep Blue Sky',
                'primary1' => array(
                    'color' => '#0E9FB4',
                    'title' => 'First Colour',
                    'tooltip' => 'Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background',
                    'description' => 'Used in Contact Form, Links, Buttons, Menu, Room Elements, Slider, Social Links, Headings, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#162737',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings',
                    'description' => 'Used in Address Elements, Image with Text, Menu, Room Elements, Social Links, Headings'
                ),
                'tertiary1' => array(
                    'color' => '#FFFFFF',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Site Background, Social Links',
                    'description' => 'Used in Menu, Room Elements, Site Background, Social Links'
                ),
                'quarternary1' => array(
                    'color' => '#282827',
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
                    'color' => '#282827',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#0E9FB4',
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
                    )
                  ),
        'Row' => array(
                    array(
                        'name'      => 'Menu Bar',
                        'desc' => 'this is description for Menu Bar'
                    ),
                    array(
                        'name'      => 'Footer Bar',
                        'desc' => 'this is description for Footer Bar'                
                    ),
                    array(
                        'name'      => 'Padded Container',
                        'desc' => 'this is description for Padded Container'
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
                    'name' => 'Default Style'
                )
            ),
        'ImageWithText' => array(
                array(
                    'name' => 'Default Style'
                )
            )
    );

    /**
     * Footer selector for the theme powered by Impruw message
     **/
    function impruw_footer_selector(){
        return ".site-footer [class^='col-']:last";
    }
    add_filter('impruw_footer_selector', 'impruw_footer_selector');