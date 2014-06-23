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

function get_all_languages(){

    global $sitepress;

    $languagesArray = array();
    $languages= $sitepress->get_languages($sitepress->get_admin_language());

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

?>