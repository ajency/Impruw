<?php
/**
 * Created by PhpStorm.
 * User: Godfrey
 * Date: 16/10/14
 * Time: 4:54 PM
 */

//Invoking the communication plugin
//function forgot_password_email($blog_id,$user_id,$domain,$path,$site_id,$meta){
function forgot_password_email($email_id){

    global $aj_comm;

    //$user_id = $user->ID;

    $user = get_user_by( 'email', $email_id );
    $user_id = $user->ID;
    //$user_info  = get_userdata($user_id);
    //$user_email = $user_info->user_email;

    $meta_data = array(
    );

    $comm_data = array(
        'component' => 'impruw_user',
        'communication_type' => 'forgot_password',
        'user_id' => $user_id
    );


    $recipients_email[]=array(

        'user_id' => $user_id,
        'type' => 'email',
        'value' => $email_id,
        'status' => 'linedup'
    );

    $aj_comm->create_communication($comm_data,$meta_data,$recipients_email);

}
//add_action('wpmu_new_blog','forgot_password_email',10,6);