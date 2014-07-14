<?php

/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 23/06/14
 * Time: 5:41 PM
 */

namespace framework\themes;

use framework\pages\PageList;
use framework\pages\PageListIterator;

class ThemeImporter extends AbstractThemeImporter {

    protected $importer = FALSE;

    private $site_id;

    /**
     *
     * @param ThemeExporterInterface $exporter
     */
    function __construct( ThemeImporterInterface $importer = null, $site_id ) {

        $this->site_id = $site_id;

        if ( $importer !== null )
            $this->set_importer( $importer );

    }

    /**
     * @return mixed
     */
    protected function import_pages() {

        $iterator = new PageListIterator( new PageList() );

        while ( $iterator->valid() ) {
            $page_json = $this->get_page_import_data( $iterator->current() );
            $this->importer->import( $iterator->current()->ID, $page_json );
            $iterator->next();
        }
    }

    /**
     * @return mixed
     */
    protected function import_footer() {

        $header_footer_getter = new HeaderFooterJsonGetter( 'theme-footer', $this->site_id );
        $page_json            = $header_footer_getter->get_json();
        $this->importer->import( 'theme-footer', $page_json );
    }

    /**
     * @return mixed
     */
    protected function import_header() {

        $header_footer_getter = new HeaderFooterJsonGetter( 'theme-header', $this->site_id );
        $page_json            = $header_footer_getter->get_json();
        $this->importer->import( 'theme-header', $page_json );
    }

    private function get_page_import_data( $page ) {

        $template_name = get_post_meta( $page->ID, 'impruw_page_template', TRUE );

        $theme_page_getter = new ThemePageGetter( $template_name, $this->site_id );
        $page_json         = $theme_page_getter->get_page_json();

        return is_array( $page_json ) ? $page_json : array();
    }

}
