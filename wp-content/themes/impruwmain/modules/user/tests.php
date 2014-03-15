<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once '../../../../../testbootstrap.php';


class UserFunctionsTest extends WP_UnitTestCase{
    
    public function testSanitizeUsername(){
        $this->assertEquals('suraj_air_rt', sanitize_username('suraj air % rt'));
    }
    
    public function testCreateNewUser(){
        $num = rand(00, 100);
        $user_data = array( 'user_email'    => 'email'. $num . '@mailinator.com',
                            'display_name'  => 'New User'. $num,
                            'user_pass'     => 'user');
        
        $this->assertInternalType('integer', create_new_user($user_data));
        
    }
}