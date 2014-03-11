<?php

/**
 * [get_menu_items description]
 * @return [type] [description]
 */
function get_menu_items() {

    $menuItems = array(
        // array('url' => 'rooms', 'title' => 'Rooms'),
        // array('url' => 'dashboard', 'title' => 'Dashboard'),
        // array('url' => 'site-profile', 'title' => 'Site Profile'),
        // array('url' => 'my-profile', 'title' => 'My Profile'),
        array('url' => 'statistics', 'title' => 'Statistics')
    );

    wp_send_json($menuItems);
}

add_action('wp_ajax_get-menu-items', 'get_menu_items');

/**
 * [get_rooms description]
 * @return [type] [description]
 */
function get_rooms_list() {

    wp_send_json(array(array('name' => 'Room one1', 'attachments' => array(
                array('id' => 23),
                array('id' => 2))
    )));
}

add_action('wp_ajax_get-rooms', 'get_rooms_list');

/**
 * [get_rooms description]
 * @return [type] [description]
 */
function get_site_profile() {

    wp_send_json(array('name' => 'My Site Profile Data'));
}

add_action('wp_ajax_get-site-profile', 'get_site_profile');

function get_media(){
    $id = $_GET['ID'];
    $media = wp_prepare_attachment_for_js($id);
    wp_send_json(array('code' => 'OK', 'data' => $media ));
}
add_action('wp_ajax_get-media','get_media');

function get_menu(){
    $id = $_GET['id'];
    $menu = get_menu_to_array($id, 'id');
    wp_send_json(array('code' => 'OK', 'data' => $menu ));
}
add_action('wp_ajax_get-menu','get_menu');

/**
 * [get_pages description]
 * @return [type] [description]
 */
function get_pages1() {
    $pages = get_all_menu_pages();
    wp_send_json(array('code' => 'OK', 'data' => $pages));
}

add_action('wp_ajax_get-pages', 'get_pages1');

function get_elementbox_elements() {
    wp_send_json(array( 'code' => 'OK',
                        'data' => array(
                            array(  'element' => 'Menu',
                                    'icon' => '',
                                    'styles' => get_styles('Menu'),
                                    'site_menus' => array(  array('menu_id' => 2, 'menu_name' => 'Main Menu'),
                                                            array('menu_id' => 3, 'menu_name' =>   'Footer menu'))
                            ),
                            array(  'element' => 'Row',
                                    'icon' => '',
                                    'styles' => get_styles('Row')
                            ),
                            array(  'element'   => 'Logo',
                                    'icon'      => '',
                                    'styles'    => array(),
                                    'size'      => get_logo_size()
                            ),
                            array(  'element' => 'Text',
                                    'icon' => '',
                                    'styles' => array()
                            ),
                            array(  'element' => 'Title',
                                    'icon' => '',
                                    'styles' => get_styles('Title')
                            ),
                            array(  'element' => 'Image',
                                    'icon' => '',
                                    'styles' => array()
                            ),
                            array(  'element' => 'ImageWithText',
                                    'title' => 'Image With Text',
                                    'icon' => '',
                                    'styles' => get_styles('ImageWithText')
                            ),
                            array(  'element' => 'Address',
                                    'icon' => '',
                                    'styles' => get_styles('Address')
                            ),
                            array(  'element' => 'Social',
                                    'icon' => '',
                                    'styles' => get_styles('Social')
                            ),
                            array(  'element' => 'Link',
                                    'icon' => '',
                                    'styles' => get_styles('Link')
                            ),
                            array(  'element' => 'ContactForm',
                                    'title' => 'Contact Form',
                                    'icon' => '',
                                    'styles' => get_styles('ContactForm')
                            ),
                            array(  'element' => 'Map',
                                    'icon' => '',
                                    'styles' => get_styles('Map')
                            ),
                            array(  'element' => 'Slider',
                                    'icon' => '',
                                    'sliders' => get_theme_sliders()
                            ),
                            array(  'element' => 'Gallery',
                                    'icon' => '',
                                    'galleries' => get_theme_sliders()
                            ),
                            array(  'element' => 'Room Facilities',
                                    'icon' => ''
                            )


                        )
                )
    );
}

add_action('wp_ajax_get-elementbox-elements', 'get_elementbox_elements');

/**
 * 
 */ 
function get_theme_sliders(){
    $sliders = get_all_sliders();

    $sliders_arr = array();

    foreach ($sliders as $key => $slider) {
        $sliders_arr[] = array('id' => $slider['id'], 'title' => $slider['title']);
    }

    return $sliders_arr;
}

/**
 * [get_rooms description]
 * @return [type] [description]
 */
function create_element_model() {

    $element = $_POST;

    unset($element['action']);
    $model = get_element_model($element['element']);
    
    $model = wp_parse_args($model, $element);
    
    $model['meta_id'] = set_element_data($model);

    wp_send_json(array( 'code' => 'OK',
                        'data' => $model));
}

add_action('wp_ajax_create-element-model', 'create_element_model');
        
function set_element_data($data) {
    global $wpdb;
    if(isset($data['meta_id'])){
        $meta_id = $data['meta_id'];
        $serialized_element = maybe_serialize($data);
        $wpdb->update(  $wpdb->postmeta, 
                        array(
                            'meta_value' => $serialized_element,
                            'meta_key'  => $data['element']
                        ),
                        array(
                            'meta_id' =>(int)$meta_id
                        ));
    }
    else{
        $serialized_element = maybe_serialize($data);
        $wpdb->insert($wpdb->postmeta, array(
            'post_id' => 0,
            'meta_value' => $serialized_element,
            'meta_key' => $data['element']
        ));
        return $wpdb->insert_id;
    }
    
}

