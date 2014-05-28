<?php

/**
 * gets all themes for the main site
 * uses all args same as WP_Query
 *
 * @param type $args
 *
 * @return type
 */
function get_impruw_themes( $args = array() ) {

    // all themes are located on main site. so switch to blog
    switch_to_blog( 1 );

    $args = wp_parse_args( $args, array( 'post_type' => 'theme' ) );

    $themes = get_posts( $args );

    $themes_data = array();

    //let convert it to required format
    if ( count( $themes ) > 0 ) {

        foreach ( $themes as $theme ) {
            $themes_data[ ] = convert_to_theme_format( $theme );
        }
    }

    restore_current_blog();

    return $themes_data;
}

/**
 * COnverts the passed theme id object in required format
 */
function convert_to_theme_format( $theme ) {

    $data = array();

    $data[ 'ID' ] = $theme->ID;

    $data[ 'post_title' ] = $theme->post_title;

    // get theme image url
    $data[ 'image_url' ] = get_theme_image_url( $theme->ID );

    // get preview link
    $data[ 'preview_link' ] = get_theme_preview_link( $theme->ID );

    return $data;
}

/**
 * Get the theme image URL
 *
 * @param type $ID
 *
 * @return type
 */
function get_theme_image_url( $ID, $size = 'medium' ) {

    if ( !is_numeric( $ID ) )
        return FALSE;

    $image_id = get_post_thumbnail_id( $ID );

    $image_url = wp_get_attachment_image_src( $image_id, $size );

    return is_array( $image_url ) ? $image_url[ 0 ] : site_url();
}

/**
 * Get theme preview link
 *
 * @param type $ID
 *
 * @return string
 */
function get_theme_preview_link( $ID ) {

    $site_id = get_post_meta( $ID, 'linked_theme', TRUE );

    $link = '#';

    if ( is_numeric( $site_id ) ) {
        switch_to_blog( $site_id );
        $link = site_url();
        restore_current_blog();
    }

    return $link;
}

/**
 * Is theme selected
 * @return boolean
 */
function is_theme_choosed() {

    $status = get_option( 'site_status', 'online' );

    if ( $status != 'coming_soon' )
        return 1;

    return 0;
}

function get_theme_style_sheet_file_path() {

    $compiled_css_file = get_compiled_stylesheet_directory_path() . '/theme-style.css';

    if ( file_exists( $compiled_css_file ) )

        return get_compiled_stylesheet_directory_uri() . '/theme-style.css';

    return get_template_directory_uri() . '/css/theme-style.css';;
}

function create_custom_theme_color( $formdata ) {

    $edited_theme_values = $formdata[ 'formdata' ];

    $model_set_values = $formdata[ 'modeldata' ];

    $custom_theme_color = replace_modeldata_with_edited_set_color( $edited_theme_values, $model_set_values );

    $custom_theme_json = maybe_serialize( $custom_theme_color );

    update_option( 'custom_theme_color_set', $custom_theme_json );

    switch_theme_colour( $edited_theme_values );

    update_option( 'current_color_set', 'custom' );
}

/**
 *
 * Function to replace the model data with the edited color set values
 *
 * @param $edited_theme_values
 * @param $model_set_values
 *
 * @return mixed
 */
function replace_modeldata_with_edited_set_color( $edited_theme_values, $model_set_values ) {

    $model_set_values[ 'name' ] = "custom";

    foreach ( $model_set_values as $key => $value ) {

        if ( array_key_exists( $key, $edited_theme_values ) ) {

            $model_set_values[ $key ][ 'color' ] = $edited_theme_values[ $key ];
        }
    }

    return $model_set_values;
}

/**
 * Function to return the color array from the nested theme set color array\
 *
 * @param $themecolorset
 *
 * @return color array
 */
function convert_themecolor_set_to_array( $themecolorset ) {

    $color_set = array();

    foreach ( $themecolorset as $key => $singleset ) {

        $color_set[ $key ] = set_color_to_array( $singleset );
    }

    return $color_set;
}

/**
 * Function to get single set colors and return in proper key-value format
 *
 * @param $singleset
 *
 * @return array
 */

function set_color_to_array( $singleset ) {

    $color_set = array();

    foreach ( $singleset as $key => $value ) {

        // check if nested array
        $has_child = count( $value, COUNT_RECURSIVE );

        if ( $has_child != 1 )
            $color_set[ $key ] = $value[ 'color' ];

        else
            // get the name of the set
            $color_set[ $key ] = $value;
    }

    return $color_set;
}

function clear_compile_stylesheet(){
    $file_path = get_compiled_stylesheet_directory_path() . "/theme-style.css";

    if(file_exists($file_path))
        unlink($file_path);
}

function reset_colorset_option_to_default(){
    update_option("current_color_set", "default");
}