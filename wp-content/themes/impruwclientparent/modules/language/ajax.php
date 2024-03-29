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


// function ajax_update_hidden_languages(){
//     global $sitepress;

//     $language_code = $_POST['languageCode'];
//     $is_hidden = $_POST['isHidden'];

//     $sitepress_settings = $sitepress->get_settings();
//     $old_hidden_languages = $retVal = (empty($sitepress_settings['hidden_languages'])) ? array() : $sitepress_settings['hidden_languages'] ;
//     $new_hidden_languages = array($language_code);
//     $final_array = array();


//     $hidden_languages_diff = array_values(array_diff($old_hidden_languages, $new_hidden_languages));


//     if ($is_hidden) {
//         $final_array = array_values(array_merge($hidden_languages_diff,$new_hidden_languages));
//      } 
//      else{
//         $final_array = $hidden_languages_diff;
//      }

//     $iclsettings = get_option('icl_sitepress_settings');

//     $iclsettings['hidden_languages'] = $final_array;
    
//     update_option('icl_sitepress_settings', $iclsettings);

//     $active_languages = $sitepress->get_active_languages();
//     if(!empty($iclsettings['hidden_languages'])){
//        if(1 == count($iclsettings['hidden_languages'])){
//            $out = sprintf(__('%s is currently hidden to visitors on the live site.', 'sitepress'),
//             $active_languages[$iclsettings['hidden_languages'][0]]['display_name']);
//        }else{
//            foreach($iclsettings['hidden_languages'] as $l){
//                 if(isset($active_languages[$l]))
//                     $_hlngs[] = $active_languages[$l]['display_name'];
//            }
//            $hlangs = join(', ', $_hlngs);
//            $out = sprintf(__('%s are currently hidden to visitors on the live site.', 'sitepress'), $hlangs);
//        }
//        // $out .= ' ' . sprintf(__('You can enable its/their display for yourself, in your <a href="%s">profile page</a>.', 'sitepress'),
//        //  'profile.php#wpml');
//    } 
//    else {
//         $out = __('All languages are currently displayed in the live site', 'sitepress');
//     }
//     wp_send_json( array( 'code' => 'OK', 'data' => json_encode($iclsettings), 'msg' => $out) );


