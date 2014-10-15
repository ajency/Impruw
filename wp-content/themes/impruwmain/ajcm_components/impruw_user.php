<?php
function getvars_registration_email_admin($recipients_email,$comm_data){
    global $aj_comm;

    $template_data['name'] = 'registration-notification'; // [slug] name or slug of a template that exists in the user's mandrill account
	$template_data['subject'] = 'Impruw Notification: A website has been registered.';
	$template_data['from_email'] = 'no-reply@impruw.in';
	$template_data['from_name'] = 'Impruw';

	$user       = get_userdata($comm_data['user_id'] );
    $username   = $user->display_name;
    $reg_date   = $user->user_registered;

    $blog_details = get_blog_details($comm_data['blog_id']);
    $site_name = $blog_details->blogname;

    //"merge": true,
    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
	$template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $username);
    $template_data['global_merge_vars'][] = array('name' => 'ADMINNAME','content' => '');
    $template_data['global_merge_vars'][] = array('name' => 'SITENAME','content' => $site_name);
	$template_data['global_merge_vars'][] = array('name' => 'DATE','content' => $reg_date);

    $merge_vars = array();

    foreach($recipients_email as $user_value){

        $overwrite_vars = array();

        $user = get_userdata($user_value->user_id );
            $admin_name = $user->display_name;

        $overwrite_vars[] = array(
            'name' => 'ADMINNAME',
            'content' => $admin_name
        );

        $template_data['merge_vars'][] = array(

            'rcpt'=>$user_value->value,
            'vars' => $overwrite_vars
        ) ;
    }

    return $template_data;

}

function getvars_registration_email_user($recipients_email,$comm_data){

    global $aj_comm;

    $template_data['name'] = 'user-registered-notification'; // [slug] name or slug of a template that exists in the user's mandrill account
    $template_data['subject'] = 'Impruw Notification: Your website has been registered successfully..';
    $template_data['from_email'] = 'no-reply@impruw.in';
    $template_data['from_name'] = 'Impruw';

    $user = get_userdata($comm_data['user_id'] );
    $username = $user->display_name;
    $reg_date = $user->user_registered;

    $blog_details = get_blog_details($comm_data['blog_id']);
    $site_name = $blog_details->blogname;

    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'SITENAME','content' => $site_name);
    $template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $username);
    $template_data['global_merge_vars'][] = array('name' => 'DATE','content' => $reg_date);

    return $template_data;
}