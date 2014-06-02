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

        // create a published page
        $this->published_page = $this->factory->post->create_and_get( array( 'post_type' => 'page' ) );
        update_post_meta( $this->published_page->ID, "page-json", array( array("element" => 'Menu', "meta_id" => 23),
                                                                   array("element" => 'Gallery', "meta_id" => 233)
        ));

        // create a autosave page
        $this->autosave_page_id = wp_create_post_autosave(array('post_ID' => $this->published_page->ID));
        update_post_meta($this->autosave_page_id, "page-json", array(
                                                                array("element" => 'Menu', "meta_id" => 23),
                                                                array("element" => 'Gallery', "meta_id" => 233),
                                                                array("element" => 'Gallery', "meta_id" => 533)
        ));

    }

    public function test_get_page_json_for_published_page() {

        $elements = get_page_json($this->autosave_page_id, "page-json", true);
        $this->assertEquals(count($elements), 3);
        $elements = get_post_meta($this->published_page->ID, "page-json", true);
        $this->assertEquals(count($elements), 2);
    }
}