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


    $aj_comm->create_communication($comm_data_admin,$meta_data,$recipients_email_admin);
    $aj_comm->create_communication($comm_data_new,$meta_data,$recipients_email_new);

}
add_action('wpmu_new_blog','registered_email_notification',10,6);

function assisted_setup_contact_email($user_id, $blog_id,$assisted_setup_details){
    global $aj_comm;

    $user_info  = get_userdata($user_id);
    $username   = $user_info->user_login;

    $blog_details = get_blog_details($blog_id);
    $site_name = $blog_details->blogname;

    $reg_user_email = $user_info->user_email;
    $reg_date       =  date("Y/m/d");

    if ($assisted_setup_details['assisted_setup_contact_mode'] == 'by_email') {
       $assisted_setup_contact_value = $user_info->user_email;
    }
    else if ($assisted_setup_details['assisted_setup_contact_mode'] == 'by_phone'){
       $assisted_setup_contact_value = $assisted_setup_details['assisted_setup_contact_phone'];    
    }

    $meta_data = array(
      'assisted_setup_contact_value'=> $assisted_setup_contact_value,
      'assisted_setup_contact_mode'=> $assisted_setup_details['assisted_setup_contact_mode']
    );

    $comm_data_admin = array(
        'component' => 'impruw_user',
        'communication_type' => 'assisted_set_up_contact',
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

    $aj_comm->create_communication($comm_data_admin,$meta_data,$recipients_email_admin);
}

function free_trial_expiry_reminder_email($blog_id){
    global $aj_comm;

    $users = get_users( array('blog_id' => $blog_id,'role'=>'administrator' ) );


    foreach ($users as $user) {
        $site_user_id =  $user->ID;
    }

    $user_info  = get_userdata($site_user_id);
    $username   = $user_info->user_login;

    $blog_details = get_blog_details($blog_id);
    $site_name = $blog_details->blogname;

    $meta_data = array('blog_id'=>$blog_id);

    $comm_data = array(
        'component' => 'impruw_user',
        'communication_type' => 'free_trial_expiry_notice',
        'user_id' =>$site_user_id,
        'blog_id' =>$blog_id
    );

    $recipients_email= array(array(
        'user_id' => $site_user_id,
        'type' => 'email',
        'value' => $user_info->user_email,
        'status' => 'linedup'
    ));

    $aj_comm->create_communication($comm_data,$meta_data,$recipients_email);  
}

function free_trial_expired_email($blog_id){
    global $aj_comm;

    $users = get_users( array('blog_id' => $blog_id,'role'=>'administrator' ) );

    _log("Users for trial expiry");
    _log($users);

    foreach ($users as $user) {
        $site_user_id =  $user->ID;
    }

    $user_info  = get_userdata($site_user_id);
    $username   = $user_info->user_login;

    $blog_details = get_blog_details($blog_id);
    $site_name = $blog_details->blogname;

    $meta_data = array();

    $comm_data = array(
        'component' => 'impruw_user',
        'communication_type' => 'free_trial_expired',
        'user_id' =>$site_user_id,
        'blog_id' =>$blog_id
    );


    $recipients_email= array(
        'user_id' => $site_user_id,
        'type' => 'email',
        'value' => $user_info->user_email,
        'status' => 'linedup'
    );

    _log("recipient users");
    _log($recipients_email);


    $aj_comm->create_communication($comm_data,$meta_data,$recipients_email);  
}