// }
function ajax_update_hidden_languages(){
    global $sitepress;
    $new_hidden_languages = array();
    $new_hidden_languages = empty($_POST['hiddenlanguages']) ? array() : $_POST['hiddenlanguages'];

    $iclsettings = get_option('icl_sitepress_settings');
    $iclsettings['hidden_languages'] = $new_hidden_languages;
    update_option('icl_sitepress_settings', $iclsettings);

    $active_languages = $sitepress->get_active_languages();
    if(!empty($iclsettings['hidden_languages'])){
       if(1 == count($iclsettings['hidden_languages'])){
           $out = sprintf(__('%s is currently hidden to visitors on the live site.', 'sitepress'),
            $active_languages[$iclsettings['hidden_languages'][0]]['display_name']);
       }else{
           foreach($iclsettings['hidden_languages'] as $l){
            if(isset($active_languages[$l]))
                $_hlngs[] = $active_languages[$l]['display_name'];
        }
        $hlangs = join(', ', $_hlngs);
        $out = sprintf(__('%s are currently hidden to visitors on the live site.', 'sitepress'), $hlangs);
    }
       // $out .= ' ' . sprintf(__('You can enable its/their display for yourself, in your <a href="%s">profile page</a>.', 'sitepress'),
       //  'profile.php#wpml');
    } 
    else {
        $out = __('All languages are currently displayed in the live site', 'sitepress');
    }

    wp_send_json( array( 'code' => 'OK', 'data' => array('icl_settings' => json_encode($iclsettings) , 'hidden_langs' =>$new_hidden_languages), 'msg' => $out) );
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

function get_page_smart_tables_ajax(){
    $page_id = $_REQUEST['pageId'];

    $data =  get_page_smarttable_elements($page_id);

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}
add_action( 'wp_ajax_get-page-smart-tables', 'get_page_smart_tables_ajax' );

function get_page_list_tables_ajax(){
    $page_id = $_REQUEST['pageId'];

    $data =  get_page_listtable_elements($page_id);

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}
add_action( 'wp_ajax_get-page-list-tables', 'get_page_list_tables_ajax' );

function get_get_page_tabs_accordions_ajax(){
    $page_id = $_REQUEST['pageId'];

    $data =  get_page_tabs_accordion_elements($page_id);

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}
add_action( 'wp_ajax_get-page-tabs-accordions', 'get_get_page_tabs_accordions_ajax' );

function get_page_sliders_ajax(){
    $page_id = $_REQUEST['pageId'];

    $data =  get_page_slider_collection($page_id);

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}
add_action( 'wp_ajax_get-page-sliders', 'get_page_sliders_ajax' );



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

function get_site_menu_elements_ajax(){
    $language = $_REQUEST['language'];
    $data =  get_site_menu_elements($language);

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}
add_action( 'wp_ajax_get-site-menu-elements', 'get_site_menu_elements_ajax' );



function update_translated_page_title(){
    $page_title = $_REQUEST['page_title'];
    $page_id = $_REQUEST['page_id'];

    // Update post with id = $room_id
    $page = array(
        'ID'           => $page_id,
        'post_title'   => $page_title,
        'post_type'    => 'page'
    );
    global $wpdb;
    $all_names = $wpdb->get_col( "SELECT post_title FROM {$wpdb->posts} WHERE post_type = 'page'" );
    $page['post_title'] = impruw_page_find_alternate_name( $all_names, $page['post_title'] );


    // Update the post into the database
    $return_post_id = wp_update_post( $page );

    $data['post_id'] = $return_post_id;
    $data['post_title'] = $page['post_title'];

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}
add_action( 'wp_ajax_update-translated-page-title', 'update_translated_page_title' );


function update_translated_page_url(){
    $page_slug = $_REQUEST[ 'page_url' ];
    $page_id = $_REQUEST['page_id'];
    global $wpdb;
    $page_slug = preg_replace('/[^A-Za-z0-9-]+/', '-', $page_slug);

    $all_names = $wpdb->get_col( "SELECT post_name FROM {$wpdb->posts} WHERE post_type = 'page'" );
    $page_slug = impruw_page_find_alternate_name( $all_names, $page_slug );


    $wpdb->update( $wpdb->posts, array(  'post_name' => $page_slug ), array( 'ID' => $page_id ) );

    $data['post_id'] = $page_id;
    $data['post_name'] = $page_slug;
    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}
add_action( 'wp_ajax_update-translated-page-url', 'update_translated_page_url' );

function update_pageTabAccordionElements(){
    $page_id = $_POST['json-page-id'];
    $page_id = icl_object_id($page_id, 'page', true,'en');

    //array of TabNames to be updated
    $tabElements = $_POST['tabElements'];

    $updated_page_json = update_tabTanslation_page_json($page_id,$tabElements);

    wp_send_json( array( 'code' => 'OK', 'data' => array('page-id'=>$page_id,'page-json'=>json_encode($updated_page_json)) ) );
}
add_action( 'wp_ajax_update-pageTabAccordionElements', 'update_pageTabAccordionElements' );

function update_element_content(){

    $page_id = $_POST['json-page-id'];

    $page_id = icl_object_id($page_id, 'page', true,'en');
    
    $page_element_meta_id = $_POST['meta_id'];
    
    // update meta in page-elements as well
    $impruw_page_elements_original = get_post_meta($page_id,'page-elements',true);

    $impruw_page_elements_modified = array();

    foreach ($impruw_page_elements_original  as $page_element) {
        if ($page_element['meta_id'] == $page_element_meta_id) {
            if ($page_element['element'] === 'Link') {
                $page_element['text'] = $_POST['text'] ;
            }
            else if($page_element['element'] === 'SmartTable'){
                $page_element['contents'] = $_POST['contents'] ;
            }
            else if($page_element['element'] === 'List'){
                $page_element['contents'] = $_POST['contents'] ;
            }
            else{
                $page_element['content'] = $_POST['content'] ;
            }

        }
        $impruw_page_elements_modified[] = $page_element;
    }

    update_post_meta($page_id, 'page-elements', $impruw_page_elements_modified);
    unset($_POST['json-page-id']);
    
    update_element_model();

}

add_action( 'wp_ajax_create-pageElements', 'update_element_content' );
add_action( 'wp_ajax_create-pageSmartTableElements', 'update_element_content' );
add_action( 'wp_ajax_create-pageListTableElements', 'update_element_content' );
add_action( 'wp_ajax_create-pageTableElements', 'update_element_content' );

function update_header_element_content(){

    $element_meta_id = $_POST['meta_id'];

    global $wpdb;

    $table_name = $wpdb->prefix . 'header_footer_backup';

    $sql = "SELECT elements FROM " . $table_name . " WHERE `type`= 'theme-header-published'";

    $query_result = $wpdb->get_row( $sql);

    $header_elements = maybe_unserialize($query_result->elements);

    $header_elements_modified = array();

    foreach ($header_elements  as $header_element) {
        if ($header_element['meta_id'] == $element_meta_id) {
            if ($header_element['element'] === 'Link') {
                $header_element['text'] = $_POST['text'] ;
            }
            else{
             $header_element['content'] = $_POST['content'] ;
            }

        }
        $header_elements_modified[] = $header_element;
    }

    $serialized_header_elements_modified = maybe_serialize($header_elements_modified);

    $wpdb->update( $table_name, array( 'elements' => $serialized_header_elements_modified ), array( 'type' => 'theme-header-published') );
    
    update_element_model();

}

add_action( 'wp_ajax_create-headerElements', 'update_header_element_content' );

function update_footer_element_content(){

    $element_meta_id = $_POST['meta_id'];

    global $wpdb;

    $table_name = $wpdb->prefix . 'header_footer_backup';

    $sql = "SELECT elements FROM " . $table_name . " WHERE `type`= 'theme-footer-published'";

    $query_result = $wpdb->get_row( $sql);

    $footer_elements = maybe_unserialize($query_result->elements);

    $footer_elements_modified = array();

    foreach ($footer_elements  as $footer_element) {
        if ($footer_element['meta_id'] == $element_meta_id) {
            if ($footer_element['element'] === 'Link') {
                $footer_element['text'] = $_POST['text'] ;
            }
            else{
             $footer_element['content'] = $_POST['content'] ;
            }

        }
        $footer_elements_modified[] = $footer_element;
    }

    $serialized_footer_elements_modified = maybe_serialize($footer_elements_modified);

    $wpdb->update( $table_name, array( 'elements' => $serialized_footer_elements_modified ), array( 'type' => 'theme-footer-published') );
    
    update_element_model();

}
add_action( 'wp_ajax_create-footerElements', 'update_footer_element_content' );

function update_translated_menu_item_ajax(){

    $menu_item_id = $_REQUEST['menuItemId'];
    $language = $_REQUEST['language'];
    $menuitem_translated_label = $_REQUEST['translatedMenuItemTitle'];

    $update_status = translate_custom_menu_item($menu_item_id, $language, $menuitem_translated_label);

    $data = array('menu_item_id'=> $menu_item_id, 'update_status' => $update_status );

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}
add_action( 'wp_ajax_update-translated-menu-item', 'update_translated_menu_item_ajax' );

 // remove language selector if only one language is enabled
add_action('wp_head', 'wpml_hide_langs');
function wpml_hide_langs() {
    $languages = icl_get_languages('skip_missing=1');
     
    //if it is equal to one, hiding the flags.
    if(count($languages) == 1 ) {
        echo '<style type="text/css" media="screen">#lang_sel { display: none; }</style>';
    }
}

// Using WPML, when taxonomies are spelled exactly the same in 2 languages (i.e. "documents"), WPML appends @language to the taxonomy name.
// This filter strips it from the displayed name.
if ( !(defined( 'DOING_AJAX' ) && DOING_AJAX) ){
        add_filter( 'wp_get_object_terms', 'taxonomies_filter_fix' );
}

function taxonomies_filter_fix($terms){
    foreach ( $terms as $order => $term ) {
        if (strpos($term->name,'@'.ICL_LANGUAGE_CODE) !== false)
             $terms[$order]->name = str_replace('@'.ICL_LANGUAGE_CODE, '', $term->name);
    }
    return $terms;
}

// Make rooms and facility wpml translatable
function make_room_and_facility_translatable(){
    // get actual icl settings
    $iclsettings = get_option('icl_sitepress_settings');

    // modify icl settings
    $iclsettings['custom_posts_sync_option']['impruw_room'] = 1;
    $iclsettings['taxonomies_sync_option']['impruw_room_facility'] = 1;

    // update icl settings
    update_option('icl_sitepress_settings', $iclsettings);
}

add_action( 'wp_loaded', 'make_room_and_facility_translatable' );
