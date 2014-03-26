<?php
/**
 *  @returns the room id for the new room created
 *  @param postdata passes the form data into the form
 * 
 */
function create_room($formdata){
     
    // set the params
    $post_title = $formdata['post_title'];
    $post_content = $formdata['post_content'];
    $post_type= 'impruw_room';
    $post_status = 'publish';
    $slider_id= $formdata['slider_id'];
    
    // prepare facility array
    $facility= $formdata['facility'];
    
    // get selected facilities
    foreach( $facility as $key => $value){
        if($value == "true"){
            $facility_ids[] = $key;
        }
    }
    
    
    // prepare the data array
    $data= array(
                  'post_title'=> $post_title,
                  'post_content' => $post_content,
                  'post_type' => $post_type,
                  'post_status' => $post_status,
                );

    //insert data array into the post table using wp function
    $post_id = wp_insert_post( $data , false);
    
    
    if($post_id != 0){
        
        // insert the slider id into the post meta table
        add_post_meta($post_id, 'slider_id', $slider_id);
        
        // set the facilities selected for the room
       wp_set_post_terms( $post_id, $facility_ids, 'impruw_room_facility' );
    }

     //return the room id
     return $post_id;
  
}

// Function returns the data for the new room created
function get_post_room($roomid){
    
    $room_id= $roomid;
    
    // returns an array of values from post table
    $room_post = get_post($room_id,ARRAY_A);
    
    // returns a string of the post meta value
    $room_post_meta_val =get_post_meta( $room_id,'slider_id',true);
    
    if(!empty($room_post_meta_val)){
        // convert the post meta string to array
        $room_post_meta = array('slider_id' => $room_post_meta_val);

        // returns an array of the post terms of the room
        $room_term_names = wp_get_post_terms( $room_id, 'impruw_room_facility');

        // loop the array and get the facilities
        foreach ($room_term_names as $key => $value) {
            $room_terms['facilities-'.$room_term_names[$key]->term_id] = $room_term_names[$key]->name;
        }

        // merge the array  
        $merge_first =array_merge($room_post,$room_post_meta);

        $roomdata =array_merge($merge_first,$room_terms); 

        return $roomdata;
    }
}