<?php

/**
 * Get all menu pages for the site
 * @return [type] [description]
 */
function get_all_menu_pages(){
        
    $args = array('post_type' => 'page','posts_per_page' => -1);
    $pages  = new WP_query($args);
     
    $p = array();

    if($pages->have_posts()){
        
        $skip = array('Site Builder','Dashboard','Support','Coming Soon','Sample Page');

        foreach($pages->posts as $page){

            if(!in_array($page->post_title, $skip))
                $p[] = $page;
        }
    }

    return $p;

}

/**
 * Get all menu pages for the site
 * @return [type] [description]
 */
function get_all_template_pages(){
        
    $args = array(  'post_type' => 'page',
                    'posts_per_page' => -1,
                    'meta_key'  => 'page_template',
                    'meta_value' => 'yes');

    $pages  = new WP_query($args);
     
    $p = array();

    if($pages->have_posts())
        return $pages->posts;
    
    return $p;

}

/**
 * converts a json string to an array
 * @param unknown $json_string
 * @return mixed
 */
function convert_json_to_array($json_string){
	
	$json_array = stripslashes($json_string);
	$json_array = json_decode ( $json_array, true );
	
	return $json_array;
}

/**
 *  Create new Page function
 */ 
function create_new_page($data){

    $page_data = array();

    //check if post_title is set
    $page_data['post_title'] = isset($data['post_title']) ? $data['post_title'] : '';

    // set the post type to 'page'
    $page_data['post_type'] = 'page';
    $page_data['post_status'] = 'publish';

    //let create a new page 
    $page_id = wp_insert_post($page_data, true);

    if(is_wp_error($page_id))
        return $page_id;

    // check what is the template id need to create the page
    // if 0 no template is choosed. ignore pulling json from page
    $template_page_id = (int)$data['template_page_id'];

    // return post id if template id is 0
    if($template_page_id === 0)
        return $page_id;

    // get the template json 
    $template_json = get_post_meta($template_page_id, 'page-json', true);

    //and set it to page
    update_post_meta($page_id, 'page-json', $template_json);

    return $page_id;

}


/**
 * 
 * @param type $section
 * @param type $page_id
 * @return type
 */
function get_json_to_clone($section, $page_id = 0){
    
    $elements = array();
    if($page_id == 0)   
        $elements = get_option($section);
    else
        $elements  = get_post_meta($page_id,'page-json', true);
    
    $d = array();
        
    if(is_array($elements)){
        foreach($elements as $element){
            if($element['element'] === 'Row' ){
                $element['columncount'] = count($element['elements']);
                $d[] = get_row_elements($element);
            }
            else{
                $meta = get_meta_values ($element);
                if($meta !== false)
	                $d[] = $meta;
            }
        }
    }
     
   return $d;
}

function get_row_elements($element){
    foreach($element['elements'] as &$column){
        foreach($column['elements'] as &$ele){
            if($ele['element'] === 'Row' ){
                $ele['columncount'] = count($ele['elements']);
                $ele = get_row_elements($ele);
            }
            else{
                $meta = get_meta_values ($ele);
                if($meta !== false)
                	$ele = wp_parse_args($meta,$ele);
            }
        }
        
    }
    return $element;
}


function get_meta_values($element, $create = false){
	$meta = get_metadata_by_mid('post', $element['meta_id']);
	
	if(!$meta)
		return false;
	
    $ele = maybe_unserialize($meta->meta_value);
    $ele['meta_id'] = $create ? create_new_record($ele) : $element['meta_id'];
    validate_element($ele);
    return $ele;
}

function validate_element(&$element){
    $numkeys = array('id', 'meta_id', 'menu_id','ID', 'image_id');
    $boolkey = array('draggable', 'justified');
     
    if(!is_array($element) && !is_object($element))
        return $element;
    
    foreach ($element as $key => $val){
        if(in_array($key, $numkeys))
            $element[$key] = (int) $val;
        if(in_array($key, $boolkey))
            $element[$key] = $val === "true";
    }
    return $element;
}

/**
 * this function will set the fetched json data from on site to another
 */
function set_json_to_site($elements){

    foreach($elements as &$element){
        if($element['element'] === 'Row' ){
            $element['columncount'] = count($element['elements']);
            set_row_elements($element);
        }
        else
            $element = create_new_element($element);
    }

    return $elements;
}

function set_row_elements(&$element){
    foreach($element['elements'] as &$column){
        foreach($column['elements'] as &$ele){
            if($ele['element'] === 'Row' ){
                $ele['columncount'] = count($ele['elements']);
                set_row_elements($ele);
            }
            else{
                $ele = create_new_element($ele);
            }
        }
        
    }
}

/**
 * 
 */
function create_new_element(&$ele){

    global $wpdb;

    //unset the existing meta_id
    unset($ele['meta_id']);

    //handle_unavailable_fields($ele);

    //insert the element in postmeta and retunr the meta_id
    $serialized_element = maybe_serialize($ele);
    $wpdb->insert($wpdb->postmeta, array(
        'post_id' => 0,
        'meta_value' => $serialized_element,
        'meta_key' => $ele['element']
    ));

    return array(
            'meta_id' => $wpdb->insert_id,
            'element' => $ele['element']
        );
}
