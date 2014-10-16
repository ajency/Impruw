<?php

function impruw_wp_enqueue_styles(){

    //dequeue styles
    // wp_dequeue_style( 'rs-plugin-settings' );
    //wp_dequeue_style( 'rs-captions' );

    if(is_page('site-builder') || is_page('dashboard'))
        return;

    // styles from parent
    wp_enqueue_style('bootstrap', 
        get_parent_template_directory_uri() . '/bower_components/bootstrap/dist/css/bootstrap.min.css', 
        array(), JSVERSION );
    wp_enqueue_style( 'flat-ui', 
        get_parent_template_directory_uri() . '/bower_components/flat-ui/dist/css/flat-ui.min.css', 
        array('bootstrap'), JSVERSION );
    wp_enqueue_style( 'im-jquery-ui', 
        get_parent_template_directory_uri() . '/js/jquery-ui/jquery-ui.min.css', 
        array('bootstrap'), JSVERSION );
    wp_enqueue_style( 'slimmenu', 
        get_parent_template_directory_uri() . '/css/slimmenu.min.css', 
        array('flat-ui'), JSVERSION );
    wp_enqueue_style( 'lightbox', 
        get_parent_template_directory_uri() . '/bower_components/lightbox2/css/lightbox.min.css', 
        array('slimmenu'), JSVERSION );
    wp_enqueue_style( 'custom-css', 
        get_parent_template_directory_uri() . '/css/custom.css', 
        array('lightbox'), JSVERSION );
    wp_enqueue_style( 'parentstyle', 
            get_parent_template_directory_uri() . '/css/style.css', 
            array('lightbox'), JSVERSION );

    if(!is_impruw_demo_site()){
        $theme_style_path = get_theme_style_sheet_file_path();
        wp_enqueue_style( 'theme-style', $theme_style_path, array('parentstyle'), JSVERSION );
    }
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
    wp_enqueue_style( 'im-jquery-ui', 
        get_parent_template_directory_uri() . '/js/jquery-ui/jquery-ui.min.css', 
        array('bootstrap'), JSVERSION );
    wp_enqueue_style( 'pace', 
        get_parent_template_directory_uri() . '/bower_components/pace/themes/orange/pace-theme-minimal.css', 
        array('bootstrap'), JSVERSION );
    wp_enqueue_style( 'minicolors', 
        get_parent_template_directory_uri() . '/bower_components/jquery-minicolors/jquery.minicolors.css', 
        array('bootstrap'), JSVERSION );
    wp_enqueue_style( 'slimmenu', 
        get_parent_template_directory_uri() . '/bower_components/slimmenu/slimmenu.min.css', 
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
    wp_enqueue_style( 'im-jquery-ui-css', 
        get_parent_template_directory_uri() . '/js/jquery-ui/jquery-ui.min.css', 
        array('bootstrap'), JSVERSION );
    wp_enqueue_style( 'pace', 
        get_parent_template_directory_uri() . '/bower_components/pace/themes/orange/pace-theme-minimal.css', 
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

    wp_enqueue_script( 'imp-jquery', 
        get_parent_template_directory_uri() . '/bower_components/jquery/dist/jquery.min.js', 
        array(), JSVERSION, false);
    wp_enqueue_script( 'bootstrap', 
        get_parent_template_directory_uri() . '/bower_components/bootstrap/dist/js/bootstrap.min.js', 
        array('imp-jquery'), JSVERSION, true);
    wp_enqueue_script( 'lightbox', 
        get_parent_template_directory_uri() . '/bower_components/lightbox2/js/lightbox.min.js', 
        array('imp-jquery'), JSVERSION, true);
    wp_enqueue_script( 'im-jquery-ui', 
        get_parent_template_directory_uri() . '/js/jquery-ui/jquery-ui.min.js', 
        array('imp-jquery'), JSVERSION, true);
    wp_enqueue_script( 'moment-js', 
        get_parent_template_directory_uri() . '/js/moment/moment.min.js', 
        array('imp-jquery'), JSVERSION, true);
    wp_enqueue_script( 'moment-range-js', 
        get_parent_template_directory_uri() . '/js/moment/moment.range.min.js', 
        array('imp-jquery'), JSVERSION, true);
    wp_enqueue_script( 'polyglot', 
        get_parent_template_directory_uri() . '/js/polyglot/polyglot.min.js', 
        array('imp-jquery'), JSVERSION, true);
    wp_enqueue_script( 'slimmenu', 
        get_parent_template_directory_uri() . '/bower_components/slimmenu/jquery.slimmenu.min.js', 
        array('imp-jquery'), JSVERSION, true);
    wp_enqueue_script( 'jq-validation', 
        get_parent_template_directory_uri() . '/bower_components/jquery-validation/dist/jquery.validate.min.js', 
        array('imp-jquery'), JSVERSION, true);
    wp_enqueue_script( 'themepunch.plugins', 
        plugins_url() . '/revslider/rs-plugin/js/jquery.themepunch.plugins.min.js', 
        array('imp-jquery'), JSVERSION, true);
    wp_enqueue_script( 'themepunch.revolution', 
        plugins_url() . '/revslider/rs-plugin/js/jquery.themepunch.revolution.min.js', 
        array('imp-jquery'), JSVERSION, true);
    wp_enqueue_script( 'isotope', 
        get_parent_template_directory_uri() . '/app/dev/js/plugins/isotope.js', 
        array('imp-jquery'), JSVERSION, true);
    wp_enqueue_script( 'polyglot', 
        get_parent_template_directory_uri() . '/app/dev/js/plugins/polyglot.js', 
        array('imp-jquery'), JSVERSION, true);

     if(is_impruw_demo_site()){
        wp_enqueue_script( 'jquery-cookie', 
            get_parent_template_directory_uri( ).  '/js/jquery.cookie.js', 
            array('imp-jquery'), JSVERSION, true);
        wp_enqueue_script( 'tabSlideOut', 
            get_parent_template_directory_uri( ).  '/app/dev/js/plugins/jquery.tabSlideOut.v1.3.js', 
            array('imp-jquery'), JSVERSION, true);
     }

    //custom script
    wp_enqueue_script( 'script', 
        get_parent_template_directory_uri() . '/js/script.js', 
        array('imp-jquery'), JSVERSION, true);
    
}
add_action('wp_enqueue_scripts' , 'impruw_wp_enqueue_scripts', 1000 );


function theme_style_link_tag(){
    
    if(!is_impruw_demo_site())
        return;

    echo '<style>
            body {visibility:hidden;}
        </style>
        <link class="theme-style" href="" type="text/css" rel="stylesheet"/>';
}
add_action('wp_head', 'theme_style_link_tag');