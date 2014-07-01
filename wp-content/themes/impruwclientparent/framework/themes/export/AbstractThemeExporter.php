<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 24/06/14
 * Time: 3:38 PM
 */

namespace framework\themes;


abstract class AbstractThemeExporter {

    /**
     * @return mixed
     */
    abstract public function export();

    /**
     * Exporter
     * @param ThemeExporterInterface $exporter
     */
    public function set_exporter( ThemeExporterInterface $exporter ) {

        $this->exporter = $exporter;
    }

} 
