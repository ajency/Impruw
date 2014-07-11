<?php

/**
 * Gets the site Details
 *
 * @param type $site_id
 *
 * @return type
 */
function get_site_details( $site_id = 0 ) {

    if ( $site_id === 0 )
        $site_id = get_current_blog_id();

    // fetching the image path for the logo
    $logo_id    = get_option( 'logo_id', 0 );
    $image_path = get_post_field( 'guid', $logo_id );

    return array( 'site_id'        => $site_id,
                  'site_domain'    => get_site_domain( $site_id ),
                  'site_name'      => get_option( 'blogname' ),
                  'admin_email'    => get_option( 'admin_email' ),
                  'street'         => get_option( 'street', '' ),
                  'postal_code'    => get_option( 'postal_code', '' ),
                  'city'           => get_option( 'city', '' ),
                  'logo_id'        => $logo_id,
                  'logo_url'       => $image_path, 'country' => get_option( 'country', '' ),
                  'other_emails'   => get_option( 'other_emails', array() ),
                  'other_phone_no' => get_option( 'other_phone_no', array() ),
                  'facebook'       => get_option( 'facebook', '' ),
                  'twitter'        => get_option( 'twitter', '' ) );
}

/**
 * Returns the domain of the site
 *
 * @param type $domain
 *
 * @return string
 */
function get_site_domain( $site_id ) {

    // new site will be created from main site always. hence, blog_id is 1
    $site = get_blog_details( $site_id );

    $domain = '';

    if ( is_subdomain_install() )
        $domain = preg_replace( '|^www\.|', '', $site->domain );
    else
        $domain = $site->domain;

    return $domain;
}

/**
 * Assign the new theme to site
 *
 * @param type $site_id
 * @param type $theme_id
 */
function assign_theme_to_site( $theme_post_id, $clone_pages = FALSE ) {

    // all themes are stored on main site
    switch_to_blog( 1 );

    // check if passed theme_id exists
    $theme = get_post( $theme_post_id );

    // if theme does not exists
    if ( null === $theme ){
        restore_current_blog();
        return FALSE;
    }

    $theme_site_id = get_post_meta( $theme_post_id, 'linked_theme', TRUE );

    $theme_name = get_theme_name( $theme_site_id );

    restore_current_blog();

    //assign the theme to
    $theme = wp_get_theme( $theme_name ); //Change the name here to change the theme

    if ( $theme->exists() && $theme->is_allowed() )
        switch_theme( $theme->get_stylesheet() );

    clear_compile_stylesheet();
    reset_colorset_option_to_default();

    update_option( 'site_status', 'online' );

    // check if cloned for the first time
    if ( $clone_pages === TRUE ) {
        clone_pages();
    }
    // next is to clone the site
    clone_site( $theme_site_id );
}


/**
 * get language code for a given language name
 * returns language code
 */
function get_language_code( $language_name ) {

    switch ( $language_name ) {
        case "English" :
            $language_code = "en";
            break;
        case "Norwegian" :
            $language_code = "nb";
            break;
        default :
            $language_code = "en";
    }

    return $language_code;
}


/**
 * Add site pages
 * Add menu to site
 */
function clone_pages() {

    $pages = array( array( 'post_title' => 'Home' ),
                    array( 'post_title' => 'About Us' ),
                    array( 'post_title' => 'Rooms' ),
                    array( 'post_title' => 'Single Room' ),
                    array( 'post_title' => 'Gallery' ),
                    array( 'post_title' => 'Contact Us' ) );


    add_pages_to_site( $pages );

    add_menus_to_site();
}

/**
 * Adds two menu to site.
 * Main Menu and Footer Menu
 */
function add_menus_to_site() {

    //give your menu a name
    $name = 'Main Menu';
    //create the menu
    $menu_id = wp_create_nav_menu( $name );

    if( is_wp_error( $menu_id ) )
        return;

    $skip_pages = array( 'Coming Soon', 'Single Room', 'Support', 'Sign In' );

    foreach ( array_reverse( get_all_menu_pages() ) as $page ):

        if ( in_array( $page->post_title, $skip_pages ) )
            continue;

        //then add the actuall link/ menu item and you do this for each item you want to add
        wp_update_nav_menu_item( $menu_id, 0, array( 'menu-item-title' => $page->post_title,
                                                     'menu-item-classes' => $page->post_name,
                                                     'menu-item-url' => '',
                                                     'menu-item-object' => 'page',
                                                     'menu-item-type' => 'post_type',
                                                     'menu-item-object-id' => $page->ID,
                                                     'menu-item-status' => 'publish' ) );


    endforeach;

    //then you set the wanted theme  location
    $locations                  = get_theme_mod( 'nav_menu_locations' );
    $locations[ 'header_menu' ] = $menu_id;
    set_theme_mod( 'nav_menu_locations', $locations );

}

