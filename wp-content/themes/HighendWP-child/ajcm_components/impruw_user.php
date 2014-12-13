<?php

/*
 * Forgot password email
 */

function getvars_forgot_password($recipients_email,$comm_data){

    global $aj_comm;

    $template_data['name'] = 'forgot-password'; // [slug] name or slug of a template that exists in the user's mandrill account
    $template_data['subject'] = 'Impruw Notification: Forgot password';
    $template_data['from_email'] = 'no-reply@impruw.in';
    $template_data['from_name'] = 'Impruw';

    $user = get_userdata($comm_data['user_id'] );
    $user_email = $user->user_email;

    $activation_url    = $aj_comm->get_communication_meta($comm_data['id'],'activation_key');
    //$site_url    = $aj_comm->get_communication_meta($comm_data['id'],'site_url');

   // $activation_url = site_url("reset-password?action=rp&key=".$activation_key."&login=".rawurlencode($user_email));

    foreach($recipients_email as $user_value){
        $useremail = $user_value->value;
    }

    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'USEREMAIL','content' => $useremail);
    $template_data['global_merge_vars'][] = array('name' => 'ACTIVATION','content' => $activation_url);

    return $template_data;
}

/*
 * Contact us email
 */

function getvars_contact_us($recipients_email,$comm_data){

    global $aj_comm;

    $name       = $aj_comm->get_communication_meta($comm_data['id'],'name');
    $email_id   = $aj_comm->get_communication_meta($comm_data['id'],'email_id');
    $subject    = $aj_comm->get_communication_meta($comm_data['id'],'subject');
    $message    = $aj_comm->get_communication_meta($comm_data['id'],'message');

    $template_data['name']          = 'contact-us'; // [slug] name or slug of a template that exists in the user's mandrill account
    $template_data['subject']       = 'Impruw Notification:'.$subject;
    $template_data['headers']       = array('reply-to' => $email_id);
    $template_data['from_email']    = $email_id;
    $template_data['from_name']     = $name;


    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'NAME','content' => $name);
    $template_data['global_merge_vars'][] = array('name' => 'ADMINNAME','content' => '');
    $template_data['global_merge_vars'][] = array('name' => 'USEREMAIL','content' => $email_id);
    $template_data['global_merge_vars'][] = array('name' => 'MESSAGE','content' => $message);


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