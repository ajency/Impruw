<?php
/**
 * Function to add site features that will be used by the aj_billing plugin to create plans for the site
 * Features can be of 2 types currently : 
 *  1. yes_no_type - those that can only be enabled or disabled - eg. Domain mapping
 *  2. count_type - those that can be enabled/disabled as well as have a count associated to them - eg. Email accounts
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
 * Registered feature types : domain_mapping , email_sccount , site_add_ons
 */
function is_feature_allowed($feature_component){
    $site_id = get_current_blog_id();
    $is_allowed = 0;

    $user_feature = (function_exists('ajbilling_is_this_user_allowed')) ? ajbilling_is_this_user_allowed($site_id , 'site', $feature_component) :  array('code' => 'ERROR'); 
    if ($user_feature['code']==='OK') {
    	$is_allowed = $user_feature['allowed'];
    }
       
    return $is_allowed;
}

function site_feature_current_count($feature_component){

    $site_id = get_current_blog_id();

    $current_count = (function_exists('ajbilling_get_user_feature_count')) ? ajbilling_get_user_feature_count($site_id,$feature_component) : array('count' => 0); 
    return $current_count['count'];

}

function site_feature_current_count_array($feature_component){

    $site_id = get_current_blog_id();
    $current_count = (function_exists('ajbilling_get_user_feature_count')) ? ajbilling_get_user_feature_count($site_id,$feature_component) : 0 ; 
    return $current_count['count_array'];

}

function site_feature_allowed_count($feature_component){

    $plan_id = (function_exists('ajbilling_get_user_siteplan_id')) ? ajbilling_get_user_siteplan_id(get_current_blog_id()) : 0 ; 
    $allowed_count = (function_exists('ajbilling_get_plugin_feature_count')) ? ajbilling_get_plugin_feature_count($plan_id,$feature_component) : 0 ; 
    return $allowed_count;

}

function get_site_plan(){
    $plan_id = (function_exists('ajbilling_get_user_siteplan_id')) ?  ajbilling_get_user_siteplan_id(get_current_blog_id()) :1 ;
    return $plan_id;
}

function get_markup_for_addon($element_name,$preview){

    if ($preview || is_user_logged_in()) {
       $markup = '  <div class="text-center image-placeholder">
                        <span class="glyphicon glyphicon-ban-circle pull-left"></span>
                        <span class="glyphicon glyphicon-ban-circle pull-right"></span>
                        <h6> <small>Add-on: </small>'.$element_name.' </h6>
                        <p>This add-on will not be displayed on your site since it has not been added to your plan.</p>

                        <p>To make this add-on available, <a href="'.get_site_url().'/dashboard/#/billing/pricing-plans">Click Here</a> to update your plan.<br>
                           You can then choose from our list of available add-ons to add to your site.
                        </p>
                    </div>';
    }
    else{
       $markup = '<div></div>';   
    }
    

    return $markup;
}

function is_site_addon($element_name){
    $site_addons = array('LanguageSwitcher','SmartTable','RoomSummary','RoomBooking');

    if (in_array($element_name,  $site_addons)) {
        return true;
    }
    return false;
}

function display_element_markup($element_name , $feature_component = 'site_add_ons'){

    $display = true;
    //if element is add on
    if (is_site_addon($element_name)) {
        //if add on feature is enabled for current plan
        if(is_feature_allowed($feature_component)){
            $allowed_count = site_feature_allowed_count($feature_component);
            $current_count = site_feature_current_count($feature_component);
            $current_count_array = site_feature_current_count_array($feature_component); 
            
            // if current count is less than allowed count then display  element markup and add the add on to the plan count array if not previously present
            if ($current_count<$allowed_count) {
                if (!in_array($element_name, $current_count_array)){
                    update_addons_count($element_name,'plus');
                }
                $display = true;
            }
            else if ($current_count>$allowed_count) {
                // if current count is greater than allowed count then do not display element markup and remove the element if previously present in the plan count array
                if (in_array($element_name, $current_count_array)){
                    update_addons_count($element_name,'minus');
                }
                $display = false;
            }
            else if ($current_count==$allowed_count) {
                //if counts are equal, display he element markup only if the element is present is plan count array
                if (in_array($element_name, $current_count_array)){
                    $display = true;
                }
                else{
                // else do not display the element markup
                     $display = false;
                }
            }          
        }
        else{
        // If addon feature is not enabled for current plan then do not display the element markup
            update_addons_count($element_name,'reset');
            $display = false; 
        }
    }
    else{
        //if element is not an addon default markup for element is displayed
        $display = true;
    }

    return $display;
}


