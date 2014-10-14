<?php

/**
 * Gets the site Details
 *
 * @param type $site_id
 *
 * @return type
 */
function get_site_details( $site_id = 0, $language=FALSE ) {

    if($language===FALSE){
        $translation_language = wpml_get_default_language();
    }
    else{
        $translation_language = $language;
    }

    
    if ( $site_id === 0 )
        $site_id = get_current_blog_id();

    // fetching the image path for the logo
    $logo_id = get_option( 'logo_id', 0 );
    $image_path = wp_get_attachment_image_src( $logo_id );;
    $image_path = $image_path === false ? '' : $image_path[ 0 ];

            
    $original_street = get_option('street','');
    //Check if present in string translation table , ie if it is registered 
    $street_string_id = icl_get_string_id( $original_street, 'Site Profile');
    $translated_street = impruw_wpml_get_string_translation($original_street, $translation_language);

    // if(($translated_street===$original_street)&&($street_string_id!=NULL)){
    //     $translated_street.= '(not translated)';
    // }

    $original_city = get_option('city','');
    //Check if present in string translation table , ie if it is registered 
    $city_string_id = icl_get_string_id( $original_street, 'Site Profile');
    $translated_city = impruw_wpml_get_string_translation($original_city, $translation_language);

    // if(($translated_city===$original_city)&&($street_string_id!=NULL)){
    //     $translated_city.= '(not translated)';
    // }
    
    $site_array = array( 'site_id' => $site_id,
        'site_domain' => get_site_domain( $site_id ),
        'site_name' => get_option( 'blogname' ),
        'admin_email' => get_option( 'admin_email' ),
        'street' => $translated_street,
        'postal_code' => get_option( 'postal_code', '' ),
        'city' => $translated_city,
        'logo_id' => $logo_id,
        'logo_url' => $image_path, 'country' => get_option( 'country', '' ),
        'site_email' => get_option( 'site_email', get_bloginfo( 'admin_email' ) ),
        'other_phone_no' => get_option( 'other_phone_no', array() ),
        'facebook' => get_option( 'facebook', '' ),
        'twitter' => get_option( 'twitter', '' ) );

    return $site_array;
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

    $pages = array( array( 'post_title' => 'Home', 'menu_order' => '1' ),
        array( 'post_title' => 'About Us', 'menu_order' => '2' ),
        array( 'post_title' => 'Rooms', 'menu_order' => '3' ),
        array( 'post_title' => 'Single Room', 'menu_order' => '4' ),
        array( 'post_title' => 'Gallery', 'menu_order' => '5' ),
        array( 'post_title' => 'Contact Us', 'menu_order' => '6' ) );

    add_pages_to_site( $pages );

    add_menus_to_site();
}

//add_action('admin_init','clone_pages');

/**
 * Adds two menu to site.
 * Main Menu and Footer Menu
 */
function add_menus_to_site() {

    //give your menu a name
    $name = 'Main Menu';
    //create the menu
    $menu_id = wp_create_nav_menu( $name );

    if ( is_wp_error( $menu_id ) )
        return;

    $skip_pages = array( 'Coming Soon', 'Single Room', 'Support', 'Sign In' );

    foreach ( array_reverse( get_all_menu_pages() ) as $page ):

        if ( in_array( $page->post_title, $skip_pages ) )
            continue;

        //then add the actuall link/ menu item and you do this for each item you want to add
        wp_update_nav_menu_item( $menu_id, 0, array( 'menu-item-title' => $page->post_title,
            'menu-item-classes' => $page->post_name,
            'menu-item-url' => '',
            'menu-item-position' => $page->menu_order,
            'menu-item-object' => 'page',
            'menu-item-type' => 'post_type',
            'menu-item-object-id' => $page->ID,
            'menu-item-status' => 'publish' ) );


    endforeach;

    //then you set the wanted theme  location
    $locations = get_theme_mod( 'nav_menu_locations' );
    $locations[ 'header_menu' ] = $menu_id;
    set_theme_mod( 'nav_menu_locations', $locations );

}

