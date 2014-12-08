<?php
/**
 * Function to get location dependent currency based on country code
 *
 * @param $country_code 
 * @return $currency_location 
 */

include_once( 'braintree-config.php' );

function aj_braintree_currency_location($country_code){
	global $wpdb;
	$currency_location = "";

	$table_name = $wpdb->base_prefix.'aj_braintree_countries';

	$get_all_countries_query = "SELECT * FROM ".$table_name;

    $country_rows = $wpdb->get_results( $get_all_countries_query, ARRAY_A );

 	// $wpdb->show_errors(); 
	// $wpdb->print_error();

	foreach ($country_rows as $country_row) {
		$countries = maybe_unserialize($country_row['country']);
		if (in_array($country_code, $countries)){
			$currency_location =  $country_row['id'];
		}
	}

	return $currency_location;
}


/**
 * Function to get a braintree plan based on braintree plan id
 *
 * @param string $braintree_plan_id. 
 * @return object $braintree_plan. 
 */
function aj_braintree_get_plan($braintree_plan_id){

    $plans = Braintree_Plan::all();

    foreach ( $plans as $plan ) {
        if($plan->id == $braintree_plan_id ){
        	return $plan;
            break;
        }

    }

}

/**
 * Function to get all braintree plans
 * 
 * @return object of objects $braintree_plans. 
 */
function aj_braintree_get_braintreeplans(){

    $plans = Braintree_Plan::all();

    return $plans;

}

/**
 * Function to get all plans from braintree with additional custom plan details from plugin.
 * Only the plans belonging to the given country and status are returned
 *
 * @param string $country_code.
 * @param string $status Optional. Can be 'active'/'archived'/'suspended'
 * @return array $all_plans. All plans are returned.
 */
function aj_braintree_get_all_plans($country_code,$status='active'){

	global $wpdb;

	$all_plans =array();
	
	$country_id = aj_braintree_currency_location($country_code);

	$table_name = $wpdb->base_prefix.'aj_braintree_plans';

	$get_location_plans_query = $wpdb->prepare( "SELECT * FROM ".$table_name." WHERE location_id = %d AND status=%s", array($country_id, $status));

	$location_plans = $wpdb->get_results( $get_location_plans_query, ARRAY_A );

	foreach ($location_plans as $location_plan) {
		$braintree_plan_id = $location_plan['braintree_plan_id'];

		$all_plans[] = aj_braintree_get_plan($braintree_plan_id);
	}

	return $all_plans;


}

/**
 * Function to get braintree subscription given a braintree subscription id
 *
 * @param string $subscription_id.
 * @return object $braintree_subscription if $subscription_id is valid. OR
 *         object $braintree_subscription_not_found if $subscription_id is not found
 */
function aj_braintree_get_subscription($subscription_id ){
	try {

        $braintree_subscription = Braintree_Subscription::find( $subscription_id );
        $braintree_subscription->code = "OK";
        return $braintree_subscription;

    } catch ( Braintree_Exception_NotFound $e ) {

        $braintree_subscription_not_found = new stdClass;
        $braintree_subscription_not_found->code = "ERROR";
       	$braintree_subscription_not_found->msg =  $e->getMessage();

       	return $braintree_subscription_not_found;
    }
}

/**
 * Function to get braintree customer given a braintree customer id
 *
 * @param string $customer_id.
 * @return object $braintree_customer if $customer_id is valid. OR
 *         object $braintree_customer_not_found if $customer_id is not found
 */
function aj_braintree_get_customer($customer_id){
	try {

		$braintree_customer = Braintree_Customer::find( $customer_id );
		$braintree_customer->code = "OK";
        return $braintree_customer;
		
	} catch (Braintree_Exception_NotFound $e) {

		$braintree_customer_not_found = new stdClass;
        $braintree_customer_not_found->code = "ERROR";
       	$braintree_customer_not_found->msg =  "Customer not found";

       	return $braintree_customer_not_found;
		
	}
}


/**
 * Function to create a customer in Braintree vault
 *
 * @param array $customer_array. 
 *	eg:	array(
 *   		'firstName' => 'Mike',
 *  		'lastName' => 'Jones',
 *  		'company' => 'Jones Co.',
 * 			'email' => 'mike.jones@example.com', 
 * 			'phone' => '281.330.8004',
 * 			'fax' => '419.555.1235',
 * 			'website' => 'http://example.com'
 *			)
 * @param string $payment_method_nonce Optional. Default false, set if customer is created with a credit card
 *
 * @return object $create_customer. result Braintree customer object
 */
function aj_braintree_create_customer($customer_array, $payment_method_nonce=FALSE ){

	$customer = array();

	$customer_fields = array_keys($customer_array);

	foreach ($customer_fields as $customer_field) {
		$customer[$customer_field] = $customer_array[$customer_field];	
	}

	if ($payment_method_nonce!=FALSE) {
		$customer['paymentMethodNonce'] = $payment_method_nonce;
	}

	$create_customer = Braintree_Customer::create($customer);

	return $create_customer;

}

