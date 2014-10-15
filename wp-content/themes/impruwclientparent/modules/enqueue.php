<?php

function impruw_wp_enqueue_styles(){

    //dequeue styles
    wp_dequeue_style( 'rs-plugin-settings' );
    wp_dequeue_style( 'rs-captions' );

    if(is_page('site-builder') || is_page('dashboard'))
        return;

    // styles from parent
    wp_enqueue_style('bootstrap', 
        get_parent_template_directory_uri() . '/bower_components/bootstrap/dist/css/bootstrap.min.css', 
        array(), JSVERSION );
    wp_enqueue_style( 'flat-ui', 
        get_parent_template_directory_uri() . '/bower_components/flat-ui/dist/css/flat-ui.min.css', 
        array('bootstrap'), JSVERSION );
    wp_enqueue_style( 'slimmenu', 
        get_parent_template_directory_uri() . '/css/slimmenu.css', 
        array('flat-ui'), JSVERSION );
    wp_enqueue_style( 'lightbox', 
        get_parent_template_directory_uri() . '/bower_components/lightbox2/css/lightbox.css', 
        array('slimmenu'), JSVERSION );
    wp_enqueue_style( 'parentstyle', 
        get_parent_template_directory_uri() . '/css/style.css', 
        array('lightbox'), JSVERSION );

    // include the theme style
    $theme_style_path = get_theme_style_sheet_file_path();
    wp_enqueue_style( 'theme-style', $theme_style_path, array('parentstyle'), JSVERSION );
}
add_action('wp_enqueue_scripts' , 'impruw_wp_enqueue_styles', 1000 );

function impruw_wp_enqueue_builder_styles(){

    if(!is_page('site-builder'))
        return;

    // styles from parent
    wp_enqueue_style('bootstrap', 
        get_parent_template_directory_uri() . '/bower_components/bootstrap/dist/css/bootstrap.min.css', 
        array(), JSVERSION );
    wp_enqueue_style( 'flat-ui', 
        get_parent_template_directory_uri() . '/bower_components/flat-ui/dist/css/flat-ui.min.css', 
        array('bootstrap'), JSVERSION );
    wp_enqueue_style( 'jquery-ui', 
        get_parent_template_directory_uri() . '/bower_components/jquery-ui/themes/base/all.css', 
        array('bootstrap'), JSVERSION );
    wp_enqueue_style( 'pace', 
        get_parent_template_directory_uri() . '/bower_components/pace/themes/orange/pace-theme-loading-bar.css', 
        array('bootstrap'), JSVERSION );
    wp_enqueue_style( 'minicolors', 
        get_parent_template_directory_uri() . '/bower_components/jquery-minicolors/jquery.minicolors.css', 
        array('bootstrap'), JSVERSION );
    wp_enqueue_style( 'slimmenu', 
        get_parent_template_directory_uri() . '/css/slimmenu.css', 
        array('flat-ui'), JSVERSION );
    wp_enqueue_style( 'switch', 
        get_parent_template_directory_uri() . '/css/toggle-switch.css', 
        array('flat-ui'), JSVERSION );
    wp_enqueue_style( 'parentstyle', 
        get_parent_template_directory_uri() . '/css/style.css', 
        array('slimmenu'), JSVERSION );
    wp_enqueue_style( 'dashicon', 
        site_url() . '/wp-includes/css/dashicons.min.css', 
        array('parentstyle'), JSVERSION );
    wp_enqueue_style( 'imgareaselect', 
        site_url() . '/wp-includes/js/imgareaselect/imgareaselect.css', 
        array('parentstyle'), JSVERSION );
    wp_enqueue_style( 'media-rtl', 
        site_url() . '/wp-admin/css/media-rtl.css', 
        array('parentstyle'), JSVERSION );
    wp_enqueue_style( 'wp-media', 
        site_url() . '/wp-admin/css/media.css', 
        array('parentstyle'), JSVERSION );
    wp_enqueue_style( 'maincss', 
        get_parent_template_directory_uri() . '/css/main.css', 
        array('parentstyle'), JSVERSION );
    wp_enqueue_style( 'custom-css', 
        get_parent_template_directory_uri() . '/css/custom.css', 
        array('parentstyle'), JSVERSION );
    wp_enqueue_style( 'builderstyle', 
        get_parent_template_directory_uri() . '/css/builder.css', 
        array('parentstyle'), JSVERSION );
    // include the theme style
    $theme_style_path = get_theme_style_sheet_file_path();
    wp_enqueue_style( 'theme-style', $theme_style_path, array('builderstyle'), JSVERSION );
}
add_action('wp_enqueue_scripts' , 'impruw_wp_enqueue_builder_styles', 1000 );

function impruw_wp_enqueue_dashboard_styles(){

    if(!is_page('dashboard'))
        return;

    // styles from parent
    wp_enqueue_style('bootstrap', 
        get_parent_template_directory_uri() . '/bower_components/bootstrap/dist/css/bootstrap.min.css', 
        array(), JSVERSION );
    wp_enqueue_style( 'flat-ui', 
        get_parent_template_directory_uri() . '/bower_components/flat-ui/dist/css/flat-ui.min.css', 
        array('bootstrap'), JSVERSION );
    wp_enqueue_style( 'jquery-ui', 
        get_parent_template_directory_uri() . '/bower_components/jquery-ui/themes/base/all.css', 
        array('bootstrap'), JSVERSION );
    wp_enqueue_style( 'pace', 
        get_parent_template_directory_uri() . '/bower_components/pace/themes/orange/pace-theme-loading-bar.css', 
        array('bootstrap'), JSVERSION );
    wp_enqueue_style( 'minicolors', 
        get_parent_template_directory_uri() . '/bower_components/jquery-minicolors/jquery.minicolors.css', 
        array('bootstrap'), JSVERSION );
    wp_enqueue_style( 'switch', 
        get_parent_template_directory_uri() . '/css/toggle-switch.css', 
        array('flat-ui'), JSVERSION );
    wp_enqueue_style( 'dashicon', 
        site_url() . '/wp-includes/css/dashicons.min.css', 
        array('flat-ui'), JSVERSION );
    wp_enqueue_style( 'imgareaselect', 
        site_url() . '/wp-includes/js/imgareaselect/imgareaselect.css', 
        array('flat-ui'), JSVERSION );
    wp_enqueue_style( 'media-rtl', 
        site_url() . '/wp-admin/css/media-rtl.css', 
        array('flat-ui'), JSVERSION );
    wp_enqueue_style( 'wp-media', 
        site_url() . '/wp-admin/css/media.css', 
        array('flat-ui'), JSVERSION );
    wp_enqueue_style( 'maincss', 
        get_parent_template_directory_uri() . '/css/main.css', 
        array('flat-ui'), JSVERSION );
    wp_enqueue_style( 'custom-css', 
        get_parent_template_directory_uri() . '/css/custom.css', 
        array('flat-ui'), JSVERSION );
    wp_enqueue_style( 'dashboardstyle', 
        get_parent_template_directory_uri() . '/css/dashboard.css', 
        array('flat-ui'), JSVERSION );
}
add_action('wp_enqueue_scripts' , 'impruw_wp_enqueue_dashboard_styles', 1000 );


function impruw_wp_enqueue_scripts(){
    // ensure no javascript file is loaded
    wp_dequeue_script( 'jquery' );
    wp_dequeue_script( 'themepunchtools' );
    wp_dequeue_script( 'revslider-jquery.themepunch.revolution.min' );

    if(is_page('site-builder') || is_page('dashboard'))
        return;

}
add_action('wp_enqueue_scripts' , 'impruw_wp_enqueue_scripts', 1000 );