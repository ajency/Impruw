<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once '../../../../../testbootstrap.php';


class SiteFunctionsTest extends WP_UnitTestCase{
    
    public function testDomainPath(){
        //$this->assertEquals('new.impruw', get_site_path('new'));
        $this->assertEquals('/impruw/new/', get_site_path('new'));
    }
    
    public function testDomain(){
        //$this->assertEquals('new.impruw', get_site_path('new'));
        $this->assertEquals('localhost', get_site_domain('new'));
    }
    
    public function testSiteCreation() {
        $this->site_id = create_new_site('testsite'. rand(00, 99), 13);
        $this->assertInternalType('integer', $this->site_id );
    }
    
//    public function testDeleteBlog() {
//        handle_site_deletion(19, true);
//    }

    
}