/**
 * Adds new pages to the passed site_id
 *
 * @param type $site_id The site to create pages
 * @param type $user_id The user_id to mark as creator
 * @param type $pages   array of pages to create
 *
 * @return boolean
 */
function add_pages_to_site( $pages, $user_id = 0 ) {

    if ( $user_id === 0 )
        $user_id = get_current_user_id();

    if ( !is_array( $pages ) )
        return FALSE;

    foreach ( $pages as $page ) {

        // page array
        $page_arr = array( 'post_title'   => $page[ 'post_title' ],
                           'post_content' => '',
                           'post_status'  => 'publish',
                           'post_author'  => $user_id,
                           'post_type'    => 'page' );

        // Insert the post into the database
        $post_id = wp_insert_post( $page_arr );

        if ( $page[ 'post_title' ] === 'Home' )
            set_home_page( $post_id );

        // assign the template if passed
        $template = sanitize_title( $page[ 'post_title' ] );
        update_post_meta( $post_id, 'impruw_page_template', $template );
    }

    return TRUE;
}

/**
 * Set the home page for the site
 *
 * @param unknown $post_id
 */
function set_home_page( $post_id ) {

    update_option( 'page_on_front', $post_id );
    update_option( 'show_on_front', 'page' );
}

/**
 *
 * @param type $theme_site_id
 */
function clone_site( $theme_site_id ) {


    clone_header_footer( $theme_site_id );

    $pages = new WP_query( array( 'post_type' => 'page',
                                  'posts_per_page' => -1,
                                  'meta_query' => array(
                                      array(
                                        'key' => 'impruw_page_template',
                                        'value' => array('home','about-us','single-room','contact-us','rooms',
                                            'gallery'),
                                        'compare' => 'IN'
                                      )
                                  )
                                ));

    while($pages->have_posts()):
        $pages->the_post();
        clone_page( $theme_site_id, get_the_ID() );
    endwhile;
}

/**
 * Create a backup of existing pages with current theme
 */
function backup_existing_site() {

    $sections = array_map( 'backup_header_footer', array( 'header', 'footer' ) );

    $pages = get_all_menu_pages();

    $ids = array_map( 'backup_page', $pages );
}

/**
 * Backup header footer of the site
 *
 * @param unknown $section
 */
function backup_header_footer( $section ) {

    $json = get_option( "theme-$section" );
    update_option( "backup-theme-$section", $json );
}

/**
 * Backup the json of the current page
 *
 * @param unknown $page
 *
 * @return boolean|Ambigous <number, unknown>
 */
function backup_page( $page ) {

    $page_id = 0;

    if ( is_numeric( $page ) )
        $page_id = $page;

    if ( is_object( $page ) )
        $page_id = $page->ID;

    if ( $page_id === 0 )
        return FALSE;


    return $page_id;
}

/**
 * add_layout_site
 * Function to assign the json layouyt to a page
 *
 * @param type $blog_id
 * @param type $post_id
 * @param type $file_name
 */
function clone_page( $clone_blog, $post_id ) {

    $impruw_page_template_name = get_post_meta($post_id, 'impruw_page_template', true);

    if($impruw_page_template_name === '')
        return;

    switch_to_blog( $clone_blog );

    $page = get_page_by_impruw_page_template( $impruw_page_template_name );

    if ( $page === false ){
        restore_current_blog();
        return;
    }

    $data = get_json_to_clone( 'page-json', $page->ID );
    restore_current_blog();

    $data = set_json_to_site( $data );

    store_unused_elements( $post_id );
    add_page_json( $post_id, $data );

    delete_all_revisions( $post_id );
    update_page_autosave( $post_id, $data );
}

function get_page_by_impruw_page_template( $impruw_page_template_name ){

    global $wpdb;

    $query = $wpdb->prepare( "SELECT post_id FROM {$wpdb->postmeta}
                              WHERE meta_key=%s AND meta_value=%s", 'impruw_page_template',
        $impruw_page_template_name );

    $page_id = $wpdb->get_var( $query );

    if(!is_null($page_id) && (int)$page_id > 0)
        return get_post($page_id);

    return false;
}

