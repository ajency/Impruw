<?php

    /*
     * To change this license header, choose License Headers in Project Properties.
     * To change this template file, choose Tools | Templates
     * and open the template in the editor.
     */

    function get_elements_by_ids($ids)
    {

        if (count($ids) === 0)
            return array();

        $elements = array();

        foreach ($ids as $id) {
            $elements[] = get_element_by_id($id);
        }

        return $elements;

    }

    /**
     *
     * @global type $wpdb
     *
     * @param type  $meta_id
     *
     * @return type
     */
    function get_element_by_id($meta_id)
    {

        global $wpdb;

        $query = $wpdb->prepare("SELECT meta_value FROM {$wpdb->postmeta} WHERE meta_id=%d", $meta_id);

        $meta_value = $wpdb->get_var($query);

        $meta_value = maybe_unserialize($meta_value);

        $meta_value = is_array($meta_value) ? $meta_value : array();

        $meta_value['meta_id'] = $meta_id;

        return $meta_value;
    }