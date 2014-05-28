<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 28/05/14
 * Time: 10:28 AM
 */

namespace tests;


class ThemeSwitchTests extends \WP_UnitTestCase {

    public function setUp(){

        parent::setUp();
        global $blog_id;
        $blog_id = 478;
        check_create_less_resource_folder();
        $this->css_file_path = get_compiled_stylesheet_directory_path() . "/theme-style.css";
        $this->file = fopen($this->css_file_path, "w");

        //update option
        update_option("current_color_set", "some_choosed_color");
    }

    public function tearDown(){
        parent::tearDown();
        fclose($this->file);
        // FIXME: Remove folder after test. Not working
        //unlink(ABSPATH . 'wp-content/site-resources/' . get_current_blog_id(). '/');
    }

    public function test_clear_compile_stylesheet() {

        clear_compile_stylesheet();

        $this->assertEquals( FALSE, file_exists( $this->css_file_path ) );
    }

    public function test_if_color_set_is_reset_to_default(){
        reset_colorset_option_to_default();
        $this->assertEquals("default", get_option("current_color_set"));
    }
}