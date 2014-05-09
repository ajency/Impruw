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
            $this->factory->post->create_many(25);

            $this->assertEquals(25, count(get_posts('posts_per_page=-1')));
        }

        public function test_theme_css_locator()
        {

        }
    }