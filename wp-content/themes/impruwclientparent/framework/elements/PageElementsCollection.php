<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 23/06/14
 * Time: 10:38 PM
 */

namespace framework\elements;


class PageElementsCollection extends AbstractElementsCollection {

    private $page_id;

    /**
     * @param $page_id
     */
    function __construct( $page_id ) {

        $this->page_id = (int) $page_id;
        $this->get_elements();
    }

    protected function get_elements() {

        $skeleton_json = get_post_meta( $this->page_id, 'page-json', TRUE );
        $this->generate_elements_tree( $skeleton_json );
    }

}