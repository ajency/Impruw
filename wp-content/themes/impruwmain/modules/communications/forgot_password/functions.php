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

    global $aj_comm,$wpdb;

    //$user_id = $user->ID;

    $user = get_user_by( 'email', $email_id );
    $user_id = $user->ID;
    //$user_info  = get_userdata($user_id);
    //$user_email = $user_info->user_email;


    /*////////////////////////////////////////////Generating the activation key and url///////////////////////////////////////////////////////*/

    $user_login =  $email_id;

    if ( empty( $user_login) ) {
        return false;
    } else if ( strpos( $user_login, '@' ) ) {
        $user_data = get_user_by( 'email', trim( $user_login ) );
        if ( empty( $user_data ) )
            return false;
    } else {
        $login = trim($user_login);
        $user_data = get_user_by('login', $login);
    }

    do_action('lostpassword_post');


    if ( !$user_data ) return false;

    // redefining user_login ensures we return the right case in the email
    $user_login = $user_data->user_login;
    $user_email = $user_data->user_email;

    do_action('retreive_password', $user_login);  // Misspelled and deprecated
    do_action('retrieve_password', $user_login);

    $allow = apply_filters('allow_password_reset', true, $user_data->ID);

    if ( ! $allow )
        return false;
    else if ( is_wp_error($allow) )
        return false;

    $key = $wpdb->get_var($wpdb->prepare("SELECT user_activation_key FROM $wpdb->users WHERE user_login = %s", $user_login));
    if ( empty($key) ) {
        // Generate something random for a key...
        $key = wp_generate_password(20, false);
        do_action('retrieve_password_key', $user_login, $key);
        // Now insert the new md5 key into the db
        $wpdb->update($wpdb->users, array('user_activation_key' => $key), array('user_login' => $user_login));
    }

    $activation_key = network_site_url("wp-login.php?action=rp&key=$key&login=" . rawurlencode($user_login), 'login');
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    $meta_data = array(
        'activation_url' => $activation_key
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
