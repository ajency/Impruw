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
    $logo_id = get_option( 'logo_id', 0 );
    $image_path = wp_get_attachment_image_src( $logo_id );;
    $image_path = $image_path === false ? '' : $image_path[ 0 ];

    return array( 'site_id' => $site_id,
        'site_domain' => get_site_domain( $site_id ),
        'site_name' => get_option( 'blogname' ),
        'admin_email' => get_option( 'admin_email' ),
        'street' => get_option( 'street', '' ),
        'postal_code' => get_option( 'postal_code', '' ),
        'city' => get_option( 'city', '' ),
        'logo_id' => $logo_id,
        'logo_url' => $image_path, 'country' => get_option( 'country', '' ),
        'site_email' => get_option( 'site_email', get_bloginfo( 'admin_email' ) ),
        'other_phone_no' => get_option( 'other_phone_no', array() ),
        'facebook' => get_option( 'facebook', '' ),
        'twitter' => get_option( 'twitter', '' ) );
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

    $pages = array( array( 'post_title' => 'Home','menu_order' =>'1' ),
        array( 'post_title' => 'About Us','menu_order' =>'2' ),
        array( 'post_title' => 'Rooms','menu_order' =>'3' ),
        array( 'post_title' => 'Single Room' ,'menu_order' =>'4'),
        array( 'post_title' => 'Gallery', 'menu_order' =>'5'),
        array( 'post_title' => 'Contact Us','menu_order' =>'6' ) );

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
    $header = get_json_to_clone( 'theme-header' );
    $footer = get_json_to_clone( 'theme-footer' );
    restore_current_blog();

    $data = set_json_to_site( $header,$language_code, $clone_first_time);
    update_option( 'theme-header-autosave', $data );
    update_option( 'theme-header', $data );

    $data = set_json_to_site( $footer,$language_code, $clone_first_time);
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

        // prepare array conatining all the form values
        $return_array[ $key ] = $value;
    }

    return $return_array;
}

function update_checkin_time( $formdata ) {

    $checkout_time ="";
    $checkin_time = "";
    $format = "";

    if (isset($formdata[ 'changes' ][ 'checkin_time' ])){
        $checkin_time = $formdata[ 'changes' ][ 'checkin_time' ];
        update_option( 'checkin-time', $checkin_time );
    }

    if (isset($formdata[ 'changes' ][ 'checkout_time' ])){
        $checkout_time = $formdata[ 'changes' ][ 'checkout_time' ];
        update_option( 'checkout-time', $checkout_time );
    }
    if (isset($formdata[ 'changes' ][ 'time_format' ])){
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
/*
 * Get english page title to set template name
 */
function get_english_title($title){

    if($title=='Home' || $title=='Hjem'|| $title=='Inicio')
            $english_title = 'Home';
    if($title=='About Us' || $title=='Om oss'|| $title=='Quiénes somos')
            $english_title = 'About Us';
    if($title=='Rooms' || $title=='Rom' || $title=='Habitaciones')
            $english_title = 'Rooms';
    if($title=='Contact Us' || $title=='Kontakt Oss' || $title=='Contáctenos')
            $english_title = 'Contact us';
    if($title=='Single Room' || $title=='Enkeltrom' || $title=='Habitación Individual')
            $english_title = 'Single Room';
    if($title=='Gallery' || $title=='Galleri' || $title=='Galleria')
        $english_title = 'Gallery';

    //echo "<br/>English title of ".$title."is ->".$english_title;
    return $english_title;
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
        translate_site($theme_site_id, 'en',$clone_pages);
        $clone_pages = FALSE;
        translate_site($current_site_id, 'nb',$clone_pages);
    }
    else if($clone_pages === FALSE ){
        translate_site($current_site_id, $current_site_language,$clone_pages);
    }
}

function print_page_json($page_id){
    global $sitepress;
    $sitepress->switch_lang('es');
    _e('Find us here', 'impruwclientparent');
    $sitepress->switch_lang(wpml_get_default_language());

    echo "<br/>Current site id= ".get_current_blog_id()."<br/>";

    $data = get_page_content_json( $page_id, false );
    echo "<br/>PAge json for HOme page <br/>";
    echo "<pre>";
    print_r($data);
    echo "</pre>";
    echo "<br/>PAge json for HOme page ENDS <br/>";
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

    scan_for_strings();

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
        $sitepress->switch_lang('en');
        create_original_page($page_details);
        $sitepress->switch_lang(wpml_get_default_language());
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

        //echo "<br/>Created original English page with id <br/>".$created_page_id;

        if ($page['post_title'] === 'Home')
            set_home_page($created_page_id);

        // assign the template to each page
        $template_name = $page['post_title'];
        $template = sanitize_title($template_name);
        update_post_meta($created_page_id, 'impruw_page_template', $template);

        add_menus_to_site();

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

    $sitepress->switch_lang($language_code);
    $post_title =__($page->post_title, 'impruwclientparent') ;
    $sitepress->switch_lang(wpml_get_default_language());

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

    if ($page->post_title === 'Home')
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

        if (true) {
            $mo_files = icl_st_get_mo_files( TEMPLATEPATH );
            foreach ( (array)$mo_files as $m ) {
                $i = preg_match( '#[-]?([a-z_]+)\.mo$#i', $m, $matches );
                if ( $i && $lang = $wpdb->get_var( "SELECT code FROM {$wpdb->prefix}icl_locale_map WHERE locale='" . $matches[ 1 ] . "'" ) ) {
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

    $data = set_json_to_site( $data, $language_code, $clone_first_time);
    
    // //store_unused_elements( $post_id );
    add_page_json( $post_id, $data );

    delete_all_revisions( $post_id );
    update_page_autosave( $post_id, $data );

}

function translation_keys(){
    __('Home', 'impruwclientparent');
    __('About Us', 'impruwclientparent');
    __('Home title', 'impruwclientparent');
    __('Home sub title', 'impruwclientparent');
    __('Contact Address', 'impruwclientparent');
    __('Find us here', 'impruwclientparent');
}

//add_action('init','add_pages_to_site_t');
