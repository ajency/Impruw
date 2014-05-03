<?php

/*
  File Name: site_shortcodes.php
  Description: This file has a list of the following shortcodes used to retrieve site information.
  1)  retrieve_site_information - shortcode to retrieve site's information based on the attribute passed

  /* ============================================================= */

/**
 * retrieve_site_information
 * shortcode to retrieve site information based on the attribute passed
 *
 */
function retrieve_site_information($atts) {
    global $wpdb;
    if (isset($atts['field'])) {
        $blog_id = $atts['blog_id'];
        $blog_id = maybe_unserialize($blog_id);
        $blog_id = $blog_id['blog_id'];
        $blog_info_array = get_blog_details($blog_id);
        //print_r($blog_info_array);exit;
        if ($atts['field'] == 'path') {
            return $site_url = $blog_info_array->domain . $blog_info_array->$atts['field'];
        } else
            return $blog_info_array->$atts['field'];
    }
    return;
}

add_shortcode('site_info', 'retrieve_site_information');