/**
 * Adds new pages to the passed site_id
 *
 * @param type $site_id The site to create pages
 * @param type $user_id The user_id to mark as creator
 * @param type $pages array of pages to create
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
        $page_arr = array( 'post_title' => $page[ 'post_title' ],
            'post_content' => '',
            'post_status' => 'publish',
            'post_author' => $user_id,
            'menu_order' => $page[ 'menu_order' ],
            'post_type' => 'page' );

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
                'value' => array( 'home', 'about-us', 'single-room', 'contact-us', 'rooms',
                    'gallery' ),
                'compare' => 'IN'
            )
        )
    ) );

    while ( $pages->have_posts() ):
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

    $impruw_page_template_name = get_post_meta( $post_id, 'impruw_page_template', true );

    if ( $impruw_page_template_name === '' )
        return;

    switch_to_blog( $clone_blog );

    $pages = get_pages( array( 'post_type' => 'page',
        'posts_per_page' => -1,
        'post_status' => 'publish',
        'meta_key' => 'impruw_page_template',
        'meta_value' => $impruw_page_template_name
    ) );

    if ( count( $pages ) === 0 ) {
        restore_current_blog();
        return;
    }

    $page = $pages[ 0 ];

    $data = get_json_to_clone( 'page-json', $page->ID );
    restore_current_blog();

    $data = set_json_to_site( $data );

    store_unused_elements( $post_id );
    add_page_json( $post_id, $data );

    delete_all_revisions( $post_id );
    update_page_autosave( $post_id, $data );
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
function clone_header_footer( $theme_site_id, $language_code) {

    $current_site_id = get_current_blog_id();
    if($theme_site_id == $current_site_id){
        $clone_first_time = FALSE ;
    }
    else{
        $clone_first_time = TRUE ;
    }
    $clone_blog = $theme_site_id; //server

    switch_to_blog( $clone_blog );
    $header = get_json_to_clone( THEME_HEADER_KEY );
    $footer = get_json_to_clone( THEME_FOOTER_KEY );
    restore_current_blog();

    $data = set_json_to_site( $header,$language_code, $clone_first_time);
    update_option( 'theme-header-autosave', $data );
    update_option( THEME_HEADER_KEY, $data );

    $data = set_json_to_site( $footer,$language_code, $clone_first_time);
    update_option( 'theme-footer-autosave', $data );
    update_option( THEME_FOOTER_KEY, $data );
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

    $changed_values = $formdata[ 'changes' ];

    // loop through the array containing the form values
    foreach ( $changed_values as $key => $value ) {

        // if the options are email or phone, store them as serailized array
        if ( $key == "other_phone_no" ) {
            $value_array = $changed_values[ $key ];
            update_option( $key, $value_array );
        } else {
            update_option( $key, $value );
        }

        //Register strings for translation
        if($key=='street'||$key=='city'){
            icl_register_string('Site Profile', $key, $value);

            $default_language = wpml_get_default_language();

            
            if($default_language === 'en'){
                $other_language = 'nb';
            }
            else{
                $other_language = 'en';
            } 

            
            $original_string_id = icl_get_string_id($value, 'Site Profile');

            //Add itself to english and Norwegian translation
            $string_id = icl_add_string_translation( $original_string_id, $default_language, $value, ICL_STRING_TRANSLATION_COMPLETE );
            $string_id = icl_add_string_translation( $original_string_id, $other_language, $value.'(not translated)', ICL_STRING_TRANSLATION_COMPLETE );

        }
        
        // prepare array conatining all the form values
        $return_array[ $key ] = $value;
    }

    return $return_array;
}

function update_checkin_time( $formdata ) {

    $checkout_time = "";
    $checkin_time = "";
    $format = "";

    if ( isset( $formdata[ 'changes' ][ 'checkin_time' ] ) ) {
        $checkin_time = $formdata[ 'changes' ][ 'checkin_time' ];
        update_option( 'checkin-time', $checkin_time );
    }

    if ( isset( $formdata[ 'changes' ][ 'checkout_time' ] ) ) {
        $checkout_time = $formdata[ 'changes' ][ 'checkout_time' ];
        update_option( 'checkout-time', $checkout_time );
    }
    if ( isset( $formdata[ 'changes' ][ 'time_format' ] ) ) {
        $format = $formdata[ 'changes' ][ 'time_format' ];
        update_option( 'time-format', $format );
    }

    $return_array = array( 'checkin_time' => $checkin_time,
        'checkout_time' => $checkout_time,
        'time_format' => $format );

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
    $string_id =array();

            //Register strings for translation
    icl_register_string('Site Profile', 'additional-policy', $policy);

    $default_language = wpml_get_default_language();

    if($default_language === 'en'){
        $other_language = 'nb';
    }
    else{
        $other_language = 'en';
    }


    $original_string_id = icl_get_string_id($policy, 'Site Profile');

    $string_id[] = icl_add_string_translation( $original_string_id, $default_language, $policy, ICL_STRING_TRANSLATION_COMPLETE );
    $string_id[] = icl_add_string_translation( $original_string_id, $other_language, $policy.'(not translated)', ICL_STRING_TRANSLATION_COMPLETE );

    $return_array = array( 'additional_policy' => $policy, 'translated_string_id' => $string_id );

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


/**
 * Function to create a piwik site for the site created
 *
 *
 * @param type $site_id
 *
 * @return type
 */
