<?php
/**
 * Created by PhpStorm.
 * User: Godfrey
 * Date: 13/10/14
 * Time: 6:12 PM
 */

require_once 'forgot_password/functions.php';
require_once 'contact_us/functions.php';
require_once 'billing_emails/functions.php';


/*
 * Configuring the communication module
 */

//Registering communication components
function impruw_add_communication_components($defined_comm_components){

    $comm_arr = array(
        'forgot_password',
        'contact_us'
    );

    $ajcm_components['impruw_user'] = $comm_arr;

    $comm_subscription_arr = array(
        'plan_active',
        'subscription_canceled',
        'subscription_charged',
        'subscription_uncharged',
        'subscription_went_past_due'
    );

    $ajcm_components['impruw_billing'] = $comm_subscription_arr;

    return $ajcm_components;

}
add_filter('add_commponents_filter','impruw_add_communication_components',10,1);

