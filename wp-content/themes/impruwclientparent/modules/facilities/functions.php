<?php

/**
 * Add a new facility for the rooms
 *
 * Returns the term_id and term_taxonomy_id on succesfull insert
 *
 *
 */
function create_facility( $name ) {

    global $sitepress;
    $default_language = wpml_get_default_language();
    $current_language = wpml_get_current_language();

    // check if the term already exists
    $term_id = term_exists( $name, 'impruw_room_facility' );

    // if exists
    if ( $term_id !== 0 && $term_id !== null ) {
        return 'Facility Exists';
    } //else insert the term into the db
    else {
        $sitepress->switch_lang($default_language);
        $newfacililty_data = wp_insert_term( $name, 'impruw_room_facility', $args = array( 'hide_empty' => 0 ) );
        $sitepress->switch_lang($current_language);

        if($default_language==='en'){

            $language = 'nb';
        }
        else{

            $language = 'en';
        }
        
        $original_term_id = $newfacililty_data['term_id'] ;
        //Create translated facility in other language (en or nb) as well
        $new_term_name = $name."-".$language;
        $translated_term = save_term_translation_wpml($language, $original_term_id, $new_term_name,'impruw_room_facility');

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

        $ret= save_term_translation_wpml(wpml_get_default_language(), $response[ 'term_id' ], $postdata[ 'new_facility_name' ],'impruw_room_facility');

        // update the new name
        // $ret[ 'name' ] = $postdata[ 'new_facility_name' ];

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

    $taxonomies = array(
        $taxonomy_name
    );
    $room_facilities = get_terms( $taxonomies, array(
        'hide_empty' => 0
    ) );

    $room_facilities = json_decode(json_encode($room_facilities),true);

    foreach ($room_facilities as $room_facility) {
        $original_term_id =$room_facility['term_id'];
        $translated_term_id = icl_object_id($original_term_id, $taxonomy_name, false,$language);

        if($translated_term_id==null){
            $new_term_name = $room_facility['name']."-".$language;
            $translated_term = save_term_translation_wpml($language, $original_term_id, $new_term_name,$taxonomy_name);

            $facilities_term_array[] = array(
                'original_term_id'=>$original_term_id,
                'name'=> $translated_term['name'],
                'term_id' => $translated_term['term_id'],
                'term_error' => isset($translated_term['term_error']) ? urldecode($translated_term['term_error']) : 'No
                errors'
            );

        }
        else{
            remove_all_filters( 'get_term' );
            $translated_term = get_term($translated_term_id, $taxonomy_name);

            $facilities_term_array[] = array(
                'original_term_id'=>$original_term_id,
                'name'=> $translated_term->name,
                'term_id' => $translated_term->term_id,
                'term_error' => isset($translated_term->term_error) ? urldecode($translated_term->term_error) : 'No errors'
            );
        }
    }

    return $facilities_term_array;

}

function save_term_translation_wpml($language, $original_term_id, $new_term_name,$taxonomy_name)
{
    global $sitepress, $wpdb;

    $original_element   = $original_term_id;
    $taxonomy           = $taxonomy_name;
    $language           = $language;
    $new_name           = $new_term_name;
    //prepare the new slug string
    $slug = sanitize_title( $new_term_name );

    $trid = $sitepress->get_element_trid($original_element, 'tax_' . $taxonomy);
    $translations = $sitepress->get_element_translations($trid, 'tax_' . $taxonomy);

    $_POST['icl_tax_' . $taxonomy . '_language'] = $language;
    $_POST['icl_trid'] = $trid;
    $_POST['icl_translation_of'] = $original_element;

    $errors = '';

    $term_args = array(
        'name'  => $new_name,
        'slug'  => $slug          
    );

    $original_tax = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->term_taxonomy} WHERE taxonomy=%s AND term_taxonomy_id = %d",$taxonomy, $original_element));

    // hierarchy - parents
    if(is_taxonomy_hierarchical($taxonomy)){
        // fix hierarchy
        if($original_tax->parent){
            $original_parent_translated = icl_object_id($original_tax->parent,$taxonomy, false, $language);
            if($original_parent_translated){
                $term_args['parent'] = $original_parent_translated;
            }
        }

    }

    if(isset($translations[$language])){
        $result = wp_update_term($translations[$language]->term_id, $taxonomy, $term_args);

    }
    else{
        $result = wp_insert_term($new_name , $taxonomy, $term_args);

    }

    if(is_wp_error($result)){
        foreach($result->errors as $ers){
            $errors .= join('<br />', $ers);
        }
        $errors .= '<br />'   ;
    }
    else{

        // hiearchy - children
        if(is_taxonomy_hierarchical($taxonomy)){

            // get children of original
            $children = $wpdb->get_col($wpdb->prepare("SELECT term_id FROM {$wpdb->term_taxonomy} WHERE taxonomy=%s AND parent=%d",$taxonomy, $original_element));

            if($children) foreach($children as $child){
                $child_translated = icl_object_id($child, $taxonomy, false, $language);
                if($child_translated){
                    $wpdb->update($wpdb->term_taxonomy, array('parent' => $result['term_id']), array('taxonomy' => $taxonomy, 'term_id' => $child_translated));
                }
            }

            delete_option($taxonomy . '_children');

        }

        $term = get_term($result['term_id'], $taxonomy);
    }

    $translated_term = array(
        "term_id"=> isset($term) ? urldecode($term->term_id) : '',
        "name" => isset($term) ? urldecode($term->name) : '',
        "term_error" =>$errors
    );

    return $translated_term;
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
