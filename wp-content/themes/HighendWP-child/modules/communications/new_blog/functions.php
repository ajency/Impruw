<?php
/**
 * Created by PhpStorm.
 * User: Godfrey
 * Date: 13/10/14
 * Time: 6:47 PM
 */


//Invoking the communication plugin
function registered_email_notification($blog_id,$user_id,$domain,$path,$site_id,$meta){

     global $aj_comm;

    //$user_id = $user->ID;

    $user_info  = get_userdata($user_id);
    $username   = $user_info->user_login;

    $blog_details = get_blog_details($blog_id);
    $site_name = $blog_details->blogname;

    $reg_user_email = $user_info->user_email;
    $reg_date       =  date("l jS \of F Y h:i:s A", strtotime($user_info->user_registered));

    $meta_data = array(

    );

    $comm_data_admin = array(
        'component' => 'impruw_user',
        'communication_type' => 'registration_email_admin',
        'user_id' => $user_id,
        'blog_id' =>$blog_id
    );

    $comm_data_new = array(
        'component' => 'impruw_user',
        'communication_type' => 'registration_email_user',
        'user_id' => $user_id,
        'blog_id' =>$blog_id

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

    $recipients_email_new[]=array(

        'user_id' => $user_id,
        'type' => 'email',
        'value' => $reg_user_email,
        'status' => 'linedup'
    );

    /*print_r($comm_data);
    print_r($meta_data);
    print_r($recipients_email);*/
    //var_dump($recipients_email_admin); exit;

    $aj_comm->create_communication($comm_data_admin,$meta_data,$recipients_email_admin);
    $aj_comm->create_communication($comm_data_new,$meta_data,$recipients_email_new);

}
add_action('wpmu_new_blog','registered_email_notification',10,6);