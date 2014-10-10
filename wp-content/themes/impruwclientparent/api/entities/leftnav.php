<?php

/**
 * [get_menu_items description]
 * @return [type] [description]
 */
function get_menu_items() {

    $menuItems = array(
        array(
            'url' => '#/dashboard',
            'title' => 'Dashboard',
            'icon' => 'monitor'
        ),
        array(
            'url' => site_url( 'site-builder' ),
            'title' => 'Site Builder',
            'target' => '_newtab' . rand(1,99),
            'icon' => 'tools'
        ),
        array(
            'url' => '#/rooms',
            'title' => 'Rooms',
            'icon' => 'open'
        ),
        array(
            'url' => '#/room-summary',
            'title' => 'Room Summary',
            'icon' => 'file3'
        ),
        array(
            'url' => '#/site-profile',
            'title' => 'Site Profile',
            'icon' => 'globe'
        ),
        array(
            'url' => '#/my-profile',
            'title' => 'My Profile',
            'icon' => 'profile2'
        ),
        array(
            'url' => '#/statistics',
            'title' => 'Statistics',
            'icon' => 'stats',
            'submenu' => array(
                array( 'url' => '#/statistics/realtime',
                    'title' => 'Real-time Visitors',
                    'icon' => 'stats1' ),
                array( 'url' => '#/statistics/visits',
                    'title' => 'Visit Summary',
                    'icon' => 'stats2' ),
                array( 'url' => '#/statistics/traffic',
                    'title' => 'Traffic Summary',
                    'icon' => 'stats3' )
            )
        ),
        array(
            'url' => '#/language',
            'title' => 'Language',
            'icon' => 'chat2',
        ),
        array(
            'url' => '#/billing',
            'title' => 'Billing',
            'icon' => 'wallet',
            'submenu' => array(
                array( 'url' => '#/billing/account-summary',
                    'title' => 'Account Summary',
                    'icon' => 'stats1' ),
                array( 'url' => '#/billing/update-billing',
                    'title' => 'Update Billing',
                    'icon' => 'stats2' ),
                array( 'url' => '#/billing/pricing-plans',
                    'title' => 'View Plans',
                    'icon' => 'stats2' )
            )
        ),
        array(
            'url' => '#/seo',
            'title' => 'SEO',
            'icon' => 'magnifier',
        ),
        array(
            'url' => '#/logout',
            'title' => 'Logout',
            'icon' => 'switch2'
        )
    );

    wp_send_json( $menuItems );
}

add_action( 'wp_ajax_get-menu-items', 'get_menu_items' );


function get_media() {

    $id = $_GET [ 'id' ];
    $media = wp_prepare_attachment_for_js( $id );
    wp_send_json( array(
        'code' => 'OK',
        'data' => $media
    ) );
}

add_action( 'wp_ajax_read-media', 'get_media' );

function get_menu() {

    $id = $_GET [ 'id' ];
    $menu = get_menu_to_array( $id, 'id' );
    wp_send_json( array(
        'code' => 'OK',
        'data' => $menu
    ) );
}

add_action( 'wp_ajax_read-menu', 'get_menu' );

