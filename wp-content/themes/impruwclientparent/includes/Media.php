<?php

    /**
     *
     */
    function get_site_media($query)
    {

        if (!current_user_can('upload_files'))
            return array('code' => 'ERROR', 'message' => 'Dont\'t have enough permission');

        $query = array_intersect_key($query, array_flip(array('s', 'order', 'orderby', 'posts_per_page', 'paged', 'post_mime_type', 'post_parent', 'post__in', 'post__not_in',)));

        $query['post_type']   = 'attachment';
        $query['post_status'] = 'inherit';
        if (current_user_can(get_post_type_object('attachment')->cap->read_private_posts))
            $query['post_status'] .= ',private';


        $query = apply_filters('ajax_query_attachments_args', $query);
        $query = new WP_Query($query);

        $posts = array_map('wp_prepare_attachment_for_js', $query->posts);
        $posts = array_filter($posts);

        return $posts;
    }

    function impruw_media()
    {

        // if('POST' !== $_SERVER['REQUEST_METHOD'])
        // 	return;

        WP_Query;

        wp_send_json($_REQUEST);

        $id = $_POST['media-id'];

        $id = wp_update_post(array('ID' => $id, 'post_title' => $_POST['title'], 'post_content' => $_POST['description']), TRUE);

        if ($id == 0)
            wp_send_json(array('code' => 'ERROR', 'm' => $id, 'message' => 'Failed to update. Please try again'));

        update_post_meta($id, 'image-link', $_POST['image-link']);

        wp_send_json(array('code' => 'OK'));

    }

    add_action('wp_ajax_impruw_media', 'impruw_media');
    add_action('wp_ajax_nopriv_impruw_media', 'impruw_media');
