<?php


function read_user_ajax(){
	
	if(is_user_logged_in())
		wp_send_json(array('code' => 'OK', 'data' => wp_get_current_user()));
	else
		wp_send_json(array('code' => 'ERROR', 'message' => 'User not logged in'));
	
}
add_action('wp_ajax_read-user','read_user_ajax');