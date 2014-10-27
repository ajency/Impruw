<?php

/**
 * Update page meta
 */
function add_page_json( $page_id, $page_json ) {

    update_post_meta( $page_id, 'page-json', $page_json );
}

/**
 * Publish the passed page_id
 *
 * @param type $page_id
 */
function publish_page( $page_id ) {

    wp_update_post( array( 'ID' => $page_id, 'post_status' => 'publish', 'post_type' => 'page' ) );
}

/**
 * @param $page_id
 * @param $page_json
 *
 * @return mixed
 */
function add_page_revision( $page_id, $page_json = null ) {

    // !imp
    update_random_content( $page_id );

    $revision_post_id = wp_save_post_revision( $page_id );

    // update_autosave_page_json( $revision_post_id, $page_json );

    return $revision_post_id;
}

function update_random_content( $page_id ) {

    global $wpdb;

    $wpdb->update( $wpdb->posts, array( 'post_content' => "content-" . rand( 1000, 9999 ) ), array( 'ID' => $page_id ) );
}

/**
 * Returns the auto save json for the page
 *
 * @param type $page_id gg
 *
 * @return array
 */
function get_page_auto_save_json( $page_id ) {

    $autosave_post_id = get_autosave_post_id( $page_id );

    $json = get_post_meta( $autosave_post_id, 'page-json', TRUE );

    return is_array( $json ) ? $json : array();
}

/**
 * Update the page autosave so we have the latest revision copy
 *
 * @param type $page_id
 * @param type $page_json
 */
function update_page_autosave( $page_id, $page_json ) {

    $autosave_post_id = get_autosave_post_id( $page_id );

    // cannot use update_post_meta as it replaces the autosave_post_id with original post_id
    update_autosave_page_json( $autosave_post_id, $page_json );

    return $autosave_post_id;
}

/**
 *
 * @param type $autosave_post_id
 * @param type $page_json
 */
function update_autosave_page_json( $autosave_post_id, $page_json ) {

    $meta_id = check_json_is_present( $autosave_post_id );
    if ( $meta_id !== 0 ) {

        update_autosave_page_json_db( $meta_id, $page_json );
    } else {

        insert_autosave_page_json( $autosave_post_id, $page_json );
    }
}

/**
 *
 * @param type $autosave_post_id
 */
function insert_autosave_page_json( $autosave_post_id, $page_json ) {

    if ( is_array( $page_json ) )
        $page_json = maybe_serialize( $page_json );

    global $wpdb;

    $wpdb->insert( $wpdb->postmeta, array( 'meta_key' => 'page-json', 'meta_value' => $page_json,
        'post_id' => $autosave_post_id ) );

    $wpdb->insert_id;
}

/**
 *
 * @param type $autosave_post_id
 */
function update_autosave_page_json_db( $meta_id, $page_json ) {

    // serialize the json
    if ( is_array( $page_json ) )
        $page_json = maybe_serialize( $page_json );

    global $wpdb;

    $wpdb->update( $wpdb->postmeta, array( 'meta_key' => 'page-json',
            'meta_value' => $page_json ),
        array( 'meta_id' => $meta_id )
    );
}

/**
 *
 * @global type $wpdb
 * @return type
 */
function check_json_is_present( $autosave_post_id ) {

    global $wpdb;

    $query = $wpdb->prepare( "SELECT meta_id from {$wpdb->postmeta} WHERE post_id=%d AND meta_key=%s",
        $autosave_post_id, 'page-json' );

    $meta_id = $wpdb->get_var( $query );

    return is_null( $meta_id ) ? 0 : $meta_id;
}

/**
 *
 * @param type $page_id
 *
 * @return type
 */
function get_autosave_post_id( $page_id ) {

    $autosave_post = wp_get_post_autosave( $page_id );

    if ( !$autosave_post ) {
        $autosave_post_id = _wp_put_post_revision( $page_id, TRUE );
    } else {
        $autosave_post_id = $autosave_post->ID;
    }

    return $autosave_post_id;
}

function update_header_json( $header_json, $autosave = FALSE ) {

    $header_json = convert_json_to_array( $header_json );

    $key = THEME_HEADER_KEY;
    if ( $autosave === TRUE )
        $key = "theme-header-autosave";

    update_option( $key, $header_json );

}

