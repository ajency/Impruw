<?php 

function impruw_create_page_backup( $revision_id , $backup_type = 'page', $site_backup_id = 0 ){

	// get revision post parent 

	$revision = get_post( $revision_id );

	if ( strpos($revision->post_name, 'revision') == false )
		return new WP_Error( 'error', __("This is not a revision") );

	$page_id = $revision->post_parent;

	$page = get_post( $page_id );

	// check if post is a page
	if ( $page->post_type != 'page' )
		return new WP_Error( 'error', __("Revision is not for a page") );

	// print_r($page->post_type);
	// get english id
	$page_id = icl_object_id( $page_id, 'page', true, 'en' );



	$layout = get_post_meta( $page_id, 'page-json', true );

	$page_elements = get_post_meta( $page_id, 'page-elements', true );

	update_revision_meta( $revision_id, 'page-json', $layout );

	update_revision_meta( $revision_id, 'page-elements', $page_elements );

	update_revision_meta( $revision_id, 'backup-type', $backup_type );

	$theme = wp_get_theme();
    $theme_name = $theme->name;
    update_revision_meta( $revision_id, 'page-theme', $theme_name );

	if ( $site_backup_id != 0 )
		update_revision_meta( $revision_id, 'site-backup-id', $site_backup_id );

	if ( impruw_is_front_page($page_id) ){
		$header_backup_id = impruw_header_footer_backup(THEME_HEADER_KEY);
		$footer_backup_id = impruw_header_footer_backup(THEME_FOOTER_KEY);
		update_revision_meta( $revision_id, 'header-backup-id', get_last_header_footer_id('theme-header') );
		update_revision_meta( $revision_id, 'footer-backup-id', get_last_header_footer_id('theme-footer') );

	}

	
	return true;

}

add_action('_wp_put_post_revision', 'impruw_create_page_backup', 10 , 1);

// SITE BACKUP
function impruw_create_site_restore_point(){

	$site_backup_id = uniqid(); 
	$all_pages = get_all_menu_pages();
	foreach ($all_pages as $page) {
		$page_id = icl_object_id( $page->ID, 'page', true , 'en');

		$revision_id = add_page_revision( $page_id ); 
		// print_r($revision_id);
		// impruw_create_page_backup( $revision_id , 'site', $site_backup_id );
		update_revision_meta( $revision_id, 'backup-type', 'site' );
		update_revision_meta( $revision_id, 'site-backup-id', $site_backup_id );
	}

	return true;
}

add_action('impruw_before_theme_switch', 'impruw_create_site_restore_point');




