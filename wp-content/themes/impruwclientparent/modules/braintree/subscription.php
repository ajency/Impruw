<?php
/**
 * Created by PhpStorm.
 * User: Mahima
 * Date: 7/21/14
 * Time: 1:19 PM
 */


/**
 * Function to get all the subscription details based on the subscription Id
 *
 * @param $subscription_id
 * @return mixed
 */
function get_subscription_details( $subscription_id ) {

    $subscription = Braintree_Subscription::find( $subscription_id );
//
//    $plan_data = get_plan_by_id( $subscription->planId );
//
//    $plan_name = $plan_data->name;
//
//    $subscription_data[ 'plan_name' ] = $plan_name;
//    $subscription_data[ 'plan_id' ] = $subscription->planId;
//    $subscription_data[ 'subscription_id' ] = $subscription_id;
//    $subscription_data[ 'price' ] = $subscription->price;
//    $subscription_data[ 'start_date' ] = $subscription->firstBillingDate->format( 'd/m/Y' );
//
//    if ( !empty( $subscription->billingPeriodStartDate ) ||
//        !empty( $subscription->billingPeriodEndDate )
//    ) {
//        $subscription_data[ 'bill_start' ] = $subscription->billingPeriodStartDate->format( 'd/m/Y' );
//        $subscription_data[ 'bill_end' ] = $subscription->billingPeriodEndDate->format( 'd/m/Y' );
//    }


    return $subscription;
}