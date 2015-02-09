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

    global $wpdb,$aj_comm;

     // get the user registered with the email id
    $user_data = get_user_by( 'email', $email_id );

    //check if a user with the email exists
    if (!$user_data) {

        $msg = '<div class="alert alert-error">
                <button class="close" data-dismiss="alert"></button>This Email Id does not exists.</div>';

        wp_send_json( array( 'code' => 'ERROR', 'msg' => $msg ) );
    }

    //take the user credentials  from the user object
    $user_login = $user_data->user_login;
    $user_email = $user_data->user_email;
    $user_id = $user_data->ID;

    //check if password reset allowed for user
    $allow = apply_filters( 'allow_password_reset', true, $user_data->ID );

    if (!$allow) {

        $msg = "Password reset is not allowed for this user";
        wp_send_json( array( 'code' => 'ERROR', 'msg' => $msg ) );

    } else if (is_wp_error( $allow )) {

        wp_send_json( array( 'code' => 'ERROR', 'msg' => $allow ) );

    }
    //get the hashed user activation key
    $hashed_user_activation_key = generate_hashed_user_activation_key($user_login);

    //insert the hashed user activation key in db for the user
    update_new_user_activation_key_db( $hashed_user_activation_key, $user_login );

    $key = $wpdb->get_var($wpdb->prepare("SELECT user_activation_key FROM $wpdb->users WHERE user_login = %s", $user_login));
 
    $reset_password_link = site_url("reset-password?action=reset-password&key=".$key."&login=".rawurlencode($user_login));

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    $meta_data = array(
        'activation_key' => $reset_password_link
        //'site_url' => $site_url
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

    $msg = 'A password reset email has been sent to your email address.';
    wp_send_json( array( 'code' => 'OK', 'msg' => $msg ) );

}

function validate_reset_password_url( $get_parameters, $form_action ) {

    $get_param_check = check_get_parameters( $get_parameters, $form_action );
    if (!$get_param_check['code'])
        return $get_param_check;

    $user_exists_check = check_user_exists( $get_parameters['login'] );
    if (!$user_exists_check['code'])
        return $user_exists_check;

    $user_status_check = check_user_status_password_reset( $user_exists_check['user_data'] );
    if (!$user_status_check['code'])
        return $user_status_check;

//    $activation_duration_check = validate_reset_password_key($get_parameters['key'],$user_exists_check['user_data']);
//    if (!$activation_duration_check['code'])
//        return $activation_duration_check;

    return array( "code" => true, "user_data_obj" => $user_exists_check['user_data'] );


}

/**
 * Function to check if the form action and the GET parameters of the URL are valid
 *
 * @param $get_parameters
 * @param $form_action
 * @return array containing the error or success message
 */
function check_get_parameters( $get_parameters, $form_action ) {

    // Check if the form action isset and matches with the form action of the page
    if ( isset( $get_parameters[ 'action' ] ) && $get_parameters[ 'action' ] == $form_action ) {

        //Check if the key and login parameters are set in the URL
        if ( isset( $get_parameters[ 'key' ] ) && isset( $get_parameters[ 'login' ] ) ) {
            $success_msg = array( "code" => true );
            return $success_msg;
        } else {
            $error_msg = array( "code" => false, "msg" => "Broken Link" );
            return $error_msg;
        }
    } else {
        $error_msg = array( "code" => false, "msg" => "Broken Link" );
        return $error_msg;
    }

}

/**
 * Function to check if the user exist in the db
 *
 * @param $user_email
 * @return array containing the error or success message
 */

function check_user_exists( $user_email ) {

    $user_data = email_exists( $user_email );

    if ( $user_data == true ) {
        $success_msg = array( "code" => true, 'user_data' => $user_data );
        return $success_msg;

    } else {
        $error_msg = array( "code" => false, "msg" => "No such user exists" );
        return $error_msg;
    }

}


/**
 * Function to check the user status in the db
 *
 * @param $user_data
 * @return array containing the error or success message
 */
function check_user_status_password_reset( $user_data ) {

    if ($user_data->user_status == 1) {

        $error_msg = array( "code" => false, "msg" => "User not activated.Activate your account" );
        return $error_msg;

    } else {
        $success_msg = array( "code" => true );
        return $success_msg;
    }
}

/**
 * Function to activate the user, set the user status to 0 and empty the user activation key
 *
 * @param $user_email
 */
//TODO: use core wp functions to reset the user activation key
function reset_activation_key( $user_email ) {
    global $wpdb;

    $table_name = $wpdb->users;

    $wpdb->update( $table_name, array( 'user_activation_key' => ' ' ), array( 'user_login' => $user_email ) );
}

function get_childsiteid_from_useremail($user_email){
    $user = get_user_by('email', $user_email);
    $user_id = $user->ID;
    $user_blogs =  get_blogs_of_user( $user_id );

    $user_site_id = 0;

    foreach ($user_blogs AS $user_blog) {
        if ($user_blog->userblog_id!=1) {
            $user_site_id = $user_blog->userblog_id;
        }
    }

    return $user_site_id;

}
