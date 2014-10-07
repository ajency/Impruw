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

        return site_url('wp-content/themes/pink-theme');
    }

    add_filter('template_directory_uri', 'site_template_directory_uri', 10, 3);

    define('CURRENTTHEMEPATH', ABSPATH . 'wp-content/themes/pink-theme/');

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
                    'color' => '#FF5F5F',
                    'title' => 'First Colour',
                    'tooltip' => 'Links, Headings, Side Menu, Room Elements, Social Links, Selection Background',
                    'description' => 'Used in Links, Headings, Side Menu, Room Elements, Social Links, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#E9E9E9',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Element, Menu, Room Elements, Row Elements, Headings',
                    'description' => 'Used in Address Element, Menu, Room Elements, Row Elements, Headings'
                ),
                'tertiary1' => array(
                    'color' => '#2A3B66',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Headings',
                    'description' => 'Used in Menu, Room Elements, Headings'
                ),
                'text-color' => array(
                    'color' => '#989898',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#FF5F5F',
                    'title' => 'Button Colour',
                    'tooltip' => 'Button Elements',
                    'description' => 'Used in Buttons'
                )
            ),
            array(
                'name' => 'Sail Away',
                'primary1' => array(
                    'color' => '#3F5765',
                    'title' => 'First Colour',
                    'tooltip' => 'Links, Headings, Side Menu, Room Elements, Social Links, Selection Background',
                    'description' => 'Used in Links, Headings, Side Menu, Room Elements, Social Links, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#C3DAE3',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Element, Menu, Room Elements, Row Elements, Headings',
                    'description' => 'Used in Address Element, Menu, Room Elements, Row Elements, Headings'
                ),
                'tertiary1' => array(
                    'color' => '#fd8a33',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Headings',
                    'description' => 'Used in Menu, Room Elements, Headings'
                ),
                'text-color' => array(
                    'color' => '#989898',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#3F5765',
                    'title' => 'Button Colour',
                    'tooltip' => 'Button Elements',
                    'description' => 'Used in Buttons'
                )
            ),
            array(
                'name' => 'Planet Earth',
                'primary1' => array(
                    'color' => '#5F9C9F',
                    'title' => 'First Colour',
                    'tooltip' => 'Links, Headings, Side Menu, Room Elements, Social Links, Selection Background',
                    'description' => 'Used in Links, Headings, Side Menu, Room Elements, Social Links, Selection Background'
                ),
                'secondary1' => array(
                    'color' => '#E2DA99',
                    'title' => 'Second Colour',
                    'tooltip' => 'Address Element, Menu, Room Elements, Row Elements, Headings',
                    'description' => 'Used in Address Element, Menu, Room Elements, Row Elements, Headings'
                ),
                'tertiary1' => array(
                    'color' => '#342800',
                    'title' => 'Third Colour',
                    'tooltip' => 'Menu, Room Elements, Headings',
                    'description' => 'Used in Menu, Room Elements, Headings'
                ),
                'text-color' => array(
                    'color' => '#989898',
                    'title' => 'Text Colour',
                    'tooltip' => 'Text Elements',
                    'description' => 'Used for the text colour across the site'
                ),
                'button-color' => array(
                    'color' => '#5F9C9F',
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

        add_image_size( 'small_img', 300, 225 );

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

    $element_templates = array('Menu' => array(array('name' => 'Left Menu')), 'Title' => array(array('name' => 'Page Title',), array('name' => 'Blue Capital Title',)), 'Row' => array(array('name' => 'Slideshow Container'), array('name' => 'Long Bar')), 'Social' => array(array('name' => 'Default Style'), array('name' => 'Small Social')), 'Link' => array(array('name' => 'Default Style'), array('name' => 'Button')), 'ContactForm' => array(array('name' => 'Style One'), array('name' => 'Style Two')), 'ImageWithText' => array(array('name' => 'Style One'), array('name' => 'Style Two')));

    /**** Custom Markup for Responsive Panel Menu ****/
    function add_responsive_menu_markup($html, $element)
    {

        if (sanitize_title($element['style']) !== 'long-bar')
            return $html;

        $logo_id = get_option('logo_id', 0);
        $logo    = '';
        if ($logo_id === 0) {
            $logo = 'placeholder image';
        } else {
            $image = wp_get_attachment_image_src($logo_id, 'full');
            $logo  = $image[0];
        }


        return $html . '<div id="left-bar-open" class="clearfix">
                        <a href="#fakelink" class="left-menu-trigger"><span class="glyphicon glyphicon-chevron-right"></span></a>
                        <a href="' . site_url() . '" class="logo"><img class="img-responsive" src="' . $logo . '"></a>
                    </div>';

    }

    add_filter('row_markup', 'add_responsive_menu_markup', 20, 2);

    /**** Add Custom JS for This Theme ****/
    function theme_specific_js()
    {
        echo '<script src=" ' . get_stylesheet_directory_uri() . '/js/jquery.jpanelmenu.min.js"></script>';
        echo '<script src=" ' . get_stylesheet_directory_uri() . '/js/theme.js"></script>';
        echo '<script>
            jQuery(document).ready(function(){
                var jPM = jQuery.jPanelMenu({
                    menu: ".left-menu",
                    trigger: ".left-menu-trigger",
                    excludedPanelContent : "script, style, .options-div",
                    keyboardShortcuts: false
                });

                jPM.on();
            });
          </script>';
    }

    add_action('wp_footer', 'theme_specific_js');

     /**
     * Footer selector for the theme powered by Impruw message
     **/
    function impruw_footer_selector(){
        return "[class^='col-']:last";
    }
    add_filter('impruw_footer_selector', 'impruw_footer_selector');