<?php

include_once 'functions.php';

function ajax_get_site_addons(){
	$data = get_all_siteaddons();

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}
add_action( 'wp_ajax_get-site-addons', 'ajax_get_site_addons');

function ajax_update_selected_site_addons(){
	$selected_addons = $_REQUEST['selectedAddOns'];
	$site_addons = get_all_siteaddons();
	$result_count = 0;
	
	foreach ($site_addons as $site_addon) {
		update_addons_count($site_addon['element'],'reset');
	}

	$update_count = 0;
	foreach ($site_addons as $site_addon) {
		
		if (in_array($site_addon['element'], $selected_addons)) {
			$result_count = update_addons_count($site_addon['element'],'plus');
			$update_count++;
		}
		
	}
	if ($update_count==$result_count) {
		wp_send_json( array( 'code' => 'OK', 'data' =>$result_count) );
	}
	else{
		wp_send_json( array( 'code' => 'ERROR', 'data' =>$result_count) );
	}
	
}
add_action( 'wp_ajax_update-selected-site-addons', 'ajax_update_selected_site_addons');