function get_elementbox_elements() {

    $elements = array(
        array(
            'element' => 'Menu',
            'icon' => 'bicon icon-uniF14E',
            'helpText' => 'Click on the menu item to add and remove pages from the menu.',
            'styles' => get_styles( 'Menu' ),
            'site_menus' => array(
                array(
                    'menu_id' => 2,
                    'menu_name' => 'Main Menu'
                ),
                array(
                    'menu_id' => 3,
                    'menu_name' => 'Footer menu'
                )
            )
        ),
        array(
            'element' => 'Row',
            'icon' => 'bicon icon-uniF103',
            'styles' => get_styles( 'Row' )
        ),
        array(
            'element' => 'Logo',
            'icon' => 'bicon icon-uniF124',
            'helpText' => 'Upload your logo once and you are done! Simply drag and drop your logo element where you want the logo to be displayed.',
            'styles' => array(),
            'size' => '', //get_logo_size(),
            'category' => 'hotel'
        ),
        array(
            'element' => 'LanguageSwitcher',
            'title' => 'Language Switcher',
            'icon' => 'bicon icon-uniF10B',
            'helpText' => 'Manage multiple languages for your website. Add translations from language section on the dashboard.',
            'styles' => get_styles( 'LanguageSwitcher' ),
            'size' => ''
        ),
        array(
            'element' => 'Text',
            'icon' => 'bicon icon-uniF111',
            'helpText' => 'Exactly what it sounds like - an element for writing text. Click inside the element to start writing.',
            'styles' => array()
        ),
        array(
            'element' => 'Title',
            'icon' => 'bicon icon-uniF11C',
            'helpText' => 'Used for adding titles / headers to a page. Play with various styles from the editor.',
            'styles' => get_styles( 'Title' )
        ),
        array(
            'element' => 'Image',
            'icon' => 'bicon icon-uniF10E',
            'helpText' => 'Adding pictures to your site works in much the same way as adding text: by dragging an image element to a page.',
            'styles' => array()
        ),
        array(
            'element' => 'ImageWithText',
            'title' => 'Image With Text',
            'icon' => 'bicon icon-uniF112',
            'helpText' => 'A text element with a place for both text and an image built in.',
            'styles' => get_styles( 'ImageWithText' )
        ),
        array(
            'element' => 'Table',
            'title' => 'Table',
            'helpText' => 'A simple and precise way to express the classified contents within a less space in various styles.',
            'icon' => 'bicon icon-uniF166'
        ),
        array(
            'element' => 'Address',
            'icon' => 'bicon icon-uniF183',
            'helpText' => 'Update your address from site profile on your dashboard.',
            'styles' => get_styles( 'Address' ),
            'category' => 'hotel'
        ),
        array(
            'element' => 'Social',
            'icon' => 'bicon icon-uniF11A',
            'helpText' => 'Update your facebook and twitter pages from site profile on the dashboard. Each theme includes social media buttons that are designed specifically for that theme.',
            'styles' => get_styles( 'Social' ),
            'category' => 'hotel'
        ),
        array(
            'element' => 'Link',
            'icon' => 'bicon icon-uniF149',
            'helpText' => 'Add a text link or turn it into a button. Connect people to other pages on your site, pages on other sites, email addresses and files that they may want to download.',
            'styles' => get_styles( 'Link' )
        ),
        array(
            'element' => 'ContactForm',
            'title' => 'Contact Form',
            'icon' => 'bicon icon-uniF11B',
            'helpText' => 'Forms are an easy way for your site visitors to send information to you.',
            'styles' => get_styles( 'ContactForm' ),
            'category' => 'hotel'
        ),
        array(
            'element' => 'Map',
            'icon' => 'bicon icon-uniF110',
            'helpText' => 'We have a built-in Google Maps element that helps you display your address updated from your site profile.',
            'styles' => get_styles( 'Map' ),
            'category' => 'hotel'
        ),
         array(
            'element' => 'Widget',
            'icon' => 'bicon icon-uniF162',
            'helpText' => 'Just because we don\'t have an element for something, doesn\'t mean you can\'t add it to your site. Widget allows you to add pretty much any embeddable content to your site.',
            // 'styles' => get_styles( 'Wid' ),
            'category' => 'hotel'
        ),
        array(
            'element' => 'Slider',
            'icon' => 'bicon icon-uniF119',
            'helpText' => 'Turn your static banner images into active slideshows with options of various transition styles.',
            'sliders' => get_theme_sliders()
        ),
        array(
            'element' => 'Gallery',
            'icon' => 'bicon icon-uniF10C',
            'helpText' => 'The gallery element enables you to upload photos in bulk, which are arranged in a click-to-see-a-larger-version grid format.',
            'galleries' => get_theme_sliders()
        ),
        array(
            'element' => 'Gallery',
            'title' => 'Room Gallery',
            'icon' => 'bicon icon-uniF10C',
            'helpText' => 'The room gallery element displays all the photos added to your room in the dashboard, which are arranged in a click-to-see-a-larger-version grid format.',
            'category' => 'room'
        ),
        array(
            'element' => 'RoomFacilities',
            'title' => 'Room Facilities',
            'icon' => 'bicon icon-uniF17E',
            'helpText' => 'Display facilities for your individual room. Edit the room to update facilities.',
            'category' => 'room'
        ),
        array(
            'element' => 'RoomTitle',
            'title' => 'Room Title',
            'icon' => 'bicon icon-uniF12D',
            'helpText' => 'The room name added by you at the time of creating the room.',
            'category' => 'room'
        ),
        array(
            'element' => 'RoomDescription',
            'title' => 'Room Description',
            'icon' => 'bicon icon-uniF142',
            'helpText' => 'The description added to the room at the time of room creation.',
            'category' => 'room'
        ),
        array(
            'element' => 'RoomSummary',
            'title' => 'Room Summary',
            'styles' => get_styles( 'RoomSummary' ),
            'rooms' => get_all_rooms(),
            'icon' => 'bicon icon-uniF15B',
            'helpText' => 'The additional policies, check in and check out time from the room summary.',
            'category' => 'room'
        ),
        array(
            'element' => 'RoomTariff',
            'title' => 'Room Tariff',
            'icon' => 'bicon icon-uniF12B',
            'helpText' => 'The tariff for the room for various plans and date ranges.',
            'category' => 'room'
        ),
        array(
            'element' => 'RoomBooking',
            'title' => 'Room Booking',
            'icon' => 'bicon icon-uniF101',
            'helpText' => 'Showcase your plans, tariff and availability for particular dates using the booking calendar.',
            'category' => 'room'
        )
        
    );

    return $elements;
}

