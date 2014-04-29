<?php

/**
 * Get the lastest revisions for the selected page
 * @return multitype:
 */
function get_revisions($page_id = 0){
	
	global $wpdb;
	
	if($page_id === 0){
		$page_id = get_the_ID();
	}
	
	$query = $wpdb->prepare("SELECT * FROM {$wpdb->prefix}revisions WHERE page_id = %d ORDER BY 'datetime' DESC LIMIT 5", $page_id);
	
	$revisions = $wpdb->get_results($query);
	
	return $revisions;
}

/**
 * get the meta id of the latest revision for a page
 * @param int $page_id
 */
function get_last_revision($page_id = 0){
	
	global  $wpdb;
	
	$query = $wpdb->prepare("SELECT * FROM {$wpdb->prefix}revisions WHERE page_id=%d ORDER BY datetime DESC LIMIT 1", $page_id);
	
	$revision = $wpdb->get_row($query, ARRAY_A);
	
	if($revision === null)
		$revision = array();
	
	return $revision;
}

/**
 * Returns the serialized json data for the passed option_id
 * @param int $option_id
 */
function get_revision_by_option_id($option_id){
	
	global $wpdb;
	
	$query = $wpdb->prepare("SELECT option_value FROM {$wpdb->options} WHERE option_id=%d", $option_id);
	
	$json = $wpdb->get_var($query);
	
	return is_null($json) ? array() : maybe_unserialize($json);
}

/**
 * Returns the page_meta_id for the passed revision_id
 * @param unknown $revision_id
 * @return unknown
 */
function get_page_meta_id_for_revision($revision_id){
	
	global $wpdb;
	
	$query = $wpdb->prepare("SELECT page_meta_id FROM {$wpdb->prefix}revisions WHERE id=%d", (int)$revision_id);
	
	$page_meta_id = $wpdb->get_var($query);
	
	return is_null($page_meta_id) ? 0 : $page_meta_id;
}

/**
 * Returns the serialized json data for the passed meta_id
 * @param int meta_id
 */
function get_page_revision_by_meta_id($meta_id){
	
	global $wpdb;
	
	$query = $wpdb->prepare("SELECT meta_value FROM {$wpdb->postmeta} WHERE meta_id=%d", (int)$meta_id);

	$json = $wpdb->get_var($query);
	
	return is_null($json) ? array() : maybe_unserialize($json);
}

/**
 * Add a page revision 
 * @param unknown $args
 * @return number
 */
function add_page_revision($page_id){

	global $wpdb;
	
	//convert to int format
	$page_id = (int)$page_id;
	
	$data = array(	'page_id' 			=> $page_id, 
					'datetime' 			=> current_time('mysql'), 
					'page_meta_id' 		=> get_last_page_json_meta_id($page_id));
	
	$table_name = $wpdb->prefix . 'revisions';
	
	$wpdb->insert($table_name, $data);
	
	$data['id'] = $wpdb->insert_id;
	
	return $data;
}


/**
 * cannot use add_post_meta() as it does not return the id of the added record
 * hence, creating a custom insert operation
 * @param unknown $page_id
 * @param unknown $json
 */
//function add_page_json($page_id, $json){
//
//	global $wpdb;
//
//	$wpdb->insert($wpdb->postmeta, 
//				  array(
//				        'post_id' 		=> $page_id,
//				        'meta_value' 	=> maybe_serialize($json),
//				        'meta_key' 		=> 'page-json'
//				  ));
//
//	return $wpdb->insert_id;
//}

/**
 * Retuns the last added option id for the theme header json
 * @return int option_id
 */
function get_last_header_json_option_id(){
	$option_id = get_last_option_id('header');
	return $option_id;
	
}

/**
 * Retuns the last added option id for the theme footer json
 * @return int option_id
 */
function get_last_footer_json_option_id(){
	$option_id = get_last_option_id('footer');
	return $option_id;

}

/**
 * Returns the last option id
 * @param string $section
 * @return int option id
 */
function get_last_option_id($section){
	
	global $wpdb;
	
	// cannot use get_option here as it returns only one record.
	// we will get the record which will have the highedt option_id value
	$query = $wpdb->prepare("SELECT option_id FROM {$wpdb->options} 
							 WHERE option_name=%s 
							 ORDER BY option_id DESC LIMIT 1", "theme-$section");
	
	$option_id = $wpdb->get_var($query);
	
	return !is_null($option_id) ? (int)$option_id : 0;
}


/**
 * Returns the last meta id for a page json
 * @param int $page_id
 * @return int meta id for the page
 */
function get_last_page_json_meta_id($page_id){

	global $wpdb;

	// cannot use get_option here as it returns only one record.
	// we will get the record which will have the highedt option_id value
	$query = $wpdb->prepare("SELECT meta_id FROM {$wpdb->postmeta} 
							 WHERE post_id=%d AND meta_key=%s  
							 ORDER BY meta_id DESC LIMIT 1", $page_id, 'page-json');

	$meta_id = $wpdb->get_var($query);
	
	return !is_null($meta_id) ? (int)$meta_id : 0;
}
