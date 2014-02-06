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