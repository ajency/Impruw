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

        /*Register Routes*/
        public function register_routes( $routes ) {
           $routes['/ajbilling/plan/(?P<object_id>\d+)'] = array(
            array( array( $this, 'fetch_plan'), WP_JSON_Server::READABLE ),
            );

           return $routes;

        }

        public function fetch_plan($object_id, $object_type='site'){

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
            $sqlQuery = "SELECT * FROM $plugin_plans_table WHERE id=".$site_plan_id;

            $site_plan = $wpdb->get_row($sqlQuery, ARRAY_A);

            if(!mysql_errno())
            {

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
                return $billing_plan;
            }
            else{
                $billing_plan['success'] = 0;
                $billing_plan['msg'] = 'Unable to fetch plan details from db';
            }
           

        }

    }


