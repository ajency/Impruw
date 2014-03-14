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
        
        $skip = array('Site Builder','Dashboard');

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