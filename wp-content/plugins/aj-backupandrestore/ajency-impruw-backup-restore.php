<?php
/**
 * Ajency Impruw Backup & Restore
 *
 * Backup and restore site pages
 *
 * @package   ajency-impruw-backup-restore
 * @author    Team Ajency <team@ajency.in>
 * @license   GPL-2.0+
 * @link      http://ajency.in
 * @copyright 9-29-2014 Ajency
 *
 * @wordpress-plugin
 * Plugin Name: Ajency Impruw Backup & Restore
 * Plugin URI:  http://ajency.in
 * Description: Backup and restore site pages
 * Version:     0.1.0
 * Author:      Team Ajency
 * Author URI:  http://ajency.in
 * Text Domain: ajency-impruw-backup-restore-locale
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path: /lang
 */

// If this file is called directly, abort.
if (!defined("WPINC")) {
	die;
}

require_once(plugin_dir_path(__FILE__) . "AjencyImpruwBackupRestore.php");
require_once(plugin_dir_path(__FILE__) . "inc/functions.php");
// require_once(plugin_dir_path(__FILE__) . "inc/ajax.php");

// Register hooks that are fired when the plugin is activated, deactivated, and uninstalled, respectively.
register_activation_hook(__FILE__, array("AjencyImpruwBackupRestore", "activate"));
register_deactivation_hook(__FILE__, array("AjencyImpruwBackupRestore", "deactivate"));

AjencyImpruwBackupRestore::get_instance();

// add_action('init', function(){

// 	switch_to_blog(42);
// 	aj_create_backup(12, 'page');
// 	// aj_restore_page(12,7);
// 	restore_current_blog();
// 	die;
// });