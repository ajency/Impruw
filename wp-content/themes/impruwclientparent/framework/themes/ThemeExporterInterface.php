<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 23/06/14
 * Time: 6:00 PM
 */

namespace framework\themes;


use framework\elements\PageElementsCollection;

interface ThemeExporterInterface {

    public function export( array $args );

} 