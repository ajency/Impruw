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

function update_objectType_ajax(){

	$object_type = $_REQUEST['object_type'];

	if (is_multisite()) {
		switch_to_blog(1);
		$update_status = update_option('ajbilling_settings',$object_type);
		restore_current_blog();
	}
	else{
		$update_status = update_option('ajbilling_settings',$object_type);
	}

	if ($update_status) {
		$code = 'OK';
		$msg = 'Updated successfully';
	}
	else{
		$code = 'ERROR';
		$msg = 'Could not update object type';
	}

	wp_send_json( array( 'code' => $code, 'msg'=> $msg, 'object_type'=>$object_type) );

}
add_action( 'wp_ajax_update-objectType', 'update_objectType_ajax');