function delete_all_revisions( $post_id ) {

    // all revisions and autosaves
    $revisions = wp_get_post_revisions( $post_id, array( 'order' => 'ASC' ) );

    for ( $i = 0; isset( $revisions[ $i ] ); $i++ ) {
        wp_delete_post_revision( $revisions[ $i ]->ID );
    }
}

/**
 * Clone header footer
 *
 * @param unknown $theme_site_id
 */
function clone_header_footer( $theme_site_id ) {

    $clone_blog = $theme_site_id; //server
    switch_to_blog( $clone_blog );
    $header = get_json_to_clone( 'theme-header' );
    $footer = get_json_to_clone( 'theme-footer' );
    restore_current_blog();

    $data = set_json_to_site( $header );
    update_option( 'theme-header-autosave', $data );
    update_option( 'theme-header', $data );

    $data = set_json_to_site( $footer );
    update_option( 'theme-footer-autosave', $data );
    update_option( 'theme-footer', $data );
}

/**
 * This function returns the theme assigned to passed site id
 *
 * @param type $site_id
 */
function get_theme_name( $site_id ) {

    switch_to_blog( $site_id );

    $theme = get_option( 'stylesheet' );

    restore_current_blog();

    return $theme;
}

function update_site( $formdata ) {

    unset( $formdata[ 'action' ] );

    $roomsummary_update_check = check_roomsummary_update( $formdata );

    if ( $roomsummary_update_check == 0 ) {

        $update_return = update_site_profile( $formdata );

        return $update_return;
    } else if ( $roomsummary_update_check == 1 ) {

        $update_return = update_checkin_time( $formdata );

        return $update_return;
    } else if ( $roomsummary_update_check == 2 ) {

        $update_return = update_additional_policies( $formdata );

        return $update_return;
    } else {
        $update_return = update_currency( $formdata );

        return $update_return;
    }
}

/**
 * Function to check if update action is for site profile or room summary
 *
 * @param type $formdata
 *
 * @return int
 */
function check_roomsummary_update( $formdata ) {

    if ( isset( $formdata[ 'changes' ][ 'checkin_time' ] ) )
        return 1;
    else if ( isset( $formdata[ 'changes' ][ 'additional_policy' ] ) )
        return 2;
    else if ( isset( $formdata[ 'changes' ][ 'currency' ] ) )
        return 3;
    else
        return 0;
}

/**
 * Function to update site profile
 *
 * @param type $formdata
 *
 * @return type
 */
function update_site_profile( $formdata ) {

    // loop through the array containing the form values
    foreach ( $formdata as $key => $value ) {

        // if the options are email or phone, store them as serailized array
        if ( $key == "other_emails" || $key == "other_phone_no" ) {
            $value_array = $formdata[ $key ];
            update_option( $key, $value_array );
        } else {
            update_option( $key, $value );
        }

        // prepare array conatining all the form values
        $return_array[ $key ] = $value;
    }

    return $return_array;
}

function update_checkin_time( $formdata ) {

    $time   = $formdata[ 'changes' ][ 'checkin_time' ];
    $format = ' ';

    if ( isset( $formdata[ 'changes' ][ 'checkin_time_format' ] ) )
        $format = $formdata[ 'changes' ][ 'checkin_time_format' ];

    if ( !empty( $time ) )
        update_option( 'checkin-time', $time );

    if ( !empty( $format ) )
        update_option( 'checkin-time-format', $format );

    $return_array = array( 'checkin-time' => $time, 'checkin-time-format' => $format );

    return $return_array;
}

/**
 * Function to update additional polices
 *
 * @param type $formdata
 *
 * @return type
 */
function update_additional_policies( $formdata ) {

    $policy = $formdata[ 'changes' ][ 'additional_policy' ];

    update_option( 'additional-policy', $policy );

    $return_array = array( 'additional_policy' => $policy );

    return $return_array;
}

/**
 * Function to update the currency
 *
 * @param type $formdata
 *
 * @return type
 */
function update_currency( $formdata ) {

    $currency = $formdata[ 'changes' ][ 'currency' ];

    update_option( 'currency', $currency );

    $return_array = array( 'currency' => $currency );

    return $return_array;
}

/**
 * Returns the logo id for the site
 * @return int <mixed, boolean>
 */
function get_site_logo_id() {

    // get the logo_id from options
    $logo_id = get_option( 'logo_id', 0 );

    return $logo_id;
}

/**
 * Returns the hotel address string
 * @return string
 */
function get_hotel_address() {

    $site_details = get_site_details();

    extract( $site_details );

    $address = $street . "," . $city . "," . $postal_code . "," . $country;

    if ( trim( $address ) === "" )
        return "";

    return $address;
}
