<?php

function get_page_seo( $post_id ){

	$wpseo_meta = new WPSEO_Metabox;
	$wpseo_frontend = new WPSEO_Frontend;
	$seodata= array();
	
	$yoast_meta_title = get_post_meta($post_id, '_yoast_wpseo_title', true); 
	$yoast_meta_description = get_post_meta($post_id, '_yoast_wpseo_metadesc', true);
	$yoast_meta_keywords = get_post_meta($post_id, '_yoast_wpseo_metakeywords', true);

	if ($yoast_meta_title) { 
		$seodata['seo_title'] = $yoast_meta_title;
	}
	else{
		$seodata['seo_title_default'] =  $wpseo_meta->page_title( $post_id );
	}
	
	if ($yoast_meta_description) { 
		$seodata['meta_description'] = $yoast_meta_description;
	}
	else{
		$seodata['meta_description_default'] = $wpseo_meta->get_value( 'metadesc', $post_id );
		$seodata['meta_description_default'] = $wpseo_frontend->metadesc( 'metadesc', $post_id );
	}
	

	return $seodata;

}

function update_page_seo( $seo_data ){
	$post_id = $seo_data['post_id'];
	$yoast_meta_title = $seo_data['changes']['seo_title'];
	$yoast_meta_description = $seo_data['changes']['meta_description'];
	// $yoast_meta_keywords = 

	update_post_meta($post_id, '_yoast_wpseo_title', $yoast_meta_title); 
	update_post_meta($post_id, '_yoast_wpseo_metadesc', $yoast_meta_description); 

	return $post_id;
}


//Function to get page excerpt
function get_page_excerpt_from_json($page_id, $language){

    $data = get_page_json_for_site($page_id, true);

    $excerpt= array();

    foreach ( $data['page'] as $element ) {
        if ( $element[ 'element' ] === 'Row' ) {
            get_row_excerpt_elements( $element,$excerpt,$language );
        } else {
            if(in_array($element[ 'element'] , array('Title','Text','ImageWithText'))){
                $excerpt[]= $element['content'][$language];
            }
            if(in_array($element[ 'element'] , array('Link'))){
                $excerpt []= $element['text'][$language];
            }
        }
    }

   return $excerpt;
}

function get_row_excerpt_elements( $row_element, &$excerpt, $language ){

    foreach ( $row_element[ 'elements' ] as $column ) {
        foreach ( $column[ 'elements' ] as $element ) {
            if ( $element[ 'element' ] === 'Row' ) {
                get_row_excerpt_elements( $element, $excerpt , $language);
            } else {
            	if(in_array($element[ 'element'] , array('Title','Text','ImageWithText'))){
            		$excerpt[]= $element['content'][$language];
            	}
            	if(in_array($element[ 'element'] , array('Link'))){
            		$excerpt[]= $element['text'][$language];
            	}
            }
        }
    }
}

function prettify_content_piece_excerpt($excerpt_array){

    $excerpt_array = __u::flatten($excerpt_array);

    $excerpt_length =0;
    $excerpt = '';

    foreach($excerpt_array as $excerpt_item){
        $ex = trim(stripslashes(strip_tags($excerpt_item)));

        //IF CURRENT STRING HAS TEXT AND LENGTH OF EXCERPT TILL NOW IS LESS THAN 500
        //CONTINUE ADDING TO EXCERPT

        if(strlen($ex)>0 && $excerpt_length <500 ){
            $excerpt.=$ex;
            $excerpt_length += strlen($ex);
            $excerpt.=' | ';
        }
    }

    //IF EXCERPT TOTAL LENGTH IS GREATER THAN 500, REDUCE IT
    if(strlen($excerpt)>500)
        $excerpt= substr($excerpt,0,500);

    //REMOVAL OF LAST 3 CHARACTERS WHICH MAY CONTAIN THE DIVIDER
    $excerpt = substr($excerpt,0,-3);

    return $excerpt;

}