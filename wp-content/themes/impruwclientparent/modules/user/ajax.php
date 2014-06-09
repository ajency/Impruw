<?php

/**
 *
 */
function ajax_read_user() {

    if ( is_user_logged_in() ) {

        $user_ID = get_current_user_id();

        $data = (array) get_userdata( $user_ID );

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

    $user_lang_set = check_user_lang_set( $_POST );

    if ( $user_lang_set == 1 )
        update_user_lang( $user_id, $_POST[ 'changes' ][ 'user_lang' ] ); 
    else
        $display_name = $_POST[ 'display_name' ];

    $feature_alert = $_POST[ 'new_feature_alert' ];

    update_user_general( $user_id, $display_name, $feature_alert );
}

add_action( 'wp_ajax_update-user', 'ajax_update_user' );

/**
 *
 * @param type $formdata
 *
 * @return int
 */
function check_user_lang_set( $formdata ) {

    if ( isset( $formdata[ 'changes' ][ 'user_lang' ] ) )
        return 1; else
        return 0;
}

/**
 *
 * @param type $user_id
 * @param type $user_lang
 */
function ajax_update_user_lang(  ) {

    $user_id = get_current_user_id();
    $user_lang = $_REQUEST[ 'user_lang' ];

    update_user_meta( $user_id, 'user_lang', $user_lang );
    //wp_send_json( array( 'code' => 'OK', 'ID' => $user_id, 'user_lang' => $user_lang ) );
    wp_send_json( array( 'code' => 'OK', 'ID' => $user_id, 'user_lang' => $user_lang , 'PHRASES' => load_language_phrases()));
}
add_action('wp_ajax_update-user-language', 'ajax_update_user_lang');
/**
 *
 * @param type $user_id
 * @param type $display_name
 * @param type $feature_alert
 */
function update_user_general( $user_id, $display_name, $feature_alert ) {

    // update user general info
    $user_id_return = wp_update_user( array( 'ID' => $user_id, 'display_name' => $display_name ) );

    //update new feautres checkbox selection
    update_user_meta( $user_id, 'new_feature_alert', $feature_alert );

    // check if update successfull
    if ( is_wp_error( $user_id_return ) ){
        wp_send_json( array( 'code' => 'not updated' ) );
    }
    else {
        wp_send_json( array( 'code' => 'OK', 'ID' => $user_id_return, 'new_feature_alert' => $feature_alert ) );
    }
}

/**
 * Function to change the user password
 *
 * @returns USer ID
 */
function ajax_update_password() {

    $formdata = $_POST;

    unset( $formdata[ 'action' ] );

    $current_password = $formdata[ 'formdata' ][ 'currentpassword' ];
    $new_password     = $formdata[ 'formdata' ][ 'newpassword' ];

    $p_match = check_password_match( $current_password );

    if ( $p_match == 0 )
        return 0;

    wp_set_password( $new_password, get_current_user_id() );
    wp_send_json( array( 'code' => 'OK', 'data' => get_current_user_id() ) );
}

add_action( 'wp_ajax_update-password', 'ajax_update_password' );

/**
 *
 * @param type $current_password
 *
 * @return int
 */
function check_password_match( $current_password ) {

    $user_ID = get_current_user_id();

    $data = (array) get_userdata( $user_ID );

    $user_password = $data[ 'data' ]->user_pass;

    if ( wp_check_password( $current_password, $user_password, $user_ID ) )
        return 1;
    else
        return 0;
}
