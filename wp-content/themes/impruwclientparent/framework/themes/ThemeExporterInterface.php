<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 23/06/14
 * Time: 6:00 PM
 */

namespace framework\themes;


interface ThemeExporterInterface {

    public function export( $theme_id, $page_id, $page_json );
} 