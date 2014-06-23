<?php

/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 23/06/14
 * Time: 5:48 PM
 */

namespace framework\pages;

class Page{

    private $ID;

    private $post_title;

    private $post_description;

    private $page_template;

    private $page_fetcher;

    /**
     * @param $page_id
     */
    public function __construct( $page_id ) {

        $this->ID = $page_id;
        $this->page_fetcher = new framework\PageFetcher( $page_id );
        $data               = $this->page_fetcher->fetch();
        $this->format( $data );
    }

    public function format( $data ) {

        $this->post_title       = $data[ 'post_title' ];
        $this->post_description = $data[ 'post_description' ];
        $this->page_template    = $data[ 'page_template' ];
    }

} 