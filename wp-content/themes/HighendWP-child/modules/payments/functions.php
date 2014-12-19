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

function payment_plan_change($site_id,$plan_id){

	//For each registered feature
	$all_features = ajbilling_get_all_feature_components();

	foreach ($all_features as $all_feature) {
		$feature_component = $all_feature['key'];

		$enable_status = ajbilling_plugin_feature_enable_status($plan_id,$feature_component);
		$new_count = ajbilling_get_plugin_feature_count($plan_id,$feature_component);
		$old_count = ajbilling_get_user_feature_count($site_id,$feature_component);

		$feature_args = array('enable_status' => $enable_status,'new_count' => $new_count, 'old_count' => $old_count );

		switch ($feature_component) {
			case 'domain_mapping':
				domain_mapping_feature_changes($site_id, $feature_args);
				break;
			case 'email_account':
				email_account_feature_changes($site_id, $feature_args);
				break;
			default:
				break;
		}
	}

	

}
add_action( 'ajbilling_update_payment_plan', 'payment_plan_change', 10, 2 );

function domain_mapping_feature_changes($site_id, $feature_args){

	$enable_status = $feature_args['enable_status'];
	$new_count = $feature_args['new_count'];
	$old_count = $feature_args['old_count'];

	if ($enable_status==='true') {
		// Disable coming soon page for the site if it exists
		dm_coming_soon_page($site_id,false);
	}
	else{
		// Enable coming soon page for the site
		dm_coming_soon_page($site_id,true);
	}

}

/**
 * Function to enable or disable coming soon page for site 
 */
function dm_coming_soon_page($site_id,$enable=false){
	// coming soon default options array
	$coming_soon_options = array('comingsoon_image' => 'http://impruw.com/wp-content/uploads/2014/12/impruw-logo-blue.png',
		'comingsoon_headline' => 'Domain mapping disabled',
		'comingsoon_description' => 'Description',
		'comingsoon_mailinglist' => 'none',
		'comingsoon_feedburner_address' => '',
		'comingsoon_customhtml' => '',
		'comingsoon_custom_bg_color' => '#ffffff',
		'comingsoon_background_noise_effect' => 'on',
		'comingsoon_custom_bg_image' => '',
		'comingsoon_font_color' => 'black',
		'comingsoon_text_shadow_effect' => 'on',
		'comingsoon_headline_font' => 'Lato',
		'comingsoon_body_font' => 'Lato',
		'comingsoon_custom_css' => 'html, body {
			margin: 0;
			padding: 0;
			font-size: 14px;
		}

		body {
			background: #eee;
			font-family: \'Helvetica\', Arial, sans-serif;
			font-size: 14px;
		}
		#teaser-description {
			text-align: center;
			color: #aaaaaa;
		}
		#coming-soon {
			width: 50%;
			margin: 100px auto;
			text-align: center;
		}

		#coming-soon h1 {
		font-size: 2em;
		color: #182944;
		}

		#coming-soon h1 span {
		color: #FF7E00;
		}

		#coming-soon .fixed {
		background: #fff;
		position: fixed;
		padding: 1em;
		font-size: 0.88em;
		color: #AAAAAA;
		bottom: 0;
		left: 0;
		width: 100%;
		border-top: 1px solid #849FB0;
		text-align: center;
		font-size: 12px;
		}',
		
		'comingsoon_footer_credit' => '0',);

	if ($enable) {
		$comingsoon_enabled = array (0 => '1',);
		$coming_soon_options['comingsoon_enabled'] = $comingsoon_enabled;
	}

	switch_to_blog($site_id);
	$update_comingsoon = update_option( 'seedprod_comingsoon_options', $coming_soon_options );
	restore_current_blog();

}

function email_account_feature_changes($site_id, $feature_args){

	$enable_status = $feature_args['enable_status'];
	$new_count = $feature_args['new_count'];
	$old_count = $feature_args['old_count'];

	$difference_in_count = $new_count-$old_count ;

	switch ($enable_status) {
		case 'true':
			if ($difference_in_count<0) {
				$count = abs($difference_in_count);
				suspend_email_accounts($site_id, $count);
			}
			break;
		
		case 'false':
			suspend_email_accounts($site_id);
			break;
	}

}


function suspend_email_accounts($site_id, $count=NULL){
	$args = array('domain_name' => $domain_name);

	switch_to_blog($site_id);
		$custom_domain_exists = get_option( 'domain-name', 0);
		if ($custom_domain_exists) {
			// Get all email accounts for this domain
			$args = array( 'domain_name'=> $custom_domain_exists);
        	$domain_accounts = get_domain_accounts($args);

        	$deleted_count = 0;
        	// Suspend email accounts if they exist
        	if (count($domain_accounts['data']) > 0) {
        		foreach ($domain_accounts['data'] as $domain_account) {
        			$email_id = $domain_account->email;
        			$email_id_args = array('email_id' => $email_id);
        			$response  = disable_user_email($email_id_args);

        			//if suspend success then increment count
        			if ($response['code']==='OK') {
        				$deleted_count++;

        				//Update count in the options
        				ajbilling_update_feature_count($site_id , 'site', 'email_account', 'minus');
        			}

        			if ((!is_null($count))&&($deleted_count==$count)) {
        				break;
        			}

        		}
        	}

		}

	restore_current_blog();
}



