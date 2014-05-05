<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 05/05/14
 * Time: 7:03 PM
 */

class ElementTest extends WP_UnitTestCase{

    public function setUp(){
        parent::setUp();
        $this->element = new Element(array());
    }

    public function test_element(){
        $this->assertEquals('<h1>My Markup</h1>',$this->element->get_markup_for_h1());
    }

    public function test_something()
    {
        $this->assertEquals(23, 23);
    }

}