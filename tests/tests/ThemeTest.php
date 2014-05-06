<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 06/05/14
 * Time: 9:50 AM
 */

namespace tests;
use framework;
use framework\Theme;

class ThemeTest extends \WP_UnitTestCase
{

    public function test_theme_switch()
    {
        Theme::assign_new_theme('blue-bold');
        $this->assertEquals('blue-bold', get_option( 'current_theme' ));

    }
}