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

function load_language_phrases($dashboard=TRUE){

    if($dashboard===FALSE){
        $currentUserLang = wpml_get_current_language();
    }
    else{
        $currentUserLang = detect_user_language();
    }

    if($currentUserLang==="en"){
        $file = "en-US.json"; 
    }
    else if($currentUserLang==="nb"){
        $file = "nb-NO.json"; 
    }
    else if($currentUserLang==="fr"){
        $file = "fr-FR.json"; 
    } 
    else if($currentUserLang==="es"){
        $file = "es-ES.json"; 
    }
    else if($currentUserLang==="de"){
        $file = "de-DE.json"; 
    } 
    else if($currentUserLang==="it"){
        $file = "it-IT.json"; 
    }      
    else{
        $file = "en-US.json";
    }

    
    $filepath = get_theme_root_uri();

    if($dashboard===FALSE){
        $filepath .= "/impruwclientparent/modules/language/frontend/";
    }
    else{
      $filepath .= "/impruwclientparent/modules/language/";
    }
   
    $filepath .= $file;

    $jsonString = file_get_contents($filepath);
    $jsonlangObject = json_decode($jsonString, true); 

    // Uncomment to see if there are any errors while reading from json file
    // echo json_last_error();

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
    $hidden_languages = (isset($wpml_options['hidden_languages'])) ? $wpml_options['hidden_languages'] : array() ;
    $active_languages = wpml_get_active_languages();
    $is_hidden = false;

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

            if (in_array($lang['code'], $hidden_languages))
                $is_hidden = true;
            else
                $is_hidden = false;

            $languagesArray[ ] = array(
                'code' => $lang['code'],
                'languageName' => $lang['display_name'],
                'selectStatus' => $active,
                'isDefaultLanguage' => $is_default_language,
                'active_lang_count' => count($active_languages),
                'isHidden' => $is_hidden
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

    $original_page = get_post($page_id);
    $original_page_name = $original_page->post_title;
    $translated_page_name = $original_page_name ;

    $element_type = "post_".$post_type;

    // Insert translated post
    $page_translated_id = wp_insert_post(
        array('post_title' => $translated_page_name,
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
            if(in_array($element[ 'element'] , array('Title','Text','ImageWithText', 'Link')))
                $elements[] = $element;
        }
    }

   return $elements;
}

//Function to get all page table elements
function get_page_table_elements($page_id){
    $data = get_page_json_for_site($page_id, true);

    $elements = array();

    foreach ( $data['page'] as $element ) {
        if ( $element[ 'element' ] === 'Row' ) {
            get_row_table_elements( $element,$elements );
        } else {
            if(in_array($element[ 'element'] , array('Table')))
                $elements[] = $element;
        }
    }

   return $elements;    
}

//Function to get all page slider elements
function get_page_slider_elements($page_id){
    $data = get_page_json_for_site($page_id, true);

    $elements = array();

    foreach ( $data['page'] as $element ) {
        if ( $element[ 'element' ] === 'Row' ) {
            get_row_slider_elements( $element,$elements );
        } else {
            if(in_array($element[ 'element'] , array('Slider')))
                $elements[] = $element;
        }
    }

   return $elements;    
}

//Function to get all page header elements of a site
function get_header_translation_elements(){

    $data = get_json_to_clone('theme-header');

    $elements = array();

    foreach ( $data as $element ) {
        if ( $element[ 'element' ] === 'Row' ) {
            get_row_translation_elements( $element,$elements );
        } else {
            if(in_array($element[ 'element'] , array('Title','Text','ImageWithText', 'Link')))
                $elements[] = $element;
        }
    }

   return $elements;
}

//Function to get all page footer elements of a site
function get_footer_translation_elements(){

    $data = get_json_to_clone('theme-footer');

    $elements = array();

    foreach ( $data as $element ) {
        if ( $element[ 'element' ] === 'Row' ) {
            get_row_translation_elements( $element,$elements );
        } else {
            if(in_array($element[ 'element'] , array('Title','Text','ImageWithText', 'Link')))
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
                if(in_array($element[ 'element'] , array('Title','Text','ImageWithText', 'Link')))
                    $elements[] = $element;
            }
        }
    }
}

