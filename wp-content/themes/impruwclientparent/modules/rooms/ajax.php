<?php

    /**
     * All Room ajax goes here
     */
    // Incluse all files
    include_once 'functions.php';
    /**
     * Define all ajax handlers here
     */

    /**
     * Function to create new rooms from the dashboard
     * returns all the post data of the room created
     *
     */
    function create_room_ajax()
    {

        // get all form data
        $formdata = $_POST;

        // unset the action
        unset($formdata['action']);

        if ($formdata['post_status'] === 'auto-draft') {
            $room_id = create_draft_room();
        }

        // get all room post data
        $room_data = get_room($room_id);

        wp_send_json(array('code' => 'OK', 'data' => $room_data));
    }

    add_action('wp_ajax_create-room', 'create_room_ajax');

    /**
     *
     */
    function update_room_ajax()
    {

        // get all form data
        $formdata = $_POST;

        // unset the action
        unset($formdata['action']);

        // returns the room id
        $room_id = updateroom($formdata);
        //wp_send_json(array('code' => 'OK', 'data' => $formdata));
        // get all room post data
        $room_data = get_room($room_id);

        wp_send_json(array('code' => 'OK', 'data' => $room_data));
    }

    add_action('wp_ajax_update-room', 'update_room_ajax');

    function read_room_ajax()
    {

        // returns the room id
        $room_id = $_REQUEST['ID'];

        // get all room post data
        $room_data = get_room($room_id);

        wp_send_json(array('code' => 'OK', 'data' => $room_data));
    }

    add_action('wp_ajax_read-room', 'read_room_ajax');

    /**
     * Function to get all room data
     *  returns all the post data of the room created
     */
    function get_rooms_ajax()
    {

        //returns all rooms
        $data = get_roomss();

        wp_send_json(array('code' => 'OK', 'data' => $data));
    }

    add_action('wp_ajax_get-rooms', 'get_rooms_ajax');

    /**
     * Function to get all room data
     *  returns only the title and ID
     */
    function get_all_rooms_ajax()
    {

        //returns all rooms
        $data = get_all_rooms();

        wp_send_json(array('code' => 'OK', 'data' => $data));
    }

    add_action('wp_ajax_get-all-rooms', 'get_all_rooms_ajax');

    /**
     * Function to delete room
     *  returns deleted room ID
     */
    function delete_room_ajax()
    {

        // get all form data
        $formdata = $_POST;

        // unset the action
        unset($formdata['action']);

        $room_id = delete_room($formdata);


        wp_send_json(array('code' => 'OK', 'data' => $room_id));
    }

    add_action('wp_ajax_delete-room', 'delete_room_ajax');

