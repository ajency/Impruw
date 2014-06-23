<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 23/06/14
 * Time: 5:42 PM
 */
namespace framework\themes;

class ThemeDatabaseExporter implements ThemeExporterInterface {

    public function export( $theme_id, $page_id, $page_json ) {

        global $wpdb;

        $table = $wpdb->base_prefix . 'theme_export';

        $id = 0;

        if ( 0 !== $id = $this->exists( $theme_id, $page_id ) ) {
            return $this->update( $id, $page_json, $table );
        } else {
            return $this->insert( $theme_id, $page_id, $page_json, $table );
        }

    }

    /**
     * @param $page_id
     * @param $page_json
     * @param $table
     *
     * @return bool|ErrorException
     */
    private function insert( $theme_id, $page_id, $page_json, $table ) {

        global $wpdb;

        $wpdb->insert( $table,
            array(
                'page_id'   => $page_id,
                'theme_id'  => $theme_id,
                'page_json' => maybe_serialize( $page_json ),
                'date_time' => current_time( 'mysql' )
            ) );

        return $wpdb->insert_id > 0 ? TRUE : new ErrorException( 'Failed to insert in db' );
    }

    /**
     * @param $page_id
     * @param $page_json
     * @param $table
     *
     * @return bool|ErrorException
     */
    private function update( $id, $page_json, $table ) {

        global $wpdb;

        $result = $wpdb->update( $table,
            array(
                'page_json' => maybe_serialize( $page_json ),
                'date_time' => current_time( 'mysql' )
            ),
            array(
                'id' => $id
            ) );

        return $result;
    }

    private function exists( $theme_id, $page_id ) {

        global $wpdb;

        $query = $wpdb->prepare( "SELECT id FROM {$wpdb->base_prefix}theme_export
                                 WHERE page_id=%d AND theme_id=%d", $page_id, $theme_id );

        $record_id = $wpdb->get_var( $query );

        return (int) $record_id;
    }

}