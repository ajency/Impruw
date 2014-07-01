<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 30/06/14
 * Time: 1:19 PM
 */

namespace framework\themes;


abstract class AbstractThemeImporter {

    /**
     * @return mixed
     */
    public function import() {

        if ( !$this->importer ) {
            throw new \LogicException( "Importer is not set" );
        }

        $this->import_pages();
        $this->import_header();
        $this->import_footer();

    }

    /**
     * ThemeImporterInterface
     *
     * @param ThemeImporterInterface $exporter
     */
    public function set_importer( ThemeImporterInterface $importer ) {

        $this->importer = $importer;
    }

    /**
     * @return mixed
     */
    abstract protected function import_pages();

    /**
     * @return mixed
     */
    abstract protected function import_header();

    /**
     * @return mixed
     */
    abstract protected function import_footer();
}
