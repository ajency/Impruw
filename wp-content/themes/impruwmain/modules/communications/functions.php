<?php
/**
 * Created by PhpStorm.
 * User: Godfrey
 * Date: 13/10/14
 * Time: 6:12 PM
 */

require_once 'new_blog/functions.php';


/*
 * Configuring the communication module
 */

//Registering communication components
function impruw_add_communication_components($defined_comm_components){

    $comm_arr = array(
        'registration_email_admin',
        'registration_email_user'
    );

    $ajcm_components['impruw_user'] = $comm_arr;

    return $ajcm_components;

}
add_filter('add_commponents_filter','impruw_add_communication_components',10,1);

