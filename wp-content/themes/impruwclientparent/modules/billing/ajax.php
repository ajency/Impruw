<?php
/**
 * Created by PhpStorm.
 * User: Mahima
 * Date: 7/17/14
 * Time: 5:52 PM
 */

require "functions.php";

/**
 * Function to get all plans
 */
function ajax_get_braintree_plans() {

    $braintree_plans = get_all_plans();

    wp_send_json( array( 'code' => 'OK', 'data' => $braintree_plans ) );
}

add_action( 'wp_ajax_get-braintree-plans', 'ajax_get_braintree_plans' );

/***
 * Function to get a single plan data
 */
function ajax_read_braintreeplan() {

    $plan_id = $_REQUEST[ 'plan_id' ];

    $plan = get_plan_by_id( $plan_id );

    wp_send_json( array( 'code' => 'OK', 'data' => $plan ) );
}

add_action( 'wp_ajax_read-braintreeplan', 'ajax_read_braintreeplan' );

/**
 * Function to get single subscription details
 */

function ajax_read_braintreesubscription() {

    $subscription_id = $_REQUEST[ 'subscription_id' ];

    if ( $subscription_id == "ImpruwFree" ) {
        $subscription_data = getFreeSubscriptionData();
    } else {
        $subscription_data = get_subscription_details( $subscription_id );
    }


    wp_send_json( array( 'code' => 'OK', 'data' => $subscription_data ) );
}

add_action( 'wp_ajax_read-braintreesubscription', 'ajax_read_braintreesubscription' );

/**
 * Function to get credit card details of user
 */
function ajax_read_creditcard() {

    $customer_id = $_REQUEST[ 'customer_id' ];

    if (empty($customer_id) ) {
       $credit_card_data =  array( 'card_exists' => false );
    } else {
        $subscription_data = 'helloo';
    }

    wp_send_json( array( 'code' => 'OK', 'data' => $credit_card_data ) );
}

add_action( 'wp_ajax_read-creditcard', 'ajax_read_creditcard' );