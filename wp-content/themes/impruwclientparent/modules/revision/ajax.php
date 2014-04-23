<?php
/**
 * Contains all ajax handlers for revision
 */

include 'functions.php';

/**
 * 
 */
function fetch_revisions(){
	
	$page_id = $_GET['page_id'];
	
	$revisions = get_revisions($page_id);
	
	wp_send_success_json($revisions);
}
add_action('wp_ajax_fetch-revisions', 'fetch_revisions');

