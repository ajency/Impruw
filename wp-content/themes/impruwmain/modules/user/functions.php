<?php

    // Exit if accessed directly
    if (!defined('ABSPATH'))
        exit;

    /**
     * Function to actually register a new user in system
     * Calls wp_insert_user WP function to make the record
     * @return int|WP_Error new user_id or WP_Error object
     */
    function create_new_user($user_data)
    {

        $defaults = array('user_language' => 'en_EN');

        $user_data = wp_parse_args($user_data, $defaults);

        // user_name is not captured, so lets slugify display_name to user_name
        if (!isset($user_data['user_login']))
            $user_data['user_login'] =  $user_data['user_email'];

        // any new registered user must be the adim of the site. so, add role as admin
        if (!isset($user_data['role']))
            $user_data['role'] = 'administrator';

        $user_data['first_name'] = strip_user_first_name($user_data['display_name']);
        $user_data['last_name']  = strip_user_last_name($user_data['display_name']);

        $user_id = wp_insert_user($user_data);

        if (is_wp_error($user_id))
            return $user_id;

        // add user meta
        $user_meta = array('language' => $user_data['user_language']);
        set_user_meta($user_id, $user_meta);

        return $user_id;
    }

    /**
     *
     * @param type $str
     */
    function strip_user_first_name($str)
    {

        //explode the string
        $name = explode(" ", $str);

        $first_name = count($name) > 0 ? $name[0] : '';

        return $first_name;
    }

    /**
     * returns the first name of the user
     *
     * @param string $str user full name
     */
    function strip_user_last_name($str)
    {

        //explode the string
        $name = explode(" ", $str);

        $last_name = count($name) > 1 ? $name[1] : '';

        return $last_name;
    }

    /**
     * Set up the user meta for the passed user id
     *
     * @param int   $user_id    - user id
     * @param array $meta_array - meta to set
     *
     * @return boolean
     */
    function set_user_meta($user_id, $meta_array = array())
    {

        // return if $meta_array is empty
        if (empty($meta_array))
            return FALSE;

        // for each key in $meta_array update the user meta
        foreach ($meta_array as $meta_key => $meta_value) {
            update_user_meta($user_id, $meta_key, $meta_value);
        }

        return TRUE;
    }

    /**
     * This function will pick the user specific fields from an array and return
     *
     * @param array $data_array array of data
     *
     * @return array user_data fields
     */
    function pick_user_fields($data_array)
    {

        // return if passed argument is not an array
        if (!is_array($data_array))
            return array();

        // the user fields. May have more as required
        $user_fields = array('user_name', 'user_language', 'user_email', 'user_pass', 'display_name');

        $user_data = array();

        // map  the $data_array and pick user fields
        foreach ($data_array as $field => $value) {

            if (in_array($field, $user_fields))
                $user_data[$field] = $value;
        }

        return $user_data;
    }

    /**
     * Sanitizes the user name to take format as "user_name"
     * First sanitizes the string with sanitize_title() and then replaces '-' with '_'
     *
     * @param type $user_name
     *
     * @return type
     */
    function sanitize_username($user_name)
    {

        // sanitize title
        $user_name = sanitize_title($user_name);

        // replace '-' with '_'
        $user_name = str_replace('-', '_', $user_name);

        return $user_name;
    }