function get_element_model($element) {

    $model = array();

    switch ($element) {

        case 'Menu':
            $model = array(
                'style' => 'Slimmenu',
                'menu_id' => 2
            );
        case 'Logo':
            $model = array(
                'style'     => 'header',
                'image_id'  => 22, //hardcoded,
                'size'      => 'full'
            );
            break;
    }

    return $model;
}

/**
 * [update_element_model description]
 * @return [type] [description]
 */
function update_element_model() {
    
    $element = $_POST;
    unset($element['action']);
    $meta_id = $element['meta_id'];
    set_element_data($element);
    wp_send_json(array('code' => 'OK', 'data' => array('meta_id' => $meta_id)));
}

add_action('wp_ajax_update-element-model', 'update_element_model');

/**
 * [update_element_model description]
 * @return [type] [description]
 */
function delete_element_model() {
    
    $element = $_POST;
    $meta_id = $element['meta_id'];
    global $wpdb;
    $wpdb->delete($wpdb->postmeta,
                array(
                    'meta_id' => $meta_id
                ));
    
    wp_send_json(array('code' => 'OK'));
}

add_action('wp_ajax_delete-element-model', 'delete_element_model');

/**
 * 
 */
function create_menu_item(){
    wp_send_json(array('code' => 'OK', 'data' => array('ID' => rand(100,300),'order' => 8)));
}
add_action('wp_ajax_create-menu-item','create_menu_item');

/**
 * get all menus
 */
function get_site_menus_collection() {
    
    $menus = get_terms( 'nav_menu', array( 'hide_empty' => true ) );
    
    $data = array();
    foreach($menus as $menu)
        $data[] = get_menu_to_array($menu->name);
    
    wp_send_json(array('code' => 'OK', 'data' => $data));
}

add_action('wp_ajax_get-menus', 'get_site_menus_collection');



function get_styles($element, $style = '') {

    $templates = array();

    global $element_templates;

    return $element_templates[$element];
}

/**
 * [save_page_json description]
 * @return [type] [description]
 */
function save_page_json() {
    $json = $_POST['json'];
    $json = stripcslashes($json);
    $json = json_decode($json, true);
    $page_id = $_POST['page_id'];
    //$e = json_encode($json);
    
    update_option('theme-header', $json['header']);
    update_post_meta($page_id, 'page-json', $json['page']);
    update_option('theme-footer', $json['footer']);
    wp_send_json(array('code' => 'OK'));
}

add_action('wp_ajax_save-page-json', 'save_page_json');


function get_page_json1($page_id = 0){
    if($page_id == 0)   
       return false;
    
    $json = array();
    $json['header'] = get_option('theme-header');
    $json['footer'] = get_option('theme-footer');
    $json['page']   = get_post_meta($page_id,'page-json', true);
    
    $d = array();
    
    foreach($json as $section => $elements){
        $d[$section] = array();
        if(!is_array($elements))
            continue;
        foreach($elements as $element){
           if($element['element'] === 'Row' ){
               $element['columncount'] = count($element['elements']);
               $d[$section][] = get_row_elements($element);
           }
           else
                $d[$section][] = get_meta_values ($element);
        }
    }
    $data = array(
                'id'        => $page_id,
                'header'    => $d['header'],
                'page'      => $d['page'],
                'footer'    => $d['footer']
             ); 
   return $data;
}

function get_row_elements($element){
    foreach($element['elements'] as &$column){
        foreach($column['elements'] as &$ele){
            if($ele['element'] === 'Row' ){
                $ele['columncount'] = count($ele['elements']);
                $ele = get_row_elements($ele);
            }
            else{
                $meta = get_meta_values ($ele);
                $ele = wp_parse_args($meta,$ele);
            }
        }
        
    }
    return $element;
}


function get_meta_values($element){
    $meta = get_metadata_by_mid('post', $element['meta_id']);
    $ele = maybe_unserialize($meta->meta_value);
    $ele['meta_id'] = $element['meta_id'];
    validate_element($ele);
    return $ele;
}

function sds(){
    $page_id = $_REQUEST['page_id'];
    $data = get_page_json1($page_id);
    wp_send_json(array('code' => 'OK' , 'data' => $data));
}
add_action('wp_ajax_get-page-json','sds');
/**
 * 
 */
function validate_element(&$element){
    $numkeys = array('id', 'meta_id', 'menu_id','ID', 'image_id');
    $boolkey = array('draggable', 'justified');
     
    if(!is_array($element) && !is_object($element))
        return $element;
    
    foreach ($element as $key => $val){
        if(in_array($key, $numkeys))
            $element[$key] = (int) $val;
        if(in_array($key, $boolkey))
            $element[$key] = $val === "true";
    }
    return $element;
}

// add_action('init', function(){

//     $s = new RevSlider();
//     $s->initByID(1);
//     echo '<pre>';
//     var_dump($s->getSlidesForOutput());
//     die;

// });

/**
 * [get_site_socials description]
 * @return [type] [description]
 */
function get_site_socials(){

    $data = array(
                array(
                    'socialname'    => 'Facebook',
                    'sociallink'    => 'http://sdsadsadas.com'
                ),
                array(
                    'socialname'    => 'Twitter',
                    'sociallink'    => 'http://Twitter.com'
                ),
                array(
                    'socialname'    => 'Youtube',
                    'sociallink'    => 'http://Youtube.com'
                )
            );

    wp_send_json(array('code'=> 'OK',
                        'data' => $data));
}
add_action('wp_ajax_get-site-socials','get_site_socials');