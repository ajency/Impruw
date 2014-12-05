<?php

function save_siteplan_ajax(){
	// print_r($_REQUEST);
	$save_id = $_REQUEST['saveid'];
	unset($_REQUEST['action']);

	$data = $_REQUEST;

	if ($save_id > 0) {
		//Update plan
		$response = aj_update_site_plan_db($data);
	}
	else{
		//Insert new plan
		$response = aj_insert_site_plan_db($data);
	}
    wp_send_json( array( 'code' => $response['code'], 'site_plan_id'=> $response['plan_id'], 'msg' => $response['msg'] ) );
}
add_action( 'wp_ajax_save-site-plan', 'save_siteplan_ajax');
