<?php
/*
    File Name: functions.php
    Description: This file has a list of the following functions used in this theme
 */
define( 'PARENTTHEMEPATH', ABSPATH . 'wp-content/themes/impruwclientparent/' );
require_once PARENTTHEMEPATH . 'api/entities/leftnav.php';

global $page_id;
$page_id = 0;


require_once PARENTTHEMEPATH . 'includes/Underscore.php';
require_once PARENTTHEMEPATH . 'elements/Element.php';
require_once PARENTTHEMEPATH . 'includes/SiteModel.php';
require_once PARENTTHEMEPATH . 'includes/UserModel.php';
require_once PARENTTHEMEPATH . 'includes/RoomModel.php';
require_once PARENTTHEMEPATH . 'includes/Media.php';


//add theme support
add_theme_support( 'menus' );
add_theme_support('post-thumbnails');

//remove wordpress admin bar
show_admin_bar( false );
load_theme_textdomain( 'impruwclientparent' );



/*--------------------------------------------------------------------------------------
*
* impruw_register_room_init
*function to create a new post type called rooms
*
*-------------------------------------------------------------------------------------*/
/* * **Register Room Taxonomy & Post Type*** */

function impruw_register_room_init() {
    $url = get_template_directory_uri();
    $labels = array(
        'name' => 'Rooms',
        'singular_name' => 'Room',
        'add_new' => 'Add New',
        'add_new_item' => 'Add New Room',
        'edit_item' => 'Edit Room',
        'new_item' => 'New Romm',
        'all_items' => 'All Rooms',
        'view_item' => 'View Romms',
        'search_items' => 'Search Rooms',
        'not_found' => 'No Rooms found',
        'not_found_in_trash' => 'No Rooms found in Trash',
        'parent_item_colon' => '',
        'menu_name' => 'Rooms'
    );

    $args = array(
        'labels' => $labels,
        'label' => __( 'room', "impruwclientparent" ),
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'rewrite' => array( 'slug' => 'room' ),
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => false,
        'menu_position' => null,
        //'menu_icon' => '' . $url . '/images/room.png',
        'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'custom-fields' )
    );

    register_post_type( 'impruw_room', $args );
}

add_action( 'init', 'impruw_register_room_init' );




/*--------------------------------------------------------------------------------------
*
* create_room_taxonomies_and_add_terms
*function to create taxonomies under post type emails
*also creates immediate, batvh and marketing terms under email_type
*
*-------------------------------------------------------------------------------------*/

function create_room_taxonomies_and_add_terms() {
    // Add new taxonomy, Types
    register_taxonomy( 'impruw_room_facility', array() );
    /* $facilities_labels = array(
        'name' => _x('Facilities', 'taxonomy general name'),
        'singular_name' => _x('Facility', 'taxonomy singular name'),
        'search_items' => __('Search Facilities','impruwclientparent'),
        'all_items' => __('All Facilities','impruwclientparent'),
        'parent_item' => __('Parent Facility','impruwclientparent'),
        'parent_item_colon' => __('Parent Facility:','impruwclientparent'),
        'edit_item' => __('Edit Facility','impruwclientparent'),
        'update_item' => __('Update Facility','impruwclientparent'),
        'add_new_item' => __('Add New Facility','impruwclientparent'),
        'new_item_name' => __('New Facility','impruwclientparent'),
        'menu_name' => __('Facility','impruwclientparent')
    );

    $tag_args = array(
        'hierarchical' => true,
        'labels' => $facilities_labels,
        'show_ui' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'facility')
    );

    register_taxonomy('impruw_room_facility', 'impruw_room', $tag_args);

    */



    $labels = array(
        'name'                       => _x( 'Facilities', 'taxonomy general name' ),
        'singular_name'              => _x( 'Facility', 'taxonomy singular name' ),
        'search_items'               => __( 'Search Facilities', 'impruwclientparent' ),
        'popular_items'              => __( 'Popular Faclilities', 'impruwclientparent' ),
        'all_items'                  => __( 'All Facilities', 'impruwclientparent' ),
        'parent_item'                => null,
        'parent_item_colon'          => null,
        'edit_item'                  => __( 'Edit Facility', 'impruwclientparent' ),
        'update_item'                => __( 'Update Facility', 'impruwclientparent' ),
        'add_new_item'               => __( 'Add New Facility', 'impruwclientparent' ),
        'new_item_name'              => __( 'New Facility Name', 'impruwclientparent' ),
        'separate_items_with_commas' => __( 'Separate facilities with commas' ),
        'add_or_remove_items'        => __( 'Add or remove facilities', 'impruwclientparent' ),
        'choose_from_most_used'      => __( 'Choose from the most used facilities', 'impruwclientparent' ),
        'not_found'                  => __( 'No facilities found.', 'impruwclientparent' ),
        'menu_name'                  => __( 'Facilities', 'impruwclientparent' ),
    );

    $args = array(
        'hierarchical'          => false,
        'labels'                => $labels,
        'show_ui'               => true,
        'show_admin_column'     => true,
        'update_count_callback' => '_update_post_term_count',
        'query_var'             => true,
        'rewrite'               => array( 'slug' => 'facility' ),
    );

    register_taxonomy( 'impruw_room_facility', 'impruw_room', $args );




}

add_action( 'init', 'create_room_taxonomies_and_add_terms', 0 );





/**
 * Generates the markup for a specific section
 *
 * @param type    $section
 */
function generate_markup( $section ) {

    global $post, $markup_JSON;

    $id = !is_null( $post ) ? $post->ID : 0;

    $markup_JSON = get_page_markup_JSON( );
    
    
    if ( !isset( $markup_JSON[$section] ) )
        return;

    $json = $markup_JSON[$section];

    $html = '';

    foreach ( $json['elements'] as $element ) {

        $html .= add_element_markup( $element );

    }

    return $html;
}

/**
 * Gets the markup
 *
 * @param type    $element
 * @return type
 */
function add_element_markup( $element ) {

    $html = '';

    switch ( $element['elementType'] ) {

    case 'BuilderRow':
        $html = get_builder_row_markup( $element );
        break;
    case 'BuilderRowColumn':
        $html = get_builder_row_column_markup( $element );
        break;
    case 'ContainerElement':
        $html = get_container_markup( $element );
        break;
    case 'ImageElement':
        $html = get_image_element_markup( $element );
        break;
    case 'MenuElement':
        $html = get_menu_element_markup( $element );
        break;
    case 'TitleElement':
        $html = get_title_element_markup( $element );
        break;
    case 'TextElement':
        $html = get_text_element_markup( $element );
        break;
    case 'AddressElement':
        $html = get_address_element_markup( $element );
        break;
    case 'SocialElement':
        $html = get_social_element_markup( $element );
        break;
    case 'SliderElement':
        $html = get_slider_element_markup( $element );
        break;
    case 'ContactFormElement':
        $html = get_contact_form_element_markup( $element );
        break;
    case 'MapElement':
        $html = get_map_element_markup( $element );
        break;
    case 'LogoElement':
        $html = get_logo_element_markup( $element );
        break; 
    case 'RoomDescription':
        $html = get_room_description_markup( $element );
        break; 
    case 'RoomTitle':
        $html = get_room_title_markup( $element );
        break; 
    case 'RoomFacilities':
        $html = get_room_facilities_markup( $element );
        break;  
    case 'RoomGallery':
        $html = get_room_gallery_markup( $element );
        break; 
    case 'RoomListElement':
        $html = get_room_list_markup( $element );
        break; 
    default:
        break;

    }
    
    return $html;
}



/**
 * Generates the row markup
 *
 * @param type    $element
 */
function get_builder_row_markup( $element ) {

    return "<div class='row'><div class='column col-md-12 empty-column'></div></div>";

    require_once PARENTTHEMEPATH . 'elements/BuilderRow.php';

    $row = new BuilderRow( $element );

    $html = $row->get_open_tag();

    if ( $row->has_child_elements() ) {

        foreach ( $row->get_elements() as $ele ) {

            $html .= add_element_markup( $ele );

        }

    }

    $html .= $row->get_close_tag();

    return $html;

}

/**
 * Generates the column markup
 *
 * @param type    $element
 */
function get_builder_row_column_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/BuilderRowColumn.php';

    $column = new BuilderRowColumn( $element );

    $html = $column->get_open_tag();

    $html .= ( isset( $element['content'] ) ? $element['content'] : '' );//for testing

    if ( $column->has_child_elements() ) {

        foreach ( $column->get_elements() as $ele ) {

            $html .= add_element_markup( $ele );

        }

    }

    $html .= $column->get_close_tag();

    return $html;

}

/**
 * Generates the image markup
 *
 * @param type    $element
 */
function get_room_description_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/room/RoomDescription.php';

    global $page_id;

    $room = new RoomDescription( $element, $page_id );

    $html = $room->get_markup();

    return $html;

}

/**
 * Generates the room title markup
 *
 * @param type    $element
 */
function get_room_title_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/room/RoomTitle.php';

    $room = new RoomTitle( $element );

    $html = $room->get_markup();

    return $html;

}


/**
 * Generates the room title markup
 *
 * @param type    $element
 */
function get_room_gallery_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/room/RoomGallery.php';

    $room = new RoomGallery( $element );

    $html = $room->get_markup();

    return $html;

}

/**
 * Generates the room title markup
 *
 * @param type    $element
 */
function get_room_list_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/room/RoomList.php';

    $room = new RoomList( $element );

    $html = $room->get_markup();

    return $html;

}

/**
 * Generates the room facilities
 *
 * @param type    $element
 */
function get_room_facilities_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/room/RoomFacilities.php';

    $room = new RoomFacilities( $element );

    $html = $room->get_markup();

    return $html;

}

/**
 * Generates the image markup
 *
 * @param type    $element
 */
function get_image_element_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/ImageElement.php';

    $image = new ImageElement( $element );

    $html = $image->get_markup();

    return $html;

}

/**
 * Generates the image markup
 *
 * @param type    $element
 */
function get_contact_form_element_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/ContactFormElement.php';

    $contact = new ContactFormElement( $element);

    $html = $contact->get_markup();

    return $html;

}

/**
 * Generates the image markup
 *
 * @param type    $element
 */
function get_map_element_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/MapElement.php';

    $map = new MapElement( $element);

    $html = $map->get_markup();

    return $html;

}

/**
 * Generates the image markup
 *
 * @param type    $element
 */
function get_logo_element_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/LogoElement.php';

    $logo = new LogoElement( $element );

    $html = $logo->get_markup();

    return $html;

}

/**
 * Generates the address markup
 *
 * @param type    $element
 */
function get_address_element_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/AddressElement.php';

    $address = new AddressElement( $element );

    $html = $address->get_markup();

    return $html;

}

/**
 * Generates the Social markup
 *
 * @param type    $element
 */
function get_social_element_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/SocialElement.php';

    $social = new SocialElement( $element );

    $html = $social->get_markup();

    return $html;

}

/**
 * Generates the title markup
 *
 * @param type    $element
 */
function get_title_element_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/TitleElement.php';

    $title = new TitleElement( $element );

    $html = $title->get_markup();

    return $html;

}

/**
 * Generates the text markup
 *
 * @param type    $element
 */
function get_text_element_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/TextElement.php';

    $text = new TextElement( $element );

    $html = $text->get_markup();

    return $html;
}

/**
 * Generates the title markup
 *
 * @param type    $element
 */
function get_slider_element_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/SliderElement.php';

    $slider = new SliderElement( $element );

    $html = $slider->get_markup();

    return $html;

}

