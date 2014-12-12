<?php
/**
 * Ajency Braintree
 *
 * @package   ajency-braintree
 * @author    Team Ajency <team@ajency.in>
 * @license   GPL-2.0+
 * @link      http://ajency.in
 * @copyright 11-28-2014 Ajency.in
 */

/**
 * Ajency Braintree class.
 *
 * @package AjencyBraintree
 * @author  Team Ajency <team@ajency.in>
 */
class AjencyBraintree{
	/**
	 * Plugin version, used for cache-busting of style and script file references.
	 *
	 * @since   0.1.0
	 *
	 * @var     string
	 */
	protected $version = "0.1.0";

	/**
	 * Unique identifier for your plugin.
	 *
	 * Use this value (not the variable name) as the text domain when internationalizing strings of text. It should
	 * match the Text Domain file header in the main plugin file.
	 *
	 * @since    0.1.0
	 *
	 * @var      string
	 */
	protected $plugin_slug = "ajency-braintree";

	/**
	 * Instance of this class.
	 *
	 * @since    0.1.0
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/**
	 * Slug of the plugin screen.
	 *
	 * @since    0.1.0
	 *
	 * @var      string
	 */
	protected $plugin_screen_hook_suffix = null;

	/**
	 * Initialize the plugin by setting localization, filters, and administration functions.
	 *
	 * @since     0.1.0
	 */
	private function __construct() {

		// Load plugin text domain
		add_action("init", array($this, "load_plugin_textdomain"));

		// Add the options page and menu item.
		if ( is_multisite() ) { 
		     add_action("network_admin_menu", array($this, "add_plugin_admin_menu"));
		} 
		else {
		     add_action("admin_menu", array($this, "add_plugin_admin_menu"));
		}

		// Load admin style sheet and JavaScript.
		add_action("admin_enqueue_scripts", array($this, "enqueue_admin_styles"));
		add_action("admin_enqueue_scripts", array($this, "enqueue_admin_scripts"));

		// Load public-facing style sheet and JavaScript.
		add_action("wp_enqueue_scripts", array($this, "enqueue_styles"));
		add_action("wp_enqueue_scripts", array($this, "enqueue_scripts"));

		// Define custom functionality. Read more about actions and filters: http://codex.wordpress.org/Plugin_API#Hooks.2C_Actions_and_Filters
		add_action("TODO", array($this, "action_method_name"));
		add_filter("TODO", array($this, "filter_method_name"));


		// hook function to register plugin defined and theme defined components
        add_action("init", array($this, "register_feature_components"));

        add_action('admin_footer', array($this, 'payment_custom_site_options'));

        add_action( "admin_print_scripts-site-info.php", array($this, 'my_admin_scripts') );

        add_action('admin_footer',array($this, 'paymentApi_url'));



	}

