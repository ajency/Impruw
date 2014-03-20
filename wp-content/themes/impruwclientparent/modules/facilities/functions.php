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
/**
 * Delete a facility
 * @param term_id
 */
function delete_facility($term_id){

    $ret = wp_delete_term( $term_id, 'impruw_room_facility');
    
    if($ret){
      return 'Facilty Deleted';
    }
    else{
      return 'Could not delete facility';
    }
}

/**
* Update the facility
*/
function update_facility($postdata){
   
   //check if the term name exists
   $response = term_exists($postdata['term_name'], 'impruw_room_facility');
   
   // if term_id is the same as posted term id update the facility name
   if( $response['term_id'] == $postdata['term_id']){

       //prepare the new slug string
       $slug= sanitize_title($postdata['new_facility_name']);
       
       $ret = wp_update_term( $response['term_id'], 'impruw_room_facility', array('name'=>$postdata['new_facility_name'],'slug'=>$slug) );

       return $ret;
   }
   else{

      return 'Not Updated';
   
   }
}