/**
 * Function to update a customer in Braintree vault
 *
 * @param string $customer_id. Braintree customer id
 * @param array $customer_array. 
 *	eg:	array(
 *   		'firstName' => 'Mike',
 *  		'lastName' => 'Jones',
 *  		'company' => 'Jones Co.',
 * 			'email' => 'mike.jones@example.com', 
 * 			'phone' => '281.330.8004',
 * 			'fax' => '419.555.1235',
 * 			'website' => 'http://example.com'
 *			)
 * @param array $credit_card Optional. 
 * eg: array(
 *	        'paymentMethodNonce' => 'nonce-from-the-client',
 *	        'updateExistingToken' => 'a_creditcard_token' (skip if new card needs to be added)
 *	    )
 *
 * @return object $update_customer. result Braintree customer object
 */
function aj_braintree_update_customer($customer_id, $customer_array, $credit_card_array=null){

	$customer = array();
	$credit_card = array();

	$customer_fields = array_keys($customer_array);

	foreach ($customer_fields as $customer_field) {
		$customer[$customer_field] = $customer_array[$customer_field];	
	}

	if (!is_null($credit_card_array)) {

		$credit_card['paymentMethodNonce'] = $credit_card_array['paymentMethodNonce'];

		if (isset($credit_card_array['updateExistingToken'])) {
			$credit_card['options']['updateExistingToken'] = $credit_card_array['updateExistingToken'];
		}
		
		$customer['creditCard'] = $credit_card;
	}

	try {

		$update_customer = Braintree_Customer::update( $customer_id,$customer);
		$update_customer->code = "OK";
		return $update_customer;

	} catch (Braintree_Exception_NotFound $e) {
		
		$braintree_customer_not_found = new stdClass;
        $braintree_customer_not_found->code = "ERROR";
       	$braintree_customer_not_found->msg =  "Customer not found";

       	return $braintree_customer_not_found;	
	}
	
}


// aj_braintree_create_payment_method(customer_id, payment_method_nonce)
// aj_braintree_transaction(payment_method_token, amount, merchant_account )
// aj_braintree_create_subscription(payment_method_token, plan_id,merchant_account)
// aj_braintree_update_subscription(subscription_id,payment_method_token,price,plan_id,merchant_account)
// aj_braintree_get_all_subscriptions(customer_id)
// aj_braintree_get_all_transactions(customer_id)


/**
* Functions changing plugin table
**/


// Function to insert plan in plugin plans table

function aj_insert_site_plan_db($data){
	global $wpdb;

	$plans_table =  $wpdb->base_prefix.'aj_billing_plans'; 
	$braintree_plan_ids = maybe_serialize($data['braintree_plan_ids']);
	$title = $data['site_plan_title'];
	$features = maybe_serialize($data['site_plan_feature']);
	$status = $data['site_plan_status'];

	$sqlQuery = "INSERT INTO {$plans_table}
	( braintree_plan_id, title, features, status)
	VALUES
	( '" . esc_sql($braintree_plan_ids) . "', '" . esc_sql($title) . "', '" . esc_sql($features) . "', '" . esc_sql($status) . "' )";

	$wpdb->query($sqlQuery);
	
	if(!mysql_errno())
	{
		$saveid = $wpdb->insert_id;
		$msg = __("Site Plan added successfully.", "ajency-braintree");

		return array('code'=> 'OK', 'plan_id' => $saveid, 'msg' =>$msg);
	}
	else
	{
		$saveid = -1;				
		$msg = __("Error adding site plan.", "ajency-braintree");

		return array('code'=> 'ERROR','plan_id' => $saveid, 'msg' =>$msg);
	}
}


// Function to update plan in plugin plans table

function aj_update_site_plan_db($data){
	global $wpdb;

	$saveid = $data['saveid'];
	$plans_table =  $wpdb->base_prefix.'aj_billing_plans'; 
	$braintree_plan_ids = maybe_serialize($data['braintree_plan_ids']);
	$title = $data['site_plan_title'];
	$features = maybe_serialize($data['site_plan_feature']);
	$status = $data['site_plan_status'];

	$sqlQuery = " UPDATE {$plans_table}
	SET braintree_plan_id = '" . esc_sql($braintree_plan_ids) . "',
	title = '" . esc_sql($title) . "',
	features = '" . esc_sql($features) . "',
	status = '" . esc_sql($status) . "'
	WHERE id = '$saveid' LIMIT 1;";	 

	$wpdb->query($sqlQuery);

	if(!mysql_errno())
	{
		$msg = __("Site Plan updated successfully.", "ajency-braintree");

		return array('code'=> 'OK', 'plan_id' => $saveid, 'msg' =>$msg);
	}
	else
	{
		$saveid = -1;				
		$msg = __("Error updating site plan.", "ajency-braintree");

		return array('code'=> 'ERROR','plan_id' => $saveid, 'msg' =>$msg);
	}
}


function ajbilling_get_all_feature_components(){
	global $aj_feature_components;

	$yes_no_type = array();
	$count_type = array();
	$all_features = array();

	foreach ($aj_feature_components as $type => $features) {
		if ($type==='yes_no_type') {
			$yes_no_type = $features;
		}
		else if ($type==='count_type'){
			$count_type = $features;
		}
	}

	$all_features = array_merge($yes_no_type,$count_type);

	return $all_features;
}

function ajbilling_get_count_select_status($feature_name){
	global $aj_feature_components;

	$feature_type = "";

	foreach ($aj_feature_components as $type => $features) {
		if ($type==='yes_no_type' && in_array($feature_name, $features) ) {
			$feature_type = "disabled";
		}
	}

	return $feature_type;

}





