<?php
function getvars_registration_email($recipients_email,$comm_data){
    global $aj_comm;

	$template_data['name'] = 'notification'; // [slug] name or slug of a template that exists in the user's mandrill account
	$template_data['subject'] = 'Impruw Notification: A website has been registered.';
	$template_data['from_email'] = 'no-reply@impruw.in';
	$template_data['from_name'] = 'Impruw';

	$username       = $aj_comm->get_communication_meta($comm_data['id'],'username');
	$user_role      = $aj_comm->get_communication_meta($comm_data['id'],'role');
    $reg_date       = $aj_comm->get_communication_meta($comm_data['id'],'date');
	//$reg_time       = $aj_comm->get_communication_meta($comm_data['id'],'time');

    $template_data['global_merge_vars'] = array();
	$template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $username);
	$template_data['global_merge_vars'][] = array('name' => 'ROLE','content' => $user_role);
	$template_data['global_merge_vars'][] = array('name' => 'DATE','content' => $reg_date);
   // $template_data['global_merge_vars'][] = array('name' => 'TIME','content' => $reg_time);

	return $template_data;

}