<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 02/06/14
 * Time: 4:15 PM
 */

namespace tests\ajax;


class GetPageJsonAjaxTest extends \WP_Ajax_UnitTestCase {

    public function setUp() {

        parent::setUp();

        $this->user_id = $this->factory->user->create( array( 'role' => 'administrator' ) );
        wp_set_current_user( $this->user_id );

        $this->_page = $this->factory->post->create_and_get( array( 'post_type' => 'page', 'post_title' => 'About Us' ) );

    }

    public function tearDown() {

        parent::tearDown();
        wp_set_current_user( 0 );
    }

    public function test_read_page_json_for_page() {

//        $_GET = array(
//            'action'  => 'read-page-json',
//            'page_id' => $this->_page->ID
//        );
//
//        try {
//            $this->_handleAjax( 'read-page-json' );
//        } catch ( WPAjaxDieContinueException $e ) {
//            unset( $e );
//        }
//
//        $response = json_decode( $this->_last_response, TRUE );
//
//        var_dump( $this->_last_response ); die;
    }

} 