/**
 * Generates the row markup
 *
 * @param type    $element
 */
function get_menu_element_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/MenuElement.php';

    $menu = new MenuElement( $element );

    $html = $menu->get_markup();

    return $html;
}

/**
 * Generates the row markup
 *
 * @param type    $element 
 */
function get_container_markup( $element ) {

    require_once PARENTTHEMEPATH . 'elements/ContainerElement.php';

    $row = new ContainerElement( $element );

    $html = $row->get_open_tag();

    if ( $row->has_child_elements() ) {

        foreach ( $row->get_elements() as $ele ) {

            $html .= add_element_markup( $ele );

        }

    }

    $html .= $row->get_close_tag();

    return $html;

}

/**
 * Gets the page markup json from DB
 *
 * @param type    $page_id
 */
function get_page_markup_JSON( $page_id  = 0 ) {

    //get page slug
    $page_id = get_the_ID();

    $json     = array();

    $header = get_option('theme-header');

    if(is_array($header))
        $json['header'] = $header;

    if(is_singular('impruw_room')){

        $page = get_post_meta($page_id,'page-json',true);
        
        if($page === ''){
            $p = get_page_by_title( 'Single Room');
            $page = get_post_meta($p->ID,'page-json',true);
        }

        $json['page']   = $page;
    }
    else{
        $page = get_post_meta($page_id,'page-json',true);
        if(is_array($page))
            $json['page']   = $page;
    }

    $footer = get_option('theme-footer');
    if(is_array($footer))
        $json['footer'] = $footer;

    return !empty( $json ) ? $json : array();
}

/**
 * Returns the parent theme directory path
 *
 * @return string
 */
function get_parent_template_directory_uri() {

    $theme_root_uri = get_theme_root_uri();

    return "$theme_root_uri/impruwclientparent";
}

/**
 * getThemeCSS
 * echo's the JS files for site
 */
function get_theme_JS() {
?>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/js/jquery.min.js"></script>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/js/bootstrap.min.js"></script>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/js/holder.js"></script>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/js/cssFx.js"></script>
   <?php
    $theme_path =  get_stylesheet_directory() . "/js";
    if ( file_exists( $theme_path ) && is_dir( $theme_path ) ) {

        $js_files = scandir( $theme_path, 1 );
        foreach ( $js_files as $key => $value ) {
            if ( !in_array( $value, array( ".", ".." ) ) ) {
                $files[] = $value;
            }
        }

        asort( $files );

        foreach ( $files as $file ) {
?>
            <script src="<?php echo get_template_directory_uri(); ?>/js/<?php echo $file; ?>"></script>
        <?php
        }
    }
}


/**
 * getThemeCSS
 * echo's the JS files for site
 */

function get_theme_CSS() {
?>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/bootstrap.min.css" type="text/css" rel="stylesheet"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/flat-ui.css" type="text/css" rel="stylesheet"/>
    <?php
    $theme_path =  get_stylesheet_directory()."/css";
    $css_files = scandir( $theme_path, 1 );
    $files = array();
    if ( file_exists( $theme_path ) && is_dir( $theme_path ) ) {

        foreach ( $css_files as $key => $value ) {

            if ( !in_array( $value, array( ".", ".." ) ) ) {

                $files[]  = $value;

            }
        }
        asort( $files );

        foreach ( $files as $file ) {
            echo "<link rel='stylesheet' href='". get_template_directory_uri() ."/css/$file' type='text/css'/>";
        }
    }
}

/**
 * Fecthed the json for a page from DB
 *
 * @global type $wpdb
 * @param type    $id
 */
