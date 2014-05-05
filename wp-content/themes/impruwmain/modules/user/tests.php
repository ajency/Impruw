<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once '../../../../../bootstrap.php';

class UserFunctionsTest extends WP_UnitTestCase {

    /**
     * @group userHelper
     */
    public function testSanitizeUsername() {
        $this->assertEquals('suraj_air', sanitize_username('Suraj Air'));
    }

    public function testSetupUserMeta() {
        $user_meta = array('language' => 'nb_NO');
        //$this->assertEquals(true, set_user_meta(1, $user_meta));
    }

    public function inputNames() {
        return array(
            array('Suraj', 'Air', 'Suraj Air'),
            array('Suraj', 'Air', 'Suraj Krishna Air '),
        );
    }

    /**
     * @dataProvider inputNames
     * @group userHelper
     */
    public function testUserFirstLastName($first, $last, $name) {
        $this->assertEquals($first, strip_user_first_name($name));
        $this->assertEquals($last, strip_user_last_name($name));
    }

    public function testCreateNewUser() {
        $num = rand(00, 100);
        $user_data = array('user_email' => 'email' . $num . '@mailinator.com',
            'display_name' => 'New User' . $num,
            'user_pass' => 'user');

        //$this->assertInternalType('integer', create_new_user($user_data));
    }

    public function tearDown() {
        
    }

}
