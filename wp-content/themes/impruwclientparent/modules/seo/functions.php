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
		$seodata['meta_description'] = $yoast_meta_title;
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