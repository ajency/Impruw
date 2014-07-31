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

    if ( $subscription_id == "ImpruwFree" || $subscription_id == null ) {
        $subscription_data = getFreeSubscriptionData( $subscription_id );
    } else {
        $subscription_data = get_subscription_details( $subscription_id );
    }


    wp_send_json( array( 'code' => 'OK', 'data' => $subscription_data ) );
}

add_action( 'wp_ajax_read-braintreesubscription', 'ajax_read_braintreesubscription' );


/**
 * Function to get get trasaction data
 */

function ajax_read_braintreetransaction() {

    $braintree_customer_id = $_REQUEST[ 'customerID' ];

    $transaction_id_array = get_transaction_id_for_customer( $braintree_customer_id );

    if ( empty( $transaction_id_array ) )
        wp_send_json( array( 'code' => 'OK', 'data' => array() ) );

    $transaction_details = get_transaction_details( $transaction_id_array );

    $transaction_data = get_plan_details_for_transaction( $transaction_details );

    wp_send_json( array( 'code' => 'OK', 'data' => $transaction_data ) );

}

add_action( 'wp_ajax_fetch-braintreetransaction', 'ajax_read_braintreetransaction' );

/**
 * Function to get credit card details of user
 */
function ajax_read_creditcard() {

    $customer_id = $_REQUEST[ 'customer_id' ];

    if ( empty( $customer_id ) ) {
        $credit_card_data = array( 'card_exists' => false );
    } else {
        $credit_card_data = get_customer_credit_card_details( $customer_id );
    }

    $credit_card_data[ 'braintree_client_token' ] = generate_client_token();

    wp_send_json( array( 'code' => 'OK', 'data' => $credit_card_data ) );
}

add_action( 'wp_ajax_read-creditcard', 'ajax_read_creditcard' );

/**
 * Function to make payment
 */
function ajax_make_payment() {
    $selected_plan_id = $_POST[ 'selectedPlanId' ];

    $current_user = wp_get_current_user();
    $user_name = $current_user->display_name;

    $customer_array = array(
        'payment_method_nonce' => $_POST[ 'paymentMethodNonce' ],
        'user_name' => $user_name );

    // create the  user with credit card
    $customer = create_customer_with_card( $customer_array );
    if ( $customer[ 'code' ] == 'ERROR' )
        wp_send_json( array( 'code' => 'ERROR', 'msg' => $customer[ 'msg' ] ) );

    //update braintree customer id
    update_option( 'braintree-customer-id', $customer[ 'customer_id' ] );

    //create subscription in braintree
    $subscription = create_subscription_in_braintree( $customer[ 'credit_card_token' ], $selected_plan_id );
    if ( $subscription[ 'code' ] == 'ERROR' )
        wp_send_json( array( 'code' => 'ERROR', 'msg' => $subscription[ 'msg' ] ) );

    update_option( 'braintree-subscription', $subscription[ 'subscription_id' ] );

    wp_send_json( array( 'code' => 'OK' ) );
}

add_action( 'wp_ajax_make-payment', 'ajax_make_payment' );


function ajax_stored_payment() {

    $selected_plan_id = $_POST[ 'selectedPlanId' ];
    echo $payment_method_nonce = $_POST[ 'cardToken' ];
    $current_subscription_id = $_POST[ 'currentSubscriptionId' ];

//    if ( $current_subscription_id == null || $current_subscription_id == "ImpruwFree" ) {
//
//        $subscription = create_subscription_in_braintree( $payment_method_nonce, $selected_plan_id );
//        if ( $subscription[ 'code' ] == 'ERROR' )
//            wp_send_json( array( 'code' => 'ERROR', 'msg' => $subscription[ 'msg' ] ) );
//        else
//            $new_subscription_id = $subscription[ 'subscription_id' ];
//
//    } else {
//
//        $pending_subscription = create_pending_subscription( $payment_method_nonce, $selected_plan_id, $current_subscription_id );
//        if ( $pending_subscription[ 'code' ] == 'ERROR' )
//            wp_send_json( array( 'code' => 'ERROR', 'msg' => $pending_subscription[ 'msg' ] ) );
//        else
//            $new_subscription_id = $pending_subscription[ 'subscription_id' ];
//    }
//
//    update_option( 'braintree-subscription', $new_subscription_id );

    wp_send_json( array( 'code' => 'OK'));
}

add_action( 'wp_ajax_payment-with-stored-card', 'ajax_stored_payment' );

