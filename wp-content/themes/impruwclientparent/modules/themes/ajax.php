<?php

require_once 'functions.php';

/**
 * Ajax handler to get all themes
 */
function ajax_get_theme() {

    $themes = get_impruw_themes();

    wp_send_json( array( 'code' => 'OK', 'data' => $themes ) );
}

add_action( 'wp_ajax_get-themes', 'ajax_get_theme' );

/**
 * Function to return the default color sets for changing theme colors
 *
 * @return color array
 */
function ajax_get_default_theme_color_set() {

    $theme_set_color = theme_color_sets();

    $custom_set = get_option( 'custom_theme_color_set' );

    if ( !empty( $custom_set ) ) {

        $custom_set_array = array( maybe_unserialize( $custom_set ) );

        $theme_set_color = wp_parse_args( $custom_set_array, $theme_set_color );
    }

    wp_send_json( array( 'code' => 'OK', 'data' => $theme_set_color ) );
}

add_action( 'wp_ajax_get-default-theme-color-set', 'ajax_get_default_theme_color_set' );

/**
 *
 * Function to change the theme color based on sets selected
 *
 */
function ajax_change_theme_color() {

    unset( $_POST[ 'action' ] );

    $set_colors = $_POST[ 'formdata' ];

    update_option( 'current_color_set', $_POST[ 'formdata' ][ 'name' ] );

    // return single theme color set in key-value format
    $colors = set_color_to_array( $set_colors );

    $color_name = $colors[ 'name' ];

    if ( $color_name == 'custom' )
        $color_scheme = uniqid();
    else 
        $color_scheme = sanitize_title( $color_name );

    unset( $colors[ 'name' ] );

    switch_theme_colour( $colors , $color_scheme );

    wp_send_json( array( 'code' => 'OK' ) );
}

add_action( 'wp_ajax_change-theme-color', 'ajax_change_theme_color' );

/**
 * Function to create custom theme color sets
 */
function ajax_create_custom_theme_color() {

    unset( $_POST[ 'action' ] );

    $formdata = $_POST;

    create_custom_theme_color( $formdata );

    wp_send_json( array( 'code' => 'OK' ) );

}

add_action( 'wp_ajax_create-custom-theme-color', 'ajax_create_custom_theme_color' );


// fonts
function ajax_create_theme_font(){
    unset( $_POST['action'] );
    $data = $_POST;
    $id = save_theme_font( $data );
    wp_send_json( array( 'code' => 'OK', 'data' => array('ID' => $id )) );
}
add_action( 'wp_ajax_create-fonts','ajax_create_theme_font');
add_action( 'wp_ajax_update-fonts','ajax_create_theme_font');