<?php

include 'functions.php';

// function to fetch plans
function fetch_plans(){

	$data = array(array('id' => 1, 'package_name' => 'Package 1', 'package_description' => 'Lorem Ipsum'),
				array('id' => 2, 'package_name' => 'Package 2', 'package_description' => 'Lorem Ipsum'),
				array('id' => 3, 'package_name' => 'Package 3', 'package_description' => 'Lorem Ipsum'));

	wp_send_json(array('code' => 'OK', 'data' => $data) );

}
add_action('wp_ajax_fetch-plans', 'fetch_plans');

// function to create new plan
function create_plan_ajax(){

	// get all form data
	$plan_name = $_POST['plan_name'];
	$plan_description = $_POST['plan_description'];

	$formdata = array('plan_name' => $plan_name, 'plan_description' => $plan_description);

	// pass the formdata to the insert function, returns the new plan id
	$plan_id = wp_insert_plan($formdata);

	wp_send_json(array('code' => 'OK', 'data' => array('id' => $plan_id)));

}
add_action('wp_ajax_create-plan','create_plan_ajax');

function update_plan_ajax() {
    
    $plan_id = $_POST['id'];
    
    $plan_name = $_POST['plan_name'];
    
    $plan_description = $_POST['plan_description'];
    
    $formdata= array(
                    'plan_name' => $plan_name,
                    'plan_description' => $plan_description,
                    'id' => $plan_id
        );

    $plan_id = wp_update_plan($formdata);
    
    wp_send_json(array('code'=>'OK','data'=>array('id'=>$plan_id)));
}
add_action('wp_ajax_update-plan','update_plan_ajax');


function delete_plan_ajax() {
    
    $plan_id = $_POST['id'];
    
    $formdata= array(
                    'id' => $plan_id
        );

    $plan_id = wp_delete_plan($formdata);
    
    wp_send_json(array('code'=>'OK','data'=>array('id'=>$plan_id)));
}
add_action('wp_ajax_delete-plan','delete_plan_ajax');
