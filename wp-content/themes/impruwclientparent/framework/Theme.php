<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 06/05/14
 * Time: 10:00 AM
 */

namespace framework;


class Theme {

    public static function assign_new_theme($theme_name){

        update_option('current_theme', 'blue-bold');
        return true;
    }
} 