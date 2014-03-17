<?php

// Exit if accessed directly
if (!defined('ABSPATH'))
    exit;

require_once 'functions.php';

function read_site_ajax() {

    $site_id = get_current_blog_id();

    $data = get_site_details($site_id);

    if (is_array($data))
        wp_send_json(array('code' => 'OK', 'data' => $data));
    else
        wp_send_json(array('code' => 'ERROR', 'message' => 'Failed to fetch data'));
}

add_action('wp_ajax_read-site', 'read_site_ajax');


