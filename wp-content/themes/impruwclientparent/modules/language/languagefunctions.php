<?php
function detect_user_language(){
	$currentUser = wp_get_current_user();
    $currentUserId = $currentUser->ID;
    //echo "<br/>Current userId --> ".$currentUserId;

    //Current user language
    $key = "user_lang";
    $single = true;
    $currentUserLang = get_user_meta($currentUserId, $key, $single);

    return $currentUserLang;
}

function load_language_phrases(){

    $currentUserLang = detect_user_language();

    if($currentUserLang==="English"){
        $file = "en-US.json"; 
    }
    else if($currentUserLang==="Norwegian"){
        $file = "nb-NO.json"; 
    }    
    else{
        $file = "en-US.json";
    }

    
    $filepath = get_theme_root_uri();
    $filepath .= "/impruwclientparent/modules/language/";
    $filepath .= $file;

    $jsonString = file_get_contents($filepath);
    $jsonlangObject = json_decode($jsonString, true); 

    return $jsonlangObject;
}

//Get default available languages
function impruw_get_languages($lang=false){
    global $wpdb, $sitepress;
    if(!$lang){
        $lang = $sitepress->get_default_language();
    }
    $res = $wpdb->get_results("
            SELECT
                code, english_name, major, active, default_locale, lt.name AS display_name
            FROM {$wpdb->prefix}icl_languages l
                JOIN {$wpdb->prefix}icl_languages_translations lt ON l.code=lt.language_code
            WHERE lt.display_language_code = '{$lang}' AND l.code IN ('en','de','fr','nb' , 'es' )
            ORDER BY major DESC, english_name ASC", ARRAY_A);
    $languages = array();
    foreach((array)$res as $r){
        $languages[] = $r;
    }
    return $languages;
}

function get_all_languages(){

    global $sitepress;

    $languagesArray = array();
    $languages= impruw_get_languages();

    $wpml_options = get_option( 'icl_sitepress_settings' );
    $default_language_code = $wpml_options['default_language'];

    foreach((array)$languages as $lang){

            if($lang['active']){
                $active = true;
            }
            else{
                $active = false;
            }

            if($lang['code'] == $default_language_code){
                $is_default_language = true;
            }
            else{
                $is_default_language = false;
            }

            $languagesArray[ ] = array(
                'code' => $lang['code'],
                'languageName' => $lang['display_name'],
                'selectStatus' => $active,
                'isDefaultLanguage' => $is_default_language
            );

    }

    return $languagesArray;

}

function set_enabled_languages($arr){

    global $wpdb, $sitepress;
    
    $sitepress->set_active_languages($arr);
}

function get_language_facilities($editingLang,$defaultLang){

    $all_facilities = array();


    $all_facilities[] = array(
            'term_id' => 1,
            'facilityNameDefault' => "AC",
            'facilityNameLang' => "AC_lang",
            'editingLang' => $editingLang,
            'defaultLanguage' => $defaultLang
            );

    return $all_facilities;

}

function get_language_page($page_id, $language){
    $original_id = $page_id;
    $data = array();
    // Get the post ID based on language so that only pages of default language could be listed
    $page_id_based_on_lang = icl_object_id( $page_id, 'page', false, $language);


    if(is_null($page_id_based_on_lang)){
        //duplicate page and return new id
        $page_id_based_on_lang = duplicate_language_page($page_id,$language,"page");
    }
    $data['original_id'] = $original_id;
    $data['translated_id'] = $page_id_based_on_lang;

    return $data;
}

function duplicate_language_page($page_id,$language,$post_type){

    global $wpdb, $sitepress;
    $tbl_icl_translations = $wpdb->prefix ."icl_translations";

    $element_type = "post_".$post_type;

    // Insert translated post
    $page_translated_id = wp_insert_post(
        array('post_title' => " ",
            'post_type' => $post_type,
            'post_status' => 'publish'));

    // Get trid of original post
    $trid = wpml_get_content_trid( 'post_' . $post_type, $page_id );

    $lang_code_original = $sitepress->get_default_language();

    // Associate original post and translated post
    $updateQuery = $wpdb->update($tbl_icl_translations,
        array(
            'trid' => $trid,
            'language_code' => $language,
            'source_language_code' => $lang_code_original,
            'element_type' => $element_type
         ), array( 'element_id' => $page_translated_id ) );

    return $page_translated_id;
}


function get_page_by_lang($page_id,$language){
    $data = array();
    global $sitepress;

    //English display name of the editing language code
    $langdetails = $sitepress->get_language_details($language);
    $language_name = $langdetails['english_name'];

    $args = array( 'post_type' => 'page' );
    $page=get_post( $page_id, $args);
    $data['pageTitle'] = $page->post_title;
    $data['pageId'] = $page_id;
    $data['language'] = $language_name;

    return $data;
}


//Function to get all page elements of a site
function get_page_translation_elements($page_id){

    $data = get_page_json_for_site($page_id, true);

    $elements = array();

    foreach ( $data['page'] as $element ) {
        if ( $element[ 'element' ] === 'Row' ) {
            get_row_translation_elements( $element,$elements );
        } else {
            if(in_array($element[ 'element'] , array('Title','Text','ImageWithText')))
                $elements[] = $element;
        }
    }

   return $elements;
}

function get_row_translation_elements( $row_element, &$elements ){

    foreach ( $row_element[ 'elements' ] as $column ) {
        foreach ( $column[ 'elements' ] as $element ) {
            if ( $element[ 'element' ] === 'Row' ) {
                get_row_translation_elements( $element,$elements );
            } else {
                if(in_array($element[ 'element'] , array('Title','Text','ImageWithText')))
                    $elements[] = $element;
            }
        }
    }
}


add_filter( 'wp_nav_menu_objects', 'impruw_filter_menu_class', 10, 2 );

/*
 * Function to filter the output of each navigation menu item at he time of display so that it loads the menu items in
 * the right language based on the current language of the page
 *
 */
function impruw_filter_menu_class( $objects, $args ) {

    $current_language = wpml_get_current_language();

    foreach ( $objects as $i => $object ) {
        $item_page_id = $objects[$i]->object_id;

        $translated_item_page_id = icl_object_id($item_page_id, 'page', true, $current_language);

        $translated_item_page = get_post($translated_item_page_id);

        $translated_menu_item_page_title = $translated_item_page->post_title;
        $translated_menu_item_page_url =  get_permalink( $translated_item_page_id);

        $objects[$i]->object_id = $translated_item_page_id;
        $objects[$i]->url = $translated_menu_item_page_url;
        $objects[$i]->title = $translated_menu_item_page_title;

    }

//    echo "<pre>";
//    print_r($objects);
//    echo "<pre>";

    return $objects;

}






