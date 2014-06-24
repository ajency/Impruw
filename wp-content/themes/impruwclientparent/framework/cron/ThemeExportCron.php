<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 24/06/14
 * Time: 5:48 PM
 */

namespace framework\cron;


use framework\themes\ThemeDatabaseExporter;
use framework\themes\ThemeExporter;

class ThemeExportCron {


    function __construct() {

        add_action( 'export_themes_to_db', array( &$this, 'export_themes_to_db' ) );
    }

    public function export_themes_to_db() {

        $theme_exporter = new ThemeExporter( new ThemeDatabaseExporter() );
        $theme_exporter->export();

        $this->notify();
    }

    private function notify() {

        wp_mail( 'suraj@ajency.in', 'Theme Export Compelted Successfully', 'Theme Export Compelted Successfully' );
    }
}