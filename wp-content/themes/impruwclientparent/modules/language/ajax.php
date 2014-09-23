<?php
/**
 * Ajax function to populate Language model
 */
function ajax_read_language() {
	$data['ID'] = 1;

	$wpml_options = get_option( 'icl_sitepress_settings' );
	$default_language_code = $wpml_options['default_language'];

    $data[ 'default_language' ] = get_language_names($default_language_code);

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
   
}

add_action( 'wp_ajax_read-language', 'ajax_read_language' );


/**
 * Ajax function to populate Language collection
 */
function ajax_get_languages() {
	$wpml_options = get_option( 'icl_sitepress_settings' );
	$default_language_code = $wpml_options['default_language'];

	$data = get_all_languages();

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
   
}

add_action( 'wp_ajax_get-languages', 'ajax_get_languages' );

/**
 * Ajax function to update Language model
 */
function ajax_update_language(){

	global $sitepress;

	$data = array();
	$data['code'] = $_POST['code'];
	$data['languageName'] = $_POST['languageName'];
	$data['selectStatus'] = $_POST['selectStatus'];


	$languageCodes = array($_POST['code']);
	if($sitepress->set_active_languages($languageCodes)){
		wp_send_json( array( 'code' => 'OK', 'data' => $data));
	}
	else{
		wp_send_json( array( 'code' => 'ERROR', 'message' => 'Could not enable selected languages' ) );
	}

}

add_action( 'wp_ajax_update-language', 'ajax_update_language' );


function ajax_update_enabled_languages(){
	global $sitepress;

	$data = $_POST['enabledlanguages'];

	$lang_codes = explode(',',$data);

    $active_languages = array();
    $current_active_languages = wpml_get_active_languages();

    $current_site_id = get_current_blog_id();

    foreach ($current_active_languages as $language) {
        array_push($active_languages, $language['code']);
    }

    $newly_activated_languages = array_diff($lang_codes, $active_languages);

	$sitepress->set_active_languages($lang_codes);

    if(count($newly_activated_languages) > 0){
        foreach ($newly_activated_languages as $language) {
            //Call translate_site();
            $clone_pages = FALSE;
            enable_language($language);
            translate_site($current_site_id, $language);
        }
    }

    wp_send_json( array( 'code' => 'OK', 'data' => json_encode($lang_codes) , 'current_site_id' => $current_site_id) );


}

add_action( 'wp_ajax_update-enabled-languages', 'ajax_update_enabled_languages' );


function ajax_update_hidden_languages(){
    global $sitepress;

    $language_code = $_POST['languageCode'];
    $is_hidden = $_POST['isHidden'];

    $sitepress_settings = $sitepress->get_settings();
    $old_hidden_languages = $sitepress_settings['hidden_languages'];
    $new_hidden_languages = array($language_code);
    $final_array = array();


    $hidden_languages_diff = array_values(array_diff($old_hidden_languages, $new_hidden_languages));


    if ($is_hidden) {
        $final_array = array_values(array_merge($hidden_languages_diff,$new_hidden_languages));
     } 
     else{
        $final_array = $hidden_languages_diff;
     }

    $iclsettings = get_option('icl_sitepress_settings');

    $iclsettings['hidden_languages'] = $final_array;
    
    update_option('icl_sitepress_settings', $iclsettings);
    wp_send_json( array( 'code' => 'OK', 'data' => json_encode($iclsettings)) );


}
add_action( 'wp_ajax_update-hidden-languages', 'ajax_update_hidden_languages' );


function fetch_language_facility_ajax(){

    $editingLang = $_REQUEST['editlanguage'];
    $defaultLang = wpml_get_default_language();

    $data = get_language_facilities($editingLang,$defaultLang); 

    wp_send_json( array( 'code' => 'OK', 'data' => $defaultLang ) );

}

add_action( 'wp_ajax_fetch-language-facility', 'fetch_language_facility_ajax' );

function get_language_page_ajax(){

    $page_id = $_REQUEST['pageId'];
    $page_id= icl_object_id( $page_id, 'page', TRUE, 'en' );
    
    $language = $_REQUEST['language'];

    $data = get_language_page($page_id,$language);

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );

}
add_action( 'wp_ajax_get-language-page', 'get_language_page_ajax' );


function get_page_by_language_ajax(){
    $page_id = $_REQUEST['pageId'];

    if(ISSET($_REQUEST['pageLang'])){
        $language = $_REQUEST['pageLang'];
    }
    else{
        $language = wpml_get_default_language();
    }

    $data = get_page_by_lang($page_id,$language);

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}
add_action( 'wp_ajax_get-page-by-language', 'get_page_by_language_ajax' );



function get_page_elements_ajax(){
    $page_id = $_REQUEST['pageId'];

    $data =  get_page_translation_elements($page_id);

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}
add_action( 'wp_ajax_get-page-elements', 'get_page_elements_ajax' );

function get_page_tables_ajax(){
    $page_id = $_REQUEST['pageId'];

    $data =  get_page_table_elements($page_id);

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}
add_action( 'wp_ajax_get-page-tables', 'get_page_tables_ajax' );



function get_header_elements_ajax(){
    $data =  get_header_translation_elements();

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}
add_action( 'wp_ajax_get-header-elements', 'get_header_elements_ajax' );

function get_footer_elements_ajax(){
    $data =  get_footer_translation_elements();

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}
add_action( 'wp_ajax_get-footer-elements', 'get_footer_elements_ajax' );



function update_translated_page_title(){
    $page_title = $_REQUEST['page_title'];
    $page_id = $_REQUEST['page_id'];

    // Update post with id = $room_id
    $page = array(
        'ID'           => $page_id,
        'post_title'   => $page_title,
        'post_type'    => 'page'
    );

    // Update the post into the database
    $return_post_id = wp_update_post( $page );

    $data['post_id'] = $return_post_id;

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}
add_action( 'wp_ajax_update-translated-page-title', 'update_translated_page_title' );

add_action( 'wp_ajax_create-pageElements', 'update_element_model' );
add_action( 'wp_ajax_create-pageTableElements', 'update_element_model' );
add_action( 'wp_ajax_create-headerElements', 'update_element_model' );
add_action( 'wp_ajax_create-footerElements', 'update_element_model' );

 // remove language selector if only one language is enabled
add_action('wp_head', 'wpml_hide_langs');
function wpml_hide_langs() {
    $languages = icl_get_languages('skip_missing=1');
     
    //if it is equal to one, hiding the flags.
    if(count($languages) == 1 ) {
        echo '<style type="text/css" media="screen">#lang_sel { display: none; }</style>';
    }
}


