<?php
/**
 * Created by PhpStorm.
 * User: Godfrey
 * Date: 17/10/14
 * Time: 11:56 AM
 */
//Invoking the communication plugin
function contact_us_email($name,$email_id,$subject,$message){

    global $aj_comm;

    $meta_data = array(
        'name' => $name,
        'email_id' => $email_id,
        'subject' => $subject,
        'message' => $message
    );

    $comm_data = array(
        'component' => 'impruw_client_user',
        'communication_type' => 'contact_us'
    );

    $all_users = get_users('role=impruw_manager');
    $site_id = get_current_blog_id();

    $data = get_site_details( $site_id );
    
    $recipients_email_admin[] = array(
            'user_id' => $data['site_id'],
            'type' => 'email',
            'value' => $data['admin_email'],
            'status' => 'linedup'
        );

    $recipients_email_user[]=array(
        'user_id' => 0,
        'type' => 'email',
        'value' => $email_id,
        'status' => 'linedup'
    );

    $aj_comm->create_communication($comm_data,$meta_data,$recipients_email_admin);
    $aj_comm->create_communication($comm_data,$meta_data,$recipients_email_user);

}