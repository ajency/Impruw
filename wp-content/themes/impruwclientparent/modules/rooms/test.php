<?php

require_once '../../../../../testbootstrap.php';
require_once '../../functions.php';

class RoomsFunctionsTest extends WP_UnitTestCase{

    /**
     */
    public function testPostTypeExists(){
        $this->assertEquals(true, post_type_exists('impruw_room'));
    }

    public function testGetStyles(){

        $this->assertEquals(array(), get_styles('Address'));

    }

}
