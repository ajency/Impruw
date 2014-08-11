<?php

// function to insert a new plan
// returns plan id
function wp_insert_plan( $formdata ) {

    global $wpdb;

    $table_name = $wpdb->prefix . 'plans';

    $wpdb->insert( $table_name, $formdata );

    return $wpdb->insert_id;
}

function get_plans() {

    global $wpdb;

    $table_name = $wpdb->prefix . 'plans';

    $query = "SELECT * FROM $table_name ORDER BY id ASC";

    $plans = $wpdb->get_results( $query, ARRAY_A );
    
    $plan_array = array();

    $default_language = wpml_get_default_language();

    $language = '';

    foreach ($plans as $plan) {
        
        //unserialize plan_name and plan_description 
        $plan_name_unserialized = maybe_unserialize( $plan['plan_name'] );
        $plan_desc_unserialized = maybe_unserialize( $plan['plan_description'] );
        
        if($default_language==='en'){

            $language = 'nb';
        }
        else{
            $language = 'en';
        }

        if(is_array($plan_name_unserialized)){
            $plan_name = isset($plan_name_unserialized[$default_language]) ? $plan_name_unserialized[$default_language] : $plan_name_unserialized[$language];
        }
        else{
            $plan_name = $plan_name_unserialized;
        }

        if(is_array($plan_desc_unserialized)){
            $plan_description = isset($plan_desc_unserialized[$default_language]) ? $plan_desc_unserialized[$default_language] : $plan_desc_unserialized[$language];        
        }
        else{
            $plan_description = $plan_desc_unserialized;
        }


        $plan_array[ ] = array(
            'id' => $plan['id'],
            'plan_name' =>  $plan_name,
            'plan_description' => $plan_description
            );
    }

    return $plan_array;
}

function get_room_plan_by_id($plan_id){
    global $wpdb;

     $table_name = $wpdb->prefix . 'plans';

     $query = "SELECT * FROM $table_name WHERE id=".$plan_id;

     $plan = $wpdb->get_row( $query );

     return $plan;
}

function get_translated_plan_by_id($plan_id, $language){
 global $wpdb;

 $table_name = $wpdb->prefix . 'plans';

 $query = "SELECT * FROM $table_name WHERE id=".$plan_id;

 $plan = $wpdb->get_row( $query );

 $plan_array = array();

 //unserialize plan_name and plan_description 
 $plan_name_unserialized = maybe_unserialize( $plan->plan_name);
 $plan_desc_unserialized = maybe_unserialize( $plan->plan_description);

 if(is_array($plan_name_unserialized)){
    $plan_name = isset($plan_name_unserialized[$language]) ? $plan_name_unserialized[$language] : '';
}
else{
    $plan_name = '';
}

if(is_array($plan_desc_unserialized)){
    $plan_description = isset($plan_desc_unserialized[$language]) ? $plan_desc_unserialized[$language] : '';        
}
else{
    $plan_description = '';
}


$plan_array = array(
    'id' => $plan->id,
    'plan_name' =>  $plan_name,
    'plan_description' => $plan_description
    );
 

return $plan_array;    
}

function wp_update_plan( $formdata ) {

    global $wpdb;

    $table_name = $wpdb->prefix . 'plans';

    $wpdb->update( $table_name, $formdata, array( 'id' => $formdata[ 'id' ] ) );

    return $formdata[ 'id' ];
}

function wp_delete_plan( $formdata ) {

    global $wpdb;

    $table_name = $wpdb->prefix . 'plans';

    $wpdb->delete( $table_name, array( 'id' => $formdata[ 'id' ] ) );

    return $formdata[ 'id' ];
}
