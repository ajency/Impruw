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
	$currency = "USD";

	$table_name = $wpdb->base_prefix.'aj_billing_countries';

	$get_all_countries_query = "SELECT * FROM ".$table_name;

	$country_rows = $wpdb->get_results( $get_all_countries_query, ARRAY_A );

 	// 	$wpdb->show_errors(); 
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

	try {
		$plans = Braintree_Plan::all();
	}catch (Braintree_Exception_SSLCertificate $e) {
		$plans = array();
	}

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

	$braintree_subscription =  array(
		'subscription_status' => 'N/A', 
		'billingPeriodStartDate' => 'N/A', 
		'billingPeriodEndDate' => 'N/A', 
		'nextBillAmount' => '0', 
		'price' => '0', 
		'nextBillingDate' => 'N/A' 
		);
	try {

		$braintree_subscription_result = Braintree_Subscription::find( $subscription_id );
		$braintree_subscription_result->code = "OK";
		$complete_subscription_details =  $braintree_subscription_result;

	} catch ( Braintree_Exception_NotFound $e ) {

		$braintree_subscription_not_found = new stdClass;
		$braintree_subscription_not_found->code = "ERROR";
		$braintree_subscription_not_found->msg =  $e->getMessage();

		$complete_subscription_details =  $braintree_subscription_not_found;
	}

	if ($complete_subscription_details->code==='OK') {
		$braintree_subscription['id'] = $complete_subscription_details->id;
		$braintree_subscription['balance'] = $complete_subscription_details->balance;
		$braintree_subscription['billingDayOfMonth'] = $complete_subscription_details->billingDayOfMonth;
		$braintree_subscription['billingPeriodEndDate'] = $complete_subscription_details->billingPeriodEndDate->format( 'M d, Y' );
		$braintree_subscription['billingPeriodStartDate'] = $complete_subscription_details->billingPeriodStartDate->format( 'M d, Y' );
		$braintree_subscription['currentBillingCycle'] = $complete_subscription_details->currentBillingCycle;
		$braintree_subscription['daysPastDue'] = $complete_subscription_details->daysPastDue;
		$braintree_subscription['failureCount'] = $complete_subscription_details->failureCount;
		$braintree_subscription['firstBillingDate'] = $complete_subscription_details->firstBillingDate;
		$braintree_subscription['neverExpires'] = $complete_subscription_details->neverExpires;
		$braintree_subscription['nextBillingDate'] = $complete_subscription_details->nextBillingDate->format( 'M d, Y' );
		$braintree_subscription['nextBillAmount'] = $complete_subscription_details->nextBillAmount;
		$braintree_subscription['numberOfBillingCycles'] = $complete_subscription_details->numberOfBillingCycles;
		$braintree_subscription['paidThroughDate'] = $complete_subscription_details->paidThroughDate;
		$braintree_subscription['paymentMethodToken'] = $complete_subscription_details->paymentMethodToken;
		$braintree_subscription['planId'] = $complete_subscription_details->planId;
		$braintree_subscription['price'] = $complete_subscription_details->price;
		$braintree_subscription['subscription_status'] = $complete_subscription_details->status;
		$braintree_subscription['trialDuration'] = $complete_subscription_details->trialDuration;
		$braintree_subscription['trialDurationUnit'] = $complete_subscription_details->trialDurationUnit;
		$braintree_subscription['trialPeriod'] = $complete_subscription_details->trialPeriod;
		$braintree_subscription['merchantAccountId'] = $complete_subscription_details->merchantAccountId;
	}

	return $braintree_subscription;
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

function aj_braintree_get_customer_creditcards($customer_id){
	$customer = aj_braintree_get_customer($customer_id);

	// if there are no credit cards, return array with card_exists false
	if ( empty( $customer->creditCards ) ){
		return array( 'card_exists' => false,
			'customer_id' => $customer_id,
			'braintree_client_token' => aj_braintree_generate_client_token() );
	}

    // if there are no credit cards, return array with card_exists false
	$customer_credit_cards = $customer->creditCards;

	foreach ( $customer_credit_cards as $key => $credit_card ) {

		$credit_cards[ $key ][ 'cardholderName' ] = $credit_card->cardholderName;
		$credit_cards[ $key ][ 'customerId' ] = $credit_card->customerId;
		$credit_cards[ $key ][ 'maskedNumber' ] = $credit_card->maskedNumber;
		$credit_cards[ $key ][ 'last4' ] = $credit_card->last4;
		$credit_cards[ $key ][ 'expirationDate' ] = $credit_card->expirationDate;
		$credit_cards[ $key ][ 'token' ] = $credit_card->token;
		$credit_cards[ $key ][ 'cardType' ] = $credit_card->cardType;
		$credit_cards[ $key ][ 'imageUrl' ] = $credit_card->imageUrl;
		$credit_cards[ $key ][ 'default' ] = $credit_card->default;
		$credit_cards[ $key ][ 'expirationMonth' ] = $credit_card->expirationMonth;
		$credit_cards[ $key ][ 'expirationYear' ] = $credit_card->expirationYear;
		$credit_cards[ $key ][ 'expirationDate' ] = $credit_card->expirationDate;
		$credit_cards[ $key ][ 'card_exists' ] = true;
		$credit_cards[ $key ][ 'braintree_client_token' ] = aj_braintree_generate_client_token();

	}

	return $credit_cards;
}

/**
 * Function to get the subscription associated with a customer
 * stored as customField in braintree customer object
 */

function aj_braintree_get_customer_subscription($customer_id){
	$customer_subscription= "DefaultFree";
	$braintree_customer = aj_braintree_get_customer($customer_id);

	if ($braintree_customer->code==="OK") {
		$customer_subscription = $braintree_customer->customFields['customer_subscription'];
	}

	return $customer_subscription;
}

