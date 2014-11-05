<?php

function imp_get_all_backups(){
	
	// switch_to_blog(42);
	$backup_data = aj_get_backups((int)$_GET['page_id']);
	// restore_current_blog();

	wp_send_json( array( 'code' => 'OK', 'data' => $backup_data ) );
}

add_action('wp_ajax_get-backup-for-page','imp_get_all_backups');


function imp_create_backup(){
	// switch_to_blog(43);
	$backup_id = aj_create_backup((int)$_GET['page_id'], 0);
	// restore_current_blog();
	wp_send_json( array( 'code' => 'OK', 'data' => $backup_id ) );
}
add_action('wp_ajax_create-backup','imp_create_backup');

function imp_restore_backup(){
	// switch_to_blog(42);
	$backup_id = aj_restore_backup( (int)$_GET['page_id'] , (int)$_GET['backup_id'] , 0 );
	// restore_current_blog();
	wp_send_json( array( 'code' => 'OK'));
}

add_action('wp_ajax_restore-backup','imp_restore_backup');

function imp_site_backup(){
	// switch_to_blog(42);
	$backup_index = aj_create_site_backup();
	// restore_current_blog();
	wp_send_json( array( 'code' => 'OK', 'data' => $backup_index));
}

add_action('wp_ajax_site-backup','imp_site_backup');

function imp_site_restore(){
	$backup_index = $_GET['backup_index'];
	$new_backup_index = aj_restore_site_backup($backup_index);
	if ($new_backup_index)
		wp_send_json( array( 'code' => 'OK'));
	else
		wp_send_json(array( 'code' => 'error' ));
}

add_action('wp_ajax_site-restore','imp_site_restore');