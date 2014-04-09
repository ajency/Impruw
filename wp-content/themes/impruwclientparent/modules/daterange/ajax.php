<?php

include_once 'functions.php';

# function to fetch packages

function fetch_daterange() {

    $data = array(array('id' => 1,
            'start_date' => strtotime('1/1/2014') * 1000,
            'end_date' => strtotime('3/31/2014') * 1000,
            'tariffs' => array(
                array(
                    'id' => 1,
                    'weekdays' => array('charge' => '$100', 'extra_adult' => '$20', 'extra_child' => '$10'),
                    'weekends' => array('charge' => '$200', 'extra_adult' => '$30', 'extra_child' => '$15')
                ),
                array(
                    'id' => 2,
                    'weekdays' => array('charge' => '$100', 'extra_adult' => '$20', 'extra_child' => '$10'),
                    'weekends' => array('charge' => '$200', 'extra_adult' => '$30', 'extra_child' => '$15')
                ),
                array(
                    'id' => 3,
                    'weekdays' => array('charge' => '$100', 'extra_adult' => '$20', 'extra_child' => '$10'),
                    'weekends' => array('charge' => '$200', 'extra_adult' => '$30', 'extra_child' => '$15')
                )
            )
        ),
        array('id' => 2,
            'start_date' => strtotime('4/1/2014') * 1000,
            'end_date' => strtotime('6/31/2014') * 1000,
            'tariffs' => array(
                array(
                    'id' => 1,
                    'weekdays' => array('charge' => '$100', 'extra_adult' => '$20', 'extra_child' => '$10'),
                    'weekends' => array('charge' => '$200', 'extra_adult' => '$30', 'extra_child' => '$15')
                ),
                array(
                    'id' => 2,
                    'weekdays' => array('charge' => '$100', 'extra_adult' => '$20', 'extra_child' => '$10'),
                    'weekends' => array('charge' => '$200', 'extra_adult' => '$30', 'extra_child' => '$15')
                ),
                array(
                    'id' => 3,
                    'weekdays' => array('charge' => '$100', 'extra_adult' => '$20', 'extra_child' => '$10'),
                    'weekends' => array('charge' => '$200', 'extra_adult' => '$30', 'extra_child' => '$15')
                )
            )
    ));

    wp_send_json(array('code' => 'OK', 'data' => $data));
}

add_action('wp_ajax_fetch-daterange', 'fetch_daterange');

/**
 * 
 * Function to create a new date range
 */
function create_daterange_ajax() {

    $formdata = array(
        'from_date' => $_POST['from_date'],
        'to_date' => $_POST['to_date'],
        'daterange_name' => $_POST['daterange_name'],
        'daterange_colour' => $_POST['daterange_colour']
    );

    // pass the form data to the insert function,
    //  @return daterange ID 
    $daterange_id = wp_insert_daterange($formdata);

    wp_send_json(array('code' => 'OK', 'data' => array('id' => $daterange_id)));
}

add_action('wp_ajax_create-daterange', 'create_daterange_ajax');

/**
 * function to update daterange
 */
function update_daterange_ajax() {

    $formdata = array(
        'id' => $_POST['id'],
        'from_date' => $_POST['from_date'],
        'to_date' => $_POST['to_date'],
        'daterange_name' => $_POST['daterange_name'],
        'daterange_colour' => $_POST['daterange_colour']
    );

    // pass the form data to the update function, returns the date range id 
    $daterange_id = wp_update_daterange($formdata);

    wp_send_json(array('code' => 'OK', 'data' => array('id' => $daterange_id)));
}

add_action('wp_ajax_update-daterange', 'update_daterange_ajax');

/**
 * Function to delete a daterange
 * 
 */
function delete_daterange_ajax() {

    $formdata = array(
        'id' => $_POST['id']
    );

    $daterange_id = wp_delete_daterange($formdata);

    wp_send_json(array('code' => 'OK', 'data' => array('id' => $daterange_id)));
}

add_action('wp_ajax_delete-daterange', 'delete_daterange_ajax');
