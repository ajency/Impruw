<?php

/**
 *
 */
require "functions.php";
function ajax_read_user() {

    if ( is_user_logged_in() ) {

        $user_ID = get_current_user_id();

        $data = (array)get_userdata( $user_ID );

        $data[ 'new_feature_alert' ] = get_user_meta( $user_ID, 'new_feature_alert', TRUE );

        $data[ 'user_lang' ] = get_user_meta( $user_ID, 'user_lang', TRUE );

        wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
        //wp_send_json(array('code' => 'OK', 'data' => wp_get_current_user()));
    } else {
        wp_send_json( array( 'code' => 'ERROR', 'message' => 'User not logged in' ) );
    }
}

add_action( 'wp_ajax_read-user', 'ajax_read_user' );

/**
 * Function to update the user general info
 *
 * @return User ID , new feature selection
 */
function ajax_update_user() {
    $user_id = $_POST[ 'ID' ];

    $user_lang_set = check_update( $_POST );

    if ( $user_lang_set == 1 ) {
        update_user_lang( $user_id, $_POST[ 'changes' ][ 'user_lang' ] );
    } else if ( $user_lang_set == 2 ) {
        update_user_general( $user_id, $_POST );
    } else {
        update_user_password( $_POST );
    }

}

add_action( 'wp_ajax_update-user', 'ajax_update_user' );

/**
 *
 * @param type $formdata
 *
 * @return int
 */
function check_update( $formdata ) {

    if ( isset( $formdata[ 'changes' ][ 'user_lang' ] ) )
        return 1;
    else if ( isset( $formdata[ 'changes' ][ 'display_name' ] ) || isset( $formdata[ 'changes' ][ 'new_feature_alert' ] ) )
        return 2;
    else
        return 0;
}

/**
 * Function to reset user password on clicking forgot password link
 *
 */
function ajax_reset_password() {

    unset( $_POST[ 'action' ] );

    $user_email = trim( $_POST[ 'email' ] );

    $email_exists = email_exists( $user_email );

    if ( $email_exists ) {

        reset_user_password( $user_email );
    } else {
        wp_send_json( array( 'code' => 'ERROR', 'msg' => icl_t('theme impruwlogin','email_non_existent_msg','Email Id does not exists') ) );
    }
}

add_action( 'wp_ajax_nopriv_reset-password', 'ajax_reset_password' );

/**
 * Function to change user password after forgot password reset
 *
 */
function ajax_change_password() {

    unset( $_POST[ 'action' ] );

    if ( isset( $_POST[ 'newPassword' ] ) && $_POST[ 'newPassword' ] != $_POST[ 'confirmPassword' ] )
        wp_send_json( array( 'code' => 'ERROR', 'msg' => 'Passwords do not match' ) );

    $user_email = trim( $_POST[ 'userEmail' ] );

    change_user_password( $user_email , $_POST[ 'newPassword' ] );
}

add_action( 'wp_ajax_nopriv_change-password', 'ajax_change_password' );


function set_app_instance(){

    //get user id
    $user_id = get_current_user_id();

    $instance_id = $_REQUEST['instance_id'];

    $now = time();
    $instance = "$now:$instance_id";

    update_user_meta( $user_id, '_builder_instance', $instance );

    wp_send_json(array('success' => true, 'instance' => $instance));
}
add_action('wp_ajax_set-app-instance', 'set_app_instance');


