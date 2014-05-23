<?php
/**
 * Created by PhpStorm.
 * User: dhiraj
 * Date: 15/5/14
 * Time: 12:35 PM
 */

namespace tests;


class ThemeCssComplierTest extends \WP_UnitTestCase {

    public function test_convertColorSetArray() {


        $set_color = array(
            array(
                'name'         => 'Default',
                'primary1'     => array(
                    'color'   => '#07669E',
                    'title'   => 'dsdsds',
                    'tooltip' => 'sdasdas'
                ),
                'secondary1'   => array(
                    'color'   => '#555555',
                    'title'   => 'dsdsds',
                    'tooltip' => 'sdasdas'
                ),
                'tertiary1'    => array(
                    'color'   => '#F2F2F2',
                    'title'   => 'dsdsds',
                    'tooltip' => 'sdasdas'
                ),
                'text-color'   => array(
                    'color'   => '#989898',
                    'title'   => 'dsdsds',
                    'tooltip' => 'sdasdas'
                ),
                'button-color' => array(
                    'color'   => '#07669E',
                    'title'   => 'dsdsds',
                    'tooltip' => 'sdasdas'
                )
            ),
            array(
                'name'         => 'Summer Heat',
                'primary1'     => array(
                    'color'   => '#DC3D24',
                    'title'   => 'dsdsds',
                    'tooltip' => 'sdasdas'
                ),
                'secondary1'   => array(
                    'color'   => '#232B2B',
                    'title'   => 'dsdsds',
                    'tooltip' => 'sdasdas'
                ),
                'tertiary1'    => array(
                    'color'   => '#E3AE57',
                    'title'   => 'dsdsds',
                    'tooltip' => 'sdasdas'
                ),
                'text-color'   => array(
                    'color'   => '#989898',
                    'title'   => 'dsdsds',
                    'tooltip' => 'sdasdas'
                ),
                'button-color' => array(
                    'color'   => '#DC3D24',
                    'title'   => 'dsdsds',
                    'tooltip' => 'sdasdas'
                )
            ),
            array(
                'name'         => 'Mint Fresh',
                'primary1'     => array(
                    'color'   => '#99CD4E',
                    'title'   => 'dsdsds',
                    'tooltip' => 'sdasdas'
                ),
                'secondary1'   => array(
                    'color'   => '#343434',
                    'title'   => 'dsdsds',
                    'tooltip' => 'sdasdas'
                ),
                'tertiary1'    => array(
                    'color'   => '#E1E1E1',
                    'title'   => 'dsdsds',
                    'tooltip' => 'sdasdas'
                ),
                'text-color'   => array(
                    'color'   => '#989898',
                    'title'   => 'dsdsds',
                    'tooltip' => 'sdasdas'
                ),
                'button-color' => array(
                    'color'   => '#DC3D24',
                    'title'   => 'dsdsds',
                    'tooltip' => 'sdasdas'
                )
            )
        );
        $output    = array(
            array(
                'name'         => 'Default',
                'primary1'     => '#07669E',
                'secondary1'   => '#555555',
                'tertiary1'    => '#F2F2F2',
                'text-color'   => '#989898',
                'button-color' => '#07669E'
            ),
            array(
                'name'         => 'Summer Heat',
                'primary1'     => '#DC3D24',
                'secondary1'   => '#232B2B',
                'tertiary1'    => '#E3AE57',
                'text-color'   => '#989898',
                'button-color' => '#DC3D24'
            ),
            array(
                'name'         => 'Mint Fresh',
                'primary1'     => '#99CD4E',
                'secondary1'   => '#343434',
                'tertiary1'    => '#E1E1E1',
                'text-color'   => '#989898',
                'button-color' => '#DC3D24'
            )
        );

        $this->assertEquals($output, convert_themecolor_set_to_array($set_color));

    }

}