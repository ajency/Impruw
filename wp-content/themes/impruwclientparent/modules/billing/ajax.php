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
 * Function to get get trasaction data for purchase history
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

    $card_token = $_REQUEST[ 'token' ];

    $credit_card_data = get_credit_card_details_by_token( $card_token );

    if ( $credit_card_data[ 'code' ] == 'ERROR' )
        wp_send_json( array( 'code' => 'ERROR', 'msg' => $credit_card_data[ 'msg' ] ) );


    wp_send_json( array( 'code' => 'OK', 'data' => $credit_card_data[ 'credit_card_details' ] ) );
}

add_action( 'wp_ajax_read-creditcard', 'ajax_read_creditcard' );


/**
 * Function to get all credit card details of user
 */
function ajax_get_credit_cards() {

    $customer_id = $_REQUEST[ 'customerId' ];

    if ( empty( $customer_id ) ) {
        $credit_card_data = array( 'card_exists' => false,
            'customer_id' => $customer_id,
            'braintree_client_token' => generate_client_token() );
    } else {
        $credit_card_data = get_customer_credit_card_details( $customer_id );
    }

    wp_send_json( array( 'code' => 'OK', 'data' => $credit_card_data ) );
}

add_action( 'wp_ajax_get-credit-cards', 'ajax_get_credit_cards' );

/**
 * Function to make payment  using a  new card
 */
function ajax_new_card_payment() {

    //get $_POST data
    $selected_plan_id = $_POST[ 'selectedPlanId' ];
    $payment_method_nonce = $_POST[ 'paymentMethodNonce' ];
    $customer_id = $_POST[ 'customerId' ];
    $current_subscription_id = $_POST[ 'currentSubscriptionId' ];
    unset( $_POST[ 'action' ] );

    // if no customer is created in braintree
    if ( empty( $customer_id ) ) {

        $customer = create_customer_with_credit_card( $payment_method_nonce );

        if ( $customer[ 'code' ] == 'ERROR' )
            wp_send_json( array( 'code' => 'ERROR', 'msg' => $customer[ 'msg' ] ) );

        $card_token = $customer[ 'card_token' ];

    } else {
        $create_card = add_new_credit_card_to_customer( $customer_id, $payment_method_nonce );

        if ( $create_card[ 'code' ] == 'ERROR' )
            wp_send_json( array( 'code' => 'ERROR', 'msg' => $create_card[ 'msg' ] ) );

        $card_token = $create_card[ 'credit_card_token' ];
    }

    if ( $current_subscription_id == "ImpruwFree" || $current_subscription_id == null  ) {

        //create new  subscription in braintree
        $subscription = create_subscription_in_braintree( $card_token, $selected_plan_id );
        if ( $subscription[ 'code' ] == 'ERROR' )
            wp_send_json( array( 'code' => 'ERROR', 'msg' => $subscription[ 'msg' ] ) );

        update_option( 'braintree-subscription', $subscription[ 'subscription_id' ] );


    } else {

        $pending_subscription = create_pending_subscription( $card_token, $selected_plan_id, $current_subscription_id );
        if ( $pending_subscription[ 'code' ] == 'ERROR' )
            wp_send_json( array( 'code' => 'ERROR', 'msg' => $pending_subscription[ 'msg' ] ) );


    }

    wp_send_json( array( 'code' => 'OK' ) );
}

add_action( 'wp_ajax_new-card-payment', 'ajax_new_card_payment' );

/**
 * Function to make a payment using stored credit card
 */
function ajax_stored_payment() {

    $selected_plan_id = $_POST[ 'selectedPlanId' ];
    $credit_card_token = $_POST[ 'cardToken' ];
    $current_subscription_id = $_POST[ 'currentSubscriptionId' ];

    if ( $current_subscription_id == null || $current_subscription_id == "ImpruwFree" ) {

        $subscription = create_subscription_in_braintree( $credit_card_token, $selected_plan_id );
        if ( $subscription[ 'code' ] == 'ERROR' )
            wp_send_json( array( 'code' => 'ERROR', 'msg' => $subscription[ 'msg' ] ) );
        else
            update_option( 'braintree-subscription', $subscription[ 'subscription_id' ] );

    } else {
        $pending_subscription = create_pending_subscription( $credit_card_token, $selected_plan_id, $current_subscription_id );
        if ( $pending_subscription[ 'code' ] == 'ERROR' )
            wp_send_json( array( 'code' => 'ERROR', 'msg' => $pending_subscription[ 'msg' ] ) );
    }


    wp_send_json( array( 'code' => 'OK' ) );
}