function update_footer_json( $footer_json, $autosave = FALSE ) {

    $footer_json = convert_json_to_array( $footer_json );

    $key = THEME_FOOTER_KEY;
    if ( $autosave === TRUE )
        $key = "theme-footer-autosave";

    update_option( $key, $footer_json );
}

/**
 * Get all menu pages for the site
 * @return [type] [description]
 */
function get_all_menu_pages() {
    global $sitepress;

    $args = array( 'post_type' => 'page',
        'posts_per_page' => -1,
        'orderby' => 'menu_order',
        'order' => 'ASC' );

    $sitepress->switch_lang(wpml_get_default_language());
    $pages = new WP_query( $args );
    $sitepress->switch_lang();

    $p = array();

    if ( $pages->have_posts() ) {

        $skip = array( 'Site Builder',
            'Sign In',
            'Dashboard',
            'Support',
            'Coming Soon',
            'Reset Password',
            'Sample Page',
            'Kommer Snart', 
            'Logg Inn',
            'Resett passord' );

        foreach ( $pages->posts as $page ) {
            //Also send original page id to the page object
            $page = (array)$page;
            $page['original_id'] = icl_object_id($page['ID'], 'page', true, 'en');
            $page = (object)$page;

            if ( !in_array( $page->post_title, $skip ) )
                $p[ ] = $page;
        }
    }

    return $p;
}

/**
 * Get all menu pages for the site
 * @return [type] [description]
 */
function get_all_template_pages() {

    $args = array( 'post_type' => 'page', 'posts_per_page' => -1, 'meta_key' => 'page_template', 'meta_value' => 'yes' );

    $pages = new WP_query( $args );

    $p = array();

    if ( $pages->have_posts() )
        return $pages->posts;

    return $p;
}

/**
 * converts a json string to an array
 *
 * @param unknown $json_string
 *
 * @return mixed
 */
function convert_json_to_array( $json_string ) {

    $json_array = stripslashes( $json_string );
    $json_array = json_decode( $json_array, TRUE );

    return $json_array;
}

/**
 *  Create new Page function
 */
function create_new_page( $data ) {

    $page_data = array();

    //check if post_title is set
    $page_data[ 'post_title' ] = isset( $data[ 'post_title' ] ) ? $data[ 'post_title' ] : '';
    $page_order = $data[ 'menu_order' ] + 1;

    // set the post type to 'page'
    $page_data[ 'post_type' ] = 'page';
    $page_data[ 'post_status' ] = 'publish';
    $page_data[ 'menu_order' ] = $page_order;

    //let create a new page
    $page_id = wp_insert_post( $page_data, TRUE );

    if ( is_wp_error( $page_id ) )
        return $page_id;

    return $page_id;
}

function assign_page_template($template_page_id, $page_id, $is_theme_template = false){

    // if 0 no template is chosen. ignore pulling json from page
    // return post id if template id is 0
    if ( $template_page_id === 0 )
        return $page_id;

    $blog_id = 0;

    //switch to theme blog
    if ($is_theme_template) {
        $blog_id = get_current_blog_id();
        switch_to_theme_blog();
    }
    // get the template json
    $template_json = get_json_to_clone( 'page-json', $template_page_id ); 
    
    if($is_theme_template){
        switch_to_blog($blog_id);
    }

    $template_json = set_json_to_site( $template_json, 'en', true);
    add_page_json( $page_id, $template_json );
    update_page_autosave( $page_id, $template_json );

    $current_active_languages = wpml_get_active_languages();

    foreach ($current_active_languages as $language) {
        if($language['code']!= 'en'){
            $template_json = get_json_to_clone( 'page-json', $page_id ); 
            $template_json = set_json_to_site( $template_json, $language['code'], false);
            add_page_json( $page_id, $template_json );
            update_page_autosave( $page_id, $template_json );
        }
    }

    return $page_id;
}

/**
 *
 * @param type $section
 * @param type $page_id
 *
 * @return type
 */
