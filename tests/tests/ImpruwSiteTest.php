<?php

class ImpruwSiteTest extends WP_UnitTestCase{

    public function test_impruw_site_domain(){
        $this->assertEquals('http://impruw.com', site_url());
    }

}