function create_piwik_site( $site_id ) {

    $wp_piwik_object = $GLOBALS[ 'wp_piwik' ];

    $_GET[ 'wpmu_show_stats' ] = $site_id;

    $tracking_code = $wp_piwik_object->addPiwikSite();

    return $tracking_code;

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
    if ( null === $theme ) {
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

    $current_site_language = wpml_get_default_language();
    $current_site_id = get_current_blog_id();

    // check if cloned for the first time
    if ( $clone_pages === TRUE ) {

        scan_for_strings();

        translate_site($theme_site_id, 'en',$clone_pages);
        $clone_pages = FALSE;
        translate_site($current_site_id, 'nb',$clone_pages);
    }
    else if($clone_pages === FALSE ){
        // scan_for_strings();
        //for each of the enabled languages call translate_site()
        $current_active_languages = wpml_get_active_languages();

        translate_site($theme_site_id, 'en');

        foreach ($current_active_languages as $language) {
            if($language['code'] != 'en')
                translate_site($current_site_id, $language['code']);
        }
        
    }
}


/**
 * Function to clone and translate a site based on theme site id
 *
 * @param int $theme_site_id
 * @param string $language_code
 *
 * @return type
 */
function translate_site($theme_site_id, $language_code, $clone_pages=FALSE){
    global $sitepress;

    enable_language($language_code);

    add_pages_to_site_t($language_code,$clone_pages);

    clone_header_footer( $theme_site_id, $language_code);

    //get all english pages of the current site
    $sitepress->switch_lang('en');
    $english_pages = new WP_query( array( 'post_type' => 'page',
        'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => 'impruw_page_template',
                'value' => array( 'home', 'about-us', 'single-room', 'contact-us', 'rooms',
                    'gallery' ),
                'compare' => 'IN'
            )
        )
    ) );
    $sitepress->switch_lang(wpml_get_default_language());

    //For each english page in current site copy themes page content
    while ( $english_pages->have_posts() ):
        $english_pages->the_post();
        translate_page( $theme_site_id, $language_code, get_the_ID());
    endwhile;
}