function impruw_restore_page($revision_id, $backup = true){
	global $wpdb;

	$revision = get_post( $revision_id );
	if ( $revision_id == null )
		return false;
	if ( strpos($revision->post_name, 'revision') == false )
		return new WP_Error( 'error', __("This is not a revision") );
	
	$page_id = $revision->post_parent;
	$page = get_post( $page_id );
	// check if post is a page
	if ( $page->post_type != 'page' )
		return new WP_Error( 'error', __("Revision is not for a page") );
	$page_id = icl_object_id( $page_id, 'page', true, 'en' );
	
	if ($backup == true)
		$rev = add_page_revision( $page_id );

	// get page-json and page elements
	$layout = get_post_meta($revision_id,'page-json',true);
	$page_elements = get_post_meta($revision_id, 'page-elements',true);

	// update published version
	update_post_meta($page_id,'page-json',$layout);
	update_post_meta($page_id, 'page-elements', $page_elements);

	// update autosave version
	$autosave_page = wp_get_post_autosave($page_id);
	$autosave_id = $autosave_page->ID;

	update_revision_meta( $autosave_id, 'page-json', $layout );

	impruw_restore_elements($page_elements);



	// if home page
	if ( impruw_is_front_page($page_id) ){ 

		// update published header-footer
		$header_backup_id = get_post_meta( $revision_id, 'header-backup-id', true );
		$footer_backup_id = get_post_meta( $revision_id, 'footer-backup-id', true );

		$header_backup_data = $wpdb->get_row($wpdb->prepare("SELECT layout, elements FROM 
			{$wpdb->prefix}header_footer_backup WHERE id = %d and type = 'theme-header'
			",$header_backup_id), ARRAY_A );

		$footer_backup_data = $wpdb->get_row($wpdb->prepare("SELECT layout, elements FROM 
			{$wpdb->prefix}header_footer_backup WHERE id = %d and type = 'theme-footer'
			",$footer_backup_id), ARRAY_A );

		$wpdb->update( $wpdb->prefix.'header_footer_backup', $header_backup_data, 
			array( 'type' => 'theme-header-published'));

		$wpdb->update( $wpdb->prefix.'header_footer_backup', $footer_backup_data, 
			array( 'type' => 'theme-footer-published'));

		// update autosave header-footer
		
		$header_layout = maybe_unserialize( $header_backup_data['layout'] );
		update_option( 'theme-header-autosave',  $header_layout );

		$header_elements = maybe_unserialize( $header_backup_data['elements'] );
		impruw_restore_elements($header_elements);

		$footer_layout = maybe_unserialize( $footer_backup_data['layout'] );
		update_option( 'theme-footer-autosave', $footer_layout );
		$footer_elements = maybe_unserialize( $footer_backup_data['elements'] );

		impruw_restore_elements($footer_elements);

	}


}

function imp_restore_page(){
	// switch_to_blog(42);
if (isset($_GET['site_backup_id']))
		imp_restore_site();
	
	$backup_id = null;
	if (isset($_GET['revision_id']))
		$backup_id = impruw_restore_page( (int)$_GET['revision_id'] );

	
	// restore_current_blog();
	wp_send_json( array( 'code' => 'OK', 'data' => $backup_id));
}

add_action('wp_ajax_restore-page','imp_restore_page');


function impruw_restore_site($site_backup_id){
	global $wpdb,$sitepress;
	
	// get the theme at the site backup
	$revision_id = $wpdb->get_var($wpdb->prepare("SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key
	 	= 'site-backup-id' AND meta_value = %s",$site_backup_id));
	
	$theme_name = $wpdb->get_var($wpdb->prepare("SELECT meta_value FROM {$wpdb->postmeta} WHERE post_id = %d AND 
		meta_key = 'page-theme' ",$revision_id));

	// check if the theme is same as current theme
	$current_theme = wp_get_theme(); 
	// if not then switch the theme -- this creates a backup of the site
	if ($current_theme->name != $theme_name){
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
	else 
		// if theme is same do action impruw_before_theme_switch -- this backs up the site
		do_action('impruw_before_theme_switch');

	// run restore page on all menu pages (pass an attribute so it doesnt take a backup) 
	$revision_ids = $revision_id = $wpdb->get_col($wpdb->prepare("SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key
	 	= 'site-backup-id' AND meta_value = %s",$site_backup_id));
	// print_r($revision_ids);

	foreach ($revision_ids as $revision_id) {
		impruw_restore_page($revision_id,false);
	}


}

// function imp_restore_site(){
// 	$site_backup_id = $_GET['site_backup_id'];
// 	impruw_restore_site( $site_backup_id );
	
// }
// add_action('wp_ajax_restore-site','imp_restore_site');



// HEADER-FOOTER BACKUP
function impruw_header_footer_backup( $section ){
	
	global $wpdb;

	$section_data = get_header_footer_published($section);
	
	if ( $section == THEME_HEADER_KEY )
		$section_data['type'] = 'theme-header';
	else if ( $section == THEME_FOOTER_KEY )
		$section_data['type'] = 'theme-footer';

	
	$wpdb->insert(  $wpdb->prefix.'header_footer_backup',
	 	$section_data );

	return $wpdb->insert_id;

}


// HELPER FUNCTIONS FOR SAVING POST META FOR REVISIONS
function update_revision_meta( $revision_id, $meta_key, $meta_value ) {

    $meta_id = check_revision_meta_present( $revision_id, $meta_key );
    if ( $meta_id !== 0 ) 
        update_revision_meta_db( $meta_id, $meta_key, $meta_value );
    else
        insert_revision_meta_db( $revision_id, $meta_key, $meta_value );
}
function check_revision_meta_present( $revision_id, $meta_key ){
	global $wpdb;

    $query = $wpdb->prepare( "SELECT meta_id from {$wpdb->postmeta} WHERE post_id=%d AND meta_key=%s",
        $revision_id, $meta_key );
    $meta_id = $wpdb->get_var( $query );

    return is_null( $meta_id ) ? 0 : $meta_id;
}
function insert_revision_meta_db( $revision_id, $meta_key, $meta_value) {
	global $wpdb;

    if ( is_array( $meta_value ) )
        $meta_value = maybe_serialize( $meta_value );

    $wpdb->insert( $wpdb->postmeta, array( 'meta_key' => $meta_key, 'meta_value' => $meta_value,
        'post_id' => $revision_id ) );

    $wpdb->insert_id;
}
function update_revision_meta_db( $meta_id, $meta_key, $meta_value ) {
	global $wpdb;

    // serialize the json
    if ( is_array( $meta_value ) )
        $meta_value = maybe_serialize( $meta_value );

    $wpdb->update( $wpdb->postmeta, array( 'meta_key' => $meta_key,
            'meta_value' => $meta_value ),
        array( 'meta_id' => $meta_id )
    );
}
function get_last_header_footer_id($key){
	global $wpdb;
	$id = $wpdb->get_row($wpdb->prepare("SELECT id FROM {$wpdb->prefix}header_footer_backup WHERE type = %s ORDER BY backup_time DESC",$key));
	
	if($id == null) {
		$id = new stdClass();
		$id->id = impruw_header_footer_backup( $key.'-published' );
	}

	return $id->id;
}

function impruw_restore_elements($page_elements){
	global $wpdb;

	if (empty($page_elements))
		return false;

	foreach ($page_elements as $page_element) {
		$wpdb->update($wpdb->postmeta,
			array( 'meta_key' => $page_element['element'],
				   'meta_value' => maybe_serialize($page_element)),
			array( 'meta_id' => $page_element['meta_id']));
	}
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
