<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 30/06/14
 * Time: 5:55 PM
 */

namespace framework\themes;


class ThemePageGetter {

    private $page_json;

    private $page_name;

    private $site_id;

    function __construct( $page_name ) {

        $this->page_name = $page_name;
        $this->site_id   = get_current_blog_id();
        $this->page_json = $this->get_page_json_from_db();
    }

    /**
     * @return mixed
     */
    public function get_page_json() {

        return $this->page_json;
    }

    private function get_page_json_from_db() {

        global $wpdb;

        $query = $wpdb->prepare( "SELECT elements FROM {$wpdb->base_prefix}theme_export
                                 WHERE object_type=%s
                                 AND object_name=%s AND site_id=%d", 'page', $this->page_name, $this->site_id );

        $elements = $wpdb->get_var( $query );

        if ( is_string( $elements ) )
            $elements = maybe_unserialize( $elements );

        return is_array( $elements ) ? $elements : array();
    }

}