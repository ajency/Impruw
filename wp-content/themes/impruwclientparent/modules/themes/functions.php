<?php

/**
 * gets all themes for the main site
 * uses all args same as WP_Query
 * @param type $args
 * @return type
 */
function get_impruw_themes($args = array()) {

    // all themes are located on main site. so switch to blog
    switch_to_blog(1);

    $args = wp_parse_args($args, array('post_type' => 'theme'));

    $themes = get_posts($args);

    $themes_data = array();

    //let convert it to required format
    if (count($themes) > 0) {

        foreach ($themes as $theme) {
            $themes_data[] = convert_to_theme_format($theme);
        }
    }

    restore_current_blog();

    return $themes_data;
}

/**
 * COnverts the passed theme id object in required format
 */
function convert_to_theme_format($theme) {

    $data = array();

    $data['ID'] = $theme->ID;

    $data['post_title'] = $theme->post_title;

    // get theme image url
    $data['image_url'] = get_theme_image_url($theme->ID);

    // get preview link
    $data['preview_link'] = get_theme_preview_link($theme->ID);

    return $data;
}

/**
 * Get the theme image URL
 * @param type $ID
 * @return type
 */
function get_theme_image_url($ID, $size = 'medium') {

    if (!is_numeric($ID))
        return false;

    $image_id = get_post_thumbnail_id($ID);

    $image_url = wp_get_attachment_image_src($image_id, $size);

    return is_array($image_url) ? $image_url[0] : site_url();
}

/**
 * Get theme preview link
 * @param type $ID
 * @return string
 */
function get_theme_preview_link($ID) {

    $site_id = get_post_meta($ID, 'linked_theme', true);

    $link = '#';

    if (is_numeric($site_id)) {
        switch_to_blog($site_id);
        $link = site_url();
        restore_current_blog();
    }

    return $link;
}

/**
 * Is theme selected
 * @return boolean
 */
function is_theme_choosed() {

    $status = get_option('site_status', 'online');

    if ($status != 'coming_soon')
        return 1;

    return 0;
}