function ajax_get_elementbox_elements(){
    $elements = get_elementbox_elements();
    wp_send_json( array(
        'code' => 'OK',
        'data' => $elements ) );
}

add_action( 'wp_ajax_get-elementbox-elements', 'ajax_get_elementbox_elements' );
add_action( 'wp_ajax_nopriv_get-elementbox-elements', 'ajax_get_elementbox_elements' );

function fetch_facilities() {

    $taxonomies = array(
        'impruw_room_facility'
    );
    $room_facilities = get_terms( $taxonomies, array(
        'hide_empty' => 0
    ) );
    wp_send_json( array(
        'code' => 'OK',
        'data' => $room_facilities
    ) );
}

add_action( 'wp_ajax_fetch-facilities', 'fetch_facilities' );

/**
 */
function get_theme_sliders() {

    $sliders = get_all_sliders();

    $sliders_arr = array();

    foreach ( $sliders as $key => $slider ) {
        $sliders_arr [ ] = array(
            'id' => $slider [ 'id' ],
            'title' => $slider [ 'title' ]
        );
    }

    return $sliders_arr;
}

/**
 * [get_rooms description]
 *
 * @return [type] [description]
 */
function create_element_model() {

    $element = $_POST;

    if(!check_app_instace($element['instance_id'])){
        $response = array(
            'success' => false,
            'new_instance' => true,
            'reason' => __('New instance of site builder is open')
        );
        wp_send_json($response);
    }

    unset( $element [ 'action' ] );
    $model = get_element_model( $element [ 'element' ] );

    $model = wp_parse_args( $model, $element );

    $model [ 'meta_id' ] = set_element_data( $model );

    wp_send_json( array(
        'code' => 'OK',
        'data' => $model
    ) );
}

add_action( 'wp_ajax_create-element', 'create_element_model' );

