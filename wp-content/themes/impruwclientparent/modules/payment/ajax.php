<?php
/**
 * Created by PhpStorm.
 * User: Mahima
 * Date: 7/17/14
 * Time: 5:52 PM
 */


function ajax_get_braintree_plans() {

    $braintree_plans = get_all_plans();

    wp_send_json( array( 'code' => 'OK','data'=>$braintree_plans ) );
}

add_action( 'wp_ajax_get-braintree-plans', 'ajax_get_braintree_plans' );


function ajax_read_braintreeplan() {

    $plan_id = $_REQUEST['plan_id'];

    $plan= get_plan_by_id( $plan_id );

    wp_send_json( array( 'code' => 'OK','data'=>$plan ) );
}

add_action( 'wp_ajax_read-braintreeplan', 'ajax_read_braintreeplan' );