function get_json_to_clone( $section, $page_id = 0 ) {

    $elements = array();
    if ( $page_id == 0 ){
        if (in_array($section, array(THEME_HEADER_KEY,THEME_FOOTER_KEY)))
            $elements = get_header_footer_layout_published( $section ); 
        else
            $elements = get_option( $section ); 
    }
    else
        $elements = get_post_meta( $page_id, 'page-json', TRUE );

    $d = array();

    if ( is_array( $elements ) ) {
        foreach ( $elements as $element ) {
            if ( $element[ 'element' ] === 'Row' ) {
                $element[ 'columncount' ] = count( $element[ 'elements' ] );
                $d[ ] = get_row_elements( $element );
            } else {
                $meta = get_meta_values( $element );
                if ( $meta !== FALSE )
                    $d[ ] = $meta;
            }
        }
    }

    return $d;
}

function get_row_elements( $element ) {

    foreach ( $element[ 'elements' ] as &$column ) {
        foreach ( $column[ 'elements' ] as &$ele ) {
            if ( $ele[ 'element' ] === 'Row' ) {
                $ele[ 'columncount' ] = count( $ele[ 'elements' ] );
                $ele = get_row_elements( $ele );
            } else {
                $meta = get_meta_values( $ele );
                if ( $meta !== FALSE )
                    $ele = wp_parse_args( $meta, $ele );
            }
        }
    }

    return $element;
}

function get_meta_values( $element, $create = FALSE ) {

    $ele = get_element_from_global_page_elements( $element[ 'meta_id' ] );

  
    if(!$ele ){
       
        $meta = get_metadata_by_mid( 'post', $element[ 'meta_id' ] );

        if ( !$meta )
            return FALSE;

        $ele = maybe_unserialize( $meta->meta_value );
    }
    $ele[ 'meta_id' ] = $create ? create_new_record( $ele ) : $element[ 'meta_id' ];
    validate_element( $ele );

    if($ele['element'] === 'RoomSummary' && $create === false && isset($ele['room_id'])){
        $img_id = get_post_meta( $ele['room_id'], '_thumbnail_id', true );
        $ele['image_id'] = (int) $img_id;
    }

    return $ele;
}

function validate_element( &$element ) {

    $numkeys = array( 'id', 'meta_id', 'menu_id', 'ID', 'image_id' );
    $boolkey = array( 'draggable', 'justified' );
    $textkey = array( 'content', 'text' );

    if ( !is_array( $element ) && !is_object( $element ) )
        return $element;

    foreach ( $element as $key => $val ) {
        if ( in_array( $key, $numkeys ) )
            $element[ $key ] = (int)$val;
        if ( in_array( $key, $boolkey ) )
            $element[ $key ] = $val === "true";
        if ( in_array( $key, $textkey ) )
            $element[ $key ] = strip_backslashes_from_text($element[ $key ]);
    }

    return $element;
}

/**
 * Strips all backslashes from the text
 * @param  [type] $text_array [description]
 * @return [type]             [description]
 */
function strip_backslashes_from_text($text_array){

    if(!is_array($text_array)){
        return $text_array;
    }

    foreach($text_array as $lang => $text){
        $text_array[$lang] = preg_replace('/\\\\/', '', $text);
    }

    return $text_array;
}


/**
 * this function will set the fetched json data from on site to another
 */
function set_json_to_site( $elements, $language_code, $clone_first_time) {

    foreach ( $elements as &$element ) {
        if ( $element[ 'element' ] === 'Row' ) {
            $element[ 'columncount' ] = count( $element[ 'elements' ] );
            set_row_elements( $element, $language_code, $clone_first_time );
        } else
            $element = create_new_element( $element, $language_code , $clone_first_time);
    }

    return $elements;
}

function set_row_elements( &$element, $language_code, $clone_first_time) {

    foreach ( $element[ 'elements' ] as &$column ) {
        foreach ( $column[ 'elements' ] as &$ele ) {
            if ( $ele[ 'element' ] === 'Row' ) {
                $ele[ 'columncount' ] = count( $ele[ 'elements' ] );
                set_row_elements( $ele, $language_code, $clone_first_time );
            } else {
                $ele = create_new_element( $ele, $language_code , $clone_first_time);
            }
        }
    }
}

/**
 *
 */