add_action( 'wp_ajax_payment-with-stored-card', 'ajax_stored_payment' );


function ajax_switch_to_free_plan() {

    $cancel_date = $_POST[ 'cancelDate' ];
    $current_subscription_id = $_POST[ 'currentSubscriptionId' ];
//    $subscription_status = $_POST[ 'status' ];
    $subscription_type = $_POST[ 'subscriptionType' ];

    if ( $subscription_type == "Yearly" ) {
        $subtract_year = date( 'Y-m-d', ( strtotime( '-1 year', strtotime( $cancel_date ) ) ) );
        $cancel_date = date( "Y-m-t", strtotime( $subtract_year ) );
    }

    //take the day before the billing start day in case of  pending subscription
//    if ( $subscription_status == "Pending" ) {
//        $cancel_date = date( 'Y-m-d', ( strtotime( '-1 day', strtotime( $cancel_date ) ) ) );
//    }

    delete_previous_subscription( $current_subscription_id );

    create_cancelled_subscription_in_db( $current_subscription_id, 'ImpruwFree', $cancel_date );

    wp_send_json( array( 'code' => 'OK' ) );

}

add_action( 'wp_ajax_change-to-free-plan', 'ajax_switch_to_free_plan' );


function ajax_get_pending_subscription() {

    $old_subscription_id = $_REQUEST[ 'old_subscription_id' ];

    $pending_subscription = get_pending_subscription_details( $old_subscription_id );

    wp_send_json( array( 'code' => 'OK', 'data' => $pending_subscription ) );
}

add_action( 'wp_ajax_get-pending-subscription', 'ajax_get_pending_subscription' );


function ajax_create_customer_with_card() {

    $customer = create_customer_with_credit_card( $_POST[ 'paymentMethodNonce' ] );
    if ( $customer[ 'code' ] == 'ERROR' )
        wp_send_json( array( 'code' => 'ERROR', 'msg' => $customer[ 'msg' ] ) );

    wp_send_json( array( 'code' => 'OK' ) );

}

add_action( 'wp_ajax_create-customer-with-card', 'ajax_create_customer_with_card' );


function ajax_get_customer_billing_address() {

    $braintree_customer_id = $_REQUEST[ 'customerId' ];


    if ( empty( $braintree_customer_id ) )
        wp_send_json( array( 'code' => 'OK', 'data' => array( 'address_exists' => false ) ) );

    $billing_address = get_customer_address( $braintree_customer_id );

    if ( empty( $billing_address ) )
        $billing_address = array( 'address_exists' => false );

    wp_send_json( array( 'code' => 'OK', 'data' => $billing_address ) );

}

add_action( 'wp_ajax_read-billingaddress', 'ajax_get_customer_billing_address' );


function ajax_get_update_billingaddress() {

    $address_data = $_POST;

    unset( $address_data[ 'action' ] );

    $address_data = array_filter( $address_data );

    if ( $_POST[ 'address_exists' ] == 'false' ) {

        unset( $address_data[ 'address_exists' ] );
        $billing_address_created = create_customer_billing_address( $address_data );

        if ( $billing_address_created[ 'code' ] == "ERROR" )
            wp_send_json( array( 'code' => 'ERROR', 'msg' => $billing_address_created[ 'msg' ] ) );

        $address_data[ 'address_exists' ] = true;

    } else {

        unset( $address_data[ 'address_exists' ] );
        $update_address = update_customer_billing_address( $address_data );

        if ( $update_address[ 'code' ] == "ERROR" )
            wp_send_json( array( 'code' => 'ERROR', 'msg' => $update_address[ 'msg' ] ) );

        $address_data[ 'address_exists' ] = true;
    }


    wp_send_json( array( 'code' => 'OK', 'data' => $address_data ) );

}

add_action( 'wp_ajax_update-billingaddress', 'ajax_get_update_billingaddress' );


