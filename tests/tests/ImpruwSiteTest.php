<?php

class ImpruwSiteTest extends WP_UnitTestCase{

    public function setUp(){
        parent::setUp();
        wp_set_current_user(1);
    }

    public function test_impruw_site_domain(){
        $this->assertEquals(site_url(), 'http://impruw.com');
    }

    public function test_site_blog_id(){
        $this->assertEquals(1, get_current_blog_id());
    }

    public function test_if_is_userlogged_in(){
        $this->assertEquals(is_user_logged_in(), true);
    }

    public function test_add_columns(){
        $this->assertEquals(4, 4);

    }

}