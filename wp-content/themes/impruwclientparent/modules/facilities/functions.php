<?php
/**
 * Add a new facility for the rooms
 *
 * Returns the term_id and term_taxonomy_id on succesfull insert
 *  
 * 
 */
function create_facility($name){
    // check if the term already exists
    $term_id = term_exists($name, 'impruw_room_facility');
    
    // if exists
    if($term_id !== 0 && $term_id !== NULL){
        return 'Facility Exists';
    }

    //else insert the term into the db
    else{
      $newfacililty_data = wp_insert_term( $name, 'impruw_room_facility', $args = array( 'hide_empty' => 0 ) ) ;
      return $newfacililty_data;
    }
}