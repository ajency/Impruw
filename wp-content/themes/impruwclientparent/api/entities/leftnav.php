<?php

/**
 * [get_menu_items description]
 * @return [type] [description]
 */
function get_menu_items() {

    $menuItems = array(
        array('url' => 'rooms', 'title' => 'Rooms'),
        array('url' => 'dashboard', 'title' => 'Dashboard'),
        array('url' => 'site-profile', 'title' => 'Site Profile'),
        array('url' => 'my-profile', 'title' => 'My Profile')
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
    wp_send_json(array('code' => 'OK',
        'data' => array(
            array('element' => 'Menu',
                'title' => 'Menu ',
                'icon' => '',
                'styles' => array('header', 'footer'),
                'templates' => get_templates('Menu'),
                'align' => 'left',
                'draggable' => true
            ),
            array('element' => 'Row',
                'title' => 'Row',
                'icon' => '',
                'styles' => array('Green Background', 'Blue Background'),
                'templates' => array(),
                'draggable' => true
            )
        )
            )
    );
}

add_action('wp_ajax_get-elementbox-elements', 'get_elementbox_elements');

/**
 * 	array('element' => 'Slider'	, 'title' => 'Slider '	, 'icon' => ''),
  array('element' => 'Text'	, 'title' => 'Text '	, 'icon' => ''),
  array('element' => 'Image'	, 'title' => 'Image '	, 'icon' => ''),
  array('element' => 'Room'	, 'title' => 'Room '	, 'icon' => ''),
  array('element' => 'Menu'	, 'title' => 'Menu '	, 'icon' => ''),
  array('element' => 'Title'	, 'title' => 'Title'	, 'icon' => ''),
  array('element' => 'Address'	, 'title' => 'Address'	, 'icon' => '')
 */

/**
 * [get_rooms description]
 * @return [type] [description]
 */
function create_element_model() {

    $element = $_POST;

    unset($element['action']);
    $page_id = isset($_POST['page_id']) ? $_POST['page_id'] : 0;

    //insert into DB
    global $wpdb;
    $model = get_element_model($element);
    $model['meta_id'] = set_element_data($model);

    wp_send_json(array('code' => 'OK',
        'data' => $model));
}

add_action('wp_ajax_create-element-model', 'create_element_model');

function set_element_data($data) {
    global $wpdb;
    if(isset($data['meta_id'])){
        $meta_id = $data['meta_id'];
        unset($data['meta_id']);
        $serialized_element = maybe_serialize($data);
        $wpdb->update(  $wpdb->postmeta, 
                        array(
                            'meta_value' => $serialized_element
                        ),
                        array(
                            'meta_id' => $meta_id
                        ));
    }
    else{
        $serialized_element = maybe_serialize($data);
        $wpdb->insert($wpdb->postmeta, array(
            'post_id' => $page_id,
            'meta_value' => $serialized_element,
            'meta_key' => $element['element']
        ));
    }
    return $wpdb->insert_id;
}

function get_element_model($element) {

    $model = array();

    switch ($element['element']) {

        case 'Menu':
            $model = array(
                'style' => 'header',
                'menu_id' => 3
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



function get_templates($element, $style = '') {

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
    //wp_send_json($json['header']);
    update_option('theme-header', $json['header']);
    update_post_meta($page_id, 'page-json', $json['page']);
    update_option('theme-footer', $page['footer']);
    die;
}

add_action('wp_ajax_save-page-json', 'save_page_json');


function get_page_json1(){
    $data = array(
                'id'    => 5,
                'json'  => array(
                    'header' => array(
                        array(
                            'element'   => 'Row',
                            'draggable' => true,
                            'meta_id'   => rand(1000,9999),
                            'elements'  => array(
                                array(
                                    'type' => 'Column'
                                )
                            )
                        ),
                        array(
                            'element'   => 'Menu',
                            'draggable' => true,
                            'menu_id'   => 3,
                            'meta_id'   => rand(1000,9999),
                            'style'     => 'header',
                            'justified' => true
                        )
                    ),
                    'page' => array(),
                    'footer' => array()
                )
            );      
    wp_send_json(array('code' => 'OK1' , 'data' => $data));
}
add_action('wp_ajax_get-page-json','get_page_json1');