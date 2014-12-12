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
           $routes['/ajbilling/plans/(?P<object_id>\d+)'] = array(
            array( array( $this, 'fetch_all_plans'), WP_JSON_Server::READABLE ),
            );

           $routes['/ajbilling/plan/(?P<object_id>\d+)/(?P<object_type>\S+)'] = array(
            array( array( $this, 'fetch_plan'), WP_JSON_Server::READABLE ),
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

        public function update_site_plan($object_id, $object_type='site', $plan_id ){

            global $wpdb;

            $count_type_features = ajbilling_get_all_feature_components('count_type');
            $feature_count_array = array();
            foreach ($count_type_features as $count_type_feature) {
                $feature_count_array[] =  array('name' =>$count_type_feature['name'] , 'key' =>$count_type_feature['key'], 'count' => 0 );
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

            return  array('code'=>'OK','update_success'=> $update_plan_status, 'plan_id'=>$plan_id );

        }

        public function is_this_user_allowed($object_id , $object_type='site', $feature_component){

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
            $plugin_plan = $this->fetch_plan($object_id, $object_type='site');

            $site_plan_id = $plugin_plan['id'];

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
                        foreach ($site_features as $site_feature) {
                            if ($site_feature['key']==$feature_component) {
                                $plugin_feature_count = ajbilling_get_plugin_feature_count($site_plan_id,$feature_component);
                                // If site feature count is less or equal to plugin feature count return allowed
                                if ($site_feature['count']<=$plugin_feature_count) {
                                    $result = array('code' => 'OK' , 'allowed'=>1 );
                                }
                                else{
                                    $result = array('code' => 'OK' , 'allowed'=>0 );
                                }

                            }
                        }
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

        public function update_feature_count($object_id , $object_type='site', $feature_component, $plus_or_minus){

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


    }


