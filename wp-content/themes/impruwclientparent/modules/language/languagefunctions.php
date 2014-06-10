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

?>