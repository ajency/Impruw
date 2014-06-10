<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 30/05/14
 * Time: 6:04 PM
 */

namespace tests;


class GetPageJsonTest extends \WP_UnitTestCase {

    public function setUp() {

        parent::setUp();

        $element_json = array( array( "element" => 'Menu', "meta_id" => 23 ),
            array( "element" => 'Gallery', "meta_id" => 233 ) );

        // create a published page
        $this->published_page = $this->factory->post->create_and_get( array( 'post_type' => 'page' ) );
        update_post_meta( $this->published_page->ID, "page-json", $element_json );

        // create a published page
        $element_json [ ] = array( "element" => 'Menu', "meta_id" => 63 );
        update_page_autosave( $this->published_page->ID, $element_json );

    }

    public function test_get_page_json_for_published_page() {

        $elements = get_page_content_json( $this->published_page->ID, FALSE );
        $this->assertEquals( 2, count( $elements ) );
    }

    public function test_get_page_json_autosave_page() {

        $elements = get_page_content_json( $this->published_page->ID, TRUE );
        $this->assertEquals( 3, count( $elements ) );
        $this->assertEquals( 63, $elements[ 2 ][ 'meta_id' ] );
    }

}

