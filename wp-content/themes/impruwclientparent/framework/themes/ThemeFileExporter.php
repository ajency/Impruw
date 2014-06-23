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
        if(!file_exists(ABSPATH . '/wp-content/uploads/page-json'))
            mkdir(ABSPATH . '/wp-content/uploads/page-json', 0777 );
    }

    public function export($theme_id, $page_id, $page_json ) {

        $file = fopen( ABSPATH . '/wp-content/uploads/page-json/page_' . $page_id . '.json', 'w' );
        fwrite( $file, json_encode( $page_json ) );
        fclose( $file );
    }

}