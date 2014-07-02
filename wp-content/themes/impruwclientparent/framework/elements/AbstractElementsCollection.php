<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 23/06/14
 * Time: 10:39 PM
 */

namespace framework\elements;


abstract class AbstractElementsCollection {

    protected $elements = array();

    public function get_elements_collection() {

        return $this->elements;
    }

    protected function generate_elements_tree( $skeleton_json ) {

        if ( !is_array( $skeleton_json ) ) {

            $this->elements = array();

            return;
        }

        $elements_filler = new ElementsCollectionFiller( $skeleton_json );
        $this->elements  = $elements_filler->get_elements();
    }

    abstract protected function get_elements();

}