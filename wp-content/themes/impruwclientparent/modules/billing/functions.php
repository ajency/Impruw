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

    if ( $subscription_id == null ):
        $site_data = get_blog_details( get_current_blog_id() );
        $subscription_data[ 'start_date' ] = date( 'M d, Y', strtotime( $site_data->registered ) );

        $subscription_data[ 'subscription_id' ] = null;
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

function create_cancelled_subscription_in_db( $current_subscription_id, $next_bill_date ) {

    global $wpdb;

    $table_name = $wpdb->prefix . 'cancel_subscription';

    $cancel_subscription = array( 'subscription_id' => $current_subscription_id,
        'cancel_date' => $next_bill_date );

    $wpdb->insert( $table_name, $cancel_subscription );

}

function create_pending_subscription( $payment_method_nonce, $selected_plan_id, $current_subscription_id ) {

    $subscription_details = get_subscription_details( $current_subscription_id );
    $next_bill_date = $subscription_details[ 'next_bill_date' ];
    $bill_end_date = $subscription_details[ 'bill_end' ];

    create_cancelled_subscription_in_db( $current_subscription_id, $bill_end_date );

    $pending_subscription = create_pending_subscription_in_braintree( $payment_method_nonce, $selected_plan_id, $next_bill_date );

    if ( $pending_subscription[ 'code' ] == 'ERROR' )
        return array( 'code' => 'ERROR', 'msg' => $pending_subscription[ 'msg' ] );
    else
        return array( 'code' => 'OK','subscription_id' => $pending_subscription[ 'subscription_id' ] );

}