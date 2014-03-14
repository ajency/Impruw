<?php
/**
 *  @returns the room id for the new room created
 *  @param postdata passes the form data into the form
 * 
 */
function create_room($postdata){

    // set the params
    $post_title = $postdata['post_title'];
    $post_content = $postdata['post_content'];
    $post_type= 'impruw_room';
    $post_status = 'publish';
  
    // prepare the data array
    $data= array(
                  'post_title'=> $post_title,
                  'post_content' => $post_content,
                  'post_type' => $post_type,
                  'post_status' => $post_status,
                );

    //insert into the database using wp function
    $post_id = wp_insert_post( $data , false);
    
    // return the room id
    return $post_id;

}