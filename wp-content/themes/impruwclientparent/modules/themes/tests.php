<?php

    require_once '../../../../../bootstrap.php';

    class ThemeFunctionsTest extends WP_UnitTestCase
    {

        public function testget_theme_image_url()
        {
            $this->assertEquals(FALSE, get_theme_image_url(9));
            $this->assertEquals(FALSE, get_theme_image_url(19));
        }

    }
