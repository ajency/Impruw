<?php
/**
 * [get_menu_items description]
 * @return [type] [description]
 */
function get_menu_items(){
	
	$menuItems = array(
					array('url' => 'rooms'			, 'title' => 'Rooms'),
					array('url' => 'dashboard'		, 'title' => 'Dashboard'),
					array('url' => 'site-profile'	, 'title' => 'Site Profile')
				);

	wp_send_json($menuItems);

}
add_action('wp_ajax_get-menu-items','get_menu_items');

/**
 * [get_rooms description]
 * @return [type] [description]
 */
function get_rooms_list(){

	wp_send_json(array(array('name' => 'Room one1'),array('name' => 'Room two')));

}
add_action('wp_ajax_get-rooms','get_rooms_list');