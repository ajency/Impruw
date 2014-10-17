<?php

function aj_create_backup($ln_page_id, $backup_index){

	global $wpdb;

	$page_id = (int) icl_object_id($ln_page_id, 'page', true,'en');

	// print_r($page_id);

	$theme = wp_get_theme();

    $layout = get_post_meta($page_id,'page-json',true);

    if($layout == null)
    	return false;


    $element_ids = pluck_meta_ids_from_json($layout);

    $elements = array();

	$element_count = count($element_ids);
	if ($element_count > 0){
		$placeholders = array_fill(0, $element_count, '%d');

		$format = implode(', ', $placeholders);

		$elements = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$wpdb->prefix}postmeta WHERE 
			meta_id IN ({$format})",$element_ids),ARRAY_A );
	}


	$backup_data = array(
		'section' => 'page',
		'object_id' => $page_id,
		'layout' => maybe_serialize($layout),
		'element' => maybe_serialize($elements),
		'theme' => $theme->name,
		'backup_index' => $backup_index
		);


	$wpdb->insert( $wpdb->prefix.'impruw_backup_pages' , $backup_data );

	$backup_id = $wpdb->insert_id;

	return $backup_id;
}


function aj_restore_backup($ln_page_id, $backup_id, $backup_index=0){
	global $wpdb;

	

	$page_id = (int) icl_object_id($ln_page_id, 'page', true,'en');

	if($backup_index == 0){
		$backup_data = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->prefix}impruw_backup_pages
			WHERE id = %d AND object_id = %d ",$backup_id, $page_id));
	}
	else{
		$backup_data = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->prefix}impruw_backup_pages
			WHERE backup_index = %s AND object_id = %d ",$backup_index, $page_id));
	}
	if ($backup_data == null)
		return false;

	// create a backup before restoring
	if($backup_index == 0)
		aj_create_backup($ln_page_id, $backup_index);

	$elements = maybe_unserialize($backup_data->element);
	
	foreach ($elements as $element) {
		# code...
		$wpdb->replace($wpdb->prefix.'postmeta' , $element );
	}

	$layout_data = maybe_unserialize($backup_data->layout);

	update_post_meta($page_id,'page-json',$layout_data);

	update_page_autosave($page_id,$layout_data);

}

function aj_get_backups($ln_page_id){
	global $wpdb;
	$page_id = (int) icl_object_id($ln_page_id, 'page', true,'en');

	$backup_data = $wpdb->get_results($wpdb->prepare("SELECT id, object_id, backup_time, theme, backup_index FROM 
		{$wpdb->prefix}impruw_backup_pages WHERE object_id = %d ", $page_id),ARRAY_A);

	return $backup_data;
}


function aj_create_site_backup(){

	$ln_pages = get_all_menu_pages();

	$backup_index = uniqid();

	foreach ($ln_pages as $ln_page) {
		aj_create_backup($ln_page->ID, $backup_index);
	}
	
	return $backup_index;
}

add_action('impruw_before_theme_switch','aj_create_site_backup');

function aj_restore_site_backup($backup_index){

	global $sitepress;
	global $wpdb;

	// check if the site backup exist for the index
	$theme = $wpdb->get_row($wpdb->prepare("SELECT DISTINCT theme FROM {$wpdb->prefix}impruw_backup_pages
			WHERE backup_index = %s  ",$backup_index));
	if($theme == null)
		return false;

		

	// check if the current theme is same as after restore 
	// if no then first change the theme
	$theme_name = $theme->theme;
	$current_theme = wp_get_theme();

	if ($current_theme->name == $theme_name){
		// backup the current state of the site before restoring
		aj_create_site_backup();
	}
	else{
		// switch theme
		$site_current_language = wpml_get_current_language();
	    $site_default_language = wpml_get_default_language();

	    //Change site's default language to English
	    $sitepress->set_default_language('en');
	    $sitepress->switch_lang('en');

	    $new_theme_id = get_theme_post_id_from_name($theme_name);

	    assign_theme_to_site( $new_theme_id, false );

	    //Restore default language back to original
	    $sitepress->switch_lang($site_current_language);
	    $sitepress->set_default_language($site_default_language);
	}

	// restore pages
	$ln_pages = get_all_menu_pages();

	foreach ($ln_pages as $ln_page) {
		aj_restore_backup($ln_page->ID,0, $backup_index);
	}

	return true;
}

function get_theme_post_id_from_name($theme_name){
	global $wpdb;
	switch_to_blog( 1 );
	// print_r($theme_name);

    $query = $wpdb->prepare("SELECT ID FROM {$wpdb->posts} WHERE post_type='theme' AND 
        post_title=%s", $theme_name);
    $theme_post = $wpdb->get_row($query);

    restore_current_blog();
    // print_r($theme_post);

    $theme_id = $theme_post->ID;

    return (int) $theme_id;

}

