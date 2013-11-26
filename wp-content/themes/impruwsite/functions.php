<?php

/**
 * Generates the markup for a specific section
 * @param type $section
 */
function generateMarkup($section){
    
    global $post, $markupJSON;
    
    $markupJSON = getPageMarkupJSON($post->ID);
    
    $json = $markupJSON[$section];
    
    $html = '';
    
    /**
     * 
     */
    foreach($json as $element){
        
        $html .= addElementmarkup($element);
        
    }
    
    return $html;
}


function addElementMarkup($element){
        
    switch($element->type){

        case 'BuilderRow':
            $html = getBuilderRowMarkup($element);
            break;
        default:
            break;

    }
    
    return $html;
}


/**
 * Generates the row markup
 * @param type $element
 */
function getBuilderRowMarkup($element){
    
    $defaults = array();
    
    return $html;
    
}

/**
 * Gets the page markup json from DB
 * @param type $page_id
 */
function getPageMarkupJSON($page_id){
    
    $json = get_post_meta($page_id,'page_markup_json',true);
    
    return $json;
}