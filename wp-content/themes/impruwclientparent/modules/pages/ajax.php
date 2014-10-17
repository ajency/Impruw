<?php

// Incluse all files
include_once 'functions.php';

/**
 * enable forced revision
 * @param  [type] $revision_count [description]
 * @return [type]                 [description]
 */
function impruw_wp_revisions_to_keep($revision_count, $post){
    return 40;
}

add_filter('wp_revisions_to_keep', 'impruw_wp_revisions_to_keep', 100, 2);

/**
 * [get_pages description]
 * @return [type] [description]
 */
function get_pages1() {

    // check the request for layouts/ or / pages
    $templates = isset( $_GET[ 'meta_key' ] ) ? TRUE : FALSE;

    if ( !$templates )
        $pages = get_all_menu_pages();
    else
        $pages = get_theme_templates();

    wp_send_json( array( 'code' => 'OK', 'data' => $pages ) );
}

add_action( 'wp_ajax_get-pages', 'get_pages1' );

/**
 * Create a new page
 */
function create_page_ajax() {
    global $sitepress;
    $current_default_language = wpml_get_default_language();
    $data = $_POST;
    //unset action param
    unset( $data[ 'action' ] );

    $is_theme_template = $data['is_theme_template'] == 'true'? true : false;
   


    //pass remaining data to create a new page
    $id_or_error = create_new_page( $data );

    if ( is_wp_error( $id_or_error ) ){
        wp_send_json( array( 'code' => 'ERROR', 'message' => $id_or_error->get_error_message() ) );
    }
    else
    {
        //create translated versions of the above page in all available languages
        $current_active_languages = wpml_get_active_languages();

        $original_page_id = $id_or_error;

        foreach ($current_active_languages as $language) {
            if($language['code']!=$current_default_language){
               $page_id_based_on_lang = duplicate_language_page($original_page_id,$language['code'],"page");
           }
        }

        //Get english id of the page
        $english_page_id = icl_object_id($original_page_id, 'page', true,'en');

        //check if add_to_menu is set then add the english version of the page to menu
        $page_order = $data[ 'menu_order' ] + 1;
        // if ( $data[ 'add_to_menu' ] == "true" ) {
        //     add_page_to_menu( $english_page_id, $page_order );
        // }

        // check what is the template id needed to create the page
        $template_page_id = (int)$data[ 'template_page_id' ];
        
        if (!$is_theme_template){
            //get english page template id
            $english_template_id = icl_object_id($template_page_id, 'page', true,'en');
        }
        else{
            $english_template_id = $template_page_id;
        }

        //Assign english page's template json to english version of the page
        $json_page_id = assign_page_template($english_template_id, $english_page_id, $is_theme_template);

        //Pass the id of the english version of the page as $page_data['original_id']
        $page_data = get_post( $original_page_id, ARRAY_A );
        $page_data['original_id'] = $english_page_id;
    }

    wp_send_json( array( 'code' => 'OK', 'data' => $page_data ) );
}

add_action( 'wp_ajax_create-page', 'create_page_ajax' );

/**
 * Publish page
 */
function publish_page_ajax() {

    $page_id = $_REQUEST[ 'page_id' ];

    $instance_id = $_REQUEST['instance_id'];

    if(!check_app_instace($instance_id)){
        wp_send_json(array(
            'success' => false,
            'new_instance' => true,
            'reason' => __('Looks like the sitebuilder for sitename is opened some other place. Close this page to continue working.')
        ));
    }
    
    //check if page is locked
    $user_id = wp_check_post_lock( $page_id );

    if ($user_id === false){

        if (impruw_is_front_page( $page_id )){
        
            $header_json = $_REQUEST[ 'header-json' ];
            update_header_json( $header_json , true); //autosave
            
            // $header_json = get_json_to_clone('theme-header-autosave');
            // print_r($header_json);
            // update_option( THEME_HEADER_KEY, $header_json );
            publish_footer_header_json( 'header', $header_json );
            
            // $header_json = convert_json_to_array( $header_json );
            // update_option( "theme-header-autosave", $header_json );

            $footer_json = $_REQUEST[ 'footer-json' ];
            update_footer_json( $footer_json, true ); // autosave
            // $footer_json = get_json_to_clone( "theme-footer-autosave" );
            // update_option( THEME_FOOTER_KEY , $footer_json );
            publish_footer_header_json( 'footer', $footer_json);
        }

        remove_all_actions( 'post_updated' );

        //set page json
        publish_page( $page_id );

        $page_json_string = $_REQUEST[ 'page-content-json' ];
        $page_json = convert_json_to_array( $page_json_string );
        add_page_json( $page_id, $page_json );

        //get all the elements array using layout
        $page_elements = create_page_element_array($page_json);
        // update post meta page-elements
        update_page_elements($page_id,$page_elements);

        $revision_post_id = add_page_revision( $page_id, $page_json );

        update_page_autosave( $page_id, $page_json );

        //$revision_data = get_post( $revision_post_id );

        wp_send_json( array( 'success' => true, 'page_id' => $page_id));
    }
    else{
        $user = get_userdata( $user_id );
        $response = array(
            'success' => false,
            'reason' => __('Sorry!! ' . $user->display_name . ' is currently editing the page' )
        );
        wp_send_json($response);
    }
}

add_action( 'wp_ajax_publish-page', 'publish_page_ajax' );

/**
 * [save_page_json description]
 *
 * @return [type] [description]
 */
function auto_save() {

    $page_id = $_REQUEST[ 'page_id' ];

    if (impruw_is_front_page( $page_id )){
        
        $header_json = $_REQUEST[ 'header-json' ];
        update_header_json( $header_json, true );

        $footer_json = $_REQUEST[ 'footer-json' ];
        update_footer_json( $footer_json, true );
    }

    $page_json_string = $_REQUEST[ 'page-content-json' ];
    $page_json = convert_json_to_array( $page_json_string );
    $autosave_id = update_page_autosave( $page_id, $page_json );

    wp_send_json_success( $autosave_id );
}

//add_action( 'wp_ajax_auto-save', 'auto_save' );

/**
 * Function to read a single page data
 */
function ajax_read_page() {
    $page_id = $_GET[ 'ID' ];

    $page_data = get_post( $page_id, ARRAY_A );

    wp_send_json( array( 'code' => 'OK', 'data' => $page_data ) );

}

add_action( 'wp_ajax_read-page', 'ajax_read_page' );

/**
 * Function to update the name of a page
 */
function ajax_update_page() {
    $page_id = $_POST[ 'ID' ];
    $page_name = $_POST[ 'post_title' ];

    wp_update_post( array( 'ID' => $page_id, 'post_title' => $page_name ) );

    $page_data = get_post( $page_id, ARRAY_A );

    wp_send_json( array( 'code' => 'OK', 'data' => $page_data ) );

}

add_action( 'wp_ajax_update-page', 'ajax_update_page' );


function take_over_page_editing(){

    $page_id = $_REQUEST['page_id'];
    wp_set_post_lock($page_id);
    wp_send_json(1);
}
add_action('wp_ajax_take_over_page_editing', 'take_over_page_editing');

