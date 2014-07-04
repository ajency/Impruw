<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 23/06/14
 * Time: 6:00 PM
 */

namespace framework\themes;

interface ThemeImporterInterface {

    /**
     * @param $ID int
     * @param $page_json array
     *
     * @return mixed
     */
    public function import( $ID, array $page_json );

} 
