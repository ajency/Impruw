<?php
/**
 * Ajency Braintree
 *
 * Subscription based billing
 *
 * @package   ajency-braintree
 * @author    Team Ajency <team@ajency.in>
 * @license   GPL-2.0+
 * @link      http://ajency.in
 * @copyright 11-28-2014 Ajency.in
 *
 * @wp-plugin
 * Plugin Name: Ajency Braintree
 * Plugin URI:  http://ajency.in
 * Description: Subscription based billing
 * Version:     0.1.0
 * Author:      Team Ajency
 * Author URI:  http://ajency.in
 * Text Domain: ajency-braintree-locale
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path: /lang
 */

// If this file is called directly, abort.
if (!defined("WPINC")) {
	die;
}
define("AJ_BRAINTREE", WP_PLUGIN_URL . "/ajency-braintree");
require_once(plugin_dir_path(__FILE__) . "AjencyBraintree.php");
require_once(plugin_dir_path(__FILE__) . "inc/functions.php");
require_once(plugin_dir_path(__FILE__) . "inc/ajax.php");
require_once(plugin_dir_path(__FILE__) . "inc/api.php");
require_once(plugin_dir_path(__FILE__) . "inc/register_components.php");

// Register hooks that are fired when the plugin is activated, deactivated, and uninstalled, respectively.
register_activation_hook(__FILE__, array("AjencyBraintree", "activate"));
register_deactivation_hook(__FILE__, array("AjencyBraintree", "deactivate"));

AjencyBraintree::get_instance();