function set_element_data( $data ) {

    global $wpdb;
    if ( isset( $data [ 'meta_id' ] ) ) {
        $meta_id = $data [ 'meta_id' ];

        // TODO: 
        if ( $data[ 'element' ] == 'Slider' ) {
            $slider_data = get_slider_by_id( $data[ 'slider_id' ] );
            $slider_data[ 'height' ] = $data[ 'height' ];
            $slider_data[ 'width' ] = $data[ 'width' ];
            $slider_data[ 'reset_transitions' ] = $data[ 'reset_transitions' ];
            update_slider( $slider_data, $data[ 'slider_id' ] );
        }

        if ( $data[ 'element' ] === 'RoomSummary') {
            if(is_numeric($data['room_id'])){
                update_post_meta( $data['room_id'], '_thumbnail_id', $data['image_id'] );
            }
        }

        if ( $data[ 'element' ] === 'Logo') {
            update_option('logo_id', $data['image_id'] );
        }

        $serialized_element = maybe_serialize( $data );

        $wpdb->update( $wpdb->postmeta, array(
            'meta_value' => $serialized_element,
            'meta_key' => $data [ 'element' ]
        ), array(
            'meta_id' => (int)$meta_id
        ) );
    } else {
        $serialized_element = maybe_serialize( $data );
        $wpdb->insert( $wpdb->postmeta, array(
            'post_id' => 0,
            'meta_value' => $serialized_element,
            'meta_key' => $data [ 'element' ]
        ) );

        return $wpdb->insert_id;
    }
}

function get_element_model( $element ) {

    $model = array();

    switch ( $element ) {

        case 'Menu' :
            $model = array(
                'style' => 'Slimmenu',
                'menu_id' => 2
            );
        case 'Logo' :
            $model = array(
                'style' => 'header',
                'image_id' => get_site_logo_id(), //hardcoded,
                'size' => 'full'
            );
            break;
    }

    return $model;
}

/**
 * [update_element_model description]
 *
 * @return [type] [description]
 */
function update_element_model() {

    $element = $_POST;

    if((isset($_POST['source'])&&($_POST['source']!=='dashboard'))&&(!check_app_instace($element['instance_id']))){
        $response = array(
            'success' => false,
            'new_instance' => true,
            'reason' => __('New instance of site builder is open')
        );
        wp_send_json($response);
    }

    unset( $element [ 'action' ] );
    $meta_id = $element [ 'meta_id' ];
    set_element_data( $element );
    wp_send_json( array(
        'code' => 'OK',
        'data' => array(
            'meta_id' => $meta_id
        )
    ) );
}

add_action( 'wp_ajax_update-element', 'update_element_model' );

/**
 * [update_element_model description]
 *
 * @return [type] [description]
 */
function delete_element_model() {

    $element = $_POST;

    if(!check_app_instace($element['instance_id'])){
        $response = array(
            'success' => false,
            'new_instance' => true,
            'reason' => __('New instance of site builder is open')
        );
        wp_send_json($response);
    }

    $meta_id = $element [ 'meta_id' ];
    global $wpdb;
    $wpdb->delete( $wpdb->postmeta, array(
        'meta_id' => $meta_id
    ) );

    wp_send_json( array(
        'code' => 'OK'
    ) );
}

add_action( 'wp_ajax_delete-element', 'delete_element_model' );

/**
 *
 * @return menu ID
 */
function create_menu() {

    $rand = rand();
    $menu_name = 'Menu-' . $rand;
    $menu_exists = wp_get_nav_menu_object( $menu_name );

    if ( !$menu_exists )
        $menu_id = wp_create_nav_menu( $menu_name );

    return $menu_id;
}

/**
 *
 */
