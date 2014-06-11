<?php 

function update_media( $data, $media_id = 0 ) {

    global $wpdb;

    $post = get_post($media_id, ARRAY_A);

    if ( 'attachment' != $post['post_type'] )
        wp_send_json_error();

    $post['post_title'] = $data['title'];

    $post['post_excerpt'] = $data['caption'];

    $post['post_content'] = $data['description'];

    $alt = wp_unslash( $data['alt'] );
    if ( $alt != get_post_meta( $media_id, '_wp_attachment_image_alt', true ) ) {
        $alt = wp_strip_all_tags( $alt, true );
        update_post_meta( $media_id, '_wp_attachment_image_alt', wp_slash( $alt ) );
    }

    wp_update_post( $post );

    return $media_id;

}