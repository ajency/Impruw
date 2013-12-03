<?php

/*
 * File name : custom-setup.php
 * Description : Contains a list of function to run at setup as follows:
 * 1) remove_default_capabilities - Function to remove default worpress roles from site.
 * 2) create_impruve_manager_role - Function to create a new user role called Impruw Manager having same capabilities as the super admin.
 * 3) add_to_page_layouts - Function to add filenames in layout table.
 */
require_once( '../../../../wp-load.php');
require_once('../../../../wp-admin/includes/plugin.php');
require_once 'user_shortcodes.php';
require_once '../User/user_management.php';

create_custom_tables();
remove_default_capabilities();
create_impruv_manager_role();
insert_into_email_action_table();
add_to_page_layouts();
//$user_data=array("email"=>"jeromie@ajency.in","password"=>"admin","name"=>"Jeromie Vaz",'role'=>'administrator');
//wp_impruw_create_user($user_data);
//$_REQUEST['action'] = 'activate';
//$_REQUEST['_wpnonce'] = wp_create_nonce();
//var_dump(toggle_plugin(23));exit;
create_new_site(1,'childsite1','Child Site 1',3,'home1_layout.php');
//$user_data=array();
//$user_roles = fetch_user_roles_by_type(18);
//$user_ids_array = fetch_user_ids_by_role($user_roles);
//print_r($user_ids_array);exit;
//process_email_queue();


function create_custom_tables()
{
global $wpdb;
//table which maps actions to email_types
$query_email_actions=("CREATE TABLE IF NOT EXISTS {$wpdb->prefix}email_actions(
				email_action_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                email_action_name TEXT,
                                email_types TEXT)");
$wpdb->query($query_email_actions);
//table which contains all processed emails with their status
$query_email_log=("CREATE TABLE IF NOT EXISTS {$wpdb->prefix}email_log(
				id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                user_id INT,
                                process_queue_id INT,
                                email_status TEXT,
                                reject_reason TEXT)");

$wpdb->query($query_email_log);

//table which contains all the emails which need to be processed.
$query_email_processing_queue=("CREATE TABLE IF NOT EXISTS {$wpdb->prefix}email_processing_queue(
				id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                post_id INT,
                                email_category TEXT,
                                user_id TEXT,
                                priority INT,
                                status TEXT,
                                initiator_id INT,
                                data_info TEXT)");

$wpdb->query($query_email_processing_queue);

//table which contains the path to different page layouts
$query_impruw_page_layout=("CREATE TABLE IF NOT EXISTS {$wpdb->prefix}page_layouts(
				id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                title TEXT,
                                type TEXT,
                                path TEXT)");

$wpdb->query($query_impruw_page_layout);
}




/**
 * remove_default_capabilities
 * Function to remove default worpress roles from site.
 */
function remove_default_capabilities()
{   
    if(get_role('subscriber')!=NULL)remove_role( 'subscriber' );//removes the subscriber role
    if(get_role('contributor')!=NULL)remove_role( 'contributor' );//removes the contributor role
    if(get_role('author')!=NULL)remove_role( 'author' );//removes the author role
    if(get_role('editor')!=NULL)remove_role( 'editor' );//removes the editor role
}


/**
 * create_impruve_manager_role
 * Function to create a new user role called Impruw Manager having same capabilities as the super admin
 */
function create_impruv_manager_role()
{
     global $wp_roles;
     if(get_role('impruw_manager')==NULL)
     {
        $role_clone='administrator';
        $role_cloned = $wp_roles->get_role($role_clone);
        $role='impruw_manager';
        $role_name='Impruw Manager';
        $wp_roles->add_role($role, $role_name, $role_cloned->capabilities);//creating a role called Impruw Manager
        //adding additional super admin capabilities to a Impruw Manager
        $impruw_manager_role = get_role( 'impruw_manager' );
        $impruw_manager_role->add_cap( 'manage_network' ); 
        $impruw_manager_role->add_cap( 'manage_sites' ); 
        $impruw_manager_role->add_cap( 'manage_network_users' ); 
        $impruw_manager_role->add_cap( 'manage_network_plugins' ); 
        $impruw_manager_role->add_cap( 'manage_network_themes' ); 
        $impruw_manager_role->add_cap( 'manage_network_options' ); 
     }
}

/**
 * insert_into_email_action_table
 * Function to associate an action with an email type;
 * @global type $wpdb
 */
function insert_into_email_action_table()
{    
    global $wpdb;
    $registrayion_email_types_array=array(16,17,18);
    $registrayion_email_types_array=  serialize($registrayion_email_types_array);
    $registration_action_query=("SELECT * from {$wpdb->prefix}email_actions where email_action_name="."'registration'");
    $value_registration=$wpdb->get_row($registration_action_query);
    if(count($value_registration)==0)
    {
       $insert_action_emails_query=("INSERT into {$wpdb->prefix}email_actions (email_action_name,email_types) VALUES ("."'registration'".","."'$registrayion_email_types_array'".")");
       $wpdb->query($insert_action_emails_query);
    }
    else
    {
       $update_action_emails_query=("UPDATE {$wpdb->prefix}email_actions SET email_types="."'$registrayion_email_types_array'"." WHERE email_action_name="."'registration'");
       $wpdb->query($update_action_emails_query);  
    }
}

/**
 * add_to_page_layouts
 * Function to add filenames in layout table.
 */
function add_to_page_layouts()
{
    global $wpdb;
    $title = "home1_layout";
    $type = "home";
    $path = "home1_layout.php";
   
    $layout_data_query = ("SELECT * from {$wpdb->prefix}page_layouts where path='".$path."'");
    $layout_data = $wpdb->get_row($layout_data_query);
    if(count($layout_data) == 0)
    {
    $wpdb->insert( 
	$wpdb->prefix.'page_layouts', 
	array( 
		'title' => $title, 
		'type' => $type,
                'path' => $path
             )
        );
    }
   
}