function create_new_element( &$ele, $language_code, $clone_first_time) {

    global $wpdb;

    //unset the existing meta_id if cloning for the first time
    if($clone_first_time===TRUE){
        unset( $ele[ 'meta_id' ] );
    }

    //handle_unavailable_fields($ele);
    //insert the element in postmeta and retunr the meta_id

    // remove / update if menu or logo
    if ( $ele[ 'element' ] === 'Logo' ) {
        $ele[ 'logo_id' ] = get_option( 'logo_id', 0 );
    }

    if ( $ele[ 'element' ] === 'Menu' ) {
        $ele[ 'menu_id' ] = get_primary_menu_id();
    }

    if ( ( $ele[ 'element' ] === 'Image' || $ele[ 'element' ] === 'ImageWithText' ) && isset( $ele[ 'image_id' ] ) &&  $clone_first_time===TRUE ) {
        $ele[ 'image_id' ] = 0;
    }

    if ( $ele[ 'element' ] === 'Slider' && isset( $ele[ 'slider_id' ] )  &&  $clone_first_time===TRUE ) {
        $ele[ 'slider_id' ] = 0;
    }

    if ( $ele[ 'element' ] === 'Gallery' && isset( $ele[ 'slider_id' ] )  &&  $clone_first_time===TRUE ) {
        $ele[ 'slider_id' ] = 0;
    }

    if ( $ele[ 'element' ] === 'RoomSummary' && isset( $ele[ 'room_id' ] )  &&  $clone_first_time===TRUE ) {
        $ele[ 'room_id' ] = 0;
    }

    if($ele[ 'element' ] === 'Title' || $ele[ 'element' ] === 'Text'|| $ele[ 'element' ] === 'ImageWithText'){
        translate_element($ele, $language_code);
    }

    if($ele[ 'element' ] === 'Link'){
        translate_link_element($ele, $language_code);
    }
    
    $serialized_element = maybe_serialize( $ele );

    if($clone_first_time===TRUE){

        $wpdb->insert( $wpdb->postmeta, array( 'post_id' => 0, 'meta_value' => $serialized_element,
        'meta_key' => $ele[ 'element' ] ) );

        return array( 'meta_id' => $wpdb->insert_id, 'element' => $ele[ 'element' ] );
    }
    else if(($clone_first_time===FALSE)&& isset($ele['meta_id'])){

        $wpdb->update( $wpdb->postmeta, array('post_id' => 0, 'meta_value' => $serialized_element,
        'meta_key' => $ele[ 'element' ] ), array( 'meta_id' => $ele[ 'meta_id' ]));

        return array( 'meta_id' => $ele[ 'meta_id' ], 'element' => $ele[ 'element' ] );
    }

}

function get_primary_menu_id() {

    $menu_id = 0;

    $menu_object = wp_get_nav_menu_object( 'Main Menu' );

    if ( !empty( $menu_object ) )
        $menu_id = $menu_object->term_id;

    return $menu_id;
}

function get_page_content_json( $page_id, $autosave = FALSE , $revision_id = FALSE ) {

    $json = array();

    if ( is_singular( 'impruw_room' ) ) {
        $page = get_page_by_title( 'Single Room' );
        $page_id = $page->ID;
    }

    if ( $autosave === TRUE ){
        $json = get_autosave_post_json( $page_id );
        
        if(empty($json))
            $json = get_post_meta( $page_id, "page-json", TRUE );
    }
    elseif( $revision_id ){
        $json = get_post_meta( $revision_id, 'page-json', TRUE );

        if(empty($json))
            $json = get_post_meta( $page_id, "page-json", TRUE );
    }
    else{
        $json = get_post_meta( $page_id, "page-json", TRUE );
    }

    return $json;
}

