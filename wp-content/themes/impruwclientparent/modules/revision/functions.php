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
	
	$revisions = $wpdb->get_results($sql);
	
	return $revisions;
}

/**
 * get the meta id of the latest revision for a page
 * @param int $page_id
 */
function get_latest_revision($page_id = 0){
	
	global  $wpdb;
	
	$query = $wpdb->prepare("SELECT * FROM {$wpdb->prefix}revisions WHERE page_id=%d ORDER BY datetime DESC LIMIT 1", $page_id);
	
	$revision = $wpdb->get_row($query);
	
	if($revision === null)
		$revision = array();
	
	return $revision;
}

/**
 * Add a page revision 
 * @param unknown $args
 * @return number
 */
function add_page_revision($args){

	global $wpdb;
	
	$defaults = array(	'page_id' 			=> 0, 
						'datetime' 			=> current_time('mysql'), 
						'header_option_id' 	=> 0, 
						'footer_option_id'	=> 0, 
						'page_meta_id' 		=> 0 );
	
	$data = wp_parse_args($args, $defaults);
	
	$table_name = $wpdb->prefix . 'revisions';
	
	$wpdb->insert($table_name, $data);
	
	return $wpdb->insert_id;
}

/**
 * cannot use add_option as it does not return the id of the added record
 * hence, creating a custom insert operation
 * @param unknown $section
 * @param unknown $json
 */
function add_header_footer_revision($section, $json){
	
	global $wpdb;
	
	$wpdb->insert($wpdb->prefix . 'options', 
				  array(
					'option_name' 	=> "theme-$section",
				  	'option_value' 	=> maybe_serialize($json),
				  	'autoload'		=> 'no'
				  ));
	
	return $wpdb->insert_id;
}

/**
 * cannot use add_post_meta() as it does not return the id of the added record
 * hence, creating a custom insert operation
 * @param unknown $page_id
 * @param unknown $json
 */
function add_page_json($page_id, $json){

	global $wpdb;

	$wpdb->insert($wpdb->postmeta, 
				  array(
				        'post_id' 		=> $page_id,
				        'meta_value' 	=> maybe_serialize($json),
				        'meta_key' 		=> 'page-json'
				  ));

	return $wpdb->insert_id;
}