<?php
/**
 * Fired when the plugin is uninstalled.
 *
 * @package   ajency-braintree
 * @author    Team Ajency <team@ajency.in>
 * @license   GPL-2.0+
 * @link      http://ajency.in
 * @copyright 11-28-2014 Ajency.in
 */

// If uninstall, not called from WordPress, then exit
if (!defined("WP_UNINSTALL_PLUGIN")) {
	exit;
}

// TODO: Define uninstall functionality here
function ajbilling_delete_plugin_data() {
    global $wpdb; 

	$table_plans_name = $wpdb->base_prefix.'aj_billing_plans';
	$table_countries_name = $wpdb->base_prefix.'aj_billing_countries'; 
        
	$sql = "DROP TABLE ". $table_plans_name;
	$wpdb->query($sql);
        
	$sql = "DROP TABLE ". $table_countries_name;
	$wpdb->query($sql);

	// delete_option('revslider-latest-version');
}

ajbilling_delete_plugin_data();