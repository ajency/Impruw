<?php

require_once '../../../../../testbootstrap.php';


class ThemeFunctionsTest extends WP_UnitTestCase{
    
    public function testget_theme_image_url() {
        $this->assertEquals(false, get_theme_image_url(9));    
        $this->assertEquals(false, get_theme_image_url(19));
        
    }	

   
}