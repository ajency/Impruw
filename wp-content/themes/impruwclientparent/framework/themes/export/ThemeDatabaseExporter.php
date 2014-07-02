<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 23/06/14
 * Time: 5:42 PM
 */
namespace framework\themes;

class ThemeDatabaseExporter implements ThemeExporterInterface {

    /**
     * Setup the table name property on construction
     */
    function __construct() {

        global $wpdb;
        $this->table = $wpdb->base_prefix . 'theme_export';
    }

    /**
     * @param array $args
     *
     * @return bool|ErrorException|\WP_Error
     */
    public function export( array $args ) {

        $defaults = array(
            'site_id'     => 0,
            'object_type' => '',
            'object_name' => '',
            'elements'    => array(),
            'language'    => '',
            'date_time'   => current_time( 'mysql' )
        );

        $args = wp_parse_args( $args, $defaults );

        if ( $args[ 'site_id' ] === 0 || empty( $args[ 'object_type' ] ) )
            return new \WP_Error( 'Invalid arguments passed' );

        $id = 0;
        if ( 0 !== $id = $this->exists( $args[ 'site_id' ], $args[ 'object_type' ], $args[ 'object_name' ] ) ) {
            return $this->update( $id, $args[ 'elements' ] );
        } else {
            return $this->insert( $args );
        }

    }

    /**
     * @param $args
     *
     * @return bool|ErrorException
     */
    private function insert( $args ) {

        global $wpdb;

        $wpdb->insert( $this->table,
            array(
                'site_id'     => $args[ 'site_id' ],
                'object_type' => $args[ 'object_type' ],
                'object_name' => $args[ 'object_name' ],
                'elements'    => maybe_serialize( $args[ 'elements' ] ),
                'language'    => $args[ 'language' ],
                'date_time'   => $args[ 'date_time' ]
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
    private function update( $id, $elements ) {

        global $wpdb;

        $result = $wpdb->update( $this->table,
            array(
                'elements'  => maybe_serialize( $elements ),
                'date_time' => current_time( 'mysql' )
            ),
            array(
                'id' => $id
            ) );

        return $result;
    }

    /**
     * @param $theme_id
     * @param $object_type
     * @param $object_id
     *
     * @return int
     */
    private function exists( $site_id, $object_type, $object_name ) {

        global $wpdb;

        $query = $wpdb->prepare( "SELECT id FROM {$this->table}
                                 WHERE object_type=%s
                                 AND object_name=%s AND site_id=%d", $object_type, $object_name, $site_id );

        $record_id = $wpdb->get_var( $query );

        return (int) $record_id;
    }

}