function aj_braintree_get_creditcard($paymentMethodToken){
	$paymentMethod = Braintree_PaymentMethod::find($paymentMethodToken);

	$credit_card = array();

	$credit_card[ 'cardholderName' ] = $paymentMethod->cardholderName;
	$credit_card[ 'customerId' ] = $paymentMethod->customerId;
	$credit_card[ 'maskedNumber' ] = $paymentMethod->maskedNumber;
	$credit_card[ 'last4' ] = $paymentMethod->last4;
	$credit_card[ 'expirationDate' ] = $paymentMethod->expirationDate;
	$credit_card[ 'token' ] = $paymentMethod->token;
	$credit_card[ 'cardType' ] = $paymentMethod->cardType;
	$credit_card[ 'imageUrl' ] = $paymentMethod->imageUrl;
	$credit_card[ 'default' ] = $paymentMethod->default;
	$credit_card[ 'expirationMonth' ] = $paymentMethod->expirationMonth;
	$credit_card[ 'expirationYear' ] = $paymentMethod->expirationYear;
	$credit_card[ 'expirationDate' ] = $paymentMethod->expirationDate;
	$credit_card[ 'card_exists' ] = true;
	$credit_card[ 'braintree_client_token' ] = aj_braintree_generate_client_token();

	return $credit_card;
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

	// Default subscription associated to a customer
	$customer['customFields'] = array( 'customer_subscription' => 'DefaultFree' );

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
 * 			'website' => 'http://example.com',
 *			'customFields' => array(
 *					        'custom_field_one' => 'custom value',
 *						        'custom_field_two' => 'another custom value'
 *						    )
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

function aj_braintree_create_subscription($payment_method_token, $plan_id,$merchant_account){
	
	$subscription_details = array(
		'paymentMethodToken' => $payment_method_token,
		'planId' => $plan_id,
		'merchantAccountId' => $merchant_account
		); 
	$create_subscription = Braintree_Subscription::create( $subscription_details );

	if ( $create_subscription->success ) {
		return array( 'success' => $create_subscription->success,
			'subscription_id' => $create_subscription->subscription->id );

	} else {
		return array( 'success' => $create_subscription->success, 'msg' => $create_subscription->message );
	}
}

function aj_braintree_update_subscription($subscription_id,$payment_method_token,$plan_id=NULL,$merchant_account,$price=NULL){

	// price is null when past_due subscriptions are updated
	if (is_null($price)) {
		$subscription_details = array(
			'paymentMethodToken' => $payment_method_token,
			'merchantAccountId' => $merchant_account
			);
	}
	else{
		$subscription_details = array(
			'paymentMethodToken' => $payment_method_token,
			'price' => $price,
			'options' => array('prorateCharges' => true,'revertSubscriptionOnProrationFailure' => true),
			'planId' => $plan_id,
			'merchantAccountId' => $merchant_account
			);
	}

	$update_subscription = Braintree_Subscription::update($subscription_id,$subscription_details );

	if ( $update_subscription->success ) {
		if (is_null($price)) {
			$last_transaction = array();
		}
		else{
			$last_transaction = array(
				'id'=>$update_subscription->subscription->transactions[0]->id,
				'status'=>$update_subscription->subscription->transactions[0]->status,
				'amount'=>$update_subscription->subscription->transactions[0]->amount,
				'type' =>$update_subscription->subscription->transactions[0]->type
				);
		}

		return array( 'success' => $update_subscription->success ,
			'subscription_id' => $update_subscription->subscription->id,
			'subscription_status' =>$update_subscription->subscription->status,
			'last_transaction'=>$last_transaction);

	} else {
		return array( 'success'=> $update_subscription->success , 'msg' => $update_subscription->message );
	}
}

function aj_braintree_retry_subscription($subscription_id){
	$retryResult = Braintree_Subscription::retryCharge($subscription_id);

	// If retry is successful, submit transaction for settlement
	if ($retryResult->success) {
		$submit_result = Braintree_Transaction::submitForSettlement(
			$retryResult->transaction->id
			);

		if ($submit_result->success) {
			$retry_subscription = array('retry_success'=>$retryResult->success, 'transaction_amount'=>$retryResult->transaction->amount,'transaction_status'=>$retryResult->transaction->status,'submit_for_settlement'=>$submit_result->success);
		}
		else{
			$retry_subscription = array('retry_success'=>$retryResult->success, 'transaction_amount'=>$retryResult->transaction->amount,'transaction_status'=>$retryResult->transaction->status,'submit_for_settlement'=>$submit_result->success,'msg'=>$submit_result->message,'proocessorSettlementResponseCode'=>$submit_result->transaction->processorSettlementResponseCode,'processorSettlementResponseText'=>$submit_result->transaction->processorSettlementResponseText);

		}

		
	}
	else{
		$retry_subscription = array('retry_success'=>$retryResult->success,'processorResponseCode'=>$retryResult->transaction->processorResponseCode,'processorResponseText'=>$retryResult->transaction->processorResponseText,  'msg'=>$retryResult->message);
	}

	return $retry_subscription ;
}

function aj_braintree_create_payment_method($customer_id, $payment_method_nonce){

	$payment_method_details = array(
		'customerId' => $customer_id,
		'paymentMethodNonce' => $payment_method_nonce,
		'options' => array(
			'failOnDuplicatePaymentMethod' => false,
						        	// 'makeDefault' => true
			)
		);

	$create_payment_method = Braintree_PaymentMethod::create($payment_method_details);

	return $create_payment_method;

}

function aj_braintree_delete_payment_method($delete_card_token){
	
	try {
		$delete_card_details = Braintree_PaymentMethod::delete($delete_card_token);
		
	} catch ( Braintree_Exception_NotFound $e ) {

		$braintree_token_not_found = new stdClass;
		$braintree_token_not_found->success = false;
		$braintree_token_not_found->message = "Payment method token not found"  ;

		$delete_card_details =  $braintree_token_not_found;
		
	}

	if ($delete_card_details->success) {

		$delete_result = array('success' => $delete_card_details->success, 'deleted_token'=>$delete_card_token );
	}
	else{
		$delete_result = array('success' => $delete_card_details->success, 'msg'=>$delete_card_details->message );
	}

	return $delete_result;
}

function aj_braintree_cancel_subscription( $subscription_id ) {

    #check if a active subscription exists
	try {
		Braintree_Subscription::find( $subscription_id );

		$cancel_subscription = Braintree_Subscription::cancel( $subscription_id );
		if ( $cancel_subscription->success ) {

			return array( 'success' => $cancel_subscription->success );
		} else {

			$error_msg = array( 'success' => $cancel_subscription->success, 'msg' => $cancel_subscription->message );
			return $error_msg;
		}
	} catch ( Braintree_Exception_NotFound $e ) {

		return array( 'success' => false, 'msg' => 'No existing subscription' );
	}

}


function aj_braintree_get_transaction($transaction_id){
	$result_transaction = array();
	try {

		$transaction = Braintree_Transaction::find( $transaction_id );
		$result_transaction['id'] = $transaction->id;
		$result_transaction['status'] = $transaction->status;
		$result_transaction['type'] = $transaction->type;
		$result_transaction['currencyIsoCode'] = $transaction->currencyIsoCode;
		$result_transaction['currencySymbol'] = ajbilling_get_site_currency($transaction->currencyIsoCode);
		$result_transaction['amount'] = $transaction->amount;
		$result_transaction['paymentInstrumentType'] = $transaction->paymentInstrumentType;
		$result_transaction['createdAt'] = $transaction->createdAt->format( 'M d, Y H:i:s A' );
		$result_transaction['token'] = $transaction->creditCardDetails->token;
		$result_transaction['bin'] = $transaction->creditCardDetails->bin;
		$result_transaction['last4'] = $transaction->creditCardDetails->last4;
		$result_transaction['imageUrl'] = $transaction->creditCardDetails->imageUrl;
		$result_transaction['cardType'] = $transaction->creditCardDetails->cardType;
		$result_transaction['maskedNumber'] = $transaction->creditCardDetails->maskedNumber;
		$result_transaction['cardholderName'] = $transaction->creditCardDetails->cardholderName;
		return $result_transaction;

	} catch (Braintree_Exception_NotFound $e ) {
		return $result_transaction;
	}
}

function aj_braintree_get_transactions($customer_id){
	$transactions =array();
	try {
		$transactionCollection = Braintree_Transaction::search( array(
			Braintree_TransactionSearch::customerId()->is( $customer_id )
			) );
		$transaction_id_array = $transactionCollection->_ids;

		foreach ( $transaction_id_array as $key => $transaction_id ) {
			$transaction_data = aj_braintree_get_transaction($transaction_id ); 
			$transactions[] = $transaction_data;
		}
		return $transactions;
	} catch (Braintree_Exception_NotFound $e ) {
		return $transactions;
	}
}

function ajbilling_get_merchant_account($currency){
	// Based on currency return merchant account to be used 
	// merchant accounts values are stored as constants like other braintree constants
	switch ($currency) {
		case 'GBP':
		$merchant_account = BT_GBP_MERCHANT;
		break;

		case 'NOK':
		$merchant_account = BT_NOK_MERCHANT;
		break;

		case 'USD':
		$merchant_account = BT_USD_MERCHANT;
		break;
		
		default:
		$merchant_account = BT_USD_MERCHANT;
		break;
	}

	return $merchant_account;
}

function ajbilling_subscribe_user_to_plan($paymentMethodToken,$braintree_plan_id,$current_subscription_id='DefaultFree'){
	// create braintree subscription if current subscription is default i.e 'ImpruwFree'
    // update braintree subscription if current subscription is not default free


	$braintree_plan = aj_braintree_get_plan($braintree_plan_id);

	// Get currency based on braintree plan 
	$currency = $braintree_plan->currencyIsoCode;
	$price = $braintree_plan->price;

	$merchant_account = ajbilling_get_merchant_account($currency);

	switch ($current_subscription_id) {
		case 'DefaultFree':
		$subscription_result = aj_braintree_create_subscription($paymentMethodToken, $braintree_plan_id,$merchant_account);
		break;

		default:
		$subscription_result = aj_braintree_update_subscription($current_subscription_id,$paymentMethodToken,$braintree_plan_id,$merchant_account,$price);
		break;
	}

	return $subscription_result;
}

function ajbilling_create_customer_with_card($customer,$paymentMethodNonce){
	// Create customer along with payment method
	$create_customer_with_card = aj_braintree_create_customer($customer, $paymentMethodNonce );

	if ( $create_customer_with_card->success ) {

		$credit_card_token = $create_customer_with_card->customer->creditCards[ 0 ]->token;
		$customer_id = $create_customer_with_card->customer->id;

		$success_msg = array( 'success' => $create_customer_with_card->success,
			'creditCardToken' => $credit_card_token,
			'customerId' => $customer_id );
		return $success_msg;

	} else {
		$error_msg = array( 'sucess' => $create_customer_with_card->success, 'msg' => $create_customer_with_card->message );
		return $error_msg;
	}
}

function ajbilling_add_credit_card_to_customer($customer_id,$paymentMethodNonce){
	// Add new payment method to customer
	$create_payment_method = aj_braintree_create_payment_method($customer_id, $paymentMethodNonce);
	if ( $create_payment_method->success ) {
		$credit_card_token = $create_payment_method->paymentMethod->token;
		$success = array( 'success' => $create_payment_method->success, 'creditCardToken' => $credit_card_token );
		return $success;

	} else {
		$error = array( 'success' => $create_payment_method->success, 'msg' => $create_payment_method->message );
		return $error;
	}
}


/**
* Function to update options related to plugin stored for the site in the db
* option_name could be: site_payment_plan / braintree-customer-id / site-country
*/                        
function ajbilling_update_plugin_site_options($object_id,$object_type='site',$option_name,$option_value){

	switch ($object_type) {
		case 'site':
		if ( is_multisite() ){
			switch_to_blog( $object_id );
			$update_plugin_option = update_option( $option_name, $option_value );
			restore_current_blog();
		}
		else{
			$update_plugin_option = update_option( $option_name, $option_value );
		}
		break;
		
		case 'user':
		$update_plugin_option = update_user_meta($object_id, $option_name, $option_value);
		break;
	}

	return $update_plugin_option;

}


/**
* Functions changing plugin table
**/


// Function to insert plan in plugin plans table

function aj_insert_site_plan_db($data){
	global $wpdb;

	$plans_table =  $wpdb->base_prefix.'aj_billing_plans'; 
	$braintree_plan_ids = maybe_serialize($data['braintree_plan_ids']);
	$title = $data['site_plan_title'];

	$unserialized_features = $data['site_plan_feature'];

	foreach ($unserialized_features as $key => $unserialized_feature) {
		if ($unserialized_feature['enabled']==="true") {
			$unserialized_features[$key]['enabled'] = 1;
		}
		else if($unserialized_feature['enabled']==="false"){
			$unserialized_features[$key]['enabled'] = 0;
		}

		if(ajbilling_is_count_feature($unserialized_feature['key'])){
			$unserialized_features[$key]['is_count_type'] = 1;
		}
		else{
			$unserialized_features[$key]['is_count_type'] = 0;
		}
	}

	$features = maybe_serialize($unserialized_features);
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

	$unserialized_features = $data['site_plan_feature'];

	foreach ($unserialized_features as $key => $unserialized_feature) {
		if ($unserialized_feature['enabled']==="true") {
			$unserialized_features[$key]['enabled'] = 1;
		}
		else if($unserialized_feature['enabled']==="false"){
			$unserialized_features[$key]['enabled'] = 0;
		}

		if(ajbilling_is_count_feature($unserialized_feature['key'])){
			$unserialized_features[$key]['is_count_type'] = 1;
		}
		else{
			$unserialized_features[$key]['is_count_type'] = 0;
		}
	}

	$features = maybe_serialize($unserialized_features);
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

	if (count($plan_features)>0) {
		foreach ($plan_features as $plan_feature) {

			if ($plan_feature['key']==$feature_component) {
				$count = $plan_feature['count'];
			}
		}
	}

	return $count;

}

function ajbilling_plugin_feature_enable_status($plan_id,$feature_component){
	global $wpdb;
	$yes_no_features = ajbilling_get_all_feature_components('yes_no_type');
	$count_features = ajbilling_get_all_feature_components('count_type');
	$all_features = ajbilling_get_all_feature_components();
	$enabled = 0;

	$plugin_plans_table = $wpdb->base_prefix.'aj_billing_plans'; 
	$sqlQuery = "SELECT * FROM $plugin_plans_table WHERE id=".$plan_id;

	$site_plan = $wpdb->get_row($sqlQuery, ARRAY_A);

	$site_plan = $wpdb->get_row($sqlQuery, ARRAY_A);
	$plan_features = maybe_unserialize($site_plan['features']);

	if (count($plan_features)>0) {
		foreach ($plan_features as $plan_feature) {

			if ($plan_feature['key']==$feature_component) {
				$enabled = $plan_feature['enabled'];
			}
		}

	}

	return $enabled;

}


function ajbilling_get_user_siteplan_options($object_id,$object_type='site'){

	$ajbilling_object_type = ajbilling_is_object_type_set();
	

	if ($ajbilling_object_type['status']){
		$object_type = $ajbilling_object_type['object_type'];
	}

	switch ($object_type) {
		case 'site':
		if ( is_multisite() ){
			switch_to_blog( $object_id );
			$user_site_plan = get_option('site_payment_plan');
			restore_current_blog();
		}
		else{
			$user_site_plan = get_option('site_payment_plan');
		}
		break;

		case 'user':
		$user_site_plan = get_user_meta( $object_id, 'site_payment_plan', true ); 
		break;
	}

	return $user_site_plan;
}

function ajbilling_get_user_country_option($object_id,$object_type='site'){

	$ajbilling_object_type = ajbilling_is_object_type_set();
	

	if ($ajbilling_object_type['status']){
		$object_type = $ajbilling_object_type['object_type'];
	}

	switch ($object_type) {
		case 'site':
		if ( is_multisite() ){
			switch_to_blog( $object_id );
			$user_site_country = get_option('site-country');

				// Default country to gb if not set
			if (!$user_site_country) {
				update_option( 'site-country', 'gb' );
				$user_site_country = 'gb';
			}
			restore_current_blog();
		}
		else{
			$user_site_country = get_option('site-country');
				// Default country to gb if not set
			if (!$user_site_country) {
				update_option( 'site-country', 'gb' );
				$user_site_country = 'gb';
			}
		}
		break;

		case 'user':
		$user_site_country = get_user_meta( $object_id, 'site-country', true ); 
		break;
	}

	return $user_site_country;
}

function ajbilling_get_braintree_customer_id($object_id,$object_type='site'){

	$ajbilling_object_type = ajbilling_is_object_type_set();
	

	if ($ajbilling_object_type['status']){
		$object_type = $ajbilling_object_type['object_type'];
	}

	switch ($object_type) {
		case 'site':
		if ( is_multisite() ){
			switch_to_blog( $object_id );
			$braintree_customer = get_option('braintree-customer-id','');
			restore_current_blog();
		}
		else{
			$braintree_customer = get_option('braintree-customer-id','');
		}
		break;

		case 'user':
		$braintree_customer = get_user_meta( $object_id, 'braintree-customer-id', true ); 
		break;
	}

	return $braintree_customer;
}

function ajbilling_get_user_siteplan_id($object_id,$object_type='site'){
	$user_site_plan = ajbilling_get_user_siteplan_options($object_id);
	$user_plan_id =  (!$user_site_plan) ? 0 : $user_site_plan['plan_id'] ;
	return $user_plan_id;
}

function ajbilling_get_user_feature_count($object_id,$feature_component,$object_type='site'){

	$count = 0;
	$count_array =array();

	$user_site_plan = ajbilling_get_user_siteplan_options($object_id);

	$user_count_features = $user_site_plan['feature_count'];

	if (count($user_count_features)>0) {
		foreach ($user_count_features as $user_count_feature) {
			if ($user_count_feature['key']==$feature_component) {
				$count = (is_array($user_count_feature['count'])) ? count($user_count_feature['count']) : $user_count_feature['count'] ;
				$count_array = (is_array($user_count_feature['count'])) ? $user_count_feature['count'] : array();
			}
		}
	}

	$count_result =  array('count' => $count, 'count_array' => $count_array );

	return $count_result;
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

function ajbilling_is_object_type_set(){

	if (is_multisite()) {
		switch_to_blog( 1 );
		$ajbilling_settings = get_option('ajbilling_settings',0);
		restore_current_blog();
	}else{
		$ajbilling_settings = get_option('ajbilling_settings',0);
	}

	if ($ajbilling_settings) {
		if ($ajbilling_settings!="") {
			$object_type_set = array('status'=>true,'object_type'=>$ajbilling_settings);
		};
	}
	else{
		$object_type_set = array('status'=>false,'object_type'=>'');
	}

	return $object_type_set;
}

function ajbilling_payment_custom_site_options(){
	global $pagenow,$wpdb;

	$site_id = isset($_GET['id']) ? $_GET['id'] : 0;

    //Get plan details for site
	$ajbilling_plan = ajbilling_get_user_siteplan_options($site_id,$object_type='site');

	if (!isset($ajbilling_plan['plan_id'])) {
		$ajbilling_plan['plan_id'] = -1;
	}

    //Get all active plans from plans table of the payment plugin
	$plugin_plans_table = $wpdb->base_prefix.'aj_billing_plans'; 
	$sqlQuery = "SELECT * FROM $plugin_plans_table WHERE status='active'";
	$site_plans = $wpdb->get_results($sqlQuery, ARRAY_A);

	if( 'site-info.php' == $pagenow ) {
		?><table><tr id="payment_custom_site_options">
		<th scope="row">Payment Plan</th>
		<td>
			<select id="blog_payment_plan">
				<option value="-1">--Select Plan--</option>
				<?php 
				foreach ($site_plans as $site_plan) {?>
				<option value="<?php echo $site_plan['id'];?>" <?php selected( $ajbilling_plan['plan_id'], $site_plan['id'], true);?>><?php echo $site_plan['title'];?></option>
				<?php }?>

			</select>
			<input class="button-secondary" type="button" name="save_plan" value="<?php _e( 'Save Plan' ); ?>" id="save_site_plan"/>
			<span class="plan-setting-updated-msg description"></span>
		</td>
	</tr></table>
	<script>jQuery(function($){
		$('.form-table tbody').append($('#payment_custom_site_options'));
	});</script><?php
}
}


/**
 * Load js script in network admin's site-info page for saving plan for a site
 */
function ajbilling_my_admin_scripts() {
	wp_register_script('updateSitePlanScript', AJ_BRAINTREE . '/js/updateSitePlanScript.js', array('jquery'), JSVERSION, TRUE);
	wp_enqueue_script('updateSitePlanScript');
}


function ajbilling_paymentApi_url() { ?>
<script type="text/javascript">
	var aj_billing_api_url = '<?php echo site_url()."/api/ajbilling/plan"; ?>';
	var site_url = '<?php echo site_url();?>';
</script>
<?php
}

function ajbilling_get_site_planid($object_id, $object_type='site'){
	global $wpdb;
	$user_site_plan = ajbilling_get_user_siteplan_options($object_id,'site');
	$site_plan_id = $user_site_plan['plan_id'];

	return $site_plan_id;
}

function ajbilling_get_site_currency($site_currency){

	switch ($site_currency) {
		case 'GBP':
		$currency = '£';
		break;

		case 'NOK':
		$currency = 'NOK';
		break;
		
		default:
		$currency = '$';
		break;
	}

	return $currency;
}

function ajbilling_fetch_plan($object_id, $object_type='site'){
	global $wpdb;

	$billing_plan = array();

    //Get site plan id and country from site options
	$user_site_plan = "";

	if ( is_multisite() ){
		switch_to_blog( $object_id );
		$user_site_plan = get_option('site_payment_plan');
		$user_site_country = get_option('site-country',0);
		$braintree_customer_id = get_option('braintree-customer-id',0);
		restore_current_blog();
	}
	else{
		$user_site_plan = get_option('site_payment_plan');
		$braintree_customer_id = get_option('braintree-customer-id',0);
		$user_site_country = get_option('site-country',0);
	}

    // Get currency based on country
	$site_currency = aj_braintree_get_currency($user_site_country);

	$site_plan_id = $user_site_plan['plan_id'];

	$plugin_plans_table = $wpdb->base_prefix.'aj_billing_plans'; 
	$sqlQuery = "SELECT * FROM $plugin_plans_table WHERE id=".$site_plan_id;

	$site_plan = $wpdb->get_row($sqlQuery, ARRAY_A);

	if(!mysql_errno())
	{
		//Get customer subscription id if customer exists
		if (!$braintree_customer_id) {
			$current_subscription_details =  array(
				'subscription_status' => 'N/A', 
				'billingPeriodStartDate' => 'N/A', 
				'billingPeriodEndDate' => 'N/A', 
				'nextBillAmount' => '0', 
				'price' => '0', 
				'nextBillingDate' => 'N/A', 
				);
			$billing_plan = $current_subscription_details;
		}
		else{
			// customer is present in braintree
			$customer = aj_braintree_get_customer($braintree_customer_id);
			$braintree_subscription_id = $customer->customFields['customer_subscription'];
			$current_subscription_details = aj_braintree_get_subscription($braintree_subscription_id);

			$billing_plan = $current_subscription_details;

		}

		$billing_plan['object_id'] = $object_id;
		$billing_plan['object_type'] = $object_type;
		$billing_plan['id'] = $site_plan['id'];
		$billing_plan['plan_title'] = $site_plan['title'];
		$billing_plan['plan_status'] = $site_plan['status'];
		
		$billing_plan['braintree_plan'] = "";
		$braintree_plan_ids = maybe_unserialize($site_plan['braintree_plan_id']);

		if (!empty($braintree_plan_ids)) {
            // $billing_plan['braintree_plans'] = array_values($braintree_plan_ids);
			foreach ($braintree_plan_ids as $braintree_plan_id) {
				$braintree_plan = aj_braintree_get_plan($braintree_plan_id);
				if ($braintree_plan->currencyIsoCode == $site_currency) {
					// $braintree_plan = (array)$braintree_plan;
					$billing_plan['braintree_plan'] = $braintree_plan->id;
				}
			}
		}


		$plan_features = maybe_unserialize($site_plan['features']);

		$billing_plan['plan_features'] = array();

		foreach ($plan_features as $plan_feature) {
			if ($plan_feature['count']==='99999') {
				$plan_feature['count_display_label'] = 'Unlimited';
			}
			else{
				$plan_feature['count_display_label'] = $plan_feature['count'];
			}
			$billing_plan['plan_features'][] = $plan_feature;
		}
		$billing_plan['success'] = 1;
	}
	else{
		$wpdb->print_error();
		$wpdb->show_errors();
		$billing_plan['success'] = 0;
		$billing_plan['msg'] = 'Unable to fetch plan details from db';
	}
	return $billing_plan;
}
/**
 * Set $braintree_specific_plan to TRUE if braintree specific details of the feature plan need to be returned
 */
function ajbilling_get_feature_plan_by_id($plan_id,$site_currency, $braintree_specific_plan=FALSE){
	global $wpdb;
	$billing_plan = array();
	
	$plugin_plans_table = $wpdb->base_prefix.'aj_billing_plans'; 
	$sqlQuery = "SELECT * FROM $plugin_plans_table WHERE id=".$plan_id;

	$site_plan = $wpdb->get_row($sqlQuery, ARRAY_A);

	if(!mysql_errno())
	{
		$billing_plan['id'] = $site_plan['id'];
		$billing_plan['plan_title'] = $site_plan['title'];
		$billing_plan['plan_status'] = $site_plan['status'];
		
		$billing_plan['braintree_plan'] = "";
		
		$braintree_plan_ids = maybe_unserialize($site_plan['braintree_plan_id']);
		// $billing_plan['braintree_plan'] = array_values($braintree_plan_ids);

		if ($braintree_specific_plan) {
			// Get currency specific braintree plan associated with the feature plan
			if (!empty($braintree_plan_ids)) {
				foreach ($braintree_plan_ids as $braintree_plan_id) {
					$braintree_plan = aj_braintree_get_plan($braintree_plan_id);
					if ($braintree_plan->currencyIsoCode == $site_currency) {
						$billing_plan['braintree_plan'] = $braintree_plan->id;
						$billing_plan['price'] = $braintree_plan->price;
						break;
					}
				}
			}
		}


		$plan_features = maybe_unserialize($site_plan['features']);

		$billing_plan['plan_features'] = array();

		foreach ($plan_features as $plan_feature) {
			if ($plan_feature['count']==='99999') {
				$plan_feature['count_display_label'] = 'Unlimited';
			}
			else{
				$plan_feature['count_display_label'] = $plan_feature['count'];
			}
			$billing_plan['plan_features'][] = $plan_feature;
		}
		$billing_plan['success'] = 1;
	}
	else{
		$billing_plan['success'] = 0;
		$billing_plan['msg'] = 'Unable to fetch plan details from db';
	}
	return $billing_plan;
}

function ajbilling_fetch_feature_plan($object_id, $object_type='site'){
	global $wpdb;

	$billing_plan = array();

    //Get site plan id and country from site options
	$user_site_plan = "";
	$user_site_plan = ajbilling_get_user_siteplan_options($object_id,$object_type);
	$user_site_country = ajbilling_get_user_country_option($object_id,$object_type);
	$braintree_customer_id = ajbilling_get_braintree_customer_id($object_id,$object_type);

    // Get currency based on country
	$site_currency = aj_braintree_get_currency($user_site_country);

	$site_plan_id = $user_site_plan['plan_id'];

	$billing_plan = ajbilling_get_feature_plan_by_id($site_plan_id,$site_currency);

	$billing_plan['object_id'] = $object_id;
	$billing_plan['object_type'] = $object_type;

	return $billing_plan;
}


function ajbilling_fetch_all_feature_plans($object_id, $object_type='site'){
	global $wpdb;

	$user_site_country = ajbilling_get_user_country_option($object_id,$object_type);

    // Get currency based on country
	$site_currency = aj_braintree_get_currency($user_site_country);

	$all_feature_plans = array();

	$plugin_plans_table = $wpdb->base_prefix.'aj_billing_plans'; 
	$sqlQuery = "SELECT * FROM $plugin_plans_table WHERE id!=1";

	$plugin_plans = $wpdb->get_results($sqlQuery, ARRAY_A);

	foreach ($plugin_plans as $plugin_plan) {
		$all_feature_plans[]=ajbilling_get_feature_plan_by_id($plugin_plan['id'],$site_currency, TRUE) ;
	}

	return $all_feature_plans;
}

function ajbilling_fetch_site_subscription($object_id, $object_type='site'){
	global $wpdb;

	$subscription = array();

    //Get site plan id and country from site options
	$user_site_plan = "";
	$user_site_plan = ajbilling_get_user_siteplan_options($object_id,$object_type);
	$user_site_country = ajbilling_get_user_country_option($object_id,$object_type);

	// Get currency based on country
	$site_currency = aj_braintree_get_currency($user_site_country);
	$site_currency_symbol = ajbilling_get_site_currency($site_currency);

	$braintree_customer_id = ajbilling_get_braintree_customer_id($object_id,$object_type);

	if (!$braintree_customer_id) {
		$current_subscription_details =  array(
			'subscription_status' => 'N/A', 
			'billingPeriodStartDate' => 'N/A', 
			'billingPeriodEndDate' => 'N/A', 
			'nextBillAmount' => '0', 
			'price' => '0', 
			'nextBillingDate' => 'N/A', 
			'currency' => $site_currency_symbol 
			);
		$subscription = $current_subscription_details;
	}
	else{
			// customer is present in braintree
		$customer = aj_braintree_get_customer($braintree_customer_id);
		$braintree_subscription_id = $customer->customFields['customer_subscription'];
		$current_subscription_details = aj_braintree_get_subscription($braintree_subscription_id);
		$current_subscription_details['currency'] = $site_currency_symbol;

		$subscription = $current_subscription_details;

	}

	return $subscription;
}

function ajbilling_fetch_all_plans($object_id, $object_type='site'){

	global $wpdb;

	$result = array();

    //Get site plan id and country from site options
	$user_site_plan = "";

	if ( is_multisite() ){
		switch_to_blog( $object_id );
		$user_site_plan = get_option('site_payment_plan');
		$user_site_country = get_option('site-country');

		// If no country is set for the site, then default country to gb 
		if (!$user_site_country) {
			update_option( 'site-country', 'gb' );
			$user_site_country = 'gb';
		}
		restore_current_blog();
	}
	else{
		$user_site_plan = get_option('site_payment_plan');
		$user_site_country = get_option('site-country');
		if (!$user_site_country) {
			update_option( 'site-country', 'gb' );
			$user_site_country = 'gb';
		}
	}

    // Get currency based on country
	$site_currency = aj_braintree_get_currency($user_site_country);

	$site_plan_id = $user_site_plan['plan_id'];

	$plugin_plans_table = $wpdb->base_prefix.'aj_billing_plans'; 
	$sqlQuery = "SELECT * FROM $plugin_plans_table WHERE status='active' AND title!='Default plan'";

	$site_plans = $wpdb->get_results($sqlQuery, ARRAY_A);

	$billing_plans = array();

	if(!mysql_errno()){

		if (sizeof($site_plans)<1) {
			$result['success'] = 0;
			$result['msg'] = 'No active plans present'; 
		}
		else{
			foreach ($site_plans as $site_plan) {

				$braintree_plan_ids = maybe_unserialize($site_plan['braintree_plan_id']);

				$country_based_braintree_plans = array();

				$billing_plan = array();
				if (!empty($braintree_plan_ids)) {
	                // Get details braintree plans for only chosen currency
					foreach ($braintree_plan_ids as $braintree_plan_id) 
					{
						try {
							$braintree_plan = aj_braintree_get_plan($braintree_plan_id);
							if ($braintree_plan->currencyIsoCode == $site_currency) {
								$billing_plan['braintreePlanId'] = $braintree_plan->id;
								$billing_plan['billingFrequency'] = $braintree_plan->billingFrequency;
								$billing_plan['currencyIsoCode'] = $braintree_plan->currencyIsoCode;
								$billing_plan['description'] = $braintree_plan->description;
								$billing_plan['numberOfBillingCycles'] = $braintree_plan->numberOfBillingCycles;
								$billing_plan['price'] = $braintree_plan->price;
								$billing_plan['braintreePlanName'] = $braintree_plan->name;
								$billing_plan['trialDuration'] = $braintree_plan->trialDuration;
								$billing_plan['trialDurationUnit'] = $braintree_plan->trialDurationUnit;
							}
						} catch (Braintree_Exception_SSLCertificate $e) {
							$braintree_plan['success'] = 0;
							$braintree_plan['msg'] = 'Unable to fetch Braintree Plan details as the braintree gateway is unavailable';
						}

					}
				}

				$plan_features = maybe_unserialize($site_plan['features']);

				$billing_plan['plan_features'] = array();

				foreach ($plan_features as $plan_feature) {
					if ($plan_feature['count']==='99999') {
						$plan_feature['count_display_label'] = 'Unlimited';
					}
					else{
						$plan_feature['count_display_label'] = $plan_feature['count'];
					}
					$billing_plan['plan_features'][] = $plan_feature;
				}
				$billing_plan['success'] = 1;

				$billing_plan['id'] = $site_plan['id'];
				$billing_plan['title'] = $site_plan['title'];
				$billing_plan['status'] = $site_plan['status'];

				$billing_plans[] = $billing_plan;
			}

			// $result['success'] = 1;
			$result['data'] = $billing_plans;
		}



	}
	else{
		$result['success'] = 0;
		$result['msg'] = 'Unable to fetch plan details from db'; 
	}


	return $billing_plans;
}

function ajbilling_is_this_user_allowed($object_id , $object_type='site', $feature_component){
	if(!ajbilling_object_exists($object_id,$object_type)){
		$result = array('code' => 'ERROR' , 'msg' => $object_type.' with id '.$object_id.' does not exist');
		return $result;
	}
    //Check if feature_component is registered and valid, if no return failure msg
	$yes_no_features = ajbilling_get_all_feature_components('yes_no_type');
	$count_features = ajbilling_get_all_feature_components('count_type');
	$all_features = ajbilling_get_all_feature_components('all');

	$user_site_plan = ajbilling_get_user_siteplan_options($object_id,'site');

	$site_features = $user_site_plan['feature_count'];
	// $plugin_plan = ajbilling_fetch_plan($object_id);

	$site_plan_id = ajbilling_get_site_planid($object_id,'site');

	$result = array();

    // If user site feature is a registered theme features
	if (ajbilling_is_registered_feature($feature_component)) {

                // If yes no type and if enabled return allowed
		if (ajbilling_is_yesno_feature($feature_component)) {
			$plugin_feature_enabled = ajbilling_plugin_feature_enable_status($site_plan_id,$feature_component);
			if ($plugin_feature_enabled) {
				$result = array('code' => 'OK' , 'allowed'=>1 );
			}
			else{
				$result = array('code' => 'OK' , 'allowed'=>0 );
			}

		}
		else if(ajbilling_is_count_feature($feature_component)) {
            // If count type then Check count of this feature for user. 

            // Check if feature is enabled
			$plugin_feature_enabled = ajbilling_plugin_feature_enable_status($site_plan_id,$feature_component);
			if ($plugin_feature_enabled) {
				$result = array('code' => 'OK' , 'allowed'=>1 );
				// foreach ($site_features as $site_feature) {
				// 	if ($site_feature['key']==$feature_component) {
				// 		$plugin_feature_count = ajbilling_get_plugin_feature_count($site_plan_id,$feature_component);
    			//      // If site feature count is less or equal to plugin feature count return allowed
				// 		if ($site_feature['count']<=$plugin_feature_count) {
				// 			$result = array('code' => 'OK' , 'allowed'=>1 );
				// 		}
				// 		else{
				// 			$result = array('code' => 'OK' , 'allowed'=>0 );
				// 		}

				// 	}
				// }
			}
			else{
				$result = array('code' => 'OK' , 'allowed'=>0 );
			}

		}
		else{
			$result = array('code' => 'OK' , 'allowed'=>0 );
		}
	}
	else{
		$result = array('code' => 'ERROR' , 'msg' => 'This feature is not a registered site feature');
	}
	return $result;
}

function ajbilling_update_site_plan($object_id, $object_type='site', $plan_id ){

	global $wpdb;

	$count_type_features = ajbilling_get_all_feature_components('count_type');

	// Get current stored feature count
	if ( is_multisite() ){
		switch_to_blog( $object_id );
		$current_site_plan = get_option( 'site_payment_plan',0);
		restore_current_blog();
	}
	else{
		$current_site_plan = get_option( 'site_payment_plan',0);
	}

	//Feature count array should be either from the exisitng site_payment_plan option or initialised to zero if created the first time

	$feature_count_array = array();

	if ($current_site_plan!=0) {
		$feature_count_array = $current_site_plan['feature_count'];
	}
	else{

		foreach ($count_type_features as $count_type_feature) {
			$feature_count_array[] =  array('name' =>$count_type_feature['name'] , 'key' =>$count_type_feature['key'], 'count' => 0 );
		}
	}

	$plan = array('plan_id'=>$plan_id,'feature_count' => $feature_count_array );

	if ( is_multisite() ){
		switch_to_blog( $object_id );
		$update_site_plan = update_option( 'site_payment_plan', $plan );
		restore_current_blog();
	}
	else{
		$update_site_plan = update_option( 'site_payment_plan', $plan );
	}

	if ($update_site_plan) {
		$update_plan_status = 1;
	}
	else{
		$update_plan_status = 0;
	}

	do_action("ajbilling_update_payment_plan", $object_id, $plan_id);

	$result = array('code'=>'OK','update_success'=> $update_plan_status, 'plan_id'=>$plan_id );

	return $result;
}

function ajbilling_update_site_to_default_plan($object_id, $object_type='site'){
	// Default plan id is 1
	$plan_id = 1;
	ajbilling_update_site_plan($object_id, $object_type='site', $plan_id );
	$customer_id = ajbilling_get_braintree_customer_id($object_id,$object_type);

	// Update subscription id associated to braintree customer to "DefaultFree"
	// Update braintree customer with subscription id as custom field
	$customer_array = array('customFields' => 
		array( 'customer_subscription' => 'DefaultFree' )
		);
	$update_customer = aj_braintree_update_customer($customer_id,$customer_array );

	return $update_customer;

}

function ajbilling_update_feature_count($object_id , $object_type='site', $feature_component, $plus_or_minus){
	if(!ajbilling_object_exists($object_id,$object_type)){
		$result = array('code' => 'ERROR' , 'msg' => $object_type.' with id '.$object_id.' does not exist');
		return $result;
	}

	if (!ajbilling_is_registered_feature($feature_component)){
		$result = array('code' => 'ERROR' , 'msg' => 'Feature is not theme registered');
		return $result;
	}

	if (ajbilling_is_yesno_feature($feature_component)) {
		$result = array('code' => 'ERROR' , 'msg' => 'Feature is not of count type');
		return $result;
	}

	$user_site_plan = ajbilling_get_user_siteplan_options($object_id,'site');
	$user_site_count_features = $user_site_plan['feature_count'];
	$plugin_feature_count = ajbilling_get_plugin_feature_count($user_site_plan['plan_id'],$feature_component);

	foreach ($user_site_count_features as $feature_index => $user_site_count_feature) {

		if ($user_site_count_feature['key']===$feature_component) {
			$current_count = $user_site_count_feature['count'];
			$new_val = $current_count;
			switch ($plus_or_minus) {
				case 'plus':
				$new_val = $incremented_val = ajbilling_increment_feature_count($current_count, $plugin_feature_count);
				$user_site_count_features[$feature_index]['count']=$incremented_val;
				break;

				case 'minus':
				$new_val = $decremented_val = ajbilling_decrement_feature_count($current_count, $plugin_feature_count);
				$user_site_count_features[$feature_index]['count']=$decremented_val;
				break;
			}
		}
	}

	$plan = array('plan_id'=>$user_site_plan['plan_id'],'feature_count' => $user_site_count_features );

	if ( is_multisite() ){
		switch_to_blog( $object_id );
		$update_site_plan = update_option( 'site_payment_plan', $plan );
		restore_current_blog();
	}
	else{
		$update_site_plan = update_option( 'site_payment_plan', $plan );
	}

	return  array('code' => 'OK', 'count_updated'=> $update_site_plan, 'plan_id'=>$user_site_plan['plan_id'], 'feature_name'=>$feature_component, 'updated_feature_count'=>$new_val, 'maximum_feature_count'=>$plugin_feature_count );
}

function ajbilling_update_feature_addon($object_id ,$element_name,$plus_or_minus, $object_type='site', $feature_component='site_add_ons'){

	$user_site_plan = ajbilling_get_user_siteplan_options($object_id,'site');
	$user_site_count_features = $user_site_plan['feature_count'];
	$plugin_feature_count = ajbilling_get_plugin_feature_count($user_site_plan['plan_id'],$feature_component);

	foreach ($user_site_count_features as $feature_index => $user_site_count_feature) {
		if ($user_site_count_feature['key']===$feature_component) {
			
			$current_count = $user_site_count_feature['count'];
			$new_count = array();

			switch ($plus_or_minus) {
				case 'plus':
				if (is_array($current_count)) {
					$new_count = $current_count ;
				}

				array_push($new_count, $element_name);
				break;

				case 'minus':
				if (is_array($current_count)) {
					$new_count = array_diff($current_count, array($element_name));
					$new_count = array_values($new_count);
				}
				break;

				case 'reset':
				$new_count = array();
				break;

				default:
				$new_count = array();
				break;
				
			}

			$user_site_count_features[$feature_index]['count']=$new_count;
			
		}
	}

	$plan = array('plan_id'=>$user_site_plan['plan_id'],'feature_count' => $user_site_count_features );

	if ( is_multisite() ){
		switch_to_blog( $object_id );
		$update_site_plan = update_option( 'site_payment_plan', $plan );
		restore_current_blog();
	}
	else{
		$update_site_plan = update_option( 'site_payment_plan', $plan );
	}

	$response =  array('code' => 'OK', 'count_updated'=> $update_site_plan, 'plan_id'=>$user_site_plan['plan_id'], 'feature_name'=>$feature_component, 'updated_feature_count'=>count($new_count), 'maximum_feature_count'=>$plugin_feature_count );

	return $response;
}


function ajbilling_assign_site_default_plan( $blog_id, $user_id, $domain, $path, $site_id, $meta ) {
	$plan_id = 1 ;//Default plan
	ajbilling_update_site_plan($blog_id, 'site', $plan_id );
}
add_action( 'wpmu_new_blog', 'ajbilling_assign_site_default_plan', 10, 6 );

function ajbilling_braintree_webhook_notifications($webhookNotification){

	$webhook_kind = $webhookNotification->kind;
	$subscription_id = $webhookNotification->subscription->id;

	//need a subscription id
	if(empty($subscription_id))
		die("No subscription ID.");

	$customer_transactions = $webhookNotification->subscription->transactions; 
	foreach ($customer_transactions as $item) 
	{ 
		$customer_email = $item->customerDetails->email;
		$customer_name = $item->customerDetails->firstName;
		$customer_id = $item->customerDetails->id;
	}

	$customer_details = array(
		'id' => $customer_id, 
		'email' => $customer_email, 
		'name' => $customer_name, 
		);

	//make function calls based on the webhook kind
	switch ($webhook_kind) {
		case 'subscription_charged_successfully':
		do_action( 'subscription_charged_successfully', $subscription_id,$customer_details);
		break;

		case 'subscription_charged_unsuccessfully':
		do_action( 'subscription_charged_unsuccessfully', $subscription_id,$customer_details);
		break;

		case 'subscription_went_active':
		do_action( 'subscription_went_active', $subscription_id,$customer_details);
		break;

		case 'subscription_went_past_due':
		do_action( 'subscription_went_past_due', $subscription_id,$customer_details);
		break;

		case 'subscription_canceled':
		do_action( 'subscription_canceled', $subscription_id,$customer_details);
		break;
		
		default:
			// do nothing for other webhook kind
		break;
	}

}

if(!function_exists('_log')){
	function _log( $message ) {
		if( WP_DEBUG === true ){
			if( is_array( $message ) || is_object( $message ) ){
				error_log( print_r( $message, true ) );
			} else {
				error_log( $message );
			}
		}
	}
}


function ajbilling_get_plan_from_braintreeplan($braintree_plan_id){
	global $wpdb;
	// Get all feature plans
	// For each feature plan, check if braintree_plan_id array contains the give braintree plan id
	//  if found return the feature plan id
	$selected_site_plan= array();
	$braintree_plan_ids = array();
	$plugin_plans_table = $wpdb->base_prefix.'aj_billing_plans'; 
	$sqlQuery = "SELECT * FROM $plugin_plans_table";

	$site_plans = $wpdb->get_results($sqlQuery, ARRAY_A);

	foreach ($site_plans as $site_plan) {
		
		$braintree_plan_ids = maybe_unserialize($site_plan['braintree_plan_id']);
		_log($braintree_plan_ids);
		if (in_array($braintree_plan_id, $braintree_plan_ids)) {
			$selected_site_plan = $site_plan;
			break;
		}
	}

	return $selected_site_plan;
}