function  update_addons_count($element_name,$plus_or_minus){

    $site_id = get_current_blog_id();
    if (function_exists('ajbilling_update_feature_addon')) {
         $result= ajbilling_update_feature_addon($site_id ,$element_name,$plus_or_minus);
     } 

     return $result['updated_feature_count'];
}

function get_all_siteaddons(){
    $elements = get_elementbox_elements();

    $all_siteaddons = array();

    foreach ($elements as $element) {
        if ($element['addOn']) {
            $all_siteaddons[] = $element;
        }
    }

    return $all_siteaddons;
}

function get_country_based_site_currency(){
    $site_id = get_current_blog_id();

    $currency = aj_billing_get_currency_from_site($site_id);

    return $currency;
}

// Plan change action should trigger changes in domain mapping and email accoutns for the site ; similar to what is done in parent theme
function child_payment_plan_change($site_id,$plan_id){

    //For each registered feature
    $all_features = ajbilling_get_all_feature_components();

    foreach ($all_features as $all_feature) {
        $feature_component = $all_feature['key'];

        $enable_status = ajbilling_plugin_feature_enable_status($plan_id,$feature_component);
        $new_count = ajbilling_get_plugin_feature_count($plan_id,$feature_component);
        $old_count = ajbilling_get_user_feature_count($site_id,$feature_component);
        $old_count = $old_count ['count'];

        $feature_args = array('enable_status' => $enable_status,'new_count' => $new_count, 'old_count' => $old_count );

        switch ($feature_component) {
            case 'domain_mapping':
                child_domain_mapping_feature_changes($site_id, $feature_args);
                break;
            case 'email_account':
                child_email_account_feature_changes($site_id, $feature_args);
                break;
            default:
                break;
        }
    }

    

}
add_action( 'ajbilling_update_payment_plan', 'child_payment_plan_change', 10, 2 );

function child_domain_mapping_feature_changes($site_id, $feature_args){

    $enable_status = $feature_args['enable_status'];
    $new_count = $feature_args['new_count'];
    $old_count = $feature_args['old_count'];

    // Check if domain name is set
    switch_to_blog($site_id);
    $domain_name = get_option( 'domain-name');
    restore_current_blog();

    if ((!$enable_status) && $domain_name) {
        // Enable coming soon page for the site
        child_dm_coming_soon_page($site_id,true);
    }
    else{
        // Disable coming soon page for the site if it exists
        child_dm_coming_soon_page($site_id,false);
    }

}

/**
 * Function to enable or disable coming soon page for site 
 */
function child_dm_coming_soon_page($site_id,$enable=false){
    // coming soon default options array
    $coming_soon_options = array('comingsoon_image' => 'http://impruw.com/wp-content/uploads/2014/12/impruw-logo-blue.png',
        'comingsoon_headline' => '',
        'comingsoon_description' => '
        <h1 style="text-align: center;">Site Unavailable</h1>
        <p style="text-align: center;">Oops, the page you are looking for is not reachable on our servers or is temporarily unavailable! This could be because Domain mapping is not enabled.</p>
        <p style="text-align: center;">Please check back later or contact us on the following details:
            Email:
            Phone No:</p>',
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
            #teaser-image{
                        float: right;
                        margin: 0 20px 10px 0;
                    }
            #teaser-description {
                    text-align: center;
                    color: #aaaaaa;
                    max-width: 680px;
                    padding: 20px 0;
                    clear: both;
                }
            #coming-soon {
                /*width: 50%;
                margin: 100px auto;*/
                text-align: center;
            }

            #coming-soon h1 {
            font-size: 2em;
            color: #182944;
            margin: 0;
            }

            #coming-soon h1 span {
            contentlor: #FF7E00;
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

function child_email_account_feature_changes($site_id, $feature_args){

    $enable_status = $feature_args['enable_status'];
    $new_count = $feature_args['new_count'];
    $old_count = $feature_args['old_count'];

    $difference_in_count = $new_count-$old_count ;

    switch ($enable_status) {
        case 1:
            if ($difference_in_count<0) {
                $count = abs($difference_in_count);
                suspend_email_accounts($site_id, $count);
            }
            break;
        
        case 0:
            suspend_email_accounts($site_id);
            break;
    }

}


function child_suspend_email_accounts($site_id, $count=NULL){

    switch_to_blog($site_id);
        $custom_domain_exists = get_option( 'domain-name', 0);
        if ($custom_domain_exists) {
            // Get all email accounts for this domain
            $args = array( 'domain_name'=> $custom_domain_exists);
            $domain_accounts = get_domain_accounts($args);

            $deleted_count = 0;
            // Suspend email accounts if they exist
            if ($domain_accounts['data']!=="") {
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






