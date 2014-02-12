<?php
/**
 * [get_menu_items description]
 * @return [type] [description]
 */
function get_menu_items(){
	
	$menuItems = array(
					array('url' => 'rooms'			, 'title' => 'Rooms'),
					array('url' => 'dashboard'		, 'title' => 'Dashboard'),
					array('url' => 'site-profile'	, 'title' => 'Site Profile'),
					array('url' => 'my-profile'		, 'title' => 'My Profile')
				);

	wp_send_json($menuItems);

}
add_action('wp_ajax_get-menu-items','get_menu_items');

/**
 * [get_rooms description]
 * @return [type] [description]
 */
function get_rooms_list(){

	wp_send_json(array(array('name' => 'Room one1','attachments' => array(
																		array('id' => 23),
																		array('id' => 2))
													)));

}
add_action('wp_ajax_get-rooms','get_rooms_list');


/**
 * [get_rooms description]
 * @return [type] [description]
 */
function get_site_profile(){

	wp_send_json(array('name' => 'My Site Profile Data'));

}
add_action('wp_ajax_get-site-profile','get_site_profile');

/**
 * [get_pages description]
 * @return [type] [description]
 */
function get_pages1(){

	wp_send_json(array('code' => 'OK', 'data' => array(
													array('ID' => 12, 'post_title' => 'Home'),
													array('ID' => 23, 'post_title' => 'About Us')
												)));
}
add_action('wp_ajax_get-pages', 'get_pages1');

function get_elementbox_elements(){
	wp_send_json(array('code' => 'OK', 'data' => array(
													array('element' => 'MenuElement'	, 'title' => 'Menu '	, 'icon' => ''),
													array('element' => 'SliderElement'	, 'title' => 'Slider '	, 'icon' => ''),
													array('element' => 'TextElement'	, 'title' => 'Text '	, 'icon' => ''),
													array('element' => 'ImageElement'	, 'title' => 'Image '	, 'icon' => ''),
													array('element' => 'RoomElement'	, 'title' => 'Room '	, 'icon' => ''),
													array('element' => 'MenuElement'	, 'title' => 'Menu '	, 'icon' => ''),
													array('element' => 'TitleElement'	, 'title' => 'Title'	, 'icon' => ''),
													array('element' => 'AddressElement'	, 'title' => 'Address'	, 'icon' => '')
												)));
}
add_action('wp_ajax_get-elementbox-elements','get_elementbox_elements');


/**
 * [get_rooms description]
 * @return [type] [description]
 */
function create_element_model(){

	$element = $_POST;

	unset($element['action']);
	
	$markup  = add_element_markup($element);
	$meta_id = rand(1000,9999);

	wp_send_json(array('code' => 'OK', 'data' => array('meta_id' => $meta_id, 'markup' => $markup)));

}
add_action('wp_ajax_create-element-model','create_element_model');

/**
 * [save_page_json description]
 * @return [type] [description]
 */
function save_page_json(){
	$json = $_POST['json'];
	$json = stripcslashes($json);
	$json = json_decode($json,true);
	update_post_meta($page_id,'page-json', $json['page']);
	die;
}
add_action('wp_ajax_save-page-json','save_page_json');