function create_menu_item() {

    $menu_id = $_POST[ 'menu_id' ];

    if ( $menu_id == 0 )
        $menu_id = create_menu();

    $formdata = array(
        'menu-item-title' => $_POST[ 'menu_item_title' ],
        'menu-item-classes' => '',
        'menu-item-url' => '',
        'menu-item-object' => 'page',
        'menu-item-type' => 'post_type',
        'menu-item-object-id' => $_POST[ 'page_id' ],
        'menu-item-status' => 'publish'
    );
    $return_data = $formdata;
    $return_data[ 'menu_id' ] = $menu_id;

    $menu_item_id = wp_update_nav_menu_item( $menu_id, 0, $formdata );
    $menu_post_in_db = get_post( $menu_item_id );
    $return_data[ 'menu_item_url' ] = $menu_post_in_db->guid;

    $return_data[ 'ID' ] = $menu_item_id;
    wp_send_json( array( 'code' => 'OK', 'data' => $return_data ) );
}

add_action( 'wp_ajax_create-menu-item', 'create_menu_item' );

/**
 *
 */
function update_menu_item() {

    $formdata = array(
        'menu-item-title' => $_POST[ 'menu_item_title' ],
        'menu-item-classes' => '',
        'menu-item-url' => $_POST[ 'menu_item_url' ],
        'menu-item-status' => 'publish'
    );
    wp_update_nav_menu_item( $_POST[ 'menu_id' ], $_POST[ 'ID' ], $formdata );

    $return_data = $formdata;

    $return_data[ 'menu_id' ] = $_POST[ 'menu_id' ];

    wp_send_json( array( 'code' => 'OK', 'data' => $return_data ) );
}

add_action( 'wp_ajax_update-menu-item', 'update_menu_item' );

/**
 *
 */
function delete_menu_item() {

    $menu_item_post_id = $_POST[ 'ID' ];

    wp_delete_post( $menu_item_post_id );

    wp_send_json( array( 'code' => 'OK', 'menu_item_post_id' => $menu_item_post_id ) );
}

add_action( 'wp_ajax_delete-menu-item', 'delete_menu_item' );

/**
 *
 */
function update_menu_item_order() {

    $menu_items_order_array = $_GET[ 'newOrder' ];

    $count = 1;

    $menuId = $_GET[ 'menuId' ];

    for ( $i = 0; $i < count( $menu_items_order_array ); $i++ ):

        $post_array = array(
            'ID' => $menu_items_order_array[ $i ],
            'menu_order' => $count );

        wp_update_post( $post_array );

        $count++;

        /* wp_update_nav_menu_item( $menuId,$menu_items_order_array[$i],
          array('menu-item-position' => $i)
          ); */

    endfor;

    wp_send_json( array( 'code' => 'OK', 'menuId' => $menuId, 'newOrder' => $menu_items_order_array ) );
}

add_action( 'wp_ajax_update-menu-order', 'update_menu_item_order' );

/**
 * get all menus
 */
function get_site_menus_collection() {

    $menus = get_terms( 'nav_menu', array(
        'hide_empty' => TRUE
    ) );

    $data = array();
    foreach ( $menus as $menu )
        $data [ ] = get_menu_to_array( $menu->name );

    wp_send_json( array(
        'code' => 'OK',
        'data' => $data
    ) );
}

add_action( 'wp_ajax_get-menus', 'get_site_menus_collection' );


function get_menu_items_ajax() {

    $menu_id = $_REQUEST[ 'menu_id' ];

    $menu_items = get_menu_to_array( $menu_id, 'term_id' );

    wp_send_success_json( isset( $menu_items[ 'menu_items' ] ) ? $menu_items[ 'menu_items' ] : array() );

}

add_action( 'wp_ajax_get-site-menu-items', 'get_menu_items_ajax' );

function get_styles( $element, $style = '' ) {

    $templates = array();

    # get base styles
    global $base_element_templates;

    $styles = array();

    $base_styles = isset( $base_element_templates [ $element ] ) ? $base_element_templates [ $element ] : array();

    foreach ( $base_styles as $style )
        $styles [ ] = $style;

    # get theme specific styles
    global $element_templates;

    $theme_styles = isset( $element_templates [ $element ] ) ? $element_templates [ $element ] : array();

    foreach ( $theme_styles as $style )
        $styles [ ] = $style;

    return $styles;
}

