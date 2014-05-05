<?php

    require_once '../../../../../bootstrap.php';

    class SiteFunctionsTest extends WP_UnitTestCase
    {

        public function testGetSiteDomain()
        {

            $this->assertEquals('localhost', get_site_domain(13));
        }

    }
