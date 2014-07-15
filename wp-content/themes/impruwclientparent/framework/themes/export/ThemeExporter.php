<?php

/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 23/06/14
 * Time: 5:41 PM
 */

namespace framework\themes;

use framework\elements\HeaderFooterElementsCollection;
use framework\elements\PageElementsCollection;
use framework\pages\PageListIterator;
use framework\pages\PageList;

class ThemeExporter extends AbstractThemeExporter {

    protected  $exporter = FALSE;

    private $page_list = array();

    private $site_id;

    /**
     *
     * @param ThemeExporterInterface $exporter
     */
    function __construct( ThemeExporterInterface $exporter = null ) {

        $this->site_id = get_current_blog_id();

        if ( $exporter !== null )
            $this->set_exporter( $exporter );

    }


    /**
     * @throws \LogicException
     */
    function export() {

        if ( !$this->exporter ) {
            throw new \LogicException( "Exporter is not set" );
        }

        $this->export_pages();
        $this->export_header();
        $this->export_footer();

    }

    /**
     * @return mixed
     */
    public function export_pages() {

        $iterator = new PageListIterator( new PageList() );

        while ( $iterator->valid() ) {
            $export_data = $this->get_page_export_data( $iterator->current() );
            $this->exporter->export( $export_data );
            $iterator->next();
        }
    }

    /**
     * @return mixed
     */
    private function export_header() {

        $export_data = $this->get_header_footer_export_data( 'theme-header' );
        $this->exporter->export( $export_data );
    }

    /**
     * @return mixed
     */
    private function export_footer() {
        $export_data = $this->get_header_footer_export_data( 'theme-footer' );
        $this->exporter->export( $export_data );
    }

    private function get_page_export_data( $page ) {

        $export_data = array();

        $export_data[ 'site_id' ]     = $this->site_id;
        $export_data[ 'object_type' ] = 'page';
        $export_data[ 'object_name' ] = get_post_meta( $page->ID, 'impruw_page_template', true );

        $page_elements             = new PageElementsCollection( $page->ID );
        $export_data[ 'elements' ] = $page_elements->get_elements_collection();

        return $export_data;
    }

    private function get_header_footer_export_data( $section ) {

        $export_data = array();

        $export_data[ 'site_id' ]     = $this->site_id;
        $export_data[ 'object_type' ] = $section;

        $elements = new HeaderFooterElementsCollection( $section );
        $export_data[ 'elements' ] = $elements->get_elements_collection();

        return $export_data;
    }
}