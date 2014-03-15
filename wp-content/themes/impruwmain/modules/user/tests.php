<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class UserFunctionsTest extends WP_UnitTestCase
{
    public function testSanitizeUsername()
    {
        $this->assertEquals('suraj_air', sanitize_username('suraj air'));
    }
}