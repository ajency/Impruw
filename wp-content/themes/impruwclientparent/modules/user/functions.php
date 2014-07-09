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
                         'user_lang' => $language , 'PHRASES' => load_language_phrases()));
}