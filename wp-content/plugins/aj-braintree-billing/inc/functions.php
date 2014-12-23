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
								'nextBillAmount' => 'N/A', 
								'price' => 'N/A', 
								'nextBillingDate' => 'N/A', 
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
    	$braintree_subscription['billingPeriodEndDate'] = $complete_subscription_details->billingPeriodStartDate->format( 'M d, Y (e)' );
    	$braintree_subscription['billingPeriodStartDate'] = $complete_subscription_details->billingPeriodStartDate->format( 'M d, Y (e)' );
    	$braintree_subscription['currentBillingCycle'] = $complete_subscription_details->currentBillingCycle;
    	$braintree_subscription['daysPastDue'] = $complete_subscription_details->daysPastDue;
    	$braintree_subscription['failureCount'] = $complete_subscription_details->failureCount;
    	$braintree_subscription['firstBillingDate'] = $complete_subscription_details->firstBillingDate;
    	$braintree_subscription['neverExpires'] = $complete_subscription_details->neverExpires;
    	$braintree_subscription['nextBillingDate'] = $complete_subscription_details->nextBillingDate->format( 'M d, Y (e)' );
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
    $enabled = 'false';

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
				restore_current_blog();
			}
			else{
				$user_site_country = get_option('site-country');
			}
			break;

		case 'user':
			$user_site_country = get_user_meta( $object_id, 'site-country', true ); 
			break;
	}

	return $user_site_country;
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
		// customer not added to braintree
		}
		else{
			// customer is present in braintree
			$customer = aj_braintree_get_customer($braintree_customer_id);
			$braintree_subscription_id = $customer->customFields['customer_subscription'];
			$current_subscription_details = aj_braintree_get_subscription($braintree_subscription_id);

			$billing_plan = $current_subscription_details;

		}


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

function ajbilling_fetch_all_plans($object_id, $object_type='site'){

	global $wpdb;

	$billing_plan = array();

    //Get site plan id and country from site options
	$user_site_plan = "";

	if ( is_multisite() ){
		switch_to_blog( $object_id );
		$user_site_plan = get_option('site_payment_plan');
		$user_site_country = get_option('site-country');
		restore_current_blog();
	}
	else{
		$user_site_plan = get_option('site_payment_plan');
		$user_site_country = get_option('site-country');
	}

    // Get currency based on country
	$site_currency = aj_braintree_get_currency($user_site_country);

	$site_plan_id = $user_site_plan['plan_id'];

	$plugin_plans_table = $wpdb->base_prefix.'aj_billing_plans'; 
	$sqlQuery = "SELECT * FROM $plugin_plans_table WHERE status='active'";

	$site_plans = $wpdb->get_results($sqlQuery, ARRAY_A);

	$billing_plans = array();

	if(!mysql_errno()){

		if (sizeof($site_plans)<1) {
			$billing_plans['success'] = 0;
			$billing_plans['msg'] = 'No active plans present'; 
		}
		else{
			foreach ($site_plans as $site_plan) {
				$billing_plan['id'] = $site_plan['id'];
				$billing_plan['title'] = $site_plan['title'];
				$billing_plan['status'] = $site_plan['status'];
				$billing_plan['braintree_plans'] = array();

				$braintree_plan_ids = maybe_unserialize($site_plan['braintree_plan_id']);

				$country_based_braintree_plans = array();

                    // Get details braintree plans for only chosen currency
				foreach ($braintree_plan_ids as $braintree_plan_id) 
				{
					try {
						$braintree_plan = aj_braintree_get_plan($braintree_plan_id);
						if ($braintree_plan->currencyIsoCode == $site_currency) {
							$braintree_plan = (array)$braintree_plan;
							$braintree_plan['success'] = 1;
							$country_based_braintree_plans[] = $braintree_plan;
						}
					} catch (Braintree_Exception_SSLCertificate $e) {
						$braintree_plan['success'] = 0;
						$braintree_plan['msg'] = 'Unable to fetch Braintree Plan details as the braintree gateway is unavailable';
					}

				}
				$billing_plan['braintree_plans'] = $country_based_braintree_plans;
				$plan_features = maybe_unserialize($site_plan['features']);

				$billing_plan['plan_features'] = array();

				foreach ($plan_features as $plan_feature) {
					$billing_plan['plan_features'][] = $plan_feature;
				}
				$billing_plan['success'] = 1;

				$billing_plans[] = $billing_plan;
			}

			$billing_plans['success'] = 1;
		}



	}
	else{
		$billing_plans['success'] = 0;
		$billing_plans['msg'] = 'Unable to fetch plan details from db'; 
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
			if ($plugin_feature_enabled==='true') {
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
			if ($plugin_feature_enabled==='true') {
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






