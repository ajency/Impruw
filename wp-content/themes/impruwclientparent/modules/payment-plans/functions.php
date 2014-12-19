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
    $current_count = (function_exists('ajbilling_get_user_feature_count')) ? ajbilling_get_user_feature_count($site_id,$feature_component) : 0 ; 
    return $current_count;

}

function site_feature_allowed_count($feature_component){

    $plan_id = (function_exists('ajbilling_get_user_siteplan_id')) ? ajbilling_get_user_siteplan_id(get_current_blog_id()) : 0 ; 
    $allowed_count = (function_exists('ajbilling_get_plugin_feature_count')) ? ajbilling_get_plugin_feature_count($plan_id,$feature_component) : 0 ; 
    return $allowed_count;

}

function get_site_plan(){
    $plan_id = (function_exists('ajbilling_get_user_siteplan_id')) ?  ajbilling_get_user_siteplan_id(get_current_blog_id()) : 0 ;
    return $plan_id;
}



