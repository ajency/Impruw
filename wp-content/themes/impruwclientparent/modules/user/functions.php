<?php
/**
 * Created by PhpStorm.
 * User: Mahima
 * Date: 7/9/14
 * Time: 1:25 PM
 */


function update_user_lang( $user_id, $language ) {

    update_user_meta( $user_id, 'user_lang', $language );
    global $sitepress, $wpdb;
    $current_default_language = wpml_get_default_language();
    //Also check for all the room created in the current default language
    $sitepress->switch_lang($current_default_language);
    $current_room_data = get_roomss();
    $sitepress->switch_lang();

    //and create its translated rooms in the new default language if they don't exist
    foreach ($current_room_data as $current_room) {
        $data = get_language_translated_room($current_room['ID'], $language);
    }

    //set new default language
    $sitepress->set_default_language($language);

    wp_send_json( array( 'code' => 'OK', 'ID' => $user_id,
        'user_lang' => $language, 'PHRASES' => load_language_phrases() ) );
}


function get_user_model(){
    $user_ID = get_current_user_id();

    $data = (array)get_userdata( $user_ID );

    $data[ 'new_feature_alert' ] = get_user_meta( $user_ID, 'new_feature_alert', TRUE );

    $data[ 'user_lang' ] = get_user_meta( $user_ID, 'user_lang', TRUE );

    return $data;
}

/**
 * Function to change the user password
 */
function update_user_password( $formdata ) {

    unset( $formdata[ 'action' ] );

    $current_password = $formdata[ 'changes' ][ 'currentPassword' ];
    $new_password = $formdata[ 'changes' ][ 'newPassword' ];

    $p_match = check_password_match( $current_password );

    $user_id = $formdata[ 'ID' ];

    if ( $p_match == 0 )
        wp_send_json( array( 'code' => 'ERROR', 'msg' => 'Current password mismatch' ) );

    $blog = get_active_blog_for_user( $user_id );
    $site_url = $blog->siteurl;
    $user = get_user_by( 'id', $user_id );
    $user_email = rawurlencode( $user->user_email );

    $redirect_url = $site_url . '/sign-in/?email=' . $user_email;

    wp_set_password( $new_password, $user_id );

    wp_send_json( array( 'code' => 'OK', 'redirect_url' => $redirect_url ) );
}

function change_user_password( $user_email, $password ) {

    $user = get_user_by( 'email', $user_email );

    reset_password( $user, $password );

    $blog = get_active_blog_for_user( $user->ID);
    $site_url = $blog->siteurl;

    wp_send_json( array( 'code' => 'OK',
                         'msg'=>'Password updated','url' => $site_url,
                         'email' =>rawurlencode($user_email) ));
}

/**
 *
 * @param type $current_password
 *
 * @return int
 */
function check_password_match( $current_password ) {

    $user_ID = get_current_user_id();

    $data = (array)get_userdata( $user_ID );

    $user_password = $data[ 'data' ]->user_pass;

    if ( wp_check_password( $current_password, $user_password, $user_ID ) )
        return 1;
    else
        return 0;
}

/**
 *
 * @param type $user_id
 * @param type $display_name
 * @param type $feature_alert
 */
function update_user_general( $user_id, $formdata ) {

    $display_name = "";
    $feature_alert = "";

    if ( isset( $formdata[ 'changes' ][ 'display_name' ] ) ) {
        $display_name = $formdata[ 'changes' ][ 'display_name' ];
        // update user general info
        $user_id_return = wp_update_user( array( 'ID' => $user_id, 'display_name' => $display_name ) );
    }

    if ( isset( $formdata[ 'changes' ][ 'new_feature_alert' ] ) ) {
        $feature_alert = $formdata[ 'changes' ][ 'new_feature_alert' ];

        //update new feautres checkbox selection
        update_user_meta( $user_id, 'new_feature_alert', $feature_alert );
    }

    wp_send_json( array( 'code' => 'OK',
        'ID' => $user_id,
        'display_name' => $display_name,
        'new_feature_alert' => $feature_alert ) );

}

/**
 * Function to reset user password
 *
 * @param $user_email
 */
function reset_user_password( $user_email ) {

    $user_data = get_user_by( 'email', $user_email );

    //take the user credentials  from the user object
    $user_login = $user_data->user_login;
    $user_id = $user_data->ID;

    //get the hashed user activation key
    $key = generate_hashed_user_activation_key( $user_login );

    $msg = 'Kindly check your email for resetting your password';

    send_password_reset_mail( $user_login, $user_id, $key );

    wp_send_json( array( 'code' => 'OK', 'msg' => $msg ) );
}

/*
* Function to generate a new hashed user activation key
*
 * @return string $hashed_user_activation_key
*/
function generate_hashed_user_activation_key( $user_login ) {

    //generate the random key to be used for new user activation key
    $key = wp_generate_password( 20, false );

    if ( empty( $wp_hasher ) ) {
        require_once ABSPATH . 'wp-includes/class-phpass.php';
        $wp_hasher = new PasswordHash( 8, true );
    }
    $hashed_key = $wp_hasher->HashPassword( $key );

    //insert the hashed user activation key in db for the user
    update_new_user_activation_key_db( $hashed_key, $user_login );

    return $key;
}


/**
 * Function to update user activation key in db for the user with the
 *
 * new hashed user activation key
 *
 * @param $hashed_user_activation_key
 * @param $user_login
 */
function update_new_user_activation_key_db( $hashed_user_activation_key, $user_login ) {
    global $wpdb;

    //update user activation key
    $wpdb->update( $wpdb->users,
        array( 'user_activation_key' => $hashed_user_activation_key ),
        array( 'user_login' => $user_login ) );
}

/**
 * Send mail to user for password reset
 */
function send_password_reset_mail( $user_login, $user_id, $key ) {
    $blog = get_active_blog_for_user( $user_id );
    $blog_url = $blog->siteurl;

    $link =$blog_url."/reset-password?action=rp&key=".$key."&login=".rawurlencode( $user_login );

    $title = sprintf( __( 'Password Reset' ) );

    $message = __( 'Someone requested that the password be reset for the following account:' ) . "\r\n\r\n";
    $message .= $blog_url . "\r\n\r\n";
    $message .= sprintf( __( 'Username: %s' ), $user_login ) . "\r\n\r\n";
    $message .= __( 'If this was a mistake, just ignore this email and nothing will happen.' ) . "\r\n\r\n";
    $message .= __( 'To reset your password, visit the following address:' ) . "\r\n\r\n";
    $message .= '<' .$link . ">\r\n";

    if ( $message && !wp_mail( $user_login, wp_specialchars_decode( $title ), $message ) )
        wp_die( __( 'The e-mail could not be sent.' ) . "<br />\n" . __( 'Possible reason: your host may have disabled the mail() function.' ) );


}