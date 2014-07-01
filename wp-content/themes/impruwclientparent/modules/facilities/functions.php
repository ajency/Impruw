<?php

/**
 * Add a new facility for the rooms
 *
 * Returns the term_id and term_taxonomy_id on succesfull insert
 *
 *
 */
function create_facility( $name ) {

    // check if the term already exists
    $term_id = term_exists( $name, 'impruw_room_facility' );

    // if exists
    if ( $term_id !== 0 && $term_id !== null ) {
        return 'Facility Exists';
    } //else insert the term into the db
    else {
        $newfacililty_data = wp_insert_term( $name, 'impruw_room_facility', $args = array( 'hide_empty' => 0 ) );

        return $newfacililty_data;
    }
}

/**
 * Delete a facility
 *
 * @param term_id
 */
function delete_facility( $term_id ) {

    $ret = wp_delete_term( $term_id, 'impruw_room_facility' );

    if ( $ret ) {
        return 'Facilty Deleted';
    } else {
        return 'Could not delete facility';
    }
}

/**
 * Update the facility
 */
function update_facility( $postdata ) {

    //check if the term name exists
    $response = term_exists( $postdata[ 'term_name' ], 'impruw_room_facility' );

    // if term_id is the same as posted term id update the facility name
    if ( $response[ 'term_id' ] == $postdata[ 'term_id' ] ) {

        //prepare the new slug string
        $slug = sanitize_title( $postdata[ 'new_facility_name' ] );

        $ret = wp_update_term( $response[ 'term_id' ], 'impruw_room_facility', array( 'name' => $postdata[ 'new_facility_name' ], 'slug' => $slug ) );

        // update the new name
        $ret[ 'name' ] = $postdata[ 'new_facility_name' ];

        return $ret;
    } else {

        return 'Not Updated';
    }
}

/*
* Get facilities based on default language 
*/

function get_language_based_facilities($language){

    $facilities_term_array = array();

    $taxonomy_name = "impruw_room_facility";
    $element_type = 'tax_'.$taxonomy_name;

    remove_all_filters( 'get_term' ); 
    $terms = get_terms($taxonomy_name,array(
        'hide_empty' => false
    ) );
     
    if (!is_wp_error( $terms ) ){

        //$facilities_term_array = json_encode($terms);
         
         foreach ( $terms as $term ) {
            $original_term_id = (int)$term->term_id;

            
            $translated_id = get_translated_id($original_term_id, $language,$element_type);
            if($translated_id!=null){
                $translated_id = get_translated_id($original_term_id, $language,$element_type); 

                $translated_term_name = get_translated_term_name($translated_id, $taxonomy_name);

                $facilities_term_array[] = array(
                    'facilityName' => $translated_term_name,
                    'facilityId' => $translated_id

                );
            }
            else{
                $new_translated_id = duplicate_language_term($original_term_id,$taxonomy_name, $language);

                $new_translated_term_name = get_translated_term_name($new_translated_id, $taxonomy_name);

                $facilities_term_array[] = array(
                    'facilityName' => $new_translated_term_name,
                    'facilityId' => $new_translated_id
                );
            }
           
         }
    }

    else{
        $facilities_term_array =  "get terms fails";
    }

     return $facilities_term_array;

}


function duplicate_language_term($original_id, $taxonomy_name, $language){
   $old_term_name = get_translated_term_name($original_id, $taxonomy_name);
   $from_language = wpml_get_default_language();
   $to_language = $language;

   $new_term_name = wpml_machine_translation($old_term_name, $from_language, $to_language)."_".$language;

    // check if the term already exists
    $term_id = term_exists( $new_term_name, 'impruw_room_facility' );

    // if exists
    if ( $term_id !== 0 && $term_id !== null ) {
        return 'Facility Exists';
    } //else insert the term into the db

    else{
         //insert into terms table
        $returnTerm =  wp_insert_term(
                    $new_term_name, // the term
                    $taxonomy_name // the taxonomy
                    );

    }
   
   if( is_wp_error( $returnTerm ) ) {
        return $returnTerm->get_error_message();
    }
    else
    {

        $new_translated_term_id = $returnTerm['term_id'];
        
        // Get language code of original
        $lang_code_original = wpml_get_default_language();
        //element type
        $element_type = 'tax_'.$taxonomy_name;

        global $wpdb;
        $tbl_icl_translations  = $wpdb->prefix ."icl_translations";

        $select_trid = $wpdb->get_row( "SELECT trid FROM $tbl_icl_translations WHERE element_id =".$original_id." AND element_type='".$element_type."'");
        $trid = $select_trid->trid;

                        //Now update the term in icl_translation table to associate it to the original term
        $updateQuery = $wpdb->update(
            $tbl_icl_translations, array(
                'trid' => $trid,
                'language_code' => $language ,
                'source_language_code' => $lang_code_original,
                'element_type' => $element_type
                ), array( 'element_id' => $new_translated_term_id ) );
    }

    return $new_translated_term_id; 

}

function get_translated_term_name($term_id, $taxonomy_name){

    remove_all_filters( 'get_term' ); //remove all filters on get_term else it returns term information of original term
    $translated_term = get_term($term_id,$taxonomy_name);
    $translated_term_name = $translated_term->name;

    return $translated_term_name;

}