function enable_language($language_code){

    global $sitepress;
    $active_languages = array();
    $current_active_languages = wpml_get_active_languages();

    foreach ($current_active_languages as $language) {
        array_push($active_languages, $language['code']);
    }

    //Check if language is enabled
    if (!(in_array($language_code, $active_languages)))
    {
        //Append the language to be enabled to the array of  current active languages and call set_active_languages
        array_push($active_languages, $language_code);
        $sitepress->set_active_languages($active_languages);
        return;
    }

    return;

}

/**
 * Add site pages
 * Add menu to site
 */
function add_pages_to_site_t($language_code,$clone_pages=FALSE)
{
    global $sitepress;

    //Get all English pages of the current site if they exist
    $sitepress->switch_lang('en');
    $current_english_pages = get_pages( array( 'post_type' => 'page',
        'posts_per_page' => -1,
        'post_status' => 'publish',
        'meta_key' => 'impruw_page_template'
    ) );
    $sitepress->switch_lang(wpml_get_default_language());

    //Get the page count
    $current_page_count = count($current_english_pages);

    //Page details for the English language
    $page_details = array(
            array('post_title' => 'Home', 'menu_order' => '1'),
            array('post_title' => 'About Us', 'menu_order' => '2'),
            array('post_title' => 'Rooms', 'menu_order' => '3'),
            array('post_title' => 'Single Room', 'menu_order' => '4'),
            array('post_title' => 'Gallery', 'menu_order' => '5'),
            array('post_title' => 'Contact Us', 'menu_order' => '6')
        );

    if($clone_pages === TRUE && $language_code=='en'){
        //echo "<br/>Create English pages first in case of 1st time cloning<br/>";
        if($current_page_count==0){
            $sitepress->switch_lang('en');
                create_original_page($page_details);
                add_menus_to_site();
            $sitepress->switch_lang(wpml_get_default_language());
        }

    }
    else if($clone_pages === FALSE){
        //echo "<br/>Create Translated pages of English pages in case of 2nd time cloning<br/>";
        
        //Get all English pages of the current site
        $sitepress->switch_lang('en');
        $pages = get_pages(array('post_type' => 'page',
            'posts_per_page' => -1,
            'post_status' => 'publish',
            'meta_key' => 'impruw_page_template'
            ));
        $sitepress->switch_lang(wpml_get_default_language());

        foreach ($pages as $page) {
            //check if translated page exists in the given language
            $page_id = $page->ID;
            $translated_page_id = icl_object_id($page_id, 'page', false, $language_code);

            //if translated page does not exist, create the translated version of the page
            if ($translated_page_id==null) {
                create_translated_page($page, $language_code);
            }
        }

    }

}

/*
 * Function to create a page in default language
 */
function create_original_page($pages){
    //echo "<br/>create_original_page<br/>";
    global $wpdb,$sitepress;
    $user_id = get_current_user_id();
    $tbl_icl_translations = $wpdb->prefix ."icl_translations";
    $element_type = "post_page";

    foreach ($pages as $page) {
        $post_title = $page['post_title'] ;

        $page_arr = array('post_title' => $post_title,
            'post_content' => '',
            'post_status' => 'publish',
            'post_author' => $user_id,
            'menu_order' => $page['menu_order'],
            'post_type' => 'page');

        // Create the page
        $created_page_id = wp_insert_post($page_arr);

        // Exclude Single-roompage from sitemap
        if ($page['post_title'] === 'Single Room') {
            update_post_meta($created_page_id, '_yoast_wpseo_sitemap-include', 'never');
        }

        //echo "<br/>Created original English page with id <br/>".$created_page_id;

        if ($page['post_title'] === 'Home')
            set_home_page($created_page_id);

        // assign the template to each page
        $template_name = $page['post_title'];
        $template = sanitize_title($template_name);
        update_post_meta($created_page_id, 'impruw_page_template', $template);

    }
}


/*
 * Create translated page for a give page id and language
 */
