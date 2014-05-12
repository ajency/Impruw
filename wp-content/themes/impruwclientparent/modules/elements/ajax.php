<?php

    include_once 'functions.php';

    function get_unused_elements_ajax()
    {

        $page_id = $_REQUEST['page_id'];

        $revision_id_to_compare = (int)$_REQUEST['revision_id'] == 0 ? get_last_revision_id($page_id) : (int)$_REQUEST['revision_id'];

        $data = get_recovered_elements($revision_id_to_compare);

        wp_send_success_json($data);
    }

    add_action('wp_ajax_get-unused-elements', 'get_unused_elements_ajax');
