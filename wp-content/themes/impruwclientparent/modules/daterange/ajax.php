<?php

include_once 'functions.php';

# function to fetch packages

function ajax_fetch_daterange() {

    if(isset($_REQUEST['language'])){
      $data = get_date_range_by_language($_REQUEST['language']);
      wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
    }

    else
    {
            $data = array( array( 'id'         => 1,
              'start_date' => strtotime( '1/1/2014' ) * 1000,
              'end_date'   => strtotime( '3/31/2014' ) * 1000,
              'tariffs'    => array(
                array(
                  'id'       => 1,
                  'weekdays' => array( 'charge' => '$100', 'extra_adult' => '$20', 'extra_child' => '$10' ),
                  'weekends' => array( 'charge' => '$200', 'extra_adult' => '$30', 'extra_child' => '$15' )
                  ),
                array(
                  'id'       => 2,
                  'weekdays' => array( 'charge' => '$100', 'extra_adult' => '$20', 'extra_child' => '$10' ),
                  'weekends' => array( 'charge' => '$200', 'extra_adult' => '$30', 'extra_child' => '$15' )
                  ),
                array(
                  'id'       => 3,
                  'weekdays' => array( 'charge' => '$100', 'extra_adult' => '$20', 'extra_child' => '$10' ),
                  'weekends' => array( 'charge' => '$200', 'extra_adult' => '$30', 'extra_child' => '$15' )
                  )
                )
              ),
            array( 'id'         => 2,
             'start_date' => strtotime( '4/1/2014' ) * 1000,
             'end_date'   => strtotime( '6/31/2014' ) * 1000,
             'tariffs'    => array(
               array(
                 'id'       => 1,
                 'weekdays' => array( 'charge' => '$100', 'extra_adult' => '$20', 'extra_child' => '$10' ),
                 'weekends' => array( 'charge' => '$200', 'extra_adult' => '$30', 'extra_child' => '$15' )
                 ),
               array(
                 'id'       => 2,
                 'weekdays' => array( 'charge' => '$100', 'extra_adult' => '$20', 'extra_child' => '$10' ),
                 'weekends' => array( 'charge' => '$200', 'extra_adult' => '$30', 'extra_child' => '$15' )
                 ),
               array(
                 'id'       => 3,
                 'weekdays' => array( 'charge' => '$100', 'extra_adult' => '$20', 'extra_child' => '$10' ),
                 'weekends' => array( 'charge' => '$200', 'extra_adult' => '$30', 'extra_child' => '$15' )
                 )
               )
             ) );
            
            wp_send_json( array( 'code' => 'OK', 'data' => $data ) );
      }
}

add_action( 'wp_ajax_fetch-daterange', 'ajax_fetch_daterange' );

/**
 *
 * Function to create a new date range
 */
function ajax_create_daterange() {

    //get default language (en or nb)
    $default_language = wpml_get_default_language();
    
    // get daterange name
    $daterange_name[$default_language]   = $_POST[ 'daterange_name' ];

    //$daterange_name shd be serialized array
    $daterange_name_with_language = maybe_serialize( $daterange_name );

    $formdata = array(
        'from_date'        => $_POST[ 'from_date' ],
        'to_date'          => $_POST[ 'to_date' ],
        'daterange_name'   => $daterange_name_with_language,
        'daterange_colour' => $_POST[ 'daterange_colour' ]
    );

    // pass the form data to the insert function,
    //  @return daterange ID
    $daterange_id = wp_insert_daterange( $formdata );

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $daterange_id ) ) );
}

add_action( 'wp_ajax_create-daterange', 'ajax_create_daterange' );
add_action( 'wp_ajax_nopriv_create-daterange', 'ajax_create_daterange' );

/**
 * function to update daterange
 */
function ajax_update_daterange() {

    //get default language (en or nb)
    $default_language = wpml_get_default_language();

    $daterange_name[$default_language] = $_POST[ 'daterange_name' ];

    //date_range_name shd be serialized array
    $daterange_name_with_language = maybe_serialize( $daterange_name );

    $formdata = array(
        'id'               => $_POST[ 'id' ],
        'from_date'        => $_POST[ 'from_date' ],
        'to_date'          => $_POST[ 'to_date' ],
        'daterange_name'   => $daterange_name_with_language,
        'daterange_colour' => $_POST[ 'daterange_colour' ]
    );

    // pass the form data to the update function, returns the date range id
    $daterange_id = wp_update_daterange( $formdata );

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $daterange_id ) ) );
}

add_action( 'wp_ajax_update-daterange', 'ajax_update_daterange' );


/**
 * function to update translation of daterange
 */
function ajax_update_translated_dateranges() {

    $translatedDateranges = $_REQUEST['translatedDaterange'];
    $editing_language = $_REQUEST['editingLanguage'];
    $i =0;
    $updated_date_range_ids = array();

    while($i<sizeof($translatedDateranges)) {

        $daterange_id = $translatedDateranges[$i]['id'];

        //Get exisitng daterange
        $daterange = get_date_range_by_id($daterange_id);

        $existing_daterange_name = maybe_unserialize( $daterange->daterange_name );

        $existing_daterange_name[$editing_language] = $translatedDateranges[$i]['name'];

        $new_daterange_name = maybe_serialize( $existing_daterange_name );

        $formdata = array(
            'id'               => $daterange_id,
            'from_date'        => $daterange->from_date,
            'to_date'          => $daterange->to_date,
            'daterange_name'   => $new_daterange_name,
            'daterange_colour' => $daterange->daterange_colour
        );


        // pass the form data to the update function, returns the date range id
        $daterange_id = wp_update_daterange( $formdata );

        array_push($updated_date_range_ids,$daterange_id);


        $i++;
    }

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $updated_date_range_ids ) ) );
}

add_action( 'wp_ajax_update-translated-dateranges', 'ajax_update_translated_dateranges' );



/**
 * Function to delete a daterange
 *
 */
function ajax_delete_daterange() {

    $formdata = array(
        'id' => $_POST[ 'id' ]
    );

    $daterange_id = wp_delete_daterange( $formdata );

    wp_send_json( array( 'code' => 'OK', 'data' => array( 'id' => $daterange_id ) ) );
}

add_action( 'wp_ajax_delete-daterange', 'ajax_delete_daterange' );
