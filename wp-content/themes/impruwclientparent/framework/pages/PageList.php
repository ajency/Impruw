<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 23/06/14
 * Time: 6:12 PM
 */

namespace framework\pages;

class PageList implements \Countable {

    public  $pages;

    public function __construct( $theme_id = 0 ) {

        if ( $theme_id === 0 ) {
            $this->pages = get_pages();
        } else {
            switch_to_blog( $theme_id );
            $this->pages = get_pages();
            restore_current_blog();
        }
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
