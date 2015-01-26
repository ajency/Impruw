<?php
/*
 * Api configuration and methods of the plugin
 * 
 */

// if(is_plugin_active('json-rest-api/plugin.php')){
    
    /*
     * function to configure the plugin api routes
     */
    function ajbilling_plugin_api_init($server) {
        global $ajbilling_plugin_api;

        $ajbilling_plugin_api = new AjBillingAPI($server);
        add_filter( 'json_endpoints', array( $ajbilling_plugin_api, 'register_routes' ) );
    }
    add_action( 'wp_json_server_before_serve', 'ajbilling_plugin_api_init',10,1 );

    class AjBillingAPI {

        /**
         * Server object
         *
         * @var WP_JSON_ResponseHandler
         */
        protected $server;

        /**
         * Constructor
         *
         * @param WP_JSON_ResponseHandler $server Server object
         */
        public function __construct(WP_JSON_ResponseHandler $server) {
                $this->server = $server;
        }
        
        // creatable - POST - create a record
        // editable -PUT - update a record


        /*Register Routes*/
        public function register_routes( $routes ) {
           $routes['/ajbilling/plans/(?P<object_id>\d+)'] = array(
            array( array( $this, 'fetch_all_plans'), WP_JSON_Server::READABLE ),
            );

           $routes['/ajbilling/plan/(?P<object_id>\d+)/(?P<object_type>\S+)'] = array(
            array( array( $this, 'fetch_plan'), WP_JSON_Server::READABLE ),
            );
           $routes['/ajbilling/featureplan/(?P<object_id>\d+)/(?P<object_type>\S+)'] = array(
            array( array( $this, 'fetch_feature_plan'), WP_JSON_Server::READABLE ),
            );
           $routes['/ajbilling/featureplans/(?P<object_id>\d+)/(?P<object_type>\S+)'] = array(
            array( array( $this, 'fetch_all_feature_plans'), WP_JSON_Server::READABLE ),
            );
           $routes['/ajbilling/braintreeSubscription/(?P<object_id>\d+)/(?P<object_type>\S+)'] = array(
            array( array( $this, 'fetch_site_subscription'), WP_JSON_Server::READABLE ),
            );

           $routes['/ajbilling/braintreeSubscriptions/(?P<object_id>\d+)/(?P<object_type>\S+)'] = array(
            array( array( $this, 'fetch_site_subscriptions'), WP_JSON_Server::READABLE ),
            );

           $routes['/ajbilling/creditcard/(?P<object_id>\S+)/(?P<object_type>\S+)'] = array(
            array( array( $this, 'add_braintree_credit_card'), WP_JSON_Server::CREATABLE | WP_JSON_Server::ACCEPT_JSON ),
            );
           $routes['/ajbilling/creditcards/(?P<object_id>\S+)/(?P<object_type>\S+)'] = array(
            array( array( $this, 'fetch_all_credit_cards'), WP_JSON_Server::READABLE ),
            );

           $routes['/ajbilling/plan/(?P<object_id>\d+)/(?P<object_type>\S+)/(?P<plan_id>\d+)'] = array(
            array( array( $this, 'update_site_plan'), WP_JSON_Server::EDITABLE | WP_JSON_Server::ACCEPT_JSON ),
            );

           $routes['/ajbilling/feature/(?P<object_id>\d+)/(?P<object_type>\S+)/(?P<feature_component>\S+)'] = array(
            array( array( $this, 'is_this_user_allowed'), WP_JSON_Server::READABLE ),
            );

           $routes['/ajbilling/site_feature_count/(?P<object_id>\d+)/(?P<object_type>\S+)/(?P<feature_component>\S+)/(?P<plus_or_minus>\S+)'] = array(
            array( array( $this, 'update_feature_count'), WP_JSON_Server::EDITABLE | WP_JSON_Server::ACCEPT_JSON ),
            );

           $routes['/ajbilling/braintreePlan/(?P<object_id>\d+)/(?P<object_type>\S+)/(?P<plan_id>\d+)/(?P<braintree_plan_id>\S+)'] = array(
            array( array( $this, 'change_site_braintree_plan'), WP_JSON_Server::CREATABLE | WP_JSON_Server::ACCEPT_JSON ),
            ); 

           $routes['/ajbilling/braintreePlans/(?P<braintree_plan_id>\S+)'] = array(
            array( array( $this, 'get_braintree_plan'), WP_JSON_Server::READABLE ),
            );

           $routes['/ajbilling/defaultPlan/(?P<object_id>\d+)/(?P<object_type>\S+)'] = array(
            array( array( $this, 'cancel_braintree_plan'), WP_JSON_Server::EDITABLE | WP_JSON_Server::ACCEPT_JSON ),
            );
           $routes['/ajbilling/braintreeWebhook'] = array(
            array( array( $this, 'verify_braintree_webhook'), WP_JSON_Server::READABLE ),
            array( array( $this, 'braintree_webhook_notifications'), WP_JSON_Server::CREATABLE | WP_JSON_Server::ACCEPT_JSON ),
            );
           $routes['/ajbilling/setActiveCard/(?P<subscription_id>\S+)/(?P<new_card_token>\S+)'] = array(array( array( $this, 'set_active_subscription_card'), WP_JSON_Server::EDITABLE | WP_JSON_Server::ACCEPT_JSON ),
            );

           $routes['/ajbilling/deleteCreditCard/(?P<subscription_id>\S+)/(?P<delete_card_token>\S+)'] = array(array( array( $this, 'delete_credit_card'), WP_JSON_Server::EDITABLE | WP_JSON_Server::ACCEPT_JSON ),
            );
           $routes['/ajbilling/braintreeTransactions'] = array(
            array( array( $this, 'get_braintree_transactions'), WP_JSON_Server::CREATABLE | WP_JSON_Server::ACCEPT_JSON ),
            ); 
           $routes['/ajbilling/oneTimeTransaction/(?P<object_id>\d+)/(?P<object_type>\S+)/(?P<braintree_plan_id>\S+)'] = array(
            array( array( $this, 'create_one_time_transaction'), WP_JSON_Server::CREATABLE | WP_JSON_Server::ACCEPT_JSON ),
            );


           return $routes;

        }

        public function fetch_all_plans($object_id){

            $billing_plans = ajbilling_fetch_all_plans($object_id, $object_type);

            return $billing_plans;

        }

        public function fetch_plan($object_id, $object_type='site'){

            $billing_plan = ajbilling_fetch_plan($object_id, $object_type);

            return $billing_plan;
           
        }

        public function fetch_feature_plan($object_id, $object_type='site'){

            $feature_plan = ajbilling_fetch_feature_plan($object_id, $object_type);

            return $feature_plan;

        }

        public function fetch_all_feature_plans($object_id, $object_type='site'){
            $feature_plans = ajbilling_fetch_all_feature_plans($object_id, $object_type);

            return $feature_plans;
        }

        public function fetch_site_subscription($object_id, $object_type='site'){
            $site_subscription = ajbilling_fetch_site_subscription($object_id, $object_type);

            return $site_subscription;
        }

        public function fetch_site_subscriptions($object_id, $object_type='site'){
            $site_subscriptions = array();

            // A would always have one subscription associated to it. Hence a site's subscription collection would have only that one subscription i.e the site's current subscription 
            $site_subscription = ajbilling_fetch_site_subscription($object_id, $object_type);

            $site_subscriptions[] = $site_subscription;

            return $site_subscriptions;
        }

        public function fetch_all_credit_cards($object_id, $object_type='site'){

            $customer_id = ajbilling_get_braintree_customer_id($object_id,$object_type);

            if ( empty( $customer_id ) ) {
                $credit_cards = array( 'card_exists' => false,
                    'customer_id' => $customer_id,
                    'braintree_client_token' => aj_braintree_generate_client_token() );
            } else {
                $credit_cards =  aj_braintree_get_customer_creditcards($customer_id);
            }
            
            return $credit_cards;
           
        }

        public function change_site_braintree_plan($object_id, $object_type, $plan_id, $braintree_plan_id ){

            $customer = array();
            $customer_id =ajbilling_get_braintree_customer_id($object_id,$object_type);

            if (isset($_POST[ 'customerName' ])) {
                $customer['firstName'] = $_REQUEST[ 'customerName' ];
            }

            if (isset($_POST[ 'customerEmail' ])) {
                $customer['email'] = $_REQUEST[ 'customerEmail' ];
            }

            // if payment method token is set then update subscription with existing card
            if (isset($_REQUEST[ 'paymentMethodToken' ])) {
                // Get subscription id from braintree customer 
                $current_subscription_id = aj_braintree_get_customer_subscription($customer_id);
                $paymentMethodToken = $_REQUEST[ 'paymentMethodToken' ];
                $subscription_result = ajbilling_subscribe_user_to_plan($paymentMethodToken,$braintree_plan_id,$current_subscription_id);
                // Update braintree customer with subscription id as custom field
                $customer_array = array('customFields' => 
                    array( 'customer_subscription' => $subscription_result['subscription_id'] )
                    );

                if ($subscription_result['success']) {
                    aj_braintree_update_customer( $customer_id,$customer_array );
                }

                $new_credit_card = array();
            }
            else if (isset($_REQUEST[ 'paymentMethodNonce' ])){
                $paymentMethodNonce = $_REQUEST[ 'paymentMethodNonce' ];
                // if payment method nonce is passed create subscription with new credit card

                // Check if customerId is empty or not i.e. if it is a braintree customer

                    if ( empty( $customer_id ) ) {
                        // if not already a braintree customer create customer with credit card
                        $create_customer = ajbilling_create_customer_with_card($customer,$paymentMethodNonce);

                        if ( !$create_customer['success'] ){
                            // return error array
                            return array('subscription_success' => false ,'msg'=>$create_customer['msg'] );
                        }

                        $card_token = $create_customer['creditCardToken'];

                        $new_credit_card = aj_braintree_get_creditcard($card_token);

                        // update braintree customer in site options
                        ajbilling_update_plugin_site_options($object_id,'site','braintree-customer-id',$create_customer['customerId']);

                        
                        $subscription_result =ajbilling_subscribe_user_to_plan($card_token,$braintree_plan_id);

                        // Update braintree customer with subscription id as custom field
                        $customer_array = array('customFields' => 
                                            array( 'customer_subscription' => $subscription_result['subscription_id'] )
                                         );

                        if ($subscription_result['success']) {
                            aj_braintree_update_customer($create_customer['customerId'],$customer_array );
                        }
            
                    } 
                    else{
                        // if braintree customer => add new card to existing customer 
                        $current_subscription_id = aj_braintree_get_customer_subscription($customer_id); 
                        $add_new_card = ajbilling_add_credit_card_to_customer($customer_id,$paymentMethodNonce);

                        if (  !$add_new_card['success'] ) {
                            // return error array
                            return array('subscription_success' => false ,'msg'=>$add_new_card['msg'] );
                        }
                        $card_token = $add_new_card['creditCardToken'];
                        // if card added successfully => subscribe_user_to_plan
                        $subscription_result =ajbilling_subscribe_user_to_plan($card_token,$braintree_plan_id,$current_subscription_id);

                        // Update braintree customer with subscription id as custom field
                        $customer_array = array('customFields' => 
                                            array( 'customer_subscription' => $subscription_result['subscription_id'] )
                                         );

                        if ($subscription_result['success']) {
                            aj_braintree_update_customer( $customer_id,$customer_array );
                        }
                    }
                    
                    

            }

            // If subscription is successfully created/updated => Change the site plan to the selected plan id
            if ($subscription_result['success']){
                $plan_update_result = ajbilling_update_site_plan($object_id, $object_type, $plan_id );

                $is_email_allowed = ajbilling_is_this_user_allowed($object_id , $object_type, 'email_account');
                $plan_update_result['is_email_allowed']  = $is_email_allowed['allowed'];
                
                $is_siteaddon_allowed = ajbilling_is_this_user_allowed($object_id , $object_type, 'site_add_ons');
                $plan_update_result['is_siteaddon_allowed'] = $is_siteaddon_allowed['allowed'];

                // Feature changes due to change of plan
                $feature_changes = array();
                $count_type_features = ajbilling_get_all_feature_components($type='all');

                foreach ($count_type_features as $count_type_feature) {
                    $feature_component = $count_type_feature['key'];
                    $current_count = ajbilling_get_user_feature_count($object_id,$feature_component);
                    $allowed_count = ajbilling_get_plugin_feature_count($plan_id,$feature_component);
                    $feature_change = array('feature_component' => $feature_component, 
                                            'current_count' => $current_count['count'],
                                            'allowed_count' => $allowed_count,
                                            );
                    $feature_changes[] = $feature_change;
                }

                $plan_update_result['feature_changes'] = $feature_changes;

                $plan_update_result['updated_subscription'] = ajbilling_fetch_site_subscription($object_id, $object_type);

                $plan_update_result['subscription_success'] = $subscription_result['success'];
                $plan_update_result['subscription_id']= $subscription_result['subscription_id'];
                $plan_update_result['new_credit_card']= $new_credit_card;
                $plan_update_result['last_transaction']= $subscription_result['last_transaction'];
            }
            else{
               $plan_update_result['subscription_success'] = $subscription_result['success'];
               $plan_update_result['msg']= $subscription_result['msg'];
            }

            return $plan_update_result;
            
            
           
        }

        public function get_braintree_plan($braintree_plan_id){

            $plan = aj_braintree_get_plan($braintree_plan_id);

            if (is_null( $plan)) {
                 return new WP_Error( 'braintree_plan_not_found', __( 'Braintree Plan not found.' ), array( 'status' => 500 ) );
            }
            else{
                $braintree_plan['id'] = $plan->id;
                $braintree_plan['billingFrequency'] = $plan->billingFrequency;
                $braintree_plan['currencyIsoCode'] = $plan->currencyIsoCode;
                $braintree_plan['description'] = $plan->description;
                $braintree_plan['name'] = $plan->name;
                $braintree_plan['numberOfBillingCycles'] = $plan->numberOfBillingCycles;
                $braintree_plan['price'] = $plan->price;
                $braintree_plan['trialDuration'] = $plan->trialDuration;
                $braintree_plan['trialDurationUnit'] = $plan->trialDurationUnit;
                $braintree_plan['trialPeriod'] = $plan->trialPeriod;

                return $braintree_plan;
            }

        }

        public function cancel_braintree_plan($object_id, $object_type='site'){

            $customer_id =ajbilling_get_braintree_customer_id($object_id,$object_type);
            if (! empty($customer_id) ) {
                $current_subscription_id =  aj_braintree_get_customer_subscription($customer_id);

                // Cancel this subscription in braintree
                $cancel_subscription = aj_braintree_cancel_subscription($current_subscription_id);
            }else{
                $cancel_subscription =  array('success' => false, 'msg'=>'Customer not in Braintree' );
            }
            
            return $cancel_subscription;

        }

        public function add_braintree_credit_card($object_id, $object_type='site'){

            $customer_id =ajbilling_get_braintree_customer_id($object_id,$object_type);

            if ( empty( $customer_id )) {

                $customer = array();
                if (isset($_REQUEST[ 'customerName' ])) {
                    $customer['firstName'] = $_REQUEST[ 'customerName' ];
                }

                if (isset($_REQUEST[ 'customerEmail' ])) {
                    $customer['email'] = $_REQUEST[ 'customerEmail' ];
                }
                $create_customer = aj_braintree_create_customer($customer);
                
                if ( !$create_customer->success ){
                            // return error array
                    return array('success' => false ,'msg'=>$create_customer->message );
                }
                $customer_id = $create_customer->customer->id;

                // update braintree customer in site options
                ajbilling_update_plugin_site_options($object_id,$object_type,'braintree-customer-id',$customer_id);
            }

            $payment_method_nonce = $_REQUEST[ 'paymentMethodNonce' ];

            $add_card = ajbilling_add_credit_card_to_customer($customer_id,$payment_method_nonce);

            if (  !$add_card['success'] ) {
                // return error array
                return array('success' => false ,'msg'=>$add_card['msg'] );
            }
            $card_token = $add_card['creditCardToken'];
            $new_credit_card = aj_braintree_get_creditcard($card_token);

            $result = array('success' => $add_card['success'], 'new_credit_card' => $new_credit_card );
            return $result;

        }

        public function update_site_plan($object_id, $object_type='site', $plan_id ){

            $result = ajbilling_update_site_plan($object_id, $object_type='site', $plan_id );

            return  $result;

        }

        public function is_this_user_allowed($object_id , $object_type='site', $feature_component){

            $result = ajbilling_is_this_user_allowed($object_id , $object_type='site', $feature_component);
            return $result;
        }

        public function update_feature_count($object_id , $object_type='site', $feature_component, $plus_or_minus){

            $result = ajbilling_update_feature_count($object_id , $object_type='site', $feature_component, $plus_or_minus);

            return $result;
        }

        public function verify_braintree_webhook(){
           //Verify webhook
            if(isset($_GET["bt_challenge"])) {
                echo(Braintree_WebhookNotification::verify($_GET["bt_challenge"]));
            } 

            //only verifying?
            if(empty($_REQUEST['bt_payload']))
                exit;


        }

        public function braintree_webhook_notifications(){

            //get notification
            $webhookNotification = Braintree_WebhookNotification::parse(
              $_REQUEST['bt_signature'], $_REQUEST['bt_payload']
              );
            
            ajbilling_braintree_webhook_notifications($webhookNotification);
        }

        public function set_active_subscription_card($subscription_id, $new_card_token){
            
            $current_subscription = aj_braintree_get_subscription($subscription_id );
            $current_subscription_status = $current_subscription['subscription_status'];
            $current_paymentmethod_token = $current_subscription['paymentMethodToken'];
            $current_merchant_account = $current_subscription['merchantAccountId'];

            if ($current_paymentmethod_token===$delete_card_token) {
                return array('success' => false, 'msg'=>'This card is already set as active' );
            }

            switch ($current_subscription_status) {
                case 'Canceled':
                    $result = array('change_card_success' => false , 'msg' => 'Your current paid subscription is canceled and hence the credit card associated to it cannot be changed' );
                    break;

                case 'Past Due':
                    // Update subscription with new credit card and same merchant account
                    $change_credit_card = aj_braintree_update_subscription($subscription_id,$current_paymentmethod_token,NULL,$current_merchant_account,NULL);

                    if ($change_credit_card['success']) {
                        // Retry charge for subscription
                        $retry_charge = aj_braintree_retry_subscription($subscription_id);
                        $result = array('change_card_success' => $change_credit_card['success'], 'subscription_status'=> $change_credit_card['subscription_status'],'subscription_id'=>$change_credit_card['subscription_id'],'retry_charge'=>$retry_charge  );
                    }
                    else{
                        $result = array('change_card_success' => $change_credit_card['success'], 'msg'=> $change_credit_card['message'] );
                    }
                    
                    break;
                
                default:
                    // Update subscription with new credit card and same merchant account
                    $change_credit_card = aj_braintree_update_subscription($subscription_id,$new_card_token,NULL,$current_merchant_account,NULL);
                    
                    if ($change_credit_card['success']) {
                        // Retry charge for subscription
                        $retry_charge = aj_braintree_retry_subscription($subscription_id);
                        $result = array('change_card_success' => $change_credit_card['success'], 'subscription_status'=> $change_credit_card['subscription_status'],'subscription_id'=>$change_credit_card['subscription_id']);
                    }
                    else{
                        $result = array('change_card_success' => $change_credit_card['success'], 'msg'=> $change_credit_card['message'] );
                    }
                    break;
            }

            return $result;
        }


        public function delete_credit_card($subscription_id, $delete_card_token){
            $current_subscription = aj_braintree_get_subscription($subscription_id );
            $current_subscription_status = $current_subscription['subscription_status'];
            $current_paymentmethod_token = $current_subscription['paymentMethodToken'];
            $current_merchant_account = $current_subscription['merchantAccountId'];

            if ($current_paymentmethod_token===$delete_card_token) {
                return array('success' => false, 'msg'=>'This card is currently active. Please change your active card if you wish to forget this card' );
            }

            $delete_card = aj_braintree_delete_payment_method($delete_card_token);
            
            return  $delete_card ;
        }

        public function get_braintree_transactions(){
            $braintree_customer_id = $_REQUEST['customerID'];

            $transactions = aj_braintree_get_transactions($braintree_customer_id);

            return $transactions;
        }

        public function create_one_time_transaction($object_id,$braintree_plan_id, $object_type='site'){
            $customer = array();
            $customer_id =ajbilling_get_braintree_customer_id($object_id,$object_type);

            if (isset($_POST[ 'customerName' ])) {
                $customer['firstName'] = $_REQUEST[ 'customerName' ];
            }

            if (isset($_POST[ 'customerEmail' ])) {
                $customer['email'] = $_REQUEST[ 'customerEmail' ];
            }

            // if payment method token is set then update subscription with existing card
            if (isset($_REQUEST[ 'paymentMethodToken' ])) {
                $paymentMethodToken = $_REQUEST[ 'paymentMethodToken' ];
            }
            else if (isset($_REQUEST[ 'paymentMethodNonce' ]) &&  empty( $customer_id ) ){
                $paymentMethodNonce = $_REQUEST[ 'paymentMethodNonce' ];

                // if not already a braintree customer create customer with credit card
                $create_customer = ajbilling_create_customer_with_card($customer,$paymentMethodNonce);
                
                if ( !$create_customer['success'] ){
                            // return error array
                    return array('success' => false ,'msg'=>$create_customer['msg'] );
                }
                $customer_id = $create_customer['customerId'];

                // update braintree customer in site options
                ajbilling_update_plugin_site_options($object_id,'site','braintree-customer-id',$customer_id);

                $paymentMethodToken = $create_customer['creditCardToken'];
            }
            else if (isset($_REQUEST[ 'paymentMethodNonce' ])){
                $paymentMethodNonce = $_REQUEST[ 'paymentMethodNonce' ];
                // Add new credit card to customer
                $create_payment_method = aj_braintree_create_payment_method($customer_id, $paymentMethodNonce);
                
                if ( !$create_payment_method->success ) {
                  return array( 'success' => $create_payment_method->success, 'msg' => $create_payment_method->message );  
                } 

                $paymentMethodToken = $create_payment_method->paymentMethod->token;
                
            }

            // Create transaction with token and amount
           $transaction_result = ajbilling_create_onetime_transaction($paymentMethodToken,$braintree_plan_id);
    
            if ($transaction_result['success']){
                // // Update customer custom field with one time transaction id
                // $customer_array = array('customFields' => 
                //     array( 'assisted_setup' => $transaction_result['id'])
                //     );
                // $update_customer = aj_braintree_update_customer($customer_id,$customer_array );

                // Update in the assisted setup in db 
                ajbilling_update_plugin_site_options($object_id,'site','braintree-assisted-setup',$transaction_result['id']);
               
            }

            return $transaction_result;
        }



    }


