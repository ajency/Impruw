<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 24/06/14
 * Time: 5:25 PM
 */

namespace framework\elements;


class HeaderFooterElementsCollection extends AbstractElementsCollection {

    private $section;

    /**
     * @param String $section
     */
    function __construct( $section ) {

        if ( !in_array( $section, array( 'theme-header', 'theme-footer' ) ) )
            throw new \ErrorException( 'Invalid section passed' );

        $this->section = $section;

        $this->get_elements();
    }

    /**
     *
     */
    protected function get_elements() {

        $skeleton_json = get_option( $this->section );
        $this->generate_elements_tree( $skeleton_json );
    }

} 