function get_autosave_post_json( $page_id ) {

    $autosave_post_id = get_autosave_post_id( $page_id );

    global $wpdb;

    $query = $wpdb->prepare( "SELECT meta_value FROM {$wpdb->postmeta} WHERE post_id=%d
                            AND meta_key=%s", $autosave_post_id, 'page-json' );

    $json = $wpdb->get_var( $query );

    $json = !is_null( $json ) ? maybe_unserialize( $json ) : array();

    //$json = get_post_meta( $autosave_post_id, "page-json", TRUE );
    // echo json_encode($query);die;
    return !is_array( $json ) ? array() : $json;
}


function get_single_room_page_content_json( $autosave = FALSE ) {

    $single_room_page = get_page_by_title( "Single Room" );

    $json = get_page_content_json( $single_room_page->ID, "page-json", $autosave );

    return $json;

}

/**Function to add a page to the Main Menu
 * @param $page_id
 */
function add_page_to_menu( $page_id , $page_order ) {
    // get the Main Menu Id
    $term = get_term_by( 'name', 'Main Menu', 'nav_menu' );
    $menu_id = $term->term_id;

    $page_data = get_post( $page_id, ARRAY_A );

    $formdata = array(
        'menu-item-title' => $page_data[ 'post_title' ],
        'menu-item-classes' => '',
        'menu-item-url' => '',
        'menu-item-position' => $page_order,
        'menu-item-object' => 'page',
        'menu-item-type' => 'post_type',
        'menu-item-object-id' => $page_id, 'menu-item-status' => 'publish'
        );

    wp_update_nav_menu_item( $menu_id, 0, $formdata );
}


function translate_element(&$element, $language_code){
    global $sitepress;
    //Remove html tags if any
    $english_content = '';
    if(is_array($element['content'])){
        $english_content = strip_tags($element['content']['en']);
        $english_content = strtolower($english_content);
    }
    else{
        $english_content = strip_tags($element['content']);
        $english_content = strtolower($english_content);
        $element['content'] = array();
    }
        
    // $sitepress->switch_lang($language_code);
    //     load_theme_textdomain('impruwclientparent', get_template_directory() . '/languages');
    //     $translated_content = __($english_content,'impruwclientparent');
    // $sitepress->switch_lang(wpml_get_default_language());

    $translated_content = "" ;
    if (isset($element['content'][$language_code])) {
        $translated_content = $element['content'][$language_code];
    }
    else{

        $translated_content=impruw_wpml_get_string_translation($english_content, $language_code);
    }

    if( ($translated_content===$english_content) && $language_code!='en'){
        $translated_content.= '(not translated)';
    }

    $element['content'][$language_code] = $translated_content;

    if(is_null($element['content']['en'])){
         $element['content']['en'] = $english_content;
    }



}

function translate_link_element(&$element, $language_code){
    global $sitepress;
    //Remove html tags if any
    $english_content = '';
    if(is_array($element['text'])){
        $english_content = strip_tags($element['text']['en']);
        $english_content = strtolower($english_content);
    }
    else{
        $english_content = strip_tags($element['text']);
        $english_content = strtolower($english_content);
        $element['text'] = array();
    }

    $translated_content = "" ;
    if (isset($element['text'][$language_code])) {
        $translated_content = $element['text'][$language_code];
    }
    else{

        $translated_content=impruw_wpml_get_string_translation($english_content, $language_code);
    }

    if( ($translated_content===$english_content) && $language_code!='en'){
        $translated_content.= '(not translated)';
    }

    $element['text'][$language_code] = $translated_content;

    if(is_null($element['text']['en'])){
         $element['text']['en'] = $english_content;
    }


}

function switch_to_theme_blog(){
     global $wpdb;

    $theme = wp_get_theme();
    $theme_name = $theme->name;


    switch_to_blog( 1 );

    $query = $wpdb->prepare("SELECT ID FROM {$wpdb->posts} WHERE post_type='theme' AND 
        post_title=%s", $theme_name);
    $theme_post = $wpdb->get_row($query);


    $theme_post_id = (int)$theme_post->ID;

    $theme_blog_id = get_post_meta( $theme_post_id, 'linked_theme', TRUE );

    switch_to_blog( (int)$theme_blog_id );
}

function get_theme_templates() {
   
    switch_to_theme_blog();

    $pages = get_all_theme_pages();
    
    restore_current_blog();
    return $pages;
}



function get_all_theme_pages(){
     global $sitepress;

    $args =  array( 'post_type' => 'page' ,'meta_value' => 'template');

    // $original_language = wpml_get_default_language();
    // $sitepress->switch_lang('en');
    // $pages = new WP_Query( $args );
    // $sitepress->switch_lang($original_language);
    $pages = get_posts( $args);

    foreach ($pages as $page) {
        $page->is_theme_template = true ;
    }

    return $pages;
}


function impruw_is_front_page($page_id){
    $front_page_id = icl_object_id( get_option('page_on_front'), 'page', true, 'en' );

    if(icl_object_id( $page_id , 'page', true, 'en' ) == $front_page_id)
        return true;
    else
        return false;
}




// HEADER FOOTER FUNCTIONS

function publish_footer_header_json( $section, $page_json_string ){
    global $wpdb;

    if ( is_string($page_json_string) )
        $page_json = convert_json_to_array($page_json_string);
    else
        $page_json = $page_json_string;

    $page_elements = create_page_element_array($page_json);
    
    if ( is_array($page_json) )
        $page_json = maybe_serialize($page_json);
    if ( is_array( $page_elements ) )
        $page_elements = maybe_serialize( $page_elements );
    
    $key = 'theme-'.$section.'-published';

    $id = get_header_footer_published_id( $key );

    if ( $id == null ){
        $wpdb->insert( $wpdb->prefix.'header_footer_backup',
            array(
                'type' => $key,
                'layout' => $page_json,
                'elements' => $page_elements ));


    } else {
        $wpdb->update( $wpdb->prefix.'header_footer_backup',
            array(
                'type' => $key,
                'layout' => $page_json,
                'elements' => $page_elements),
            array( 'id' => $id ));
    }
}

function get_header_footer_published_id( $key ){
    global $wpdb;

    $id = $wpdb->get_var($wpdb->prepare("SELECT id FROM {$wpdb->prefix}header_footer_backup WHERE type = %s", $key ));

    return $id;
}

function get_header_footer_layout_published( $key, $revision_id = FALSE ){
    global $wpdb;
    if (!$revision_id )
        $layout = $wpdb->get_var($wpdb->prepare("SELECT layout FROM {$wpdb->prefix}header_footer_backup WHERE type = %s", $key ));
    else{
        if ($key == THEME_HEADER_KEY){
            $header_backup_id = get_post_meta($revision_id,'header-backup-id',true);
            if (!empty($header_backup_id))
                $layout = $wpdb->get_var($wpdb->prepare("SELECT layout FROM {$wpdb->prefix}header_footer_backup WHERE id = %d", $header_backup_id ));
        }
        elseif ($key == THEME_FOOTER_KEY) {
            $footer_backup_id = get_post_meta($revision_id,'footer-backup-id',true);
            if (!empty($footer_backup_id))
                $layout = $wpdb->get_var($wpdb->prepare("SELECT layout FROM {$wpdb->prefix}header_footer_backup WHERE id = %d", $footer_backup_id ));
        }
        if (empty( $layout ))
            $layout = $wpdb->get_var($wpdb->prepare("SELECT layout FROM {$wpdb->prefix}header_footer_backup WHERE type = %s", $key ));
    }


    if ( $layout != null )
        $layout = maybe_unserialize( $layout );
    else
        $layout = array();

    return $layout;
}

function get_header_footer_elements_published( $key ,$revision_id = FALSE ){
    global $wpdb;
    if (!$revision_id )
        $elements = $wpdb->get_var($wpdb->prepare("SELECT elements FROM {$wpdb->prefix}header_footer_backup WHERE type = %s", $key ));
    else{
        if ($key == THEME_HEADER_KEY){
            $header_backup_id = get_post_meta($revision_id,'header-backup-id',true);
            if (!empty($header_backup_id))
                $elements = $wpdb->get_var($wpdb->prepare("SELECT elements FROM {$wpdb->prefix}header_footer_backup WHERE id = %d", $header_backup_id ));
        }
        elseif ($key == THEME_FOOTER_KEY) {
            $footer_backup_id = get_post_meta($revision_id,'footer-backup-id',true);
            if (!empty($footer_backup_id))
                $elements = $wpdb->get_var($wpdb->prepare("SELECT elements FROM {$wpdb->prefix}header_footer_backup WHERE id = %d", $footer_backup_id ));
        }
        if (empty( $elements ))
            $elements = $wpdb->get_var($wpdb->prepare("SELECT elements FROM {$wpdb->prefix}header_footer_backup WHERE type = %s", $key ));
    }

    if ( $elements != null )
        $elements = maybe_unserialize( $elements );
    else
        $elements = array();

    return $elements;
}
function get_header_footer_published( $key ){
    global $wpdb;

    $result = $wpdb->get_row($wpdb->prepare("SELECT layout, elements FROM {$wpdb->prefix}header_footer_backup WHERE type = %s", $key ),ARRAY_A);

    if ( $result == null )
        $result = array();

    return $result;
}

function delete_header_footer_published( $key ){
    global $wpdb;

    $result = $wpdb->delete($wpdb->prefix.'header_footer_backup',
        array( 'type' => $key));

    return $result;
}