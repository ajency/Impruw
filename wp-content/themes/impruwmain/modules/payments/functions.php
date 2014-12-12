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



