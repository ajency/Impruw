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

    // //Rename the API prefix
    // function aj_change_json_rest_api_prefix($prefix){
    //     return "api";

    // }
    // add_filter( 'json_url_prefix', 'change_json_rest_api_prefix',10,1);

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
           $routes['/ajbilling/plans/(?P<object_id>\d+)'] = array(
            array( array( $this, 'fetch_all_plans'), WP_JSON_Server::READABLE ),
            );

           return $routes;

        }

        public function fetch_all_plans($object_id, $object_type='site'){

            global $wpdb;

            $billing_plan = array();

            //Get site plan id from site options
            $user_site_plan = "";
            if ( is_multisite() ){
                switch_to_blog( $object_id );
                $user_site_plan = get_option('site_payment_plan');
                restore_current_blog();
            }
            else{
                $user_site_plan = get_option('site_payment_plan');
            }

            $site_plan_id = $user_site_plan['plan_id'];

            $plugin_plans_table = $wpdb->base_prefix.'aj_billing_plans'; 
            $sqlQuery = "SELECT * FROM $plugin_plans_table WHERE id=".$site_plan_id;

            $site_plan = $wpdb->get_row($sqlQuery, ARRAY_A);
           
            $billing_plan['id'] = $site_plan['id'];
            $billing_plan['title'] = $site_plan['title'];
            $billing_plan['status'] = $site_plan['status'];
            $billing_plan['braintree_plans'] = array();

            $braintree_plan_ids = maybe_unserialize($site_plan['braintree_plan_id']);

            foreach ($braintree_plan_ids as $braintree_plan_id) 
            {
                try {
                    $braintree_plan = aj_braintree_get_plan($braintree_plan_id);
                    $billing_plan['braintree_plans'][] = (array)$braintree_plan;
                } catch (Braintree_Exception_SSLCertificate $e) {
                    echo $e->getMessage();
                }
                
            }

            $plan_features = maybe_unserialize($site_plan['features']);

            $billing_plan['plan_features'] = array();

            foreach ($plan_features as $plan_feature) {
                $billing_plan['plan_features'][] = $plan_feature;
            }

            return $billing_plan;

        }

    }


