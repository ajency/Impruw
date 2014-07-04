<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 23/06/14
 * Time: 5:42 PM
 */
namespace framework\themes;

class ThemeFileExporter implements ThemeExporterInterface {

    function __construct() {

        // make sure the path exists
        if ( !file_exists( ABSPATH . '/wp-content/uploads/page-json' ) )
            mkdir( ABSPATH . '/wp-content/uploads/page-json', 0777 );
    }

    public function export( array $args ) {

        $file = fopen( ABSPATH . '/wp-content/uploads/page-json/page_' . $args[ 'object_id' ] . '_' . $args[
            'object_id'
            ] . '.json',
            'w' );
        fwrite( $file, json_encode( $args[ 'elements' ] ) );
        fclose( $file );
    }

}
