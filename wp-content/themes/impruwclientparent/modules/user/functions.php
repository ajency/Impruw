<?php
/**
 * Created by PhpStorm.
 * User: Mahima
 * Date: 7/9/14
 * Time: 1:25 PM
 */


function update_user_lang( $user_id, $language ) {

    update_user_meta( $user_id, 'user_lang', $language );

    wp_send_json( array( 'code' => 'OK', 'ID' => $user_id,
        'user_lang' => $language, 'PHRASES' => load_language_phrases() ) );
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
                         'display_name' =>$display_name,
                         'new_feature_alert' => $feature_alert ) );

}