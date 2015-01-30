<?php

/*
 * function to register feature component and feature type
 * @param string component name 
 * @param array communication type values associated to the component
 * 
 */
function ajbilling_register_feature_component(){
    global $aj_feature_components;
    
    $aj_comp = array();

    //get the hooked payment module components/ component types
    $aj_feature_components = apply_filters('ajbilling_feature_component_filter',$aj_comp);

}

/*
 * function to get the theme defined feature components/feature type
 */
function ajbilling_theme_defined_components($aj_comp){
    $defined_feature_components = array();  // theme defined user components array  ie format array('component_name'=>array('comm_type1','comm_type1'))
    $defined_feature_components = apply_filters('add_feature_components_filter',$defined_feature_components);

    return $defined_feature_components;
    
}
add_filter('ajbilling_feature_component_filter','ajbilling_theme_defined_components',10,1);