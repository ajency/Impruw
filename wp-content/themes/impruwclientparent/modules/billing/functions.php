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
    $subscription_data[ 'plan_id' ] = 'hn62';
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

function get_transaction_id_for_customer() {

    global $wpdb;

    $table_name = $wpdb->prefix . 'braintree_transaction';

    $sql = "SELECT transaction_id FROM $table_name";

    $bookings = $wpdb->get_results( $sql, ARRAY_A );

    return $bookings;
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