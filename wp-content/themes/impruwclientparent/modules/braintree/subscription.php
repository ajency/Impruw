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

    $plan_data = get_plan_by_id( $subscription->planId );

    $plan_name = $plan_data['plan_name'];
    $plan_description = $plan_data['description'];

    $subscription_data[ 'plan_name' ] = $plan_name;
    $subscription_data[ 'plan_id' ] = $subscription->planId;
    $subscription_data[ 'subscription_id' ] = $subscription_id;
    $subscription_data[ 'subscription_type' ] = $plan_description;
    $subscription_data[ 'price' ] = $subscription->price;
    $subscription_data['start_date'] = get_option('subscription-start-date');

    if ( !empty( $subscription->billingPeriodStartDate ) ||
        !empty( $subscription->billingPeriodEndDate )
    ) {
        $subscription_data[ 'bill_start' ] = $subscription->billingPeriodStartDate->format( 'M d, Y' );
        $subscription_data[ 'bill_end' ] = $subscription->billingPeriodEndDate->format( 'M d, Y' );
    }


    return $subscription_data;
}


/**
 * Function to create a subscription for a user in braintree
 *
 * @param $credit_card_token
 * @param $plan_id
 * @return array containing subscription id on success or error msg on failure
 */
function create_subscription_in_braintree( $credit_card_token, $plan_id ) {

    $create_subscription = Braintree_Subscription::create( array(
        'paymentMethodToken' => $credit_card_token,
        'planId' => $plan_id
    ) );

    if ( $create_subscription->success ) {
        return array( 'code' => 'OK',
            'subscription_id' => $create_subscription->subscription->id,
            'subscription_start_date' => $create_subscription->subscription->billingPeriodStartDate->format( 'M d, Y' ) );

    } else {
        $error_msg = array( code => 'ERROR', 'msg' => $create_subscription->message );
        return $error_msg;
    }
}