<?php
    /**
     * Created by PhpStorm.
     * User: dhiraj
     * Date: 15/5/14
     * Time: 12:35 PM
     */

    namespace tests;


    class ThemeCssComplierTest extends \WP_UnitTestCase
    {
        public function test_convertColorSetArray(){

            $array =  array(
                    'name' => 'Default',
                    'primary1' => array(
                        'color' => '#07669E',
                        'title' => 'dsdsds',
                        'tooltip' => 'sdasdas'
                    ),
                    'secondary1' => array(
                        'color' => '#555555',
                        'title' => 'dsdsds',
                        'tooltip' => 'sdasdas'
                    ),
                    'tertiary1' => array(
                        'color' => '#F2F2F2',
                        'title' => 'dsdsds',
                        'tooltip' => 'sdasdas'
                    ),
                    'text-color' => array(
                        'color' => '#989898',
                        'title' => 'dsdsds',
                        'tooltip' => 'sdasdas'
                    ),
                    'button-color' => array(
                        'color' => '#07669E',
                        'title' => 'dsdsds',
                        'tooltip' => 'sdasdas'
                    )
            );

            $this->assertEquals(array(
                                'primary1' => '#07669E',
                                'secondary1' => '#555555',
                                'tertiary1' => '#F2F2F2',
                                'text-color' => '#989898',
                                'button-color' => '#07669E'), convert_themecolor_set_to_array($array));



        }
    }