function get_page_json( $id ) {


    global $wpdb;

    $sql = $wpdb->prepare( "SELECT json FROM {$wpdb->base_prefix}page_layouts
                           WHERE id = %d", $id );

    $json = $wpdb->get_var( $sql );

    if ( $json == null )
        return array();

    $json = maybe_unserialize( $json );

    return  $json;
}


/**
 * Reads the json layout and save it
 *
 */
function save_json_structure() {

    $json = $_POST['json'];

    global $wpdb;

    $wpdb->update( $wpdb->base_prefix.'page_layouts',
        array(
            'title'    => 'home-2',
            'json'    => maybe_serialize( $json )
        ),
        array( 'id' => 4 ) );

    wp_send_json( array( 'code' => 'OK', 'json' => $json ) );
}
add_action( 'wp_ajax_save_json_structure', 'save_json_structure' );
add_action( 'wp_ajax_nopriv_save_json_structure', 'save_json_structure' );


/**
 * Reads the json layout and save it
 *
 */
function publish_page() {

    $json       = $_POST['json'];
    $page_id    = $_POST['pageId'];

    update_post_meta( $page_id, 'page_markup_json', $json );

    wp_send_json( array( 'code' => 'OK', 'json' => $json ) );
}
add_action( 'wp_ajax_publish_page', 'publish_page' );
add_action( 'wp_ajax_nopriv_publish_page', 'publish_page' );


/**
 * Retuns the jSON layout for the given ID
 */
function get_saved_layout() {

    $page_id = $_GET['pageId'];

    define( 'FOR_BUILDER', true );

    $json = get_page_markup_JSON( $page_id );

    echo json_encode( $json );

    die;
}
add_action( 'wp_ajax_get_saved_layout', 'get_saved_layout' );
add_action( 'wp_ajax_nopriv_get_saved_layout', 'get_saved_layout' );


//insert_room();
function insert_room() {
    $terms = array( 10 );
    $array=array( 'post_title' => 'Deluxe', 'post_content' => 'Thisis a deluxe room.', 'user_id' => 3, 'inventory' => 10, 'terms'=>$terms );
    $attribute_array = array( 'weekday_price'=>'10', 'weekend_price'=>'20', 'num_of_adults'=>'2', 'num_of_children'=>'2', 'extra_adult'=>'10', 'extra_child'=>'10', 'include_tax'=>'yes', 'tax_percent'=>'12', 'terms_and_conditions'=>'agree' );
    $addons_array = array( 'breakfast at bed'=>'10', 'lunch_buffet'=>'10' );
    $tariff_array = array( array( 'start_date'=>date( "Y/m/d" ), 'end_date'=>date( "Y/m/d" ), 'attributes'=>$attribute_array, 'add_ons'=>$addons_array ) );
    add_new_room( 1, $array, $tariff_array );
    echo "yes";exit;
}

function add_new_room( $blog_id, $array, $tariff_array ) {
    switch_to_blog( $blog_id );
    $my_post = array(
        'post_title'    => $array['post_title'],
        'post_content'  => $array['post_content'],
        'post_status'   => 'publish',
        'post_author'   => $array['user_id'],
        'post_type'     => 'impruw_room'
    );
    //print_r($array['terms']);exit;
    // Insert the post into the database
    $post_id = wp_insert_post( $my_post );
    update_post_meta( $post_id, 'inventory', $array['inventory'] );//adds thew inventory value to the room
    // var_dump( wp_set_object_terms($post_id, $array['terms'], 'impruw_room_facility'));exit;;
    update_post_meta($post_id,'room-attachments',$array['room_attachments'] );
    
    //insert featured image 
   /* if(count($array['room_attachments'])>0){
    	update_post_meta($post_id,'thumbnail-id',$array['room_attachments'][0] );    	
    }*/
    
    $plan_tariff_array = explode(',',$array['plantariff']);
    $plan_tariff_serialized = maybe_serialize($plan_tariff_array);
    
    update_post_meta($post_id,'room-plantariff',$plan_tariff_serialized );
    
    wp_set_object_terms( $post_id, $array['terms'], 'impruw_room_facility' );
    add_room_tariff( $post_id, $tariff_array );
    restore_current_blog();
    
    
    return $post_id;//added on 14jan2014

}


function add_room_tariff( $post_id, $tariff_array ) {
    global $wpdb;
    foreach ( $tariff_array as $tariff ) {   if ( is_array( $tariff ) )
            $start_date = $tariff['start_date'];
        $end_date = $tariff['end_date'];
        $attributes = maybe_serialize( $tariff['attributes'] );
        $add_ons = maybe_serialize( $tariff['add_ons'] );
        $wpdb->insert(
            $wpdb->prefix.'room_tariffs',
            array(
                'start_date' => $start_date,
                'end_date' => $end_date,
                'post_id' => $post_id,
                'attributes' => $attributes,
                'add_ons' => $add_ons
            )
        );

    }
}


function agc_register_parent_site_menus() {

    register_nav_menus( array(
            'header_menu' => 'Header Menu',
            'footer_menu' => 'Footer Menu'
        ) );
}
add_action( 'init', 'agc_register_parent_site_menus' );


/**
 * Function to return the actual content markup
 */
function get_content_markup() {

    $json = $_POST['json'];
    
    global $page_id;

    $page_id = (int)$_POST['pageId'];

    define('FOR_BUILDER',true);

    $data = array();

    if ( !isset( $json ) )
        $data[] =  "Nothing Found";

    foreach ( $json as $section ) {

        $d      = elements_markup( $section['elements'] );
        $data   = array_merge($data, $d);
    }

    if ( $data )
        echo json_encode( array( 'code' => 'OK'   , 'data' => $data ) );
    else
        echo json_encode( array( 'code' => 'ERROR', 'message' =>  'Nothing to return' ) );
    die;
}
add_action( 'wp_ajax_get_content_markup', 'get_content_markup' );
add_action( 'wp_ajax_nopriv_get_content_markup', 'get_content_markup' );



/**
 * [elements_markup description]
 * @param  [type] $elements [description]
 * @return [type]           [description]
 */
function elements_markup( $elements ) {

    $e = array();

    foreach ( $elements as $element ) {

        //skip if already sent
        if($element['contentFetched'] == 'true')
            continue;

        if ( $element['elementType'] === 'BuilderRow' || $element['elementType'] === 'BuilderRowColumn' ) {

            if ( isset( $element['elements'] ) && count( $element['elements'] ) > 0 ) {
                $eles   = elements_markup( $element['elements'] );
                $e      = array_merge( $e , $eles );
            }
        }
        else {
            $e[$element['id']] = add_element_markup( $element );
        }

    }
    return $e;

}


/**
 * Get site details
 */
/* function get_site_data(){

$blogdetails = get_blog_details(get_current_blog_id());
header('Content-Type: application/json');
echo json_encode(array('code' => 'OK', 'sitetitle'=> $blogdetails->blogname) );
die();

}
add_action('wp_ajax_get_site_data','get_site_data');
add_action('wp_ajax_nopriv_get_site_data','get_site_data');
*/





/**
 * Get site details
 *
 */
function get_site_data_ajx() {

    $site_id = $_GET['id'];

    $site_profile_details = get_site_data( $site_id );

    header( 'Content-Type: application/json' );
    echo json_encode( array( 'code' => 'OK', 'data'=> $site_profile_details ) );
    die();

}
add_action( 'wp_ajax_get_site_data_ajx', 'get_site_data_ajx' );
add_action( 'wp_ajax_nopriv_get_site_data_ajx', 'get_site_data_ajx' );



/**
 *  Function to get site details
 *
 * @param int     site id $site_id
 * @return array containing site profile data
 */
function get_site_data( $site_id ) {

    $site = new SiteModel( $site_id );
    $site_profile_data = $site->get_site_profile();

    return $site_profile_data;

}

/**
 * 
 * Function to remove business logo
 */
function remove_business_logo(){
	
	var_dump('remove business  logo');
	$result = update_option('sitebusiness-logo','' );
	if(!result){
		wp_send_json( array( 'code' => 'ERROR', 'msg'=>_('Error removing business logo') ) );
		
	}
	else{
		wp_send_json( array( 'code' => 'OK', 'msg'=>_('Business logo removed successfully') ) );
	} 
	
}
add_action( 'wp_ajax_remove_business_logo', 'remove_business_logo' );
add_action( 'wp_ajax_nopriv_remove_business_logo', 'remove_business_logo' );



/**
 * Function to save site profile (business details, social)
 * Type: Ajax call
 *
 */
function update_site_data() {

    if('POST' !== $_SERVER['REQUEST_METHOD'])
        wp_send_json('Invalid request method');

    $changes = $_POST['changes'];

    if ( save_site_data( $changes) ) {

        header( 'Content-Type: application/json' );
        echo json_encode( array( 'code' => 'OK') );
        die();
    }
    else {

        header( 'Content-Type: application/json' );
        echo json_encode( array( 'code' => 'FAILED', 'msg'=> _('Could not save site profile') ) );
        die();
    }

}
add_action( 'wp_ajax_update_site_data', 'update_site_data' );
add_action( 'wp_ajax_nopriv_update_site_data', 'update_site_data' );




/**
 * Function to Save site Details
 *
 * @param array   containign business details & social details
 * Ex: $site_form_data sitedata( 'business'=>array('ph'=>99),
 *          'social'=>array('facebook'=>'myfbid') )
 * @return boolean
 */
function save_site_data( $site_form_data ) {

    $site = new SiteModel( get_current_blog_id() );

    if ( $site->save_site_profile( $site_form_data ) )

        return true;
    else

        return false;


}




/**
 * Function accepts serialized form data and returns aray containing form field name-value
 * return array containing all form key,values
 */
function serializedform_to_array( $serialized_form ) {
    if ( count( $serialized_form )>0 ) {

        $ar_formdata = array();
        foreach ( $serialized_form as $key_form_data=> $value_form_data ) {

            $value_form_data['name'] = str_replace( '[', '', $value_form_data['name'] );
            $value_form_data['name'] = str_replace( ']', '', $value_form_data['name'] );

            if ( array_key_exists( $value_form_data['name'], $ar_formdata ) ) {

                $ar_formdata[$value_form_data['name']].=",".$value_form_data['value'];
            }
            else {

                $ar_formdata[$value_form_data['name']]  =  $value_form_data['value'];
            }

        }
    }
    return $ar_formdata;
}



/**
 * Function to get user profile
 */
function get_user_profile_ajx() {

    $user_profile_details = get_user_data( get_current_user_id() );

    header( 'Content-Type: application/json' );
    echo json_encode( array( 'code' => 'OK', 'user_data'=>'userdata' ) );
    die();
}
add_action( 'wp_ajax_get_user_profile_ajx', 'get_user_profile_ajx' );
add_action( 'wp_ajax_nopriv_get_user_profile_ajx', 'get_user_profile_ajx' );




function get_user_data( $user_id ) {
    $user = new ImpruwUser( $user_id );

    $user_data = $user->get_user_basic_info();

    return $user_data;
}


/**
 * Function to save user profile
 */
function save_user_profile_ajx() {
    $userform_general =  serializedform_to_array( $_POST['userprofile_general'] );


    $user_form_data = array( 'general'=>$userform_general );



    $profile_save_status = save_user_profile( $user_form_data, get_current_user_id() );
    if ( !is_string( $profile_save_status ) ) {

        header( 'Content-Type: application/json' );
        echo json_encode( array( 'code' => 'OK', 'msg'=>_('User profile updated successfully') ) );
        die();
    }
    else {

        header( 'Content-Type: application/json' );
        echo json_encode( array( 'code' => 'FAILED', 'msg'=>_($profile_save_status) ) );
        die();
    }
}
add_action( 'wp_ajax_save_user_profile_ajx', 'save_user_profile_ajx' );
add_action( 'wp_ajax_nopriv_save_user_profile_ajx', 'save_user_profile_ajx' );



function save_user_profile( $user_data, $user_id ) {

    $user_data['ID'] =  $user_id;

    $user = new ImpruwUser( get_current_user_id() );
    $profile_save_status = $user->save_user_profile( $user_data );

    return $profile_save_status;


}

function update_user_passwrd_ajx() {


    $userform_password =  serializedform_to_array( $_POST['userprofile_passdata'] );

    $user_form_data = array( 'passdata'=>$userform_password );
    $update_status = update_user_passwrd( $user_form_data, get_current_user_id() );

    if ( is_string( $update_status ) ) {

        header( 'Content-Type: application/json' );
        echo json_encode( array( 'code' => 'FAILED', 'msg'=> $update_status ) );
        die();
    }
    else {

        header( 'Content-Type: application/json' );
        echo json_encode( array( 'code' => 'OK', 'msg'=>_('Password changed successfully') ) );
        die();

    }


}
add_action( 'wp_ajax_update_user_passwrd_ajx', 'update_user_passwrd_ajx' );
add_action( 'wp_ajax_nopriv_update_user_passwrd_ajx', 'update_user_passwrd_ajx' );


/**
 * Function to  update user password
 *
 * @param unknown $user_data
 * @param unknown $user_id
 * @return boolean
 */
function update_user_passwrd( $user_pass_data, $user_id ) {

    $user = new ImpruwUser( $user_id );

    $update_status = $user->reset_user_password( $user_pass_data );
    return $update_status;

}

/**
 * Reads all registered menus and returns as array
 */
function get_site_menu() {

    $menu_name = $_GET['menu-name'];

    $wp_menu = get_menu_to_array( $menu_name );

    wp_send_json( $wp_menu );

    die;
}
add_action( 'wp_ajax_get_site_menu', 'get_site_menu' );


/**
 * Retuns the menu data
 *
 * @param unknown $menu_id The menu Id
 */
function get_menu_to_array( $menu_name ) {

    $menu = get_term_by( 'name', $menu_name, 'nav_menu' );

    if ( $menu === false )
        return array( 'code' => 'ERROR', 'message' => 'Invalid menu id' );

    $m = wp_get_nav_menu_items( $menu->term_id );

    $sorted_menu_items =  array();

    //create all top level menu
    foreach ( (array) $m as $menu_item ) {

        $mn = array(
            'ID'            => $menu_item->ID,
            'menuOrder'     => $menu_item->menu_order,
            'title'         => $menu_item->title,
            'url'           => $menu_item->url
        );

        if ( (int)$menu_item->menu_item_parent === 0 ) {

            $sorted_menu_items[$menu_item->menu_order] = $mn;
        }

    }

    //add submenus
    foreach ( (array) $m as $menu_item ) {

        $mn = array(
            'ID'            => $menu_item->ID,
            'menuOrder'     => $menu_item->menu_order,
            'title'         => $menu_item->title,
            'url'           => $menu_item->url
        );

        if ( (int)$menu_item->menu_item_parent !== 0 ) {
            $sorted_menu_items[$menu_item->menu_item_parent]['subMenu'][] = $mn;
        }

    }

    $wp_menu = array(
        'id'            => (int)$menu->term_id,
        'name'          => $menu->name,
        'slug'          => $menu->slug,
        'description'   => $menu->description,
        'items'         => $sorted_menu_items
    );

    return $wp_menu;
}

function update_menu_order() {

    $hierarchy = $_POST['hierarchy'];

    $menu_id   = $_POST['menuId'];

    $order = 1;
    foreach ( $hierarchy as $key => $value ) {

        $p_id = $value['id'];

        wp_update_post( array( 'ID' => $p_id, 'menu_order' => $order ) );

        $order++;

        if ( isset( $value['children'] ) ) {

            $parent = $p_id;

            foreach ( $value['children'] as $k => $v ) {

                $p_id = $v['id'];

                wp_update_post( array( 'ID' => $p_id, 'menu_order' => $order ) );
                update_post_meta( $p_id, '_menu_item_menu_item_parent', $parent );

                $order++;
            }

        }

    }

    wp_send_json( array( 'code' => 'OK', 'items' => get_menu_to_array( $menu_id ) ) );

    die;
}
add_action( 'wp_ajax_update_menu_order', 'update_menu_order' );


/**
 * Reads all registered menus and returns as array
 */
function get_site_menus() {

    $menus = get_terms( 'nav_menu', array( 'hide_empty' => true ) );

    $wp_menus = array();

    if ( is_array( $menus ) && count( $menus ) > 0 ) {

        foreach ( $menus as $menu ) {

            $m = wp_get_nav_menu_items( $menu->term_id );

            $sorted_menu_items =  array();

            foreach ( (array) $m as $menu_item ) {
                $mn = array(
                    'ID'            => $menu_item->ID,
                    'menuOrder'     => $menu_item->menu_order,
                    'title'         => $menu_item->title,
                    'url'           => $menu_item->url
                );

                if ( $menu_item->menu_item_parent != 0 ) {
                    $sorted_menu_items[$menu_item->menu_item_parent]['subMenu'][] = $mn;
                }
                else {
                    $sorted_menu_items[$menu_item->ID] = $mn;
                }
            }

            $wp_menus[] = array(
                'id'            => (int)$menu->term_id,
                'name'          => $menu->name,
                'slug'          => $menu->slug,
                'description'   => $menu->description,
                'items'         => $sorted_menu_items
            );

        }
    }

    wp_send_json( $wp_menus[0] );

    die;
}
add_action( 'wp_ajax_get_site_menus', 'get_site_menus' );
add_action( 'wp_ajax_nopriv_get_site_menus', 'get_site_menus' );

//add_action('init',function(){
//
//    get_site_menus();
//});

/**
 * Ajax function to add / update a menu item
 */
function save_menu_item() {

    if ( 'POST' !== $_SERVER['REQUEST_METHOD'] )
        wp_send_json( array( 'code' => 'ERROR', 'message' => 'Invalid request' ) );

    $menu_id    = $_POST['menu-id'];

    $item_id    = $_POST['item-id'];

    $item_title = $_POST['item-title'];

    $item_url   = $_POST['item-url'];

    if ( (int)$item_id === 0 ) {

        $item = wp_update_nav_menu_item( $menu_id, 0 , array(
                'menu-item-title'   => $item_title,
                'menu-item-classes' => sanitize_title( $item_title ),
                'menu-item-url'     =>  $item_url,
                'menu-item-type'    => 'custom',
                'menu-item-status'  => 'publish' ) );
        if ( is_wp_error( $item ) )
            wp_send_json( array( 'code' => 'ERROR', 'message' => $item->get_error_message() ) );
        else
            wp_send_json( array( 'code' => 'OK', 'itemID' => $item ) );
    }
    else {

        wp_update_post( array( 'ID'           => $item_id,
                'post_title'   => $item_title,
            ) );

        update_post_meta( $item_id, '_menu_item_url', esc_url_raw( $item_url ) );
        wp_send_json( array( 'code' => 'OK', 'itemID' => $item_id ) );
    }
}
add_action( 'wp_ajax_save_menu_item', 'save_menu_item' );


/**
 * Removes a menu item
 */
function remove_menu_item() {

    $item_id = $_POST['itemId'];

    if ( is_nav_menu_item( $item_id ) && wp_delete_post( $item_id, true ) )
        wp_send_json( array( 'code' => 'OK', 'itemID' => $item_id ) );
    else
        wp_send_json( array( 'code' => 'ERROR', 'message' => 'Failed to remove. Please try again' ) );

    die;
}
add_action( 'wp_ajax_remove_menu_item', 'remove_menu_item' );


function query_attachments() {

    require_once PARENTTHEMEPATH . 'includes/Media.php';

    $query  = array();
    // $query['order']             = $_REQUEST['order'];
    // $query['orderby']           = $_REQUEST['orderby'];
    // $query['posts_per_page']    = $_REQUEST['posts_per_page'];
    // $query['paged']             = $_REQUEST['paged'];

    $media = get_site_media( $query );

    wp_send_json( array( 'code' => 'OK' , 'data' => $media ) );

}
add_action( 'wp_ajax_query_attachments', 'query_attachments' );
add_action( 'wp_ajax_nopriv_query_attachments', 'query_attachments' );



/**
 * Function to fetch all site facilities, addon types, date ranges & plans 
 */
function fetch_all_room_facilities() {

    $taxonomies= array( 'impruw_room_facility' );
    $room_facilities 	= get_terms( $taxonomies, array( 'hide_empty' => 0 ) );
	$addons_types 		= fetch_all_addons();
	$tax_types 			= fetch_all_tax_types();
	$date_range 		= fetch_all_daterange();
	
	$checkin_format = get_option('checkin-format');
	$checkin_time = get_option('checkin-time');
	$additional_policies = get_option('additional-policies');
	$tax_option = get_option('tax-option');
	
	$room_data = array('facilities'			=> $room_facilities,
						'addontypes'		=> $addons_types,
						'taxtypes'			=> $tax_types,
						'checkinformat'		=> ($checkin_format==false?'':$checkin_format),
						'checkintime'		=> ($checkin_time==false?'':$checkin_time),
						'additionalpolicies'=> ($additional_policies==false?'':$additional_policies),
						'taxoption'			=> ($tax_option==false?'':$tax_option),
						'dateranges'			=> 	$date_range
						);
	
    wp_send_json( array( 'code' => 'OK' , 'data' =>$room_data ) );
}
add_action( 'wp_ajax_fetch_all_room_facilities', 'fetch_all_room_facilities' );
add_action( 'wp_ajax_nopriv_fetch_all_room_facilities', 'fetch_all_room_facilities' );

/**
 * Function to fetch all addons
 */
function fetch_all_addons() {
	
	$addon_types = maybe_unserialize(get_option('addon-type'));
	 
    return $addon_types;
}

/**
 * Function to get all tax types
 * returns array of all taxes,percent,id
 */
function fetch_all_tax_types(){
	$tax_types = maybe_unserialize(get_option('tax-type'));
	return $tax_types;
}

 
/**
 * 
 * Function to get all date ranges
 */
function fetch_all_daterange(){
	global $wpdb; 
	

	 
	$table_name =  $wpdb->prefix."daterange";
 
	$result = $wpdb->get_results("SELECT * FROM $table_name"); 
  	
 	$daterangeplans = array();
 	
 	$plans = array();
 	 
 	//get plans under date range
  	if(count($result)>0){
 		foreach($result as $daterange_val ){
 			//echo $daterange_val->from;
 			 
 			$daterange_from = date('d/m/y',strtotime($daterange_val->from_date)) ;
 			 
 			$daterange_to = date('d/m/y',strtotime($daterange_val->to_date));
 			$daterange_label = $daterange_val->label;
 			
 			
 			
 			$plans = fetch_daterange_plans($daterange_val->id);
 			
 			$daterangeplans[] = array(	'id'			=> $daterange_val->id,
									   	'from'			=> $daterange_from,
 									   	'to'			=> $daterange_to,
 									  	'from_calendar' => date('d F, Y',strtotime($daterange_val->from_date)),
 										'to_calendar' 	=> date('d F, Y',strtotime($daterange_val->to_date)),
 									   	'label'			=> $daterange_label,
 									   	'plans' 		=> $plans
 									); 
 		}
 			//var_dump($daterangeplans);
 	return $daterangeplans;
 		
 	} 
 
}

/**
 * 
 * Function to get all plans for a date range 
 * @param int $daterange_id
 * returns array containing  plan name, plan description &  tariff array-containing weekday & weekend tariff
 * returns empty array on no results 
 */
function fetch_daterange_plans($daterange_id){
	global $wpdb;
	//fetch_plan_details(2);	 
	
	 
	$plandata_result =array();
	$qry_daterangeplans = $wpdb->prepare("SELECT a.tarriff as plan_tariff , a.plan_id as plan_id from  {$wpdb->prefix}datetarriff a    where a.daterange_id =  %d	", $daterange_id);
	 //var_dump($qry_daterangeplans);
	$result_daterangeplans = $wpdb->get_results($qry_daterangeplans);
	 
	
	$plans = array();
	
	
	$plans_data = maybe_unserialize(get_option('plans'));
	foreach ($plans_data as $plan_data){
	 
		$plan_name 			= $plan_data['label'];
		$plan_description 	= $plan_data['description'];
		$plan_id 			= $plan_data['id'];
		$weekend_tariff 	= ' - ';
		$weekday_tariff 	= ' - ';
		if(count($result_daterangeplans)>0){
			foreach($result_daterangeplans as $plan ){
				if($plan_data['id']==$plan->plan_id ){
					
					$tariff = maybe_unserialize($plan->plan_tariff);
					$weekday_tariff = $tariff['weekday']['tariff'] ;
					$weekend_tariff = $tariff['weekend']['tariff'];
					
				}
			}
		}
		$plans[] = array('plan_id'			=> $plan_id,
							 'plan_name' 		=> $plan_name,
							 'plan_description'	=> $plan_description,
							 'weekend_tariff'	=> $weekend_tariff,
							 'weekday_tariff'	=> $weekday_tariff 		
							);
				
			
	}
	 
	
	return($plans);
	  	
	
}

/**
 * plan id
 * ajax function to fetch plan details
 * returns array containing plan_label, plan_description, plan_id
 */
function fetch_plan_details_ajx(){
	
	$planid = $_POST['plan_id'];
	//$planid = 2;
	
	global $wpdb; 
	$plan_details = fetch_plan_details($planid); 
	
	
	/*//get tariff details for a plan
	$qry_tariff_details = $wpdb->prepare("select tarriff as plan_tariff  from {$wpdb->prefix}datetarriff where plan_id = %d ",$planid);
 
	$result_tariff_details = $wpdb->get_results($qry_tariff_details);
	if(count($result_tariff_details)>0){
		foreach($result_tariff_details as $tariff_detail){
			$plan_tariff = maybe_unserialize($tariff_detail->plan_tariff);		  
		}
	}
	*/
	
	wp_send_json(array('code'=>'OK', 'data'=>$plan_details));
	 
}
add_action( 'wp_ajax_fetch_plan_details_ajx', 'fetch_plan_details_ajx' );
add_action( 'wp_ajax_nopriv_fetch_plan_details_ajx', 'fetch_plan_details_ajx' );




/**
 * 
 * Fetch plan detailss
 * @param int $planid
 * returns array containing plan name and description , plan_id
 */
function fetch_plan_details($planid){
	 
	$plan_details = array();
	global $wpdb; 
	$plans_data = maybe_unserialize(get_option('plans'));
	foreach($plans_data as $plan_data){
		if($plan_data['id']==$planid){
			$plan_details['plan_id']	  		= trim($planid);
			$plan_details['plan_name']	  		= trim($plan_data['label']);
			$plan_details['plan_description']  	= trim($plan_data['description']);
		}
	}
	
	return $plan_details;
}


/**
 *Function to fetch tariff details for a  plan belonging to a daterange
 * returns array containing weekend and weekday tariff details
 */
function fetch_daterange_plan_tariff_data_ajx(){
	
	$daterange_plan_tariff_id = $_POST['daterange_plan_tariff_i'];
	$result = fetch_tariff_data($daterange_plan_tariff_id);
	if($result) 
		wp_send_json( array( 'code' => 'OK', 'dateTariff'=>$result) );
	else
	  wp_send_json( array( 'code' => 'ERROR', 'msg' =>'Error fetching data' ) );  
}
add_action( 'wp_ajax_fetch_daterange_plan_tariff_data_ajx', 'fetch_daterange_plan_tariff_data_ajx' );
add_action( 'wp_ajax_nopriv_fetch_daterange_plan_tariff_data_ajx', 'fetch_daterange_plan_tariff_data_ajx' );

function fetch_tariff_data($daterange_plan_tariff_id){
	global $wpdb;
	//get tariff details for a plan
	$qry_tariff_details = $wpdb->prepare("select tarriff as plan_tariff  from {$wpdb->prefix}datetarriff where id = %d ",$daterange_plan_tariff_id);
 
	$result_tariff_details = $wpdb->get_results($qry_tariff_details);
	if(count($result_tariff_details)>0){
		foreach($result_tariff_details as $tariff_detail){
			$plan_tariff = maybe_unserialize($tariff_detail->plan_tariff);		  
		}
	}
	return($plan_tariff);
	
}




/**
 * Function to update and save tariff charges 
 * int daterange_plan_tariff id 
 * Enter description here ...
 */
function save_updated_plan_tariff_ajx(){
	
	
	$tariff_data = serializedform_to_array($_POST['updatetariff_data']);
	//var_dump($tariff_data);
	
	$daterange_id = $tariff_data['hdn_daterangeId'];
	$plan_id = $tariff_data['hdn_planId'];
	 
	$daterange_plan_tariff_id =  $tariff_data['hdn_dateplantariff'];
	
	$rad_weekday 				 = (!isset($tariff_data['rad_weekday'])?'':$tariff_data['rad_weekday']);	
    $weekday_tariff 			 = (!isset($tariff_data['weekday_tariff'])?'':$tariff_data['weekday_tariff']);	
    $weekday_maxadults 			 = (!isset($tariff_data['weekday_maxadults'])?'':$tariff_data['weekday_maxadults']);	
    $weekday_maxchildren 		 = (!isset($tariff_data['weekday_maxchildren'])?'':$tariff_data['weekday_maxchildren']);	
    $weekday_charges_extra_adult = (!isset($tariff_data['weekday_charges_extra_adult'])?'':$tariff_data['weekday_charges_extra_adult']);	
    $weekday_charges_extra_child = (!isset($tariff_data['weekday_charges_extra_child'])?'':$tariff_data['weekday_charges_extra_child']);
		
	$rad_weekend 				 = (!isset($tariff_data['rad_weekend'])?'':$tariff_data['rad_weekend']) ;	
    $weekend_tariff 			 = (!isset($tariff_data['weekend_tariff'])?'':$tariff_data['weekend_tariff']);	
    $weekend_maxadults 			 = (!isset($tariff_data['weekend_maxadults'])?'':$tariff_data['weekend_maxadults']);	
    $weekend_maxchildren 		 = (!isset($tariff_data['weekend_maxchildren'])?'':$tariff_data['weekend_maxchildren']);	
    $weekend_charges_extra_adult = (!isset($tariff_data['weekend_charges_extra_adult'])?'':$tariff_data['weekend_charges_extra_adult']);	
    $weekend_charges_extra_child = (!isset($tariff_data['weekend_charges_extra_child'])?'':$tariff_data['weekend_charges_extra_child']);
	 
	//var_dump($tariff_data);	 
	
	$weekendtariff = array();
	
    $weekdaytariff = array();
		
	$weekendtariff = array( 'tariff' 				=> $weekend_tariff,
							 'maxadults'			=> $weekend_maxadults,
							 'maxchildren'			=> $weekend_maxchildren,
							 'extra_adult_charges' 	=> $weekend_charges_extra_adult,
							 'extra_child_charges'	=> $weekend_charges_extra_child
							);
	
	 $weekdaytariff = array( 'tariff' 				=> $weekday_tariff,
							 'maxadults'			=> $weekday_maxadults,
							 'maxchildren'			=> $weekday_maxchildren,
							 'extra_adult_charges' 	=> $weekday_charges_extra_adult,
							 'extra_child_charges'	=> $weekday_charges_extra_child
							);
	 
	 						
	if(!empty($daterange_plan_tariff_id)){
		//add tariff 		
		$tariff_result =  update_daterangeplan_tariff($weekendtariff, $weekdaytariff,$daterange_plan_tariff_id);
		
		if($tariff_result===false){
			wp_send_json( array( 'code' => 'ERROR', 'msg' =>_('Error updating Tariff plan') ) ); 
		}
		else {
						
			$tariff_details = array(    'weekdaytariff'		 	=> $weekday_tariff,
								  		'weekendtariff'		 	=> $weekend_tariff,
								  		'daterangePlanTariffId'	=> $daterange_plan_tariff_id,
										'daterangeid'			=> $daterange_id,
										'planid'				=> $plan_id
								);
								 
			wp_send_json( array( 'code' => 'OK', 'msg'=>_('Tariff plan is successfully updated'),'tariffdata' => $tariff_details ) );
			
			 
		}
	}
	else{
			wp_send_json( array( 'code' => 'ERROR', 'msg' =>_('Error updating tariff plan') ) );
	}
		 
	
}
add_action( 'wp_ajax_save_updated_plan_tariff_ajx', 'save_updated_plan_tariff_ajx' );
add_action( 'wp_ajax_nopriv_save_updated_plan_tariff_ajx', 'save_updated_plan_tariff_ajx' );



/**
 * Functino to updatge and save tariff charges 
 * Enter description here ...
 */
function save_updated_plan_tariff(){
	
}

/**
 * Function to save new room facility
 */
function save_new_room_facility() {

    $new_term = $_POST['new_facility'];

    $newfacililty_data = wp_insert_term( $new_term, 'impruw_room_facility', $args = array( 'hide_empty' => 0 ) ) ;



    if ( is_wp_error( $newfacililty_data ) ) {
        $error_msg = $newfacililty_data->get_error_message();

        wp_send_json( array( 'code' => 'ERROR', 'msg' => $error_msg ) );
    }
    else {

        wp_send_json( array( 'code' => 'OK', 'msg'=>_('New facility is successfully added'), 'facililty'=>$newfacililty_data ) );
    }


}
add_action( 'wp_ajax_save_new_room_facility', 'save_new_room_facility' );
add_action( 'wp_ajax_nopriv_save_new_room_facility', 'save_new_room_facility' );


/**
 * 
 * Function to add tax names
 */
function save_new_tax(){
	$new_tax_name = $_POST['new_tax_name'];
    $new_tax_percent = $_POST['new_tax_percent'];
    $max_tax_id = 0;
     
    
    $tax_array = array();
    $tax_array = maybe_unserialize(get_option('tax-type'));
    
    $tax_exists = false;
    
	if($tax_array){   
    	if(count($tax_array)>0){
    	
	    	$max_tax_id = max(array_col($tax_array, 'id')); 	 
		    foreach ($tax_array as $tax_key=>$tax_val){
		    	if($tax_val['name'] == $new_tax_name )
		    		$tax_exists = true;
		    }
    	}
    }
    
    if($tax_exists)
    	wp_send_json( array( 'code' => 'ERROR', 'msg' => _('The tax name already exists') ) );	
    
    $newtax_id = $max_tax_id + 1;
    
    
    $tax_array[]= array('id'=>$newtax_id, 'name'=>$new_tax_name,'percent'=>$new_tax_percent);
    $update_result = update_option('tax-type', maybe_serialize($tax_array));
     
    if ( $update_result ) {
		$new_addon_type_data = array('id'=>$newtax_id,'name'=>$new_tax_name,'percent'=>$new_tax_percent);
        wp_send_json( array( 'code' => 'OK', 'msg'=>_('New tax added successfully'), 'taxData'=>$new_addon_type_data ) );        
    }
    else {
		wp_send_json( array( 'code' => 'ERROR', 'msg' => _('Error adding the tax') ) );	
    }
    
    
}
add_action( 'wp_ajax_save_new_tax', 'save_new_tax' );
add_action( 'wp_ajax_nopriv_save_new_tax', 'save_new_tax' );


/**
 * 
 * Function to save new addon type
 */
function save_new_addon_type() {
		
	$new_addon_type = $_POST['new_addon_type'];
    $new_addon_price = $_POST['new_addon_price'];
	$max_addonid = 0; 
	
    $addon_types=array();
    
    $addon_types = maybe_unserialize(get_option('addon-type'));
    //var_dump($addon_types);

    $addon_exists = false;
    //check if the addon type already exists
    if($addon_types){   
    	if(count($addon_types)>0){
    	
	    	$max_addonid = max(array_col($addon_types, 'id')); 	 
		    foreach ($addon_types as $addontype_key=>$addontype_val){
		    	if($addontype_val['label'] == $new_addon_type )
		    		$addon_exists = true;
		    }
    	}
    }
     if($addon_exists)
    	wp_send_json( array( 'code' => 'ERROR', 'msg' => _('The addon type already exists') ) );	
 
    $newaddon_id = $max_addonid + 1;
    
    $addon_types[]= array('id'=>$newaddon_id, 'label'=>$new_addon_type,'price'=>$new_addon_price);
    $update_result = update_option('addon-type', maybe_serialize($addon_types));
     
    if ( $update_result ) {
		$new_addon_type_data = array('id'=>$newaddon_id,'label'=>$new_addon_type,'price'=>$new_addon_price);
        wp_send_json( array( 'code' => 'OK', 'msg'=>_('New addon type added successfully'), 'addontype'=>$new_addon_type_data ) );        
    }
    else {
		wp_send_json( array( 'code' => 'ERROR', 'msg' => _('Error adding the addon type') ) );	
    }
    


}
add_action( 'wp_ajax_save_new_addon_type', 'save_new_addon_type' );
add_action( 'wp_ajax_nopriv_save_new_addon_type', 'save_new_addon_type' );



/**
 * 
 * Function to get max value from multidimensional array
 * @param multidimensional array $a
 * @param 'key' $x
 */
function array_col(array $a, $x){
  return array_map(function($a) use ($x) { return $a[$x]; }, $a);
}


/**
 * 
 * Function to save changes to addon type
 */
function update_addon_type(){
	
	$addon_type = $_POST['addon_type'];
    $addon_price = $_POST['addon_price'];
	$addontype_edit = $_POST['addon_edit'];
    $addon_types=array();
    
    
    
    $addon_types = maybe_unserialize(get_option('addon-type'));
    $updated_addon_types = array();
    //var_dump($addon_types);
    if($addon_types){
	    foreach ($addon_types as $addontype_key=>$addontype_val){
	    	 
	    	if($addontype_val['id']!=$addontype_edit)  
	    		$updated_addon_types [] = array('id'=>$addontype_val['id'],'label'=>$addontype_val['label'],'price'=>$addontype_val['price']);
	    	 else 
	    	 	$updated_addon_types [] = array('id'=>$addontype_val['id'],'label'=>$addon_type,'price'=>$addon_price);
	    	
	    }
    } 
    
    $update_result = update_option('addon-type', maybe_serialize($updated_addon_types));
    
   


    if ( $update_result ) {
		$addon_type_data = array('id'=>$addontype_edit, 'label'=>$addon_type,'price'=>$addon_price);
		 
        wp_send_json( array( 'code' => 'OK', 'msg'=>_('Addon type updated successfully'), 'updatedaddontype'=>$addon_type_data, 'editaddontype'=>$addontype_edit ) );
        
    }
    else {
	wp_send_json( array( 'code' => 'ERROR', 'msg' => _('Error updating the addon type') ) );	
    }
    
}
add_action( 'wp_ajax_update_addon_type', 'update_addon_type' );
add_action( 'wp_ajax_nopriv_update_addon_type', 'update_addon_type' );




/**
 * 
 * Function to save changes to tax type
 */
function update_tax_type(){
	
	$tax_type = $_POST['tax_typename'];
    $tax_percent = $_POST['tax_percent'];
	$taxtype_edit = $_POST['tax_editid'];
    $tax_types=array();
    
     
    $tax_types = maybe_unserialize(get_option('tax-type'));
    $updated_tax_types = array();
    //var_dump($tax_types);
    if($tax_types){
	    foreach ($tax_types as $taxtype_key=>$taxtype_val){
	    	 
	    	if($taxtype_val['id']!=$taxtype_edit)  
	    		$updated_tax_types [] = array('id'=>$taxtype_val['id'],'name'=>$taxtype_val['name'],'percent'=>$taxtype_val['percent']);
	    	 else 
	    	 	$updated_tax_types [] = array('id'=>$taxtype_val['id'],'name'=>$tax_type,'percent'=>$tax_percent);
	    	
	    }
    } 
    
    $update_result = update_option('tax-type', maybe_serialize($updated_tax_types));
    
   


    if ( $update_result ) {
		$tax_type_data = array('id'=>$taxtype_edit, 'name'=>$tax_type,'percent'=>$tax_percent);
		 
        wp_send_json( array( 'code' => 'OK', 'msg'=>_('Tax type updated successfully'), 'updatedtaxtype'=>$tax_type_data, 'edittaxtype'=>$taxtype_edit ) );
        
    }
    else {
	wp_send_json( array( 'code' => 'ERROR', 'msg' => _('Error updating the tax type') ) );	
    }
    
}
add_action( 'wp_ajax_update_tax_type', 'update_tax_type' );
add_action( 'wp_ajax_nopriv_update_tax_type', 'update_tax_type' );



/**
 * Function to delete room facility
 */
function delete_room_facility() {
    $facility_id = $_POST['facility'];


    $del_facililty_data = wp_delete_term( $facility_id , 'impruw_room_facility', $args = array( 'hide_empty' => 0 ) );

    //var_dump($del_facililty_data);

    if ( $del_facililty_data ) {
        wp_send_json( array( 'code' => 'OK', 'msg'=>_('Facility is successfully Deleted') ) );

    }
    else {
        wp_send_json( array( 'code' => 'ERROR', 'msg' => _('Error deleting facility') ) );

    }


}
add_action( 'wp_ajax_delete_room_facility', 'delete_room_facility' );
add_action( 'wp_ajax_nopriv_delete_room_facility', 'delete_room_facility' );


/**
 * Function to delete room addon type
 */
function delete_room_addon_type() {
    $addontype_id  = $_POST['addonTypeId'];
    $addon_types = maybe_unserialize(get_option('addon-type'));
   // var_dump($addon_types);
   $updated_addon_types = array();
     if($addon_types){
	    foreach ($addon_types as $addontype_key=>$addontype_val){ 
	    	if($addontype_val['id']!=$addontype_id)  
	    		$updated_addon_types [] = array('id'=>$addontype_val['id'],'label'=>$addontype_val['label'],'price'=>$addontype_val['price']);
	    	 
	    }
	    $delete_result = update_option('addon-type', maybe_serialize($updated_addon_types));
    }
    
    if (  $delete_result ) {
        wp_send_json( array( 'code' => 'OK', 'msg'=>_('Addon type is successfully Deleted') ) );

    }
    else {
        wp_send_json( array( 'code' => 'ERROR', 'msg' => _('Error deleting addon type') ) );

    }


}
add_action( 'wp_ajax_delete_room_addon_type', 'delete_room_addon_type' );
add_action( 'wp_ajax_nopriv_delete_room_addon_type', 'delete_room_addon_type' );



function delete_room_tax_type(){
	
	$taxtype_id  = $_POST['taxTypeId'];
    $tax_types = maybe_unserialize(get_option('tax-type'));
    
   $updated_tax_types = array();
     if($tax_types){
	    foreach ($tax_types as $taxtype_key=>$taxtype_val){ 
	    	if($taxtype_val['id']!=$taxtype_id)  
	    		$updated_tax_types [] = array('id'=>$taxtype_val['id'],'name'=>$taxtype_val['name'],'percent'=>$taxtype_val['percent']);
	    	 
	    }
	    $delete_result = update_option('tax-type', maybe_serialize($updated_tax_types));
    }
    
    if (  $delete_result ) {
        wp_send_json( array( 'code' => 'OK', 'msg'=>('tax type is successfully Deleted') ) );

    }
    else {
        wp_send_json( array( 'code' => 'ERROR', 'msg' => _('Error deleting tax type') ) );

    }
	
}
add_action( 'wp_ajax_delete_room_tax_type', 'delete_room_tax_type' );
add_action( 'wp_ajax_nopriv_delete_room_tax_type', 'delete_room_tax_type' );


/**
 * 
 * Function to save changes to facility
 */
function update_room_facility() {

    $facility_id = $_POST['fac_id'];
    $facility_name = $_POST['fac_name'];

    $facility_slug = str_replace( " ", "-", $facility_name );

    $facility_data = wp_update_term( $facility_id, 'impruw_room_facility', array(
            'name' => $facility_name,
            'slug' => $facility_slug ) );

    if ( is_wp_error( $facility_data ) ) {
        $error_msg = $facility_data->get_error_message();

        wp_send_json( array( 'code' => 'ERROR', 'msg' => _($error_msg) ) );
    }
    else {

        wp_send_json( array( 'code' => 'OK', 'msg'=>_('Facility updated successfully'), 'facililty'=>$facility_data ) );
    }

}
add_action( 'wp_ajax_update_room_facility', 'update_room_facility' );
add_action( 'wp_ajax_nopriv_update_room_facility', 'update_room_facility' );


function update_checkintime(){
	$checkintime = $_POST['checkintime'];
	$checkin_format = $_POST['checkinformat'];
	
	$result_checkintime 	 = update_option('checkin-time', $checkintime);
	
	$result_checkinformat	 = update_option('checkin-format', $checkin_format);
	
	if($result_checkinformat == true || $result_checkintime == true)
		wp_send_json( array( 'code' => 'OK', 'msg'=>_('Check-in time updated successfully'), 'checkinTime'=>$checkintime, 'checkinformat'=>$checkin_format  ) );
	else 	
	 	wp_send_json( array( 'code' => 'ERROR', 'msg' => _('Error updating check-in time') ) );
}
add_action( 'wp_ajax_update_checkintime', 'update_checkintime' );
add_action( 'wp_ajax_nopriv_update_checkintime', 'update_checkintime' );

/**
 * 
 * Function to update additional policies
 */
function update_additional_policies(){

	$additional_policies = $_POST['additional_policies'];
	
	$result = update_option('additional-policies', $additional_policies);
	if($result)
		wp_send_json( array( 'code' => 'OK', 'msg'=>_('Additional policies updated successfully'), 'additionalPolicies'=>$additional_policies ) );
	else 	
	 	wp_send_json( array( 'code' => 'ERROR', 'msg' => _('Error updating additional policies') ) );
	
}
add_action( 'wp_ajax_update_additional_policies', 'update_additional_policies' );
add_action( 'wp_ajax_nopriv_update_additional_policies', 'update_additional_policies' );



function update_taxoption(){
	
	$tax_option = $_POST['taxoption'];
	
	$result = update_option('tax-option', $tax_option);
	if($result)
		wp_send_json( array( 'code' => 'OK', 'msg'=>_('Tax option updated successfully'), 'taxoption'=>$tax_option ) );
	else 	
	 	wp_send_json( array( 'code' => 'ERROR', 'msg' => _('Error updating tax option') ) );
}
add_action( 'wp_ajax_update_taxoption', 'update_taxoption' );
add_action( 'wp_ajax_nopriv_update_taxoption', 'update_taxoption' );


function update_checkinformat(){
	$checkin_format = $_POST['checkinformat'];
	
	$result = update_option('checkin-format', $checkin_format);
	if($result)
		wp_send_json( array( 'code' => 'OK', 'msg'=>_('Check-in format updated successfully'), 'checkinformat'=>$checkin_format) );
	else 	
	 	wp_send_json( array( 'code' => 'ERROR', 'msg' => _('Error updating Check-in format') ) );
}
add_action( 'wp_ajax_update_checkinformat', 'update_checkinformat' );
add_action( 'wp_ajax_nopriv_update_checkinformat', 'update_checkinformat' );


/**
 * 
 * Function to add date range 
 */

function add_date_range(){
	
	$from_daterange 	= date('Y-m-d H:i:s',strtotime($_POST['fromdaterange']));
	$to_daterange 	    = date('Y-m-d H:i:s',strtotime($_POST['todaterange'])); 
 	$label              = "winter season test";
	
	global $wpdb; 
							
	/*$qry_insert_daterange = $wpdb->prepare("INSERT INTO {$wpdb->prefix}daterange (  `from`, `to`, `label`) VALUES ( %s, %s, %s);",
							$from_daterange,$to_daterange,$label); */
	
	$table_name =  $wpdb->prefix."daterange";
	
	$result = $wpdb->insert(	$table_name, 
								array( 'from_date' 	=> $from_daterange, 
										'to_date' 	=> $to_daterange,
										'label'	=> $label
									), 
								array(  '%s', 
										'%s',
										'%s' 
									) 
				);
			 
 	$datarange_data = array( 	'id'		 => $wpdb->insert_id,			
 								'from_date'  => date('d/m/y',strtotime($_POST['fromdaterange'])), 
								'to_date' 	 => date('d/m/y',strtotime($_POST['todaterange'])),
								'label'		 => $label
						   );				
 	switch_to_blog(get_current_blog_id());
  	
	if ( $result==true ) 
		wp_send_json( array( 'code' => 'OK', 'msg'=>_('Date range is successfully added'), 'daterange'=>$datarange_data ) );
	else 	
	 	wp_send_json( array( 'code' => 'ERROR', 'msg' =>_('Error adding Date range') ) ); 
	 	 
}
add_action( 'wp_ajax_add_date_range', 'add_date_range' );
add_action( 'wp_ajax_nopriv_add_date_range', 'add_date_range' );



function update_daterange(){
	
	global $wpdb;
	$from_daterange = date('Y-m-d H:i:s',strtotime($_POST['from_daterange'])) ;
	$to_daterange 	= date('Y-m-d H:i:s', strtotime($_POST['to_daterange'])) ;
	$daterange_id 	= $_POST['daterange_id'];
	
	$table_name = $wpdb->prefix."daterange";
	
 
	
	/*$result = $wpdb->update(	$table_name,
								array(	'from_date'	=> $from_daterange,
									  	'to_date'	=> $to_daterange
								), 
								array('daterange_id'=>$daterange_id));*/
	
	$qry_update_daterange = $wpdb->prepare("UPDATE  ".$table_name.
								" SET from_date = %s, to_date = %s WHERE id = %d ",
								$from_daterange, $to_daterange, $daterange_id
							);
							
							 
	$result = $wpdb->query($qry_update_daterange); 
	
	$daterange_data = array('from_date' => date('d/m/y',strtotime($_POST['from_daterange'])),
							 'to_date'	=> date('d/m/y',strtotime($_POST['to_daterange']))
	  ); 
	
	
	if ( $result==true ) 
		wp_send_json( array( 'code' => 'OK', 'msg'=>_('Date range updated successfully'), 'daterange_data'=>$daterange_data ) );
	else 	
	 	wp_send_json( array( 'code' => 'ERROR', 'msg' =>_('Error updating Date range') ) ); 
								
	
	
}
add_action( 'wp_ajax_update_daterange', 'update_daterange' );
add_action( 'wp_ajax_nopriv_update_daterange', 'update_daterange' );




/**
 * Function to add new plan
 * 
 */
function add_new_plan_tariff(){
	
	$tariff_data = serializedform_to_array($_POST['addtariff_data']);
	//var_dump($tariff_data);
	
	$daterange_id = $tariff_data['hdn_daterangeId'];
	$plan_id = $tariff_data['hdn_planId'];
	  
	
	$rad_weekday 				 = (!isset($tariff_data['rad_weekday'])?'':$tariff_data['rad_weekday']);	
    $weekday_tariff 			 = (!isset($tariff_data['weekday_tariff'])?'':$tariff_data['weekday_tariff']);	
    $weekday_maxadults 			 = (!isset($tariff_data['weekday_maxadults'])?'':$tariff_data['weekday_maxadults']);	
    $weekday_maxchildren 		 = (!isset($tariff_data['weekday_maxchildren'])?'':$tariff_data['weekday_maxchildren']);	
    $weekday_charges_extra_adult = (!isset($tariff_data['weekday_charges_extra_adult'])?'':$tariff_data['weekday_charges_extra_adult']);	
    $weekday_charges_extra_child = (!isset($tariff_data['weekday_charges_extra_child'])?'':$tariff_data['weekday_charges_extra_child']);
		
	$rad_weekend 				 = (!isset($tariff_data['rad_weekend'])?'':$tariff_data['rad_weekend']) ;	
    $weekend_tariff 			 = (!isset($tariff_data['weekend_tariff'])?'':$tariff_data['weekend_tariff']);	
    $weekend_maxadults 			 = (!isset($tariff_data['weekend_maxadults'])?'':$tariff_data['weekend_maxadults']);	
    $weekend_maxchildren 		 = (!isset($tariff_data['weekend_maxchildren'])?'':$tariff_data['weekend_maxchildren']);	
    $weekend_charges_extra_adult = (!isset($tariff_data['weekend_charges_extra_adult'])?'':$tariff_data['weekend_charges_extra_adult']);	
    $weekend_charges_extra_child = (!isset($tariff_data['weekend_charges_extra_child'])?'':$tariff_data['weekend_charges_extra_child']);
	 
	//var_dump($tariff_data);	 
	
	$weekendtariff = array();
	
    $weekdaytariff = array();
		
	$weekendtariff = array( 'tariff' 				=> $weekend_tariff,
							 'maxadults'			=> $weekend_maxadults,
							 'maxchildren'			=> $weekend_maxchildren,
							 'extra_adult_charges' 	=> $weekend_charges_extra_adult,
							 'extra_child_charges'	=> $weekend_charges_extra_child
							);
	
	 $weekdaytariff = array( 'tariff' 				=> $weekday_tariff,
							 'maxadults'			=> $weekday_maxadults,
							 'maxchildren'			=> $weekday_maxchildren,
							 'extra_adult_charges' 	=> $weekday_charges_extra_adult,
							 'extra_child_charges'	=> $weekday_charges_extra_child
							);
	 
	 						
	if(!empty($plan_id)){
		//add tariff 		
		$tariff_result =  add_daterangeplan_tariff($weekendtariff, $weekdaytariff,$plan_id,$daterange_id);
		
		if($tariff_result===false){
			wp_send_json( array( 'code' => 'ERROR', 'msg' =>_('Error adding Tariff plan') ) ); 
		}
		else {
						
			$tariff_details = array( 
								  'planid'				 => $plan_id,
								  'daterangeid'			 => $daterange_id,
								  'plantariffid'		 => $tariff_result,
								  'weekdaytariff'		 => $weekday_tariff,
								  'weekendtariff'		 => $weekend_tariff,
								  'daterangePlanTariffId'=> $tariff_result	
								);
								 
			wp_send_json( array( 'code' => 'OK', 'msg'=>_('Tariff plan is successfully added'),'tariffdata' => $tariff_details ) );
			
			 
		}
	}
	else{
			wp_send_json( array( 'code' => 'ERROR', 'msg' =>_('Error adding plan') ) );
	}
		 
  
}
add_action( 'wp_ajax_add_new_plan_tariff', 'add_new_plan_tariff' );
add_action( 'wp_ajax_nopriv_add_new_plan_tariff', 'add_new_plan_tariff' );



function add_new_plan_ajx(){
	$plan_data = serializedform_to_array($_POST['addplan_data']);
	 	
	$daterange_id = $plan_data['hdn_daterange'];
	   
	$plantype = $plan_data['plantype'];
	
    $plandescription = $plan_data['plandescription'];
 	 
 	$plan_result = 	add_new_plan($plantype,$plandescription);					
							
	if($plan_result!==false){ 
	 				
			$plan_details = array('plan'			=> $plantype,
								  'plandescription' => $plandescription,
								  'planid'			=> $plan_result 
								  
								);
								 
			wp_send_json( array( 'code' => 'OK', 'msg'=>_('Plan is successfully added'),'plandata' => $plan_details ) );
			
			 
		 
	}
	else{
			wp_send_json( array( 'code' => 'ERROR', 'msg' =>_('Error adding plan') ) );
	}
	
}
add_action( 'wp_ajax_add_new_plan_ajx', 'add_new_plan_ajx' );
add_action( 'wp_ajax_nopriv_add_new_plan_ajx', 'add_new_plan_ajx' );
 

/**
 * 
 * Function to add new plan
 * @param string $plantype
 * @param string $plandescription
 * returns plan id on success
 * returns false on fail
 */
function add_new_plan($plantype,$plandescription){
	global $wpdb;
	 
	$max_planid = 0; 
	
    $plans=array();
    
    
    //check if the plan already exists 
    $plans = maybe_unserialize(get_option('plans'));
     
    $plan_exists = false;
    //check if the addon type already exists
    if($plans){   
    	if(count($plans)>0){
    	
	    	$max_planid = max(array_col($plans, 'id')); 	 
		    foreach ($plans as $plan_key=>$plan_val){
		    	if($plan_val['label'] == $plantype )
		    		$plan_exists = true;
		    }
    	}
    }
     if($plan_exists)
    	return false;	
 
    
    $newplan_id = $max_planid + 1;
    
    $plans[]= array('id'=>$newplan_id , 'label'=>$plantype,'description'=>$plandescription);
    $update_result = update_option('plans', maybe_serialize($plans));
	return  $newplan_id;
	
	
	
	
	/*
	$table_name =  $wpdb->prefix."plan";
	
	$result = $wpdb->insert(	$table_name, 
								array( 'label' 			=> $plantype, 
										'description' 	=> $plandescription										
									), 
								array(  '%s', 
										'%s' 
									) 
				); 
    				
 	switch_to_blog(get_current_blog_id());
  	
 	if($result==true)
 		return $wpdb->insert_id; 
 		
 	return $result;*/
	
}


/**
 * 
 * Ajax function to update plan details
 * 
 */
function update_plan_ajx(){
	
	$plan_data 		 = serializedform_to_array($_POST['editplan_data']);

	$updated_plan = array('plan_id'			=> $plan_data['hdn_planid'],
						  'plan_label'		=> $plan_data['plantype'],
						  'plan_description'=> $plan_data['plandescription'],
						  'daterange_id'	=> $plan_data['hdn_daterange'],
						);
	
	$result = update_plan($plan_data);
	if(strlen($result)>5)
		wp_send_json( array( 'code' => 'ERROR', 'msg' =>_($result),'plandata'=>$updated_plan ) );
	
	if(!$result)
		wp_send_json( array( 'code' => 'ERROR', 'msg' =>_('Error updating plan'),'plandata'=>$updated_plan ) );
	  else 
		wp_send_json( array( 'code' => 'OK', 'msg' =>_('The plan updated successfully'),'plandata'=>$updated_plan ) ); 
 
}
add_action( 'wp_ajax_update_plan_ajx', 'update_plan_ajx' );
add_action( 'wp_ajax_nopriv_update_plan_ajx', 'update_plan_ajx' );


/**
 * 
 * function to update plan details(label, description)
 * @param unknown_type $plan_data
 * returns true on succes
 * return msg plan exists if plan already exists
 * returns false on update failure
 */

function update_plan($plan_data){
	
	$plan_id 		 = $plan_data['hdn_planid'];	
	$plantype 		 = $plan_data['plantype'];	
    $plandescription = $plan_data['plandescription'];
	  
	//check if the plan already exists 
    $plans = maybe_unserialize(get_option('plans'),true);
    $plan_exists = false;
     //update plan
    if($plans){   
    	if(count($plans)>0){
    	   foreach ($plans as $plan_key=>$plan_val){
		    	if(($plan_val['label'] == $plantype ) && ($plan_val['id'] != $plan_id ) )
		    		$plan_exists = true;
		    }
		    
		    if($plan_exists)
    			return 'The Plan name already exists.';

    			
    		foreach ($plans as $plan_key=>$plan_val){
		    	 
    			if( $plan_val['id'] == $plan_id  ){
    				$updated_plan_data[] = array('id'			=> trim($plan_id),
    										 	 'label'		=> trim($plantype),
    										     'description'	=> trim($plandescription) ) ;
    				
    			}
    			else{
    				$updated_plan_data[] = array('id'			=> trim($plan_val['id']),
    										 	 'label'		=> trim($plan_val['label']),
    										  	 'description'	=> trim($plan_val['description']) 
    										);
    			}
    				
		    		
		    }
		    $result = update_option('plans', maybe_serialize($updated_plan_data));
    	
    		return $result;
    	}
    }
     
	
}

/**
 * 
 * Enter description here ...
 * @param unknown_type $weekend_tariff
 * @param unknown_type $weekday_tariff
 * @param unknown_type $daterangeplan_id
 */
function update_daterangeplan_tariff($weekend_tariff, $weekday_tariff,$daterangeplan_id){
	
	global $wpdb;
	
	//switch_to_blog(BLOG_ID_CURRENT_SITE);
	
	$table_name =  $wpdb->prefix."datetarriff";  
	
	$result = $wpdb->update(	$table_name, 
								array(  'tarriff' => maybe_serialize( array( 'weekend' => $weekend_tariff,
													 	   					 'weekday' => $weekday_tariff	
																 			)
																	)									
									), 
								array('id'=>$daterangeplan_id),	
								array(  '%s' ),
								array(  '%d' ) 
							); 
    				
 	//switch_to_blog(get_current_blog_id());
  	 	
 	return $result;
	
}







/*
 * 
 * Function to add new tariff for the date range plan 
 * @param unknown_type $weekend_tariff
 * @param unknown_type $weekday_tariff
 * @param unknown_type $plan_id
 * @param unknown_type $daterange_id
 */ 

function add_daterangeplan_tariff($weekend_tariff, $weekday_tariff,$plan_id,$daterange_id){
	
	global $wpdb;
	
	//switch_to_blog(BLOG_ID_CURRENT_SITE);
	
	$table_name =  $wpdb->prefix."datetarriff";  
	
	$result = $wpdb->insert(	$table_name, 
								array( 'daterange_id' 	=> $daterange_id, 
										'plan_id' 		=> $plan_id,
										'tarriff'		=>	maybe_serialize( array( 'weekend' => $weekend_tariff,
																   					'weekday' => $weekday_tariff	
																 					)
																			),									
									), 
								array(  '%s', 
										'%s',
										'%s'	 
									) 
							); 
    				
 	//switch_to_blog(get_current_blog_id());
  	
 	if($result==true)
 		return $wpdb->insert_id; 
 		
 	return $result;
	
}

 



/**
 * 
 * Function to delete plan
 * type : ajax
 */
function delete_plan_ajx(){
	
	$plan_id = $_POST['planid'];
	
	$result = delete_plan($plan_id);
	if(!$result){
		wp_send_json( array( 'code' => 'ERROR', 'msg' =>'Error deleting plan' ) );
	}
	else{
		wp_send_json( array( 'code' => 'OK', 'msg'=>'Tariff plan successfully deleted' ) );
	}
	
}
add_action( 'wp_ajax_delete_plan_ajx', 'delete_plan_ajx' );
add_action( 'wp_ajax_nopriv_delete_plan_ajx', 'delete_plan_ajx' );


/**
 * 
 * Function to delete plan 
 * @param int $plan_id
 * 
 */
function delete_plan($plan_id){
	
	//delete plan from options table 
	$new_plan_data1 = array();
	$plan_details1 = maybe_unserialize(get_option('plans'));
	
	if(count($plan_details1)){
		foreach($plan_details1 as $plan_data1){
			
			if($plan_data1['id']!=$plan_id){
				$new_plan_data1[] = array(  'id'			=> $plan_data1['id'] ,
											'label'			=> $plan_data1['label'], 
											'description'	=> $plan_data1['description']
									);
			}  
		}		
	}
	update_option('plans', maybe_serialize($new_plan_data1));
		
	//delete tariff details for the plan
	global $wpdb;
	$table_name = $wpdb->prefix."datetarriff";
	$result = $wpdb->delete($table_name, array('plan_id'=>$plan_id));	

	return $result;
	
}


function delete_daterange_ajx(){
	
	$daterange_id = $_POST['daterange_id'];
	
	$result = delete_daterange($daterange_id);
	
	if($result!==false){
		wp_send_json( array( 'code' => 'OK', 'msg' =>_('Date range successfully deleted') ) );
	}
	else{
		wp_send_json( array( 'code' => 'ERROR', 'msg'=>_('Error deleting date range') ) );
	}
	
	
}
add_action( 'wp_ajax_delete_daterange_ajx', 'delete_daterange_ajx' );
add_action( 'wp_ajax_nopriv_delete_daterange_ajx', 'delete_daterange_ajx' );


function delete_daterange($daterange_id){
	 
	global $wpdb;
	$datetariff_name = $wpdb->prefix."datetarriff";
	//get all plans under date range
	$result_delete_plans = $wpdb->delete($datetariff_name,array('daterange_id'=>$daterange_id));
	$daterange_table = $wpdb->prefix."daterange";
	$result_delete_plans = $wpdb->delete($daterange_table,array('id'=>$daterange_id));
	return true;	 
}




/**
 * 
 * function to add new room
 */
function add_new_room_ajx() {

    //var_dump($_POST);
    $room_name 				= $_POST['category'];
    $room_nos 				= $_POST['nos'];
    $room_desc 				= $_POST['description'];
    $room_facilities 		= $_POST['facilities'];
    $checkin_format 		= $_POST['checkinformat'];
    $checkin_time 			= $_POST['checkintime'];
    $additional_policies 	= $_POST['additionalpolicies'];
	$tax_option				= $_POST['tax_option'];
	$room_attachments 		= $_POST['room_attachments'];
	$room_plantariff 		= $_POST['plantariffids'];
	
    $array=array( 'post_title' => $room_name, 'post_content' => $room_desc, 'user_id' => get_current_user_id(), 'inventory' => $room_nos, 'terms'=>$room_facilities, 'room_attachments'=>$room_attachments, 'plantariff'=>$room_plantariff );

    $attribute_array = array( 'weekday_price'=>'10', 'weekend_price'=>'20', 'num_of_adults'=>'2', 'num_of_children'=>'2', 'extra_adult'=>'10', 'extra_child'=>'10', 'include_tax'=>'yes', 'tax_percent'=>'12', 'terms_and_conditions'=>'agree' );

    $addons_array = array( 'breakfast at bed'=>'10', 'lunch_buffet'=>'10' );

    $tariff_array = array( array( 'start_date'=>date( "Y/m/d" ), 'end_date'=>date( "Y/m/d" ), 'attributes'=>$attribute_array, 'add_ons'=>$addons_array ) );

    $newroom_id = add_new_room( get_current_blog_id(), $array, $tariff_array ); //need to handle error ; no return type

	update_option('checkin-format', $checkin_format);
	update_option('checkin-time', $checkin_time);
	update_option('additional-policies', $additional_policies);
	update_option('tax-option',$tax_option);
	
	$newroom = new RoomModel($newroom_id); 
	$newroomdata = $newroom->get_all_roomdata();
	
    wp_send_json( array( 'code' => 'OK', 'msg'=>_('New Room added successfully'),'roomdata'=> $newroomdata ) );

}
add_action( 'wp_ajax_add_new_room_ajx', 'add_new_room_ajx' );
add_action( 'wp_ajax_nopriv_add_new_room_ajx', 'add_new_room_ajx' );


/***
 * Ajax function to update room  details
 */
function update_room_ajx(){
	//var_dump($_POST);
	$room_id				= $_POST['room_id'];
    $room_name 				= $_POST['category'];
    $room_nos 				= $_POST['nos'];
    $room_desc 				= $_POST['description'];
    $room_facilities 		= $_POST['facilities'];
    $checkin_format 		= $_POST['checkinformat'];
    $checkin_time 			= $_POST['checkintime'];
    $additional_policies 	= $_POST['additionalpolicies'];
	$tax_option				= $_POST['tax_option'];
	$room_attachments 		= $_POST['room_attachments'];
	$room_plantariff 		= $_POST['plantariffids'];
	
    $array=array( 'ID'=> $room_id,'post_title' => $room_name, 'post_content' => $room_desc, 'user_id' => get_current_user_id(), 'inventory' => $room_nos, 'terms'=>$room_facilities, 'room_attachments'=>$room_attachments, 'plantariff'=>$room_plantariff );

    $attribute_array = array( 'weekday_price'=>'10', 'weekend_price'=>'20', 'num_of_adults'=>'2', 'num_of_children'=>'2', 'extra_adult'=>'10', 'extra_child'=>'10', 'include_tax'=>'yes', 'tax_percent'=>'12', 'terms_and_conditions'=>'agree' );

    $addons_array = array( 'breakfast at bed'=>'10', 'lunch_buffet'=>'10' );

    $tariff_array = array( array( 'start_date'=>date( "Y/m/d" ), 'end_date'=>date( "Y/m/d" ), 'attributes'=>$attribute_array, 'add_ons'=>$addons_array ) );

    $newroom_id = update_room( get_current_blog_id(), $array, $tariff_array ); //need to handle error ; no return type

	update_option('checkin-format', $checkin_format);
	update_option('checkin-time', $checkin_time);
	update_option('additional-policies', $additional_policies);
	update_option('tax-option',$tax_option);
	
	$newroom = new RoomModel($newroom_id); 
	$newroomdata = $newroom->get_all_roomdata();
	
    wp_send_json( array( 'code' => 'OK', 'msg'=>_('Room Details updated successfully'),'roomdata'=> $newroomdata ) );
}

add_action( 'wp_ajax_update_room_ajx', 'update_room_ajx' );
add_action( 'wp_ajax_nopriv_update_room_ajx', 'update_room_ajx' );


/**
 * Function to update room details
 * Enter description here ...
 * @param unknown_type $blog_id
 * @param unknown_type $array
 * @param unknown_type $tariff_array
 */
function update_room( $blog_id, $array, $tariff_array ) {
    switch_to_blog( $blog_id );
    $my_post = array(
    	'ID'			=> $array['ID'],
        'post_title'    => $array['post_title'],
        'post_content'  => $array['post_content'],
        'post_status'   => 'publish',
        'post_author'   => $array['user_id'],
        'post_type'     => 'impruw_room'
    );
    //print_r($array['terms']);exit;
    // Insert the post into the database
    
    wp_update_post($my_post);
     
    update_post_meta( $array['ID'], 'inventory', $array['inventory'] );//adds thew inventory value to the room
    // var_dump( wp_set_object_terms($post_id, $array['terms'], 'impruw_room_facility'));exit;;
    update_post_meta($array['ID'],'room-attachments',$array['room_attachments'] );
    
    //insert featured image 
    /*if(count($array['room_attachments'])>0){
    	update_post_meta($array['ID'],'thumbnail-id',$array['room_attachments'][0] );    	
    }*/
    
    $plan_tariff_array = explode(',',$array['plantariff']);
    $plan_tariff_serialized = maybe_serialize($plan_tariff_array);
    
    update_post_meta($array['ID'],'room-plantariff',$plan_tariff_serialized );
    
    wp_set_object_terms( $array['ID'], $array['terms'], 'impruw_room_facility' );
    
    restore_current_blog();
      
    return $array['ID'];//added on 14jan2014

}




/* Function to get room list
 */
function get_room_list_ajx(){
	 
	global $wpdb;
	$rooms_list = get_posts( array( 'post_type' => 'impruw_room', 'post_status' => 'publish','posts_per_page'   => -1 ) );
	 
	foreach($rooms_list as $room){
		
		$room = new RoomModel($room);
				 				 
		$room_data[] = $room->get_all_roomdata(); 					  
	}	 
	wp_send_json( array( 'code' => 'OK' , 'data' =>$room_data ) );
	
}
add_action( 'wp_ajax_get_room_list_ajx', 'get_room_list_ajx' );
add_action( 'wp_ajax_nopriv_get_room_list_ajx', 'get_room_list_ajx' );





function delete_room_ajx(){
	
	$room_id  = $_POST['room_id'];
	
	$room = new RoomModel($room_id);
	
	$result = $room->delete_room();
	
	if(!$result)
		wp_send_json( array( 'code' => 'ERROR' , 'data' =>'Error deleting room' ) );
	else
		wp_send_json( array( 'code' => 'OK' , 'room_id' =>$room_id) );
	
}
add_action( 'wp_ajax_delete_room_ajx', 'delete_room_ajx' );
add_action( 'wp_ajax_nopriv_delete_room_ajx', 'delete_room_ajx' );




/**
 * Get all menu pages for the site
 * @return [type] [description]
 */
function get_all_menu_pages(){
        
    $args = array('post_type' => 'page','posts_per_page' => -1);
    $pages  = new WP_query($args);
     
    $p = array();

    if($pages->have_posts()){
        
        $skip = array('Site Builder','Dashboard');

        foreach($pages->posts as $page){

            if(!in_array($page->post_title, $skip))
                $p[] = $page;
        }
    }

    $args = array('post_type' => 'impruw_room','posts_per_page' => -1);
    $rooms  = new WP_query($args);

    if($rooms->have_posts()){
        
        foreach($rooms->posts as $room){

            $p[] = $room;
        }
    }

    return $p;

}

/**
 * Get all themes data
 * @return [type] [description]
 */
function get_all_themes(){

    $args = array('post_type' => 'theme','posts_per_page' => -1);
    $themes  = new WP_query($args);

    if($themes->have_posts())
        return $themes->posts;
    else
        return array();

}



/**
 * Saves the initial layout to DB
 * @return [array] [description]
 */
function save_initial_layout(){

    $theme_id = $_POST['forTheme'];
    $page_id     = $_POST['forPage'];  
    $json     = isset($_POST['json']) ? $_POST['json'] : array();

    //get header section json
    $header = isset($json['header']) && is_array($json['header']) ? $json['header'] : false;

    //get header section json
    $pagejson   = isset($json['page']) && is_array($json['page']) ? $json['page'] : false;

    //get header section json
    $footer = isset($json['footer']) && is_array($json['footer']) ? $json['footer'] : false;

    if(is_array($header))
        update_option('theme-header',$header);
    else
        delete_option('theme-header');
    
    if(is_array($pagejson))
        update_post_meta($page_id, 'page-json', $pagejson);
    else
        delete_post_meta($page_id, 'page-json');

    if(is_array($footer))
        update_option('theme-footer',$footer);
    else
        delete_option('theme-footer');
    
    wp_send_json(array('code' => 'OK'));

    die;
}
add_action('wp_ajax_save_initial_layout','save_initial_layout');


/**
 * Returns the save layout json
 * @return [type] [description]
 */
function get_initial_saved_layout() {

    $theme_id = $_GET['forTheme'];
    $page_id     = $_GET['forPage'];  
    $json     = array();

    //switch_to_blog(1);

    $header = get_option('theme-header');

    if(is_array($header))
        $json['header'] = $header;

    $page = get_post_meta($page_id,'page-json',true);
    if(is_array($page))
        $json['page']   = $page;

    $footer = get_option('theme-footer');
    if(is_array($footer))
        $json['footer'] = $footer;

   
    wp_send_json($json);
}
add_action( 'wp_ajax_get_initial_saved_layout', 'get_initial_saved_layout' );

/**
 * Get markup of an indiviual element
 * @return [type] [description]
 */
function get_element_markup(){

    $json = $_GET['json'];

    $html = add_element_markup($json);

    wp_send_json(array(
                    'code' => 'OK',
                    'html' => $html
                ));

    die;

}
add_action('wp_ajax_get_element_markup','get_element_markup');

/**
 * Check if single rooms edit view is loaded
 * @return boolean [description]
 */
function is_single_room_edit(){

    $single_room_edit = false;

    if(!isset($_COOKIE["current_page_id"]))
        return false;

    $post_id = $_COOKIE["current_page_id"];

    $post = get_post($post_id);

    return $post->post_type === 'impruw_room';

}

/**
 * Returns the image URL
 * @return [type] [description]
 */
function get_image_url(){

    $attId = $_GET['attId'];
    $size  = $_GET['size'];

    $path = wp_get_attachment_image_src($attId, $size);

    if($path === false)
        wp_send_json(array('code' => 'ERROR'));
    else
        wp_send_json(array('code' => 'OK', 'url' => $path[0]));

}
add_action('wp_ajax_get_image_url', 'get_image_url');
add_action('wp_ajax_nopriv_get_image_url', 'get_image_url');

/**
 * [get_rooms description]
 * @return [type] [description]
 */
function get_rooms(){

    $rooms = new WP_Query(array('post_type'=>'impruw_room','posts_per_page' => -1));

    $r = array();

    while($rooms->have_posts()): $rooms->the_post();

        $r[] =  array(
                    'id'    => get_the_ID(),
                    'name'  => get_the_title()
                );

    endwhile;

    return $r;
}

/**
 * [impruw_app_model description]
 * @return [type] [description]
 */
function impruw_app_model(){

    if(!is_user_logged_in())
        return '{}';
    else
        return json_encode(
                        array(
                                'userId'        => get_current_user_id(),
                                'accessToken'   => 'oicdaso34983hsvdsklkccxiodas897',
                                'loginStatus'   => true
                            )
                    );
}

/**
 * Function to check if email id already exist( Registration page)
 * Returns
 */
function check_email_exists() {

    $email = $_GET['user_email'];
    header( 'Content-Type: application/json' );

    if ( email_exists( $email ) ) {
        echo json_encode(false);
    }
    else {
        echo json_encode( true );
    }
    die();
}
add_action( 'wp_ajax_check_email_exists', 'check_email_exists' );
add_action( 'wp_ajax_nopriv_check_email_exists', 'check_email_exists' );