function get_row_table_elements( $row_element, &$elements ){

    foreach ( $row_element[ 'elements' ] as $column ) {
        foreach ( $column[ 'elements' ] as $element ) {
            if ( $element[ 'element' ] === 'Row' ) {
                get_row_table_elements( $element,$elements );
            } else {
                if(in_array($element[ 'element'] , array('Table')))
                    $elements[] = $element;
            }
        }
    }
}

function get_row_slider_elements( $row_element, &$elements ){

    foreach ( $row_element[ 'elements' ] as $column ) {
        foreach ( $column[ 'elements' ] as $element ) {
            if ( $element[ 'element' ] === 'Row' ) {
                get_row_slider_elements( $element,$elements );
            } else {
                if(in_array($element[ 'element'] , array('Slider')))
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


function get_all_childsite_pages(){

    $all_pages_array = array();

    $pages = get_pages();

    foreach ( $pages as $page ) {
        global $sitepress;
        $page_id = $page->ID;
        $page_title = $page->post_title;
        $page_slug = $page->post_name;
        $is_child_site_page = true;
        $editing_language = $_REQUEST['language'];
        $default_language = $sitepress ->get_default_language();

        // Get the post ID based on language so that only pages of default language could be listed
        $page_id_based_on_lang = icl_object_id( $page_id, 'page', true, $default_language);

        // Get post title based on language
        $page_title_based_on_lang = get_the_title($page_id_based_on_lang);

        //Get the page slug and filter displayed page list based on page slug
        $page_based_on_lang = get_post($page_id_based_on_lang);
        $page_slug_based_on_lang = $page_based_on_lang->post_name;

        //get page meta for each page
        $impruw_page_template_name = get_post_meta( $page_id_based_on_lang, 'impruw_page_template', true );

        //TODO check language based slugs, right now check is made for english pages only
        if($page_slug_based_on_lang=='support'|| $page_slug_based_on_lang=='coming-soon'|| $page_slug_based_on_lang=='coming-soon-2'||  $page_slug_based_on_lang=='dashboard' ||  $page_slug_based_on_lang=='dashboard'||  $page_slug_based_on_lang=='site-builder'|| $page_slug_based_on_lang=='sign-in' || $page_slug_based_on_lang=='sample-page' || $page_slug_based_on_lang=='reset-password' || $page_slug_based_on_lang=='logg-inn' || $page_slug_based_on_lang=='kommer-snart' || $page_slug_based_on_lang=='resett-passord' ||  $page_slug_based_on_lang==null){
            $is_child_site_page = false;
        }
        else{
            $is_child_site_page = true;
        }

        
        // if($impruw_page_template_name == "rooms" || $page_slug_based_on_lang == "rooms"){
        //     $is_room_page = true;
        // }

        $all_pages_array[] = array(
            'pageId' => $page_id_based_on_lang,
            'pageOriginalId' => $page_id,
            'pageHref' => $page_slug,
            'pageTitle' => $page_title_based_on_lang,
            'isChildSitePage' => $is_child_site_page,
            'editingLang' => $editing_language,
            'defaultLanguage' => $default_language
        );
    }

    return $all_pages_array;
}


/*
* Function to get language name based on language code
*/
function get_language_names($language_code){

    switch($language_code){
        case "en" :
            $language_name = "English";
            break;
        case "nb" :
            $language_name = "Norwegian";
            break;
        default :
            $language_name = "English";
    }

    return $language_name;

}

function get_native_language_name($language_code){
    global $sitepress;
    $language_details =  $sitepress->get_language_details($language_code);
    $native_language_name = $language_details['display_name'];
    return $native_language_name;
}

function get_single_room_page_title(){
    $language_code = wpml_get_default_language();
    $single_room_title = 'Single Room';

    switch ($language_code) {
        case 'en':
            $single_room_title = 'Single Room';
            break;

        case 'nb':
            $single_room_title = 'Enkeltrom';
            break;

        case 'es':
            $single_room_title = 'Einzelzimmer';
            break;

        case 'fr':
            $single_room_title = 'Habitación Individual';
            break;

        case 'de':
            $single_room_title = 'Chambre Simple';
            break;
        
        default:
            $single_room_title = 'Single Room';
            break;
    }

    return $single_room_title;
}

/**
 * Get an array of enabled languages
 */
function get_enabled_languages(){
    $active_languages = wpml_get_active_languages();
    $enabled_languages = array();
    foreach ($active_languages as $language) {
        array_push($enabled_languages, $language['code']);
    }

    return $enabled_languages;
}