<?php
/**
 * Created by PhpStorm.
 * User: Mahima
 * Date: 7/21/14
 * Time: 12:51 PM
 */

/**
 * Function to return free subscription data
 * @return mixed
 */
function getFreeSubscriptionData() {

    $subscription_data[ 'subscription_id' ] = "ImpruwFree";
    $subscription_data[ 'subscription_type' ] = "N/A";
    $subscription_data[ 'plan_name' ] = 'Free';
    $subscription_data[ 'plan_id' ] = 'hn62';
    $subscription_data[ 'price' ] = '0';
    $subscription_data[ 'bill_start' ] = 'N/A';
    $subscription_data[ 'bill_end' ] = 'N/A';

    return $subscription_data;

}