function create_translated_page($page, $language_code){
    //TODO check wpml_add_translatable_content
    //echo "Create translated page<br/>";
    global $wpdb, $sitepress;
    $user_id = get_current_user_id();
    $tbl_icl_translations = $wpdb->prefix ."icl_translations";
    $element_type = "post_page";

    // $sitepress->switch_lang($language_code);
    //     load_theme_textdomain('impruwclientparent', get_template_directory() . '/languages');
    //     $post_title =__($page->post_title, 'impruwclientparent') ;
    // $sitepress->switch_lang(wpml_get_default_language());

    $post_title = impruw_wpml_get_string_translation($page->post_title, $language_code);

    if($post_title === $page->post_title)
        $post_title .= '(not translated)';
        

    $page_arr = array('post_title' => $post_title,
        'post_content' => '',
        'post_status' => 'publish',
        'post_author' => $user_id,
        'menu_order' => $page->menu_order,
        'post_type' => 'page');

    // Insert translated post in language_code
    $sitepress->switch_lang($language_code);
    $page_translated_id = wp_insert_post($page_arr);
    $sitepress->switch_lang(wpml_get_default_language());

    // Exclude Single-roompage from sitemap
    if (($post_title === 'Enkeltrom')||($post_title === 'Einzelzimmer')||($post_title === 'Habitación Individual')||($post_title === 'Chambre Simple')){
        update_post_meta($page_translated_id, '_yoast_wpseo_sitemap-include', 'never');
    }

    if ($post_title === 'Hjem')
        set_home_page($page_translated_id);

    // assign the template to each page
    $template_name = get_post_meta( $page->ID, 'impruw_page_template', true );
    update_post_meta($page_translated_id, 'impruw_page_template', $template_name);

    // Get trid of original post
    $trid = wpml_get_content_trid( 'post_page', $page->ID );

    $original_language_information = wpml_get_language_information($page->ID);
    $lang_code_original = $original_language_information['locale'];

    // Associate original post and translated post
    $updateQuery = $wpdb->update($tbl_icl_translations,
        array(
            'trid' => $trid,
            'language_code' => $language_code,
            'source_language_code' => 'en',
            'element_type' => $element_type
        ), array( 'element_id' => $page_translated_id ) );
}



function scan_for_strings(){

    global $wpdb, $sitepress_settings;

    $scan_stats = icl_st_scan_theme_files();

    $mo_files = icl_st_get_mo_files( TEMPLATEPATH );
    foreach ( (array)$mo_files as $m ) {
        $i = preg_match( '#[-]?([a-z_]+)\.mo$#i', $m, $matches );
        $language = explode("_",$matches[1]);
        $lang = $language[0];
        if ( $i ) {
            $tr_pairs = icl_st_load_translations_from_mo( $m );
            foreach ( $tr_pairs as $original => $translation ) {
                foreach ( $sitepress_settings[ 'st' ][ 'theme_localization_domains' ] as $tld ) {
                    $string_id = icl_get_string_id( $original, 'theme ' . $tld );
                    if ( $string_id ) {
                        break;
                    }
                }

                icl_add_string_translation( $string_id, $lang, $translation, ICL_STRING_TRANSLATION_COMPLETE );
            }
        }


    }
}