function get_style_template( $element ) {

    if ( !isset( $element[ 'style' ] ) )
        return FALSE;

    $templates = get_styles( $element[ 'element' ] );

    $mtemplate = '';

    foreach ( $templates as $template ) {
        if ( $template[ 'name' ] == $element[ 'style' ] )
            $mtemplate = $template[ 'template' ];
    }

    return $mtemplate;
}

function get_page_json_for_site( $page_id, $autosave = FALSE, $onlyPage = false ) {

    if ( $page_id == 0 )
        return FALSE;

    $json = array();
    $key = '';
    if ( $autosave === TRUE )
        $key = '-autosave';

    if (!$onlyPage){
        $json [ 'header' ] = get_option( 'theme-header' . $key, array() );

        if ( $key === '-autosave' && empty( $json [ 'header' ] ) )
            $json [ 'header' ] = get_option( 'theme-header', array() );

        $json [ 'footer' ] = get_option( 'theme-footer' . $key, array() );

        if ( $key === '-autosave' && empty( $json [ 'footer' ] ) )
            $json [ 'footer' ] = get_option( 'theme-footer', array() );
    }

    $json[ 'page' ] = get_page_content_json( $page_id, $autosave );

    $d = array();

    foreach ( $json as $section => $elements ) {
        $d [ $section ] = array();
        if ( !is_array( $elements ) )
            continue;
        foreach ( $elements as $element ) {
            if ( $element [ 'element' ] === "Row" ) {
                $element [ 'columncount' ] = count( $element [ 'elements' ] );
                $d [ $section ] [ ] = get_row_elements( $element );
            } else
                $d [ $section ] [ ] = get_meta_values( $element );
        }
    }
    $data = wp_parse_args(array('id' => $page_id), $d);
   
    return $data;
}

function get_page_main_json( $page_id = 0 ) {

    if ( is_singular( 'impruw_room' ) ) {
        // get the json from single room
        $p = get_page_by_title( 'Single Room' );

        $json = get_post_meta( $p->ID, 'page-json', TRUE );
    } else {
        $json = get_post_meta( $page_id, 'page-json', TRUE );
    }

    return $json;
}


function read_page_json() {

    $page_id = $_REQUEST [ 'page_id' ];
    $only_page = $_REQUEST [ 'only_page' ] ;
    $page_id= icl_object_id( $page_id, 'page', TRUE, 'en' );

    $data = get_page_json_for_site( $page_id, TRUE, $only_page === 'yes' );
    
    $lock = true;
    if( wp_check_post_lock( $page_id ) === false ){
        $new_lock = wp_set_post_lock( $page_id );
        $lock = implode( ':', $new_lock );
    }
    
    wp_send_json( array(
        'code' => 'OK',
        'data' => $data,
        'lock' => $lock,
        '_wpnonce' => wp_create_nonce( 'update-post_' . $page_id )
    ) );
}

add_action( 'wp_ajax_read-page-json', 'read_page_json' );

/**
 * [get_site_socials description]
 * @return [type] [description]
 */
function get_site_socials() {

    $data = array(
        array(
            'socialname' => 'Facebook',
            'sociallink' => 'http://Facebook.com'
        ),
        array(
            'socialname' => 'Twitter',
            'sociallink' => 'http://Twitter.com'
        ),
        array(
            'socialname' => 'Youtube',
            'sociallink' => 'http://Youtube.com'
        )
    );

    wp_send_json( array(
        'code' => 'OK',
        'data' => $data
    ) );
}

add_action( 'wp_ajax_get-site-socials', 'get_site_socials' );

function impruw_error_encountered(){

    $error = $_REQUEST['error'];
    ob_start();
    print_r($error);
    $html = ob_get_clean();
    wp_mail('impruw@ajency.in', 'Impruw Error On Live', $html);
    wp_die();
}
add_action( 'wp_ajax_impruw_error_encountered', 'impruw_error_encountered' );
add_action( 'wp_ajax_nopriv_impruw_error_encountered', 'impruw_error_encountered' );
