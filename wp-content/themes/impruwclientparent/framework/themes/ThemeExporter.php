<?php

/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 23/06/14
 * Time: 5:41 PM
 */

namespace framework\themes;

use framework\pages\PageListIterator;
use framework\pages\PageList;

class ThemeExporter {

    private $exporter = FALSE;

    private $page_list = array();

    private $theme_id;

    /**
     * @param int                    $theme_id
     * @param ThemeExporterInterface $exporter
     */
    function __construct( $theme_id = 0, ThemeExporterInterface $exporter = null ) {

        $this->theme_id = $theme_id === 0 ? get_current_blog_id() : (int) $theme_id;

        if ( $exporter !== null)
            $this->exporter = $exporter;

        $this->page_list = new PageList( $this->theme_id );

    }


    /**
     * @throws \LogicException
     */
    function export() {

        if ( !$this->exporter ) {
            throw new \LogicException( "Exporter is not set" );
        }

        $iterator = new PageListIterator( $this->page_list );

        while ( $iterator->valid() ) {
            $page      = $iterator->current();
            $page_json = get_post_meta( $page->ID, 'page-json', TRUE );
            if ( $page_json !== '' ) {
                $this->exporter->export($this->theme_id, $page->ID, $page_json );
            }
            $iterator->next();
        }

    }

    /**
     * @param ThemeExporterInterface $exporter
     */
    function setExporter( ThemeExporterInterface $exporter ) {

        $this->exporter = $exporter;
    }
} 