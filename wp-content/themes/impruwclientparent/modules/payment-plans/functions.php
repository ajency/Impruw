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
    $plan_id = (function_exists('ajbilling_get_user_siteplan_id')) ?  ajbilling_get_user_siteplan_id(get_current_blog_id()) : 0 ;
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
    
    if (function_exists('ajbilling_get_site_currency')) {
         $currency= ajbilling_get_site_currency($site_id);
     } 

     return $currency;
}



