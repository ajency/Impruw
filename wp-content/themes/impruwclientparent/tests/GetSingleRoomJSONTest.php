<?php

namespace tests;

class GetSingleRoomJSONTest extends \WP_UnitTestCase {

    public function setUp() {

        parent::setUp();

        $element_json = array( array( "element" => 'Menu', "meta_id" => 23 ),
            array( "element" => 'Gallery', "meta_id" => 233 ) );

        // create a published page
        $this->singleroom_page = $this->factory->post->create_and_get( array( 'post_type'  => 'page',
                                                                              'post_title' => 'Single Room' ) );

        update_post_meta( $this->singleroom_page->ID, "page-json", $element_json );


        // create a published page
        $element_json [ ] = array( "element" => 'Menu', "meta_id" => 63 );
        update_page_autosave( $this->singleroom_page->ID, $element_json );

        // create a published page
        $this->room = $this->factory->post->create_and_get( array( 'post_type' => 'impruw_room' ) );

    }

    public function test_single_room_published_page_json() {

        $elements = get_single_room_page_content_json( FALSE );
        $this->assertEquals( 2, count( $elements ) );
    }

    public function test_single_room_autosave_page_json() {

        $elements = get_single_room_page_content_json( TRUE );
        $this->assertEquals( 3, count( $elements ) );
    }
}