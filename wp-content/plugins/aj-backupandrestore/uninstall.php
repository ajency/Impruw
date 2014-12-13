<?php
/**
 * Fired when the plugin is uninstalled.
 *
 * @package   ajency-impruw-backup-restore
 * @author    Team Ajency <team@ajency.in>
 * @license   GPL-2.0+
 * @link      http://ajency.in
 * @copyright 9-29-2014 Ajency
 */

// If uninstall, not called from WordPress, then exit
if (!defined("WP_UNINSTALL_PLUGIN")) {
	exit;
}

// TODO: Define uninstall functionality here