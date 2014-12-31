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
            array( array( $this, 'change_site_braintree_plan'), WP_JSON_Server::EDITABLE | WP_JSON_Server::ACCEPT_JSON ),
            );


           return $routes;

        }

        public function fetch_all_plans($object_id){

            $billing_plans = ajbilling_fetch_all_plans($object_id, $object_type='site');

            return $billing_plans;

        }

        public function fetch_plan($object_id, $object_type='site'){

            $billing_plan = ajbilling_fetch_plan($object_id, $object_type='site');

            return $billing_plan;
           
        }

        public function fetch_all_credit_cards($object_id, $object_type='site'){

            $customer_id = ajbilling_get_braintree_customer_id($object_id,$object_type);

            if ( empty( $customer_id ) ) {
                $credit_cards = array( 'card_exists' => false,
                    'customer_id' => $customer_id,
                    'braintree_client_token' => generate_client_token() );
            } else {
                $credit_cards =  aj_braintree_get_customer_creditcards($customer_id);
            }
            
            return $credit_cards;
           
        }

        public function change_site_braintree_plan($object_id, $object_type, $plan_id, $braintree_plan_id ){

            if (isset($_POST[ 'customerId' ])) {
                $customerId = $_POST[ 'customerId' ];
            }

            if (isset($_POST[ 'customerName' ])) {
                $customerName = $_POST[ 'customerName' ];
            }

            if (isset($_POST[ 'customerEmail' ])) {
                $customerEmail = $_POST[ 'customerEmail' ];
            }

            // if payment method token is set then update subscription with existing card
            if (isset($_POST[ 'paymentMethodToken' ])) {
                // subscribe_user_to_plan
                echo "paymentMethodToken";
            }
            else if (isset($_POST[ 'paymentMethodNonce' ])){
                echo "paymentMethodNonce";
                // if payment method nonce is passed create subscription with new credit card

                // Check if customerId is empty or not i.e. if it is a braintree customer 
                    // if braintree customer => add new card to existing customer 
                        // if card added successfully => subscribe_user_to_plan
                    
                    // else create customer with credit card
                        // if customer creation is successful => subscribe_user_to_plan

                    // *subscribe_user_to_plan 
                          // - update subscription if current subscription is not default
                          // - create subscription if current subscription is default
            }
            
            
           
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

    }


