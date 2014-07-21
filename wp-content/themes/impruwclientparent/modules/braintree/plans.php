<?php
/**
 * Created by PhpStorm.
 * User: Mahima
 * Date: 7/17/14
 * Time: 5:48 PM
 */


/**
 * Function to get all the plans data
 *
 * @return array of plans data
 */
function get_all_plans() {

    $braintree_plan = array();

    $plans = Braintree_Plan::all();

    foreach ( $plans as $key => $plan ) {

        $braintree_plan[ $key ][ 'plan_id' ] = $plan->id;
        $braintree_plan[ $key ][ 'plan_name' ] = $plan->name;
        $braintree_plan[ $key ][ 'description' ] = $plan->description;
        $braintree_plan[ $key ][ 'price' ] = $plan->price;

    }

    return $braintree_plan;
}


/**
 * Function to get the plan details based on the plan id
 * @param $plan_id
 * @return mixed
 */
function get_plan_by_id( $plan_id ) {

    $plans = Braintree_Plan::all();

    foreach ( $plans as $plan ) {
        if($plan->id == $plan_id ){
            $braintree_plan[ 'plan_id' ] = $plan->id;
            $braintree_plan[ 'plan_name' ] = $plan->name;
            $braintree_plan[ 'description' ] = $plan->description;
            $braintree_plan[ 'price' ] = $plan->price;
        }
    }
    return $braintree_plan;
}