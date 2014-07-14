<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 24/06/14
 * Time: 5:48 PM
 */

namespace framework\cron;


use framework\themes\ThemeDatabaseImporter;
use framework\themes\ThemeImporter;

class ThemeImportCron {


    function __construct() {

        add_action( 'import_theme_to_db', array( &$this, 'import_theme_to_db' ) );
    }

    public function import_theme_to_db($site_id) {

        $theme_importer = new ThemeImporter( new ThemeDatabaseImporter(), $site_id );
        $theme_importer->import();
        $this->notify();
    }

    private function notify() {

        wp_mail( 'suraj@ajency.in', 'Theme Import Completed Successfully', 'Theme Export Completed Successfully' );
    }
}