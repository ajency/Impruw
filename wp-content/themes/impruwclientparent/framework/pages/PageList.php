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

        $this->pages = get_posts( array( 'post_type' => 'page',
                                      'posts_per_page' => -1,
                                      'post_status' => 'publish',
                                      'meta_query' => array(
                                          array(
                                              'key' => 'impruw_page_template',
                                              'value' => array( 'home', 'about-us', 'single-room', 'contact-us', 'rooms',
                                                  'gallery' ),
                                              'compare' => 'IN'
                                          )
                                      )
        ) );

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
