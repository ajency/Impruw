<?php

/**
 * Gets the site Details
 * @param type $site_id
 * @return type
 */
function get_site_details($site_id) {

    return array(
        'site_id' => $site_id,
        'site_domain' => get_site_domain($site_id),
        'site_name' => get_option('blogname'),
        'admin_email' => get_option('admin_email'),
        'street' => get_option('street',''),
        'postal_code' => get_option('postal_code',''),
        'city' => get_option('city',''),
        'country' => get_option('country',''),
        'other_emails' => get_option('other_emails',array()),
        'other_phone_no' => get_option('other_phone_no',array())
    );
}


/**
 * Returns the domain of the site
 * @param type $domain
 * @return string
 */
function get_site_domain($site_id){
    
    // new site will be created from main site always. hence, blog_id is 1
    $site = get_blog_details($site_id);
    
    $domain = '';
    
    if (is_subdomain_install() )
        $domain = $domain . '.' . preg_replace( '|^www\.|', '', $site->domain );    
    else 
        $domain = $site->domain;
    
    return $domain;
}

/**
 * Assign the new theme to site
 * @param type $site_id
 * @param type $theme_id
 */
function assign_theme_to_site( $theme_id ,$site_id = 0){
    
    if($site_id === 0)
        $site_id = get_current_blog_id ();
    
    // all themes are stored on main site
    switch_to_blog(1);
    
    // check if passed theme_id exists
    $theme = get_post($theme_id);
    
    // if theme does not exists
    if( null === $theme)
        return false;
    
    $theme_site_id = get_post_meta($theme_id, 'linked_theme', true);
    
    $theme_name = get_theme_name($theme_site_id);
    
    restore_current_blog();
    
    //assign the theme to 
    $theme = wp_get_theme( $theme_name ); //Change the name here to change the theme
    
    if ( $theme->exists() && $theme->is_allowed() )
        switch_theme( $theme->get_template(), $theme->get_stylesheet() );
    
    $pages =    array(  
                    array('post_title' => 'Home'),
                    array('post_title' => 'About Us'),
                    array('post_title' => 'Contact Us'),
                    array('post_title' => 'Rooms'),
                    array('post_title' => 'Single Room')
                );
    
    add_pages_to_site($pages);
    
    add_menus_to_site();
    //create pages
    // next is to clone the site
    clone_site($theme_site_id);
}

/**
 * 
 */
function add_menus_to_site(){
    //give your menu a name
    $name = 'Main Menu';
    //create the menu
    $menu_id = wp_create_nav_menu( $name );

    foreach(get_all_menu_pages() as $page):
        //then add the actuall link/ menu item and you do this for each item you want to add
        wp_update_nav_menu_item( $menu_id, 0, array(
            'menu-item-title'   => $page->post_title,
            'menu-item-classes' => $page->post_name ,
            'menu-item-url'     => get_permalink( $page->ID),
            'menu-item-status'  => 'publish' ) );

    endforeach;

    //then you set the wanted theme  location
    $locations = get_theme_mod( 'nav_menu_locations' );
    $locations['header_menu'] = $menu_id;
    set_theme_mod( 'nav_menu_locations', $locations );


    //give your menu a name
    $name_footer = 'Footet Menu';
    //create the menu
    $menu_id_footer = wp_create_nav_menu( $name_footer );

    foreach(get_all_menu_pages() as $page):
        //then add the actuall link/ menu item and you do this for each item you want to add
        wp_update_nav_menu_item( $menu_id_footer, 0, array(
            'menu-item-title'   => $page->post_title,
            'menu-item-classes' => $page->post_name ,
            'menu-item-url'     => get_permalink( $page->ID),
            'menu-item-status'  => 'publish' ) );

    endforeach;

    //then you set the wanted theme  location
    $locations_footer = get_theme_mod( 'nav_menu_locations' );
    $locations_footer['footer_menu'] = $menu_id_footer;
    set_theme_mod( 'nav_menu_locations', $locations_footer );
}

/**
 * Adds new pages to the passed site_id
 * @param type $site_id The site to create pages
 * @param type $user_id The user_id to mark as creator
 * @param type $pages array of pages to create
 * @return boolean
 */
function add_pages_to_site($pages, $user_id = 0 ){
    
    if($user_id === 0)
        $user_id = get_current_user_id ();
    
    if(!is_array($pages))
        return false;
    
    foreach ($pages as $page) {
        
        // page array
        $page_arr = array(
            'post_title'    => $page['post_title'],
            'post_content'  => '',
            'post_status'   => 'publish',
            'post_author'   => $user_id,
            'post_type'     => 'page'
        );

        // Insert the post into the database
        $post_id = wp_insert_post( $page_arr );
        
        // assign the template if passed
        if(isset($page['template']))
            update_post_meta( $post_id, '_wp_page_template', $page['template'] );
    
    }
    
    return true;
}

/**
 * 
 * @param type $theme_site_id
 */
function clone_site($theme_site_id){
    
    clone_header_footer($theme_site_id);
    
    $pages = get_all_menu_pages();
    
    foreach ($pages as $page) {
        clone_page($theme_site_id, $page->ID, $page->post_title);
    }
    
    
}

/**
 * add_layout_site
 * Function to assign the json layouyt to a page
 *
 * @param type    $blog_id
 * @param type    $post_id
 * @param type    $file_name
 */
function clone_page( $clone_blog, $post_id, $name ) {
    
    switch_to_blog($clone_blog);
    $page = get_page_by_title($name);
    
    if(is_null($page))
        return;
    
    $data = get_json_to_clone('page-json', $page->ID);
    restore_current_blog(); 
    
    $data = set_json_to_site($data);
    update_post_meta($post_id, 'page-json', $data);
}

function clone_header_footer($theme_site_id){

    $clone_blog = $theme_site_id; //server
    switch_to_blog($clone_blog);
    $header = get_json_to_clone('theme-header');
    $footer = get_json_to_clone('theme-footer');
    restore_current_blog(); 
    
    $data = set_json_to_site($header);
    update_option('theme-header', $data);
    $data = set_json_to_site($footer);
    update_option('theme-footer', $data);

}

/**
 * This function returns the theme assigned to passed site id
 * @param type $site_id
 */
function get_theme_name($site_id){
    
    switch_to_blog($site_id);
    
    $theme = get_option('stylesheet');
    
    restore_current_blog();
    
    return $theme;
    
}


function update_site($formdata){
   
   unset($formdata['action']);
   
   // loop through the array containing the form values
   foreach ($formdata as $key => $value) {
      
      // if the options are email or phone, store them as serailized array
      if($key == "email" || $key == "phone_number" ){
            $value_array = $formdata[$key];
            update_option( $key, $value_array );
      }

      else{
        update_option( $key, $value );
      }
      
      // prepare array conatining all the form values
      $return_array[$key] = $value;
   }
   return $return_array;

}

/**
 * Returns the logo id for the site
 * @return int <mixed, boolean>
 */
function get_site_logo_id(){

    // get the logo_id from options
    $logo_id = get_option('logo_id', 0);

    return $logo_id;

}