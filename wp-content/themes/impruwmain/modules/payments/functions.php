<?php

/**
 * Function to add site features that will be used by the aj_billing plugin to create plans for the site
 * Features can be of 2 types currently : 
 * 	1. yes_no_type - those that can only be enabled or disabled - eg. Domain mapping
 *	2. count_type - those that can be enabled/disabled as well as have a count associated to them - eg. Email accounts
 * Each feature has a name and a key. the key is a unique single word and will be used to refer the feature
 */
function impruw_add_feature_components($defined_feature_components){

    $yes_no_features = array(
        array('key' =>'domain_mapping' , 'name' => 'Domain Mapping' )
    );

    $count_features =  array(array('key' =>'email_account' , 'name' => 'Email Account' ),
    array('key'=> 'site_add_ons', 'name' => 'Site Add Ons' ));

    $feature_components['yes_no_type'] = $yes_no_features;
    $feature_components['count_type'] = $count_features;

    return $feature_components;

}
add_filter('add_feature_components_filter','impruw_add_feature_components',10,1);

/**
 * Function to add custom plans drop down in the network 'edit site' screen of WP Dashboard
 */

function payment_custom_site_options(){
    global $pagenow,$wpdb;

    //Get all active plans from plans table of the payment plugin
    $plugin_plans_table = $wpdb->base_prefix.'aj_billing_plans'; 
    $sqlQuery = "SELECT * FROM $plugin_plans_table WHERE status='active'";
    $site_plans = $wpdb->get_results($sqlQuery, ARRAY_A);

    if( 'site-info.php' == $pagenow ) {
        ?><table><tr id="payment_custom_site_options">
            <th scope="row">Payment Plan</th>
            <td>
            	<select id="blog_payment_plan">
            	<option value="-1">--Select Plan--</option>
            	<?php 
            		foreach ($site_plans as $site_plan) {?>
            		<option value="<?php echo $site_plan['id'];?>"><?php echo $site_plan['title'];?></option>
            		<?php }?>
            		
            	</select>
            	<input class="button-secondary" type="button" name="save_plan" value="<?php _e( 'Save Plan' ); ?>" id="save_site_plan"/>
            </td>
        </tr></table>
        <script>jQuery(function($){
            $('.form-table tbody').append($('#payment_custom_site_options'));
        });</script><?php
    }
}
add_action('admin_footer', 'payment_custom_site_options');

/**
 * Load js script in network admin's site-info page for saving plan for a site
 */
function my_admin_scripts() {
    wp_register_script('updateSitePlanScript', get_template_directory_uri() . '/modules/payments/js/updateSitePlanScript.js', array('jquery'), JSVERSION, TRUE);
    wp_enqueue_script('updateSitePlanScript');
}
add_action( "admin_print_scripts-site-info.php", 'my_admin_scripts' );


function paymentApi_url() { ?>
<script type="text/javascript">
	var aj_billing_api_url = '<?php echo site_url()."/api/ajbilling/plan"; ?>';
</script>
<?php
}
add_action('admin_footer','paymentApi_url');


