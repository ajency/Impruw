<?php

include 'functions.php';

// function to fetch plans
function fetch_plans() {

    $data = array( array( 'id' => 1, 'package_name' => 'Package 1', 'package_description' => 'Lorem Ipsum' ), array( 'id' => 2, 'package_name' => 'Package 2', 'package_description' => 'Lorem Ipsum' ), array( 'id' => 3, 'package_name' => 'Package 3', 'package_description' => 'Lorem Ipsum' ) );

    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}

add_action( 'wp_ajax_fetch-plans', 'fetch_plans' );

//function to get plan by id and language
function fetch_plan_by_language(){
    $language = $_REQUEST['language'];
    $plan_id = $_REQUEST['plan_id'];
        
    $data = get_translated_plan_by_id($plan_id, $language);
    
    wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
}

add_action( 'wp_ajax_fetch-plan-by-language', 'fetch_plan_by_language' );


// function to create new plan
function create_plan_ajax() {

    //get default language (en or nb)
    $default_language = wpml_get_default_language();

    //Create plan in other language as well
    if($default_language==='en'){
        $other_language = 'nb';
    }
    else{
        $other_language = 'en';
    }
    
    // create plan in both languages en and nb
    $plan_name[$default_language]        = $_POST[ 'plan_name' ];
    $plan_name[$other_language]        = $_POST[ 'plan_name' ].'(not translated)';
    $plan_description[$default_language] = $_POST[ 'plan_description' ];
    $plan_description[$other_language] = $_POST[ 'plan_description' ].'(not translated)';

    //$plan_name and $plan_desciption shd be serialized array
    $plan_name_with_language = maybe_serialize( $plan_name );
    $plan_desc_with_language = maybe_serialize( $plan_description );

    $formdata = array( 'plan_name' => $plan_name_with_language, 'plan_description' => $plan_desc_with_language );

    // pass the formdata to the insert function, returns the new plan id
    $plan_id = wp_insert_plan( $formdata );

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $plan_id ) ) );
}

add_action( 'wp_ajax_create-plan', 'create_plan_ajax' );

function update_plan_ajax() {

    //get default language (en or nb)
    $default_language = wpml_get_default_language();

    //update translation of other language as well
    if($default_language==='en'){
        $other_language = 'nb';
    }
    else{
        $other_language = 'en';
    }

    $plan_id = $_POST[ 'id' ];

    $plan_name[$default_language]        = $_POST[ 'plan_name' ];
    $plan_name[$other_language]        = $_POST[ 'plan_name' ].'(not translated)';
    $plan_description[$default_language] = $_POST[ 'plan_description' ];
    $plan_description[$other_language] = $_POST[ 'plan_description' ].'(not translated)';

    //$plan_name and $plan_desciption shd be serialized array
    $plan_name_with_language = maybe_serialize( $plan_name );
    $plan_desc_with_language = maybe_serialize( $plan_description );

    $formdata = array( 'plan_name' => $plan_name_with_language, 'plan_description' => $plan_desc_with_language, 'id' => $plan_id );

    $plan_id = wp_update_plan( $formdata );

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $plan_id ) ) );
}

add_action( 'wp_ajax_update-plan', 'update_plan_ajax' );

function update_translated_plan_ajax(){

    $plan_id = $_REQUEST['plan_id'];
    $translated_plan_title = $_REQUEST['plan_title'];
    $translated_plan_desc = $_REQUEST['plan_desc'];
    $editing_language = $_REQUEST['editingLang'];

    //Get exisitng plan
    $existing_plan = get_room_plan_by_id($plan_id);

    $original_plan_name = $existing_plan_name = maybe_unserialize( $existing_plan->plan_name );
    $original_plan_desc = $existing_plan_desc = maybe_unserialize( $existing_plan->plan_description);

    if(is_array($existing_plan_name)){
        $existing_plan_name[$editing_language] = $translated_plan_title;
    }
    else{
        //For backward compatibility
        $default_language= wpml_get_default_language();
        $existing_plan_name= array();
        $existing_plan_name[$default_language] = $original_plan_name;
        $existing_plan_name[$editing_language] = $translated_plan_title;    
    }
    
    if(is_array($existing_plan_desc)){
        $existing_plan_desc[$editing_language] = $translated_plan_desc;
    }
    else{
        //For backward compatibility
        $default_language= wpml_get_default_language();
        $existing_plan_desc= array();
        $existing_plan_desc[$default_language] = $original_plan_desc;
        $existing_plan_desc[$editing_language] = $translated_plan_desc;
    }

    $new_plan_name = maybe_serialize( $existing_plan_name );
    $new_plan_desc = maybe_serialize( $existing_plan_desc );


    $formdata = array( 'plan_name' => $new_plan_name, 'plan_description' => $new_plan_desc, 'id' => $plan_id );

    $plan_id = wp_update_plan( $formdata );

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $plan_id ) ) );

}
add_action( 'wp_ajax_update-translated-plan', 'update_translated_plan_ajax' );

function delete_plan_ajax() {

    $plan_id = $_POST[ 'id' ];

    $formdata = array( 'id' => $plan_id );

    $plan_id = wp_delete_plan( $formdata );

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $plan_id ) ) );
}

add_action( 'wp_ajax_delete-plan', 'delete_plan_ajax' );
