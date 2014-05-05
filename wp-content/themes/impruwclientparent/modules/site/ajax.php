<?php

// Exit if accessed directly
    if (!defined('ABSPATH'))
        exit;

    require_once 'functions.php';

    function read_site_ajax()
    {

        $site_id = get_current_blog_id();

        $data                         = get_site_details($site_id);
        $data ['checkin_time']        = get_option('checkin-time');
        $data ['checkin_time_format'] = get_option('checkin-time-format');
        $data ['additional_policy']   = get_option('additional-policy');
        $data ['statistics_enabled']  = get_option('statistics_enabled');

        if (is_array($data))
            wp_send_json(array('code' => 'OK', 'data' => $data));
        else
            wp_send_json(array('code' => 'ERROR', 'message' => 'Failed to fetch data'));
    }

    add_action('wp_ajax_read-site', 'read_site_ajax');

    /**
     *
     */
    function assign_theme_to_site_ajax()
    {

        $site_id = get_current_blog_id();

        $new_theme_id = $_POST['new_theme_id'];
        $clone_pages  = !isset($_POST['clone_pages']) ? TRUE : FALSE;

        assign_theme_to_site($new_theme_id, $clone_pages);

        wp_send_json(array('code' => 'OK'));
    }

    add_action('wp_ajax_assign-theme-to-site', 'assign_theme_to_site_ajax');

    /**
     * Function to add site profile details
     * returns all the form data passed
     *
     */
    function update_site_ajax()
    {

        // fetching all the form data
        $formdata = $_POST;

        // passing all the form data to the function to insert the values into the options table
        $form_data = update_site($formdata);

        wp_send_json(array('code' => 'OK', 'data' => $form_data));
    }

    add_action('wp_ajax_update-site', 'update_site_ajax');

    function update_tracking()
    {

        $site_id = get_current_blog_id();

        $tracking_code = create_piwik_site($site_id);

        $piwik_site_id = $tracking_code['id'];

        update_option('statistics_enabled', $piwik_site_id);

        wp_send_json(array('code' => 'OK', 'tracking_code' => $tracking_code));
    }

    add_action('wp_ajax_update-tracking', 'update_tracking');

    /**
     * Function to create a piwik site for the site created
     *
     *
     * @param type $site_id
     *
     * @return type
     */
    function create_piwik_site($site_id)
    {

        $wp_piwik_object = $GLOBALS['wp_piwik'];

        $_GET['wpmu_show_stats'] = $site_id;

        $tracking_code = $wp_piwik_object->addPiwikSite();

        return $tracking_code;
    }
