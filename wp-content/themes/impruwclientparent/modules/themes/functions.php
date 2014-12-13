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

    $args = wp_parse_args( $args, array( 'post_type' => 'theme', 'posts_per_page' => -1, 'status' => 'published' ) );

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


function get_theme_color_sets(){
    $theme_set_color = theme_color_sets();

    $custom_set = get_option( 'custom_theme_color_set' );

    if ( !empty( $custom_set ) ) {

        $custom_set_array = array( maybe_unserialize( $custom_set ) );

        $theme_set_color = wp_parse_args( $custom_set_array, $theme_set_color );
    }

    return $theme_set_color;
}

/**
 * COnverts the passed theme id object in required format
 */
function convert_to_theme_format( $theme ) {

    $data = array();

    $data[ 'ID' ] = $theme->ID;

    $data[ 'post_title' ] = $theme->post_title;
    $data[ 'post_name' ]  = $theme->post_name;


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


    if ( isset( $_GET['revision'] ) ) {
        $revision_id = (int) $_GET['revision'];

        $color_scheme_data =  get_post_meta( $revision_id, 'color-scheme-data', true );
        if ( !empty($color_scheme_data) ){
            $color_scheme_data = maybe_unserialize( $color_scheme_data );
            $css_filename = $color_scheme_data['theme-style-filename'];
            // 
            // if (empty($css_filename)) 
            //     $css_filename = 'theme-style';
            $compiled_css_file = get_compiled_stylesheet_directory_path() . '/' . $css_filename . '.css';

            if ( file_exists( $compiled_css_file ) )
                return get_compiled_stylesheet_directory_uri() . '/' . $css_filename . '.css';
        }


        $theme = get_post_meta($revision_id,'page-theme',true);

        // $current_theme = wp_get_theme(); 
        // if not then switch the theme -- this creates a backup of the site
        // if ($current_theme->name != $theme){
            if( $theme == 'Diamond Theme')
                $theme = 'Theme Diamond';
            return get_theme_root_uri().'/'.sanitize_title( $theme ).'/css/theme-style.css';
        // }
    }

    $css_filename = get_option( 'theme-style-filename' );
    if( !$css_filename )
        $css_filename = 'theme-style';

    $compiled_css_file = get_compiled_stylesheet_directory_path() . '/' . $css_filename . '.css';

    if ( file_exists( $compiled_css_file ) )

        return get_compiled_stylesheet_directory_uri() . '/' . $css_filename . '.css';

    return get_template_directory_uri() . '/css/theme-style.css';
}

function create_custom_theme_color( $formdata ) {

    $edited_theme_values = $formdata[ 'formdata' ];

    $model_set_values = $formdata[ 'modeldata' ];

    $custom_theme_color = replace_modeldata_with_edited_set_color( $edited_theme_values, $model_set_values );

    $custom_theme_json = maybe_serialize( $custom_theme_color );

    update_option( 'custom_theme_color_set', $custom_theme_json );

    $color_scheme = uniqid();

    switch_theme_colour( $edited_theme_values , $color_scheme );

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

function clear_compile_stylesheet() {

    $file_path = get_compiled_stylesheet_directory_path() . "/theme-style.css";

    if ( file_exists( $file_path ) )
        unlink( $file_path );
}

function reset_colorset_option_to_default() {

    update_option( "current_color_set", "default" );
}


// font
function save_theme_font( $data ){

    $font_type = $data['type'];
    unset( $data['type'] );
    if ( $data['family'] == 'Default' )
        $data = array();
    $data['ID'] = 1;

    // $theme_data = maybe_serialize( $data );
    update_option( $font_type, $data );
    return 1;
}

function get_theme_font( $type ){
    if(isset($_GET['revision']) ){
                
        $revision_id = (int) $_GET['revision'];
        $font_data =  get_post_meta( $revision_id, 'font-data', true ) ;
        if ( !empty($font_data) ){
            $font_data = maybe_unserialize( $font_data );
            $theme_data = $font_data[ $type ];
        }
        else
            $theme_data = array('ID' => 1);

    }
    else{
    // $default_font->type = $type;
        $theme_data = get_option( $type );
        if (!$theme_data){
            $theme_data = array( 'ID' => 1);
            update_option( $type, $theme_data);
        }
    }
    $theme_data['type'] = $type;
    return $theme_data;
}

function get_theme_font_markup(){
   
    get_theme_font_markup_html('theme_font_main','theme-font-style', '.site-style-container');
    if ( is_sec_font_allowed() == 'TRUE')
        get_theme_font_markup_html('theme_font_sec', 'theme-sec-font-style', '.menu-collapser, .title.page-title, 
            .title.action-title, .room-title-container .room-title h1 , .roomsummary .room-title, 
            .booking-title, .room-facilities-container .room-facilities-title h4' );

}
function get_theme_font_markup_html( $type, $id, $classes){
    $font_data = get_theme_font( $type );
    if(isset($font_data['family'])){
        ?>
        <style id='<?php echo $id ?>'> @font-face {
                        font-family: '<?php echo $font_data["family"]; ?>';
                        src: url('<?php echo isset($font_data['files']['regular']) ?
                         $font_data['files']['regular'] :  $font_data['files'][0];  ?>');
                     }
                    <?php echo $classes ?>{
                        font-family : '<?php echo $font_data["family"]; ?>', <?php echo $font_data["category"];  ?>;
                    }</style>
        <?php
    }

}

function is_sec_font_allowed(){
    $sec_font_allowed_array = array('Diamond Theme');
    if (in_array(wp_get_theme(), $sec_font_allowed_array ))
        return 'TRUE';
    else
        return 'FALSE';
}

