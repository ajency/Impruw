<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 23/06/14
 * Time: 6:12 PM
 */

namespace framework\pages;

class PageList implements \Countable {

    public $pages;

    /**
     * @param int   $site_id the site_id to get pages from
     * @param array $args    Same arguments for get_page()
     */
    public function __construct( $args = array() ) {

        $args[ 'post_type' ]      = 'page';
        $args[ 'posts_per_page' ] = -1;
        $args[ 'post_status' ]    = 'publish';

        $this->pages = get_pages( $args );

    }

    public function get_page( $page_to_get ) {

        if ( (int) $page_to_get <= $this->count() ) {
            return $this->pages[ $page_to_get ];
        }

        return null;
    }

    public function add_page( Page $page ) {

        $this->pages[ ] = $page;

        return $this->count();
    }

    public function remove_page( Page $page_to_remove ) {

        if ( isset( $this->pages[ $page_to_remove ] ) )
            unset( $this->pages[ $page_to_remove ] );

        return $this->count();
    }

    public function count() {

        return count( $this->pages );
    }
}
