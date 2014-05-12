<?php

    include_once 'functions.php';

    function ajax_get_unused_elements()
    {
        $page_id = 0;

        if (isset($_REQUEST)) {
            $page_id = $_REQUEST['page_id'];
        }

        $revision_id_to_compare = (int)$_REQUEST['revision_id'] == 0 ? get_last_revision_id($page_id) : (int)$_REQUEST['revision_id'];

        $data = get_recovered_elements($revision_id_to_compare);

        wp_send_success_json($data);
    }

    add_action('wp_ajax_get-unused-elements', 'ajax_get_unused_elements');
