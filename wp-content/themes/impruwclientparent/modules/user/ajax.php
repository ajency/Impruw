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
 * Function to change the user password
 *
 * @returns USer ID
 */
//function ajax_update_password() {
//
//    $formdata = $_POST;
//
//    unset( $formdata[ 'action' ] );
//
//    $current_password = $formdata[ 'formdata' ][ 'currentpassword' ];
//    $new_password = $formdata[ 'formdata' ][ 'newpassword' ];
//
//    $p_match = check_password_match( $current_password );
//
//    if ( $p_match == 0 )
//        return 0;
//
//    wp_set_password( $new_password, get_current_user_id() );
//    wp_send_json( array( 'code' => 'OK', 'data' => get_current_user_id() ) );
//}
//
//add_action( 'wp_ajax_update-password', 'ajax_update_password' );


