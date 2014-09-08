<?php

class WPML_Async_Task extends WP_Async_Task {

    protected $action = 'imp_setup_wpml';

    /**
     * Prepare data for the asynchronous request
     *
     * @throws Exception If for any reason the request should not happen
     *
     * @param array $data An array of data sent to the hook
     *
     * @return array
     */
    protected function prepare_data( $data ) {
        $site_id = $data[0];
        $user_id = $data[1];
        return array( 'site_id' => $site_id, 'user_id' => $user_id );
    }

    /**
     * Run the async task action
     */
    protected function run_action( ) {
        
        $site_id = $_POST['site_id'];
        $user_id = $_POST['user_id'];
        do_action( "wp_async_$this->action", $site_id, $user_id );
    }
}

/**
 * [async_imp_setup_wpml description]
 * @param  [type] $site_id [description]
 * @param  [type] $user_id [description]
 * @return [type]          [description]
 */
function async_imp_setup_wpml($site_id, $user_id){
    wpml_setup($site_id, $user_id);
}
add_action('wp_async_nopriv_imp_setup_wpml', 'async_imp_setup_wpml', 100, 2);

/**
 * [setup_wpml_async_task description]
 * @return [type] [description]
 */
function setup_wpml_async_task(){
    new WPML_Async_Task(2);
}
add_action('wp_loaded', 'setup_wpml_async_task');