function translate_page( $theme_site_id, $language_code, $post_id){
    global $sitepress;

    //get page template name from page meta 'impruw_page_template'
    $impruw_page_template_name = get_post_meta( $post_id, 'impruw_page_template', true );

    if ( $impruw_page_template_name === '' ){
        return;
    }

    //echo "<br/>Get English page corresponding to the current site page with impruw_page_template as ".$impruw_page_template_name." from the theme to clone i.e with theme site id = ".$theme_site_id."<br/>";
    switch_to_blog($theme_site_id);
        //Get English version of the page from the theme site
        $sitepress->switch_lang('en');
            $pages = get_pages( array( 'post_type' => 'page',
                'posts_per_page' => -1,
                'post_status' => 'publish',
                'meta_key' => 'impruw_page_template',
                'meta_value' => $impruw_page_template_name
            ) );
        $sitepress->switch_lang(wpml_get_default_language());

        if ( count( $pages ) === 0 ) {
            restore_current_blog();
            return;
        }

        $page = $pages[ 0 ]; //Get the page

        $data = get_json_to_clone( 'page-json', $page->ID ); 

    restore_current_blog();

    $current_site_id = get_current_blog_id();
    if($theme_site_id === $current_site_id){
        $clone_first_time = FALSE ;
    }
    else{
        $clone_first_time = TRUE ;
    }
    
    if ($clone_first_time && $language_code === 'en') {
        store_unused_elements( $post_id );
    }
    
    $data = set_json_to_site( $data, $language_code, $clone_first_time);
    

    add_page_json( $post_id, $data );

    delete_all_revisions( $post_id );
    update_page_autosave( $post_id, $data );

}

/**
 * Returns the translation of a string in a specific language if it exists or the original if it does not.
 * @ param $string The string to retrieve
 * @ param $lang The language code of the translation e.g. de
 *
 * @ return the translated string or the original record if a translation does not exist. 
 * If WPML is not active the original string will be returned.
 */
function impruw_wpml_get_string_translation($string, $lang){
    // WPML is not used? return the original string
    $output = $string;

    
    global $wpdb;

        // the tables
    $table1         = $wpdb->prefix . "icl_strings";
    $table2         = $wpdb->prefix . "icl_string_translations";
        // the sql
    $sql            = "SELECT * FROM $table1, $table2 WHERE $table1.value = %s AND ($table1.status = '1' OR $table1.status = '3') AND $table1.id = $table2.string_id AND $table2.language = %s ";
        // make it safe
    $safe_sql      = $wpdb->prepare($sql, $string, $lang);
        // get row
    $result             = $wpdb->get_row($safe_sql, ARRAY_A);

        // if we have a record
    if(!is_null($result)){
        $output = $result['value'];
    }
        // no record? return the original string
    else{
        $output = $string;
    }

    return $output; 
}

/*
 * Function to check if the domain name is available for mapping
 *
 * @param $domain_name
 */
function check_domain_name_exists( $domain_name ) {
    global $wpdb;

    $table_name = $wpdb->base_prefix . 'domain_mapping';

    $sql = "SELECT * from " . $table_name . " WHERE domain = %s";

    $result = $wpdb->get_results( $wpdb->prepare( $sql, $domain_name ), ARRAY_A );

    if ( empty( $result ) )
        return false;
    else
        return true;


}

/**
 * Function to add the domain name for mapping
 *
 * @param $domain_name
 */
function add_domain_for_mapping( $domain_name ) {

    global $wpdb;

    $table_name = $wpdb->base_prefix . 'domain_mapping';

    $sql = "SELECT * from " . $table_name . " WHERE blog_id = %s";

    $current_site_id = get_current_blog_id();

    $result = $wpdb->get_results( $wpdb->prepare( $sql, $current_site_id ), ARRAY_A );

    if ( empty( $result ) ) {

        $wpdb->insert( $table_name, array(
            'domain' => $domain_name,
            'blog_id' => $current_site_id,
            'active' => "1" ) );
    } else {
        $wpdb->update( $table_name,
            array( 'domain' => $domain_name ), array( 'blog_id' => $current_site_id ) );
    }

    update_option( 'domain-name', $domain_name );

}

/**
 * Function to delete a domain mapping record when shifting to free plan
 */
function delete_domain_mapping() {
    global $wpdb;

    $table_name = $wpdb->base_prefix . 'domain_mapping';

    $wpdb->delete( $table_name, array( 'blog_id' => get_current_blog_id() ) );

    update_option( 'domain-name',  get_option( 'blogname' ) . '.impruw.com' );
}
