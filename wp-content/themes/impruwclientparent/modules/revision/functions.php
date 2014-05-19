<?php

    /**
     * Get the latest revisions for the selected page
     * @return multi type:
     */
    function get_revisions($page_id = 0)
    {

        $revisions_as_object = wp_get_post_revisions($page_id);

        $revisions = array();

        foreach ($revisions_as_object as $revision_id => $revision_post) {
            if (strpos($revision_post->post_name, 'autosave') === FALSE)
                $revisions[] = $revision_post;
        }

        return $revisions;
    }

    /**
     * get the meta id of the latest revision for a page
     *
     * @param int $page_id
     *
     * @return int
     */
    function  get_last_revision_id($page_id = 0)
    {

        $revisions = wp_get_post_revisions($page_id);

        $revisions = array_keys($revisions);

        $revision_id = $page_id;
        if (count($revisions) > 0)
            $revision_id = $revisions[0];

        return $revision_id;

    }

    /**
     * Returns the serialized json data for the passed option_id
     *
     * @param int $option_id
     *
     * @return array|mixed
     */
    function get_revision_by_option_id($option_id)
    {

        global $wpdb;

        $query = $wpdb->prepare("SELECT option_value FROM {$wpdb->options} WHERE option_id=%d", $option_id);

        $json = $wpdb->get_var($query);

        return is_null($json) ? array() : maybe_unserialize($json);

    }

    /**
     * Returns the page_meta_id for the passed revision_id
     *
     * @param unknown $revision_id
     *
     * @return unknown
     */
    function get_page_meta_id_for_revision($revision_id)
    {

        global $wpdb;

        $query = $wpdb->prepare("SELECT page_meta_id FROM {$wpdb->prefix}revisions WHERE id=%d", (int)$revision_id);

        $page_meta_id = $wpdb->get_var($query);

        return is_null($page_meta_id) ? 0 : $page_meta_id;
    }

    /**
     * Returns the serialized json data for the passed meta_id
     *
     * @param int meta_id
     *
     * @return array|mixed
     */
    function get_page_revision_by_meta_id($meta_id)
    {

        global $wpdb;

        $query = $wpdb->prepare("SELECT meta_value FROM {$wpdb->postmeta} WHERE meta_id=%d", (int)$meta_id);

        $json = $wpdb->get_var($query);

        return is_null($json) ? array() : maybe_unserialize($json);
    }

    /**
     * Returns last option id
     *
     * @return int option_id
     */
    function get_last_header_json_option_id()
    {
        $option_id = get_last_option_id('header');

        return $option_id;
    }

    /**
     * Retuns the last added option id for the theme footer json
     * @return int option_id
     */
    function get_last_footer_json_option_id()
    {
        $option_id = get_last_option_id('footer');

        return $option_id;
    }

    /**
     * Returns the last option id
     *
     * @param string $section
     *
     * @return int option id
     */
    function get_last_option_id($section)
    {

        global $wpdb;

        // cannot use get_option here as it returns only one record.
        // we will get the record which will have the highest option_id value
        $query = $wpdb->prepare("SELECT option_id FROM {$wpdb->options}
                            WHERE option_name=%s 
                            ORDER BY option_id DESC LIMIT 1", "theme-$section");

        $option_id = $wpdb->get_var($query);

        return !is_null($option_id) ? (int)$option_id : 0;
    }

    /**
     * Returns the last meta id for a page json
     *
     * @param int $page_id
     *
     * @return int meta id for the page
     */
    function get_last_page_json_meta_id($page_id)
    {

        global $wpdb;

        // cannot use get_option here as it returns only one record.
        // we will get the record which will have the highedt option_id value
        $query = $wpdb->prepare("SELECT meta_id FROM {$wpdb->postmeta}
							 WHERE post_id=%d AND meta_key=%s  
							 ORDER BY meta_id DESC LIMIT 1", $page_id, 'page-json');

        $meta_id = $wpdb->get_var($query);

        return !is_null($meta_id) ? (int)$meta_id : 0;
    }

    /**
     *
     * @param type $revision_id_to_compare
     *
     * @return type
     */
    function get_recovered_elements($page_id)
    {

//        $elements = array();
//
//        $revision_post = get_post($revision_id_to_compare);
//
//        $revision_json = get_post_meta($revision_id_to_compare, 'page-json', TRUE);
//        $revision_json = is_array($revision_json) ? $revision_json : array();
//
//        $current_json = get_post_meta($revision_post->post_parent, 'page-json', TRUE);
//        $current_json = is_array($current_json) ? $current_json : array();

        $element_ids = get_post_meta($page_id,"unused-elements", TRUE);

        $elements = get_elements_by_ids($element_ids);

        return $elements;
    }


    function compare_page_json($current_json, $revision_json)
    {

        $current_meta_ids = pluck_meta_ids_from_json($current_json);

        $revision_meta_ids = pluck_meta_ids_from_json($revision_json);

        return array_diff($current_meta_ids, $revision_meta_ids);
    }

    /**
     *
     * @param type $json
     *
     * @return array
     */
    function pluck_meta_ids_from_json($json)
    {

        $meta_ids = array();

        foreach ((array)$json as $element) {
            pluck_meta_ids($element, $meta_ids);
        }

        return $meta_ids;
    }

    /**
     *
     * @param type $element
     * @param type $meta_ids
     */
    function pluck_meta_ids($element, &$meta_ids)
    {

        if (isset($element['element']) && $element['element'] === "Row") {
            foreach ($element['elements'] as $column) {
                pluck_meta_ids($column, $meta_ids);
            }
        } else if (isset($element['element']) && $element ['element'] === "Column") {
            foreach ($element['elements'] as $ele) {
                pluck_meta_ids($ele, $meta_ids);
            }
        } else {
            pluck_meta_id($element, $meta_ids);
        }
    }

    /**
     *
     * @param type $element
     *
     * @return type
     */
    function pluck_meta_id($element, &$meta_ids)
    {
        $meta_ids[] = $element['meta_id'];
    }
