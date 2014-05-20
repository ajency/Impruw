<?php
/**
 * Created by PhpStorm.
 * User: dhiraj
 * Date: 20/5/14
 * Time: 10:22 AM
 */

namespace tests;


class GetPageAutoSaveJson extends \WP_UnitTestCase{

    public function setUp(){
        parent::setUp();

        $page_id = $this->factory->post->create(array('post_type'=>'page'));
        update_post_meta($page_id,'page-json',array('test'=>'test'));
    }

    public function get_page_autosave_json(){
        $output = Array (
                            '0' => Array
                                (
                                    'element' => 'ContactForm',
                                    'meta_id' => 147
                                )

                        ) ;

        $this->assertEquals($output,get_page_auto_save_json(84));
    }

} 