	/**
	 * Return an instance of this class.
	 *
	 * @since     0.1.0
	 *
	 * @return    object    A single instance of this class.
	 */
	public static function get_instance() {

		// If the single instance hasn"t been set, set it now.
		if (null == self::$instance) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	/**
	 * Fired when the plugin is activated.
	 *
	 * @since    0.1.0
	 *
	 * @param    boolean $network_wide    True if WPMU superadmin uses "Network Activate" action, false if WPMU is disabled or plugin is activated on an individual blog.
	 */
	public static function activate($network_wide) {
		// TODO: Define activation functionality here
		self::create_tables();
	}

	/**
	 * Fired when the plugin is deactivated.
	 *
	 * @since    0.1.0
	 *
	 * @param    boolean $network_wide    True if WPMU superadmin uses "Network Deactivate" action, false if WPMU is disabled or plugin is deactivated on an individual blog.
	 */
	public static function deactivate($network_wide) {
		// TODO: Define deactivation functionality here
	}

	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    0.1.0
	 */
	public function load_plugin_textdomain() {

		$domain = $this->plugin_slug;
		$locale = apply_filters("plugin_locale", get_locale(), $domain);

		load_textdomain($domain, WP_LANG_DIR . "/" . $domain . "/" . $domain . "-" . $locale . ".mo");
		load_plugin_textdomain($domain, false, dirname(plugin_basename(__FILE__)) . "/lang/");
	}

	/**
	 * Register and enqueue admin-specific style sheet.
	 *
	 * @since     0.1.0
	 *
	 * @return    null    Return early if no settings page is registered.
	 */
	public function enqueue_admin_styles() {

		if (!isset($this->plugin_screen_hook_suffix)) {
			return;
		}

		$screen = get_current_screen();
		if ($screen->id == $this->plugin_screen_hook_suffix) {
			wp_enqueue_style($this->plugin_slug . "-admin-styles", plugins_url("css/admin.css", __FILE__), array(),
				$this->version);
		}

	}

	/**
	 * Register and enqueue admin-specific JavaScript.
	 *
	 * @since     0.1.0
	 *
	 * @return    null    Return early if no settings page is registered.
	 */
	public function enqueue_admin_scripts() {

		// if (!isset($this->plugin_screen_hook_suffix)) {
		// 	return;
		// }

		// $screen = get_current_screen();
		// if ($screen->id == $this->plugin_screen_hook_suffix) {
			// wp_enqueue_script($this->plugin_slug . "-admin-script", plugins_url("js/ajency-braintree-admin.js", __FILE__),
			// 	array("jquery"), $this->version);
		// }

		global $current_screen;
		if( !$current_screen->is_network )
			return;

		// wp_register_script( $this->plugin_slug . "-admin-script", plugins_url("js/ajency-braintree-admin.js", __FILE__) );
		wp_enqueue_script($this->plugin_slug . "-admin-script", plugins_url("js/ajency-braintree-admin.js", __FILE__),array("jquery"), $this->version);

	}

	/**
	 * Register and enqueue public-facing style sheet.
	 *
	 * @since    0.1.0
	 */
	public function enqueue_styles() {
		wp_enqueue_style($this->plugin_slug . "-plugin-styles", plugins_url("css/public.css", __FILE__), array(),
			$this->version);
	}

	/**
	 * Register and enqueues public-facing JavaScript files.
	 *
	 * @since    0.1.0
	 */
	public function enqueue_scripts() {
		wp_enqueue_script($this->plugin_slug . "-plugin-script", plugins_url("js/public.js", __FILE__), array("jquery"),
			$this->version);
	}

	/**
	 * Register the administration menu for this plugin into the WordPress Dashboard menu.
	 *
	 * @since    0.1.0
	 */
	public function add_plugin_admin_menu() {
		$this->plugin_screen_hook_suffix = add_menu_page(__("Ajency Braintree - Plans", $this->plugin_slug),__("Site Plans", $this->plugin_slug), "read", $this->plugin_slug, array($this, "display_plugin_admin_page"));
		
		// add_submenu_page('$this->plugin_slug', __('Ajency Braintree - Add New Plan', $this->plugin_slug), __('Add New Plan', $this->plugin_slug), 'read', $this->plugin_slug.'-add-plan', array($this, "display_add_plan_page"));

		// pass parent slug as null, if you do not wish to show the page in the sub menu
		add_submenu_page(null, __('Ajency Braintree - Add New Plan', $this->plugin_slug), __('Add New Plan', $this->plugin_slug), 'read', $this->plugin_slug.'-add-plan', array($this, "display_add_plan_page"));



	}

	/**
	 * Render the settings page for this plugin.
	 *
	 * @since    0.1.0
	 */
	public function display_plugin_admin_page() {
		include_once("views/admin.php");
	}

	/**
	 * Render the settings page for this plugin.
	 *
	 * @since    0.1.0
	 */
	public function display_add_plan_page() {
		include_once("views/site-plan-new.php");
	}

	/**
	 * NOTE:  Actions are points in the execution of a page or process
	 *        lifecycle that WordPress fires.
	 *
	 *        WordPress Actions: http://codex.wordpress.org/Plugin_API#Actions
	 *        Action Reference:  http://codex.wordpress.org/Plugin_API/Action_Reference
	 *
	 * @since    0.1.0
	 */
	public function action_method_name() {
		// TODO: Define your action hook callback here
	}
	/**
	 * Function to register theme defined feature components 
	 */
	public function register_feature_components() {
		// TODO: Define your action hook callback here
		ajbilling_register_feature_component();
	}

	public function payment_custom_site_options() {
		// TODO: Define your action hook callback here
		ajbilling_payment_custom_site_options();
	}

	public function my_admin_scripts() {
		// TODO: Define your action hook callback here
		ajbilling_my_admin_scripts();
	}

	public function paymentApi_url() {
		// TODO: Define your action hook callback here
		ajbilling_paymentApi_url();
	}



	/**
	 * NOTE:  Filters are points of execution in which WordPress modifies data
	 *        before saving it or sending it to the browser.
	 *
	 *        WordPress Filters: http://codex.wordpress.org/Plugin_API#Filters
	 *        Filter Reference:  http://codex.wordpress.org/Plugin_API/Filter_Reference
	 *
	 * @since    0.1.0
	 */
	public function filter_method_name() {
		// TODO: Define your filter hook callback here
	}

	// create plans table for a blog 
	public function create_tables(){

		global $wpdb;

		$table_plans_name = $wpdb->base_prefix.'aj_billing_plans';

		$plans_sql = " CREATE TABLE IF NOT EXISTS  `{$table_plans_name}` (
				`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
				`braintree_plan_id` VARCHAR(30) NOT NULL,
				`title` VARCHAR(255),
				`features` LONGTEXT,
				`status` VARCHAR(20),
				`location_id` INT,
				`one_time_fee` DECIMAL(10,2) );";


		$table_countries_name = $wpdb->base_prefix.'aj_billing_countries';

		$countries_sql = " CREATE TABLE IF NOT EXISTS  `{$table_countries_name}` (
				`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
				`currency` VARCHAR(30) NOT NULL,
				`country` VARCHAR(255) );";
		
		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

		dbDelta($plans_sql);
		dbDelta($countries_sql);
		
	}

}
