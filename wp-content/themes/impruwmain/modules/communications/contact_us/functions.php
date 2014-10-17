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
        'component' => 'impruw_user',
        'communication_type' => 'contact_us'
    );

    $all_users = get_users('role=impruw_manager');

    foreach($all_users as $user){

        $recipients_email_admin[] = array(
            'user_id' => $user->ID,
            'type' => 'email',
            'value' => $user->user_email,
            'status' => 'linedup'
        );
    }

    $aj_comm->create_communication($comm_data,$meta_data,$recipients_email_admin);

}