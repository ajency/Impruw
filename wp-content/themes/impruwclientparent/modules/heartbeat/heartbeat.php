<?php

function autosave_page_json( $response, $data, $screen_id ) {
    if ( isset( $data['autosave-page-json'] ) ) {
        
        $autosavedata = $data['autosave-page-json'];

        $page_id = $autosavedata[ 'page_id' ];

        // check if the page is loacked by the time the autosave happens
        if(wp_check_post_lock( $page_id ) === false){

    	    $header_json = $autosavedata[ 'header-json' ];
    	    update_header_json( $header_json, true );

    	    $footer_json = $autosavedata[ 'footer-json' ];
    	    update_footer_json( $footer_json, true );

    	    $page_json_string = $autosavedata[ 'page-content-json' ];
    	    $page_json = convert_json_to_array( $page_json_string );
    	    $autosave_id = update_page_autosave( $page_id, $page_json );
        
            // echo $data['wp_post_lock']['foo']; //prints 'bar';
            $response['autosave-page-json'] = array(
                'success' => true
            );
        }
        else{
            $response['autosave-page-json'] = array(
                'success' => false,
                'autosavedata' => $autosavedata
            );
        }
    }
    return $response;
}

add_filter( 'heartbeat_received', 'autosave_page_json', 10, 3 );