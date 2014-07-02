<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 30/06/14
 * Time: 5:55 PM
 */

namespace framework\themes;


class HeaderFooterJsonGetter {

    private $json;

    private $section;

    private $site_id;

    function __construct( $section ) {

        $this->section = $section;
        $this->site_id   = get_current_blog_id();
        $this->json = $this->get_section_json_from_db();
    }

    /**
     * @return mixed
     */
    public function get_json() {

        return $this->json;
    }

    private function get_section_json_from_db() {

        global $wpdb;

        $query = $wpdb->prepare( "SELECT elements FROM {$wpdb->base_prefix}theme_export
                                 WHERE object_type=%s
                                 AND site_id=%d", $this->section, $this->site_id );

        $elements = $wpdb->get_var( $query );

        if ( is_string( $elements ) )
            $elements = maybe_unserialize( $elements );

        return is_array( $elements ) ? $elements : array();
    }

}