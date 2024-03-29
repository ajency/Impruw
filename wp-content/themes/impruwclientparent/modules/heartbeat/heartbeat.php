<?php

function autosave_page_json( $response, $data, $screen_id ) {
    if ( isset( $data['autosave-page-json'] ) ) {

        if(!check_app_instace($data['autosave-page-json']['instance_id'])){
            $response['autosave-page-json'] = array(
                'success' => false,
                'new_instance' => true,
                'reason' => __('Looks like the sitebuilder for sitename is opened some other place. Close this page to continue working.')
            );
            return $response;
        }
        
        $autosavedata = $data['autosave-page-json'];

        $page_id = $autosavedata[ 'page_id' ];

        $page_id= icl_object_id( $page_id, 'page', TRUE, 'en' );
        
        // check if the page is loacked by the time the autosave happens
        $user_id = wp_check_post_lock( $page_id );
        if( $user_id === false){

            if (impruw_is_front_page( $page_id )){ 

        	    $header_json = $autosavedata[ 'header-json' ];
        	    update_header_json( $header_json, true );

        	    $footer_json = $autosavedata[ 'footer-json' ];
        	    update_footer_json( $footer_json, true );
            }

    	    $page_json_string = $autosavedata[ 'page-content-json' ];
    	    $page_json = convert_json_to_array( $page_json_string );
    	    $autosave_id = update_page_autosave( $page_id, $page_json );

            // update last modified
            wp_update_post( array('ID' => $autosave_id, 'post_modified' => current_time('mysql')) );

            // echo $data['wp_post_lock']['foo']; //prints 'bar';
            $response['autosave-page-json'] = array(
                'success' => true,
                'autosave_id' => $autosave_id,
                '_last_updated' => current_time('mysql')
            );
        }
        else{
            $user = get_userdata( $user_id );
            $response['autosave-page-json'] = array(
                'success' => false,
                'reason' => __('Page taken over by ' . $user->display_name)
            );
        }
    }
    return $response;
}

add_filter( 'heartbeat_received', 'autosave_page_json', 10, 3 );



function check_builder_instance( $response, $data, $screen_id ) {
    if ( isset( $data['check-instance'] ) ) {

        if(!check_app_instace($data['check-instance']['instance_id'])){
            $response['check-instance'] = array(
                'success' => false,
                'new_instance' => true,
                'reason' => __('Looks like the sitebuilder for sitename is opened some other place. Close this page to continue working.')
            );
            return $response;
        }
    }

    return $response;
}
add_filter( 'heartbeat_received', 'check_builder_instance', 10, 3 );