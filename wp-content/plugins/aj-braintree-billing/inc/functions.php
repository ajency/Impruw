<?php
/**
 * Function to get location dependent currency based on country code
 *
 * @param $country_code 
 * @return $currency_location 
 */

include_once( 'braintree-config.php' );

function aj_braintree_get_currency($country_code){
	global $wpdb;
	$currency = "";

	$table_name = $wpdb->base_prefix.'aj_braintree_countries';

	$get_all_countries_query = "SELECT * FROM ".$table_name;

    $country_rows = $wpdb->get_results( $get_all_countries_query, ARRAY_A );

 	// $wpdb->show_errors(); 
	// $wpdb->print_error();

	foreach ($country_rows as $country_row) {
		$countries = maybe_unserialize($country_row['country']);
		if (in_array($country_code, $countries)){
			$currency =  $country_row['currency'];
		}
	}

	return $currency;
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

// /**
//  * Function to get all plans from braintree with additional custom plan details from plugin.
//  * Only the plans belonging to the given country and status are returned
//  *
//  * @param string $country_code.
//  * @param string $status Optional. Can be 'active'/'archived'/'suspended'
//  * @return array $all_plans. All plans are returned.
//  */
// function aj_braintree_get_all_plans($country_code,$status='active'){

// 	global $wpdb;

// 	$all_plans =array();
	
// 	$country_id = aj_braintree_currency_location($country_code);

// 	$table_name = $wpdb->base_prefix.'aj_braintree_plans';

// 	$get_location_plans_query = $wpdb->prepare( "SELECT * FROM ".$table_name." WHERE location_id = %d AND status=%s", array($country_id, $status));

// 	$location_plans = $wpdb->get_results( $get_location_plans_query, ARRAY_A );

// 	foreach ($location_plans as $location_plan) {
// 		$braintree_plan_id = $location_plan['braintree_plan_id'];

// 		$all_plans[] = aj_braintree_get_plan($braintree_plan_id);
// 	}

// 	return $all_plans;


// }

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


function ajbilling_get_all_feature_components($type='all'){
	global $aj_feature_components;

	$yes_no_type = array();
	$count_type = array();
	$all_features = array();
	
	foreach ($aj_feature_components as $feature_type => $features) {
		if ($feature_type==='yes_no_type') {
			$yes_no_type = $features;
		}
		else if ($feature_type==='count_type'){
			$count_type = $features;
		}
	}

	$all_features = array_merge($yes_no_type,$count_type);


	switch ($type) {
		case 'all':
			$features = $all_features;
			break;

		case 'yes_no_type':
			$features = $yes_no_type;
			break;

		case 'count_type':
			$features = $count_type;
			break;
		
		default:
			$features = $all_features;
			break;
	}

	return $features;
}

function ajbilling_get_count_select_status($feature_name){
	global $aj_feature_components;

	$feature_type = "";

	foreach ($aj_feature_components as $type => $features) {
		if ($type==='yes_no_type') {
			foreach ($features as $key => $feature) {
				if ($feature['name'] ==$feature_name) {
					$feature_type = "disabled";
				}
			}
			
		}
	}

	return $feature_type;

}

function ajbilling_get_plugin_feature_count($plan_id,$feature_component){
	global $wpdb;
	$yes_no_features = ajbilling_get_all_feature_components('yes_no_type');
	$count_features = ajbilling_get_all_feature_components('count_type');
    $all_features = ajbilling_get_all_feature_components();
    $count = 0;

    $plugin_plans_table = $wpdb->base_prefix.'aj_billing_plans'; 
    $sqlQuery = "SELECT * FROM $plugin_plans_table WHERE id=".$plan_id;

    $site_plan = $wpdb->get_row($sqlQuery, ARRAY_A);

    $site_plan = $wpdb->get_row($sqlQuery, ARRAY_A);
    $plan_features = maybe_unserialize($site_plan['features']);

    foreach ($plan_features as $plan_feature) {

    	if ($plan_feature['key']==$feature_component) {
    		$count = $plan_feature['count'];
    	}
    }

    return $count;

}

function ajbilling_plugin_feature_enable_status($plan_id,$feature_component){
	global $wpdb;
	$yes_no_features = ajbilling_get_all_feature_components('yes_no_type');
	$count_features = ajbilling_get_all_feature_components('count_type');
    $all_features = ajbilling_get_all_feature_components();
    $enabled = 'false';

    $plugin_plans_table = $wpdb->base_prefix.'aj_billing_plans'; 
    $sqlQuery = "SELECT * FROM $plugin_plans_table WHERE id=".$plan_id;

    $site_plan = $wpdb->get_row($sqlQuery, ARRAY_A);

    $site_plan = $wpdb->get_row($sqlQuery, ARRAY_A);
    $plan_features = maybe_unserialize($site_plan['features']);

    foreach ($plan_features as $plan_feature) {

    	if ($plan_feature['key']==$feature_component) {
    		$enabled = $plan_feature['enabled'];
    	}
    }

    return $enabled;

}


function ajbilling_get_user_siteplan_options($object_id,$object_type='site'){

	if ( is_multisite() ){
		switch_to_blog( $object_id );
		$user_site_plan = get_option('site_payment_plan');
		restore_current_blog();
	}
	else{
		$user_site_plan = get_option('site_payment_plan');
	}

	return $user_site_plan;
}

function ajbilling_is_registered_feature($feature_component){
	$all_registered_features = ajbilling_get_all_feature_components();

	$is_registered= false;

	foreach ($all_registered_features as $registered_feature) {
		if ($registered_feature['key']===$feature_component) {
			$is_registered=  true;
		}
	}

	return $is_registered;
}

function ajbilling_is_yesno_feature($feature_component){
	$yes_no_features = ajbilling_get_all_feature_components('yes_no_type');

	$is_yes_no_feature= false;

	foreach ($yes_no_features as $yes_no_feature) {
		if ($yes_no_feature['key']===$feature_component) {
			$is_yes_no_feature=  true;
		}
	}

	return $is_yes_no_feature;
}

function ajbilling_is_count_feature($feature_component){
	$count_features = ajbilling_get_all_feature_components('count_type');

	$is_count_feature= false;

	foreach ($count_features as $count_feature) {
		if ($count_feature['key']===$feature_component) {
			$is_count_feature=  true;
		}
	}

	return $is_count_feature;
}

function ajbilling_object_exists($object_id,$object_type='site'){
	$result = 1;
	
	switch ($object_type) {
		case 'site':
			if ( is_multisite() ){
				$blog_details = get_blog_details($object_id);
				if ( $blog_details=="") {
					$result = 0;
				}
				else if($blog_details->deleted == 1){
					$result = 0;
				}
			}
			break;

		case 'user':
			# code...
			break;
		
		default:
			# code...
			break;
	}
	
	return $result;
}

function ajbilling_increment_feature_count($current_count, $standard_count){
	$incremented_value = $current_count;
	$maximum_count_value = 10;
	$minimum_count_value = 0;
	$infinite_count_value = 9999;

	if ($current_count<0) {
		$incremented_value = 1;
	}
	else if ($current_count===$maximum_count_value) {
		$incremented_value = 9999;
	}
	else if ($current_count===9999) {
		$incremented_value = $current_count;
	}
	else if ($current_count<$standard_count) {
		$incremented_value = $current_count+1;
	}
	

	return $incremented_value; 
}

function ajbilling_decrement_feature_count($current_count, $standard_count){
	$decremented_value = $current_count;
	$maximum_count_value = 10;
	$minimum_count_value = 0;
	$infinite_count_value = 9999;

	if($current_count===9999) {
		$decremented_value = $maximum_count_value;
	}
	else if (($current_count-1)>=0) {
		$decremented_value = $current_count-1;
	}

	return $decremented_value;	
}



