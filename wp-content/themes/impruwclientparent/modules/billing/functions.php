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
function getFreeSubscriptionData( $subscription_id ) {

    $subscription_data[ 'subscription_type' ] = "N/A";
    $subscription_data[ 'plan_name' ] = 'Free';
    $subscription_data[ 'plan_id' ] = 'Free';
    $subscription_data[ 'price' ] = '0';
    $subscription_data[ 'bill_start' ] = 'N/A';
    $subscription_data[ 'bill_end' ] = 'N/A';
    $subscription_data[ 'payment_method_token' ] = '';

    if ( $subscription_id == null ):
        $site_data = get_blog_details( get_current_blog_id() );
        $subscription_data[ 'start_date' ] = date( 'M d, Y', strtotime( $site_data->registered ) );

        $subscription_data[ 'subscription_id' ] = null;
    endif;

    if ( $subscription_id == 'ImpruwFree' ):
        $last_subscription_end_date = get_last_active_subscription();
        $subscription_data[ 'start_date' ] = $last_subscription_end_date;
        $subscription_data[ 'subscription_id' ] = 'ImpruwFree';
    endif;


    return $subscription_data;

}

function get_plan_details_for_transaction( $transaction_details ) {

    foreach ( $transaction_details as $key => $value ) {

        $plan_details = get_plan_by_id( $value[ 'plan_id' ] );

        $transaction[ $key ] = $value;
        $transaction[ $key ][ 'plan_name' ] = $plan_details[ 'plan_name' ];
        $transaction[ $key ][ 'description' ] = $plan_details[ 'description' ];

    }
    return $transaction;
}
//TODO : on cancelling the subscription usig cron update the domain-name option to empty and delete the entry in the domain mapping table
function create_cancelled_subscription_in_db( $current_subscription_id, $new_subscription_id, $bill_end_date ) {

    global $wpdb;

    $cancel_date = date( 'Y-m-d', strtotime( $bill_end_date ) );

    $table_name = $wpdb->prefix . 'cancel_subscription';

    $cancel_subscription = array( 'old_subscription_id' => $current_subscription_id,
        'new_subscription_id' => $new_subscription_id,
        'cancel_date' => $cancel_date,
        'status' => '1' );

    $wpdb->insert( $table_name, $cancel_subscription );

}

function delete_previous_subscription( $current_subscription_id ) {

    global $wpdb;

    $table_name = $wpdb->prefix . 'cancel_subscription';

    $sql = "SELECT * FROM " . $table_name . " WHERE old_subscription_id = %s AND status = '1' ";

    $query_result = $wpdb->get_results( $wpdb->prepare( $sql, $current_subscription_id ), ARRAY_A );

    if ( !empty( $query_result ) ) {

        $new_subscription_id = $query_result[ 0 ][ 'new_subscription_id' ];

        if ( $new_subscription_id != "ImpruwFree" ) {
            $cancel_subscription = cancel_subscription_in_braintree( $new_subscription_id );
            if ( $cancel_subscription[ 'code' ] == "ERROR" )
                wp_send_json( array( 'code' => 'ERROR', 'msg' => $cancel_subscription[ 'msg' ] ) );
        }

        $wpdb->update( $table_name, array( 'status' => '0' ), array( 'new_subscription_id' => $new_subscription_id ) );
    }
}

function create_pending_subscription( $payment_method_token, $selected_plan_id, $current_subscription_id ) {

    $subscription_details = get_subscription_details( $current_subscription_id );
    $subscription_type = $subscription_details[ 'subscription_type' ];
    $next_bill_date = $subscription_details[ 'next_bill_date' ];
    $bill_end_date = $subscription_details[ 'bill_end' ];

    if ($subscription_type == "Yearly"){
        $subtract_year =   date( 'Y-m-d', ( strtotime( '-1 year', strtotime( $bill_end_date ) ) ) );
        $bill_end_date = date("Y-m-t", strtotime($subtract_year));
        $next_bill_date = $bill_end_date;
    }

    $pending_subscription = create_pending_subscription_in_braintree( $payment_method_token, $selected_plan_id, $next_bill_date );

    if ( $pending_subscription[ 'code' ] == 'ERROR' ) {
        return array( 'code' => 'ERROR', 'msg' => $pending_subscription[ 'msg' ] );
    } else {
        delete_previous_subscription( $current_subscription_id );
        create_cancelled_subscription_in_db( $current_subscription_id, $pending_subscription[ 'subscription_id' ], $bill_end_date );
        return array( 'code' => 'OK');
    }

}

function get_last_active_subscription() {

    global $wpdb;

    $table_name = $wpdb->prefix . 'cancel_subscription';

    $sql = "SELECT * FROM " . $table_name . " ORDER BY id DESC LIMIT 0, 1";

    $query_result = $wpdb->get_results( $sql, ARRAY_A );

    $subscription = get_subscription_details( $query_result[ 0 ][ 'old_subscription_id' ] );

    return $subscription[ 'bill_end' ];
}


function  get_pending_subscription_details( $old_subscription_id ) {
    global $wpdb;

    $table_name = $wpdb->prefix . 'cancel_subscription';

    $sql = "SELECT * FROM " . $table_name . " WHERE old_subscription_id = %s AND status = '1' ORDER BY id DESC LIMIT 0, 1";

    $query_result = $wpdb->get_results( $wpdb->prepare( $sql, $old_subscription_id ), ARRAY_A );

    if ( empty( $query_result ) )
        return array( 'pending' => false );

    $new_subscription_id = $query_result[ 0 ][ 'new_subscription_id' ];

    if ( $new_subscription_id == "ImpruwFree" ) {
        $subscription_data = getFreeSubscriptionData( $new_subscription_id );
    } else {
        $subscription_data = get_subscription_details( $new_subscription_id );
    }

    $subscription_data[ 'pending' ] = true;

    return $subscription_data;
}

/**
 * Create a customer in the valut
 * @param $payment_method_nonce
 */
function create_customer_with_credit_card( $payment_method_nonce ) {
    $current_user = wp_get_current_user();
    $user_name = $current_user->display_name;

    $customer_array = array(
        'payment_method_nonce' => $payment_method_nonce,
        'user_name' => $user_name );

    // create the  user with credit card in braintree vault
    $customer = create_customer_with_card( $customer_array );
    if ( $customer[ 'code' ] == 'ERROR' )
        return array( 'code' => 'ERROR', 'msg' => $customer[ 'msg' ] );

    //update braintree customer id
    update_option( 'braintree-customer-id', $customer[ 'customer_id' ] );

    return array( 'code' => 'OK', 'card_token' => $customer[ 'credit_card_token' ] );
}


/***
 * Function to get the liast of all subscription to be cancelled using cron
 */
function get_cancel_subscription_list(){

    global $wpdb;

    $table_name = $wpdb->prefix . 'cancel_subscription';

    $sql = "SELECT * FROM " . $table_name . " WHERE status = '1' AND cancel_date >= CURDATE()";

    $query_result = $wpdb->get_results( $sql, ARRAY_A );

//    echo '<pre>';
//    print_r($query_result);
//
//    $subscription = get_subscription_details( $query_result[ 0 ][ 'old_subscription_id' ] );
//
//    return $subscription[ 'bill_end' ];

}
