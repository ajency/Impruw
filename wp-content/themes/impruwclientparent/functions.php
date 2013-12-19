<?php
/*
    File Name: functions.php
    Description: This file has a list of the following functions used in this theme
 */


define('PARENTTHEMEPATH', ABSPATH . 'wp-content/themes/impruwclientparent/');
require_once PARENTTHEMEPATH . 'elements/Element.php';
require_once PARENTTHEMEPATH . 'includes/SiteModel.php';
require_once PARENTTHEMEPATH . 'includes/UserModel.php';


//add theme support
add_theme_support('menus');

//remove wordpress admin bar
show_admin_bar(false);
load_theme_textdomain('impruwclientparent'); 

/*--------------------------------------------------------------------------------------
*
* impruv_register_room_init
*function to create a new post type called rooms
*
*-------------------------------------------------------------------------------------*/
/* * **Register Room Taxonomy & Post Type*** */

function impruv_register_room_init() {
    $url = get_template_directory_uri();
    $labels = array(
        'name' => 'Rooms',
        'singular_name' => 'Room',
        'add_new' => 'Add New',
        'add_new_item' => 'Add New Room',
        'edit_item' => 'Edit Room',
        'new_item' => 'New Romm',
        'all_items' => 'All Rooms',
        'view_item' => 'View Romms',
        'search_items' => 'Search Rooms',
        'not_found' => 'No Rooms found',
        'not_found_in_trash' => 'No Rooms found in Trash',
        'parent_item_colon' => '',
        'menu_name' => 'Rooms'
    );

    $args = array(
        'labels' => $labels,
        'label' => __('room',"impruwclientparent"),
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'room'),
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => false,
        'menu_position' => null,
        'menu_icon' => '' . $url . '/images/room.png',
        'supports' => array('title', 'editor', 'author', 'thumbnail', 'custom-fields')
    );

    register_post_type('impruv_room', $args);
}

add_action('init', 'impruv_register_room_init');




/*--------------------------------------------------------------------------------------
*
* create_room_taxonomies_and_add_terms
*function to create taxonomies under post type emails
*also creates immediate, batvh and marketing terms under email_type
*
*-------------------------------------------------------------------------------------*/

function create_room_taxonomies_and_add_terms() {
    // Add new taxonomy, Types
    $facilities_labels = array(
        'name' => _x('Facilities', 'taxonomy general name'),
        'singular_name' => _x('Facility', 'taxonomy singular name'),
        'search_items' => __('Search Facilities','impruwclientparent'),
        'all_items' => __('All Facilities','impruwclientparent'),
        'parent_item' => __('Parent Facility','impruwclientparent'),
        'parent_item_colon' => __('Parent Facility:','impruwclientparent'),
        'edit_item' => __('Edit Facility','impruwclientparent'),
        'update_item' => __('Update Facility','impruwclientparent'),
        'add_new_item' => __('Add New Facility','impruwclientparent'),
        'new_item_name' => __('New Facility','impruwclientparent'),
        'menu_name' => __('Facility','impruwclientparent')
    );

    $tag_args = array(
        'hierarchical' => true,
        'labels' => $facilities_labels,
        'show_ui' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'facility')
    );

    register_taxonomy('impruv_room_facility', 'impruv_room', $tag_args);


    
}

add_action('init', 'create_room_taxonomies_and_add_terms', 0);





/**
 * Generates the markup for a specific section
 * @param type $section
 */
function generate_markup($section){
    
    global $post, $markup_JSON;
    
    $id = !is_null($post) ? $post->ID : 0;
    
    $markup_JSON = get_page_markup_JSON(2);
    
    if(!isset($markup_JSON[$section]))
        return;
    
    $json = $markup_JSON[$section];
    
    $html = '';
    
    foreach($json['elements'] as $element){
        
        $html .= add_element_markup($element);
        
    }
    
    return $html;
}

/**
 * Gets the markup
 * @param type $element
 * @return type
 */
function add_element_markup($element){
    
    $html = '';
    
    switch($element['type']){

        case 'BuilderRow':
            $html = get_builder_row_markup($element);
            break;
        case 'BuilderRowColumn':
            $html = get_builder_row_column_markup($element);
            break;
        case 'ContainerElement':
            $html = get_container_markup($element);
            break;
        case 'ImageElement':
            $html = get_image_element_markup($element);
            break;
        case 'MenuElement':
            $html = get_menu_element_markup($element);
            break;
        case 'TitleElement':
            $html = get_title_element_markup($element);
            break;
        case 'TextElement':
            $html = get_text_element_markup($element);
            break;
        case 'AddressElement':
            $html = get_address_element_markup($element);
            break;
        case 'SocialElement':
            $html = get_social_element_markup($element);
            break;
        case 'SliderElement':
            $html = get_slider_element_markup($element);
            break;
        default:
            break;

    }
    
    return $html;
}



/**
 * Generates the row markup
 * @param type $element
 */
function get_builder_row_markup($element){
    
    require_once PARENTTHEMEPATH . 'elements/BuilderRow.php';
    
    $row = new BuilderRow($element);
    
    $html = $row->get_open_tag();
    
    if($row->has_child_elements()){
        
        foreach($row->get_elements() as $ele){
            
            $html .= add_element_markup($ele);
            
        }

    }
    
    $html .= $row->get_close_tag();
    
    return $html;
    
}

/**
 * Generates the column markup
 * @param type $element
 */
function get_builder_row_column_markup($element){
    
    require_once PARENTTHEMEPATH . 'elements/BuilderRowColumn.php';
    
    $column = new BuilderRowColumn($element);
    
    $html = $column->get_open_tag();
    
    $html .= (isset($element['content']) ? $element['content'] : '');//for testing
    
    if($column->has_child_elements()){
        
        foreach($column->get_elements() as $ele){
            
            $html .= add_element_markup($ele);
            
        }

    }
    
    $html .= $column->get_close_tag();
    
    return $html;
   
}

/**
 * Generates the image markup
 * @param type $element
 */
function get_image_element_markup($element){
        
    require_once PARENTTHEMEPATH . 'elements/ImageElement.php';
    
    $image = new ImageElement($element);

    $html = $image->get_markup();
    
    return $html;
    
}

/**
 * Generates the address markup
 * @param type $element
 */
function get_address_element_markup($element){
        
    require_once PARENTTHEMEPATH . 'elements/AddressElement.php';
    
    $address = new AddressElement($element);

    $html = $address->get_markup();
    
    return $html;
    
}

/**
 * Generates the Social markup
 * @param type $element
 */
function get_social_element_markup($element){
        
    require_once PARENTTHEMEPATH . 'elements/SocialElement.php';
    
    $social = new SocialElement($element);

    $html = $social->get_markup();
    
    return $html;
    
}

/**
 * Generates the title markup
 * @param type $element
 */
function get_title_element_markup($element){
        
    require_once PARENTTHEMEPATH . 'elements/TitleElement.php';
    
    $title = new TitleElement($element);

    $html = $title->get_markup();
    
    return $html;
    
}

/**
 * Generates the text markup
 * @param type $element
 */
function get_text_element_markup($element){
        
    require_once PARENTTHEMEPATH . 'elements/TextElement.php';
    
    $text = new TextElement($element);

    $html = $text->get_markup();
    
    return $html;
}

/**
 * Generates the title markup
 * @param type $element
 */
function get_slider_element_markup($element){
        
    require_once PARENTTHEMEPATH . 'elements/SliderElement.php';
    
    $slider = new SliderElement($element);

    $html = $slider->get_markup();
    
    return $html;
    
}

/**
 * Generates the row markup
 * @param type $element
 */
function get_menu_element_markup($element){
    
    require_once PARENTTHEMEPATH . 'elements/MenuElement.php';
    
    $menu = new MenuElement($element);
    
    $html = $menu->get_markup();
    
    return $html;
}

/**
 * Generates the row markup
 * @param type $element
 */
function get_container_markup($element){
    
    require_once PARENTTHEMEPATH . 'elements/ContainerElement.php';
    
    $row = new ContainerElement($element);
    
    $html = $row->get_open_tag();
    
    if($row->has_child_elements()){
        
        foreach($row->get_elements() as $ele){
            
            $html .= add_element_markup($ele);
            
        }

    }
    
     $html .= $row->get_close_tag();
    
    return $html;
    
}

/**
 * Gets the page markup json from DB
 * @param type $page_id
 */
function get_page_markup_JSON($page_id  = 0){
    
    $json = get_post_meta($page_id,'page_markup_json',true);
    
    return !empty($json) ? $json : array();
}

/**
 * Returns the parent theme directory path
 * @return string
 */
function get_parent_template_directory_uri(){
    
    $theme_root_uri = get_theme_root_uri();
    
    return "$theme_root_uri/impruwclientparent";
}

/**
 * getThemeCSS
 * echo's the JS files for site
 */
function get_theme_JS(){
    ?>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/js/jquery.min.js"></script>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/js/bootstrap.min.js"></script>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/js/holder.js"></script>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/js/cssFx.js"></script>
   <?php 
    $theme_path =  get_stylesheet_directory() . "/js";
    if(file_exists($theme_path) && is_dir($theme_path)){

        $js_files = scandir($theme_path, 1);
        foreach ($js_files as $key => $value){
            if (!in_array($value,array(".",".."))){
                $files[] = $value;
            }
        }
        
        asort($files);
        
        foreach ($files as $file){
        ?>
            <script src="<?php echo get_template_directory_uri(); ?>/js/<?php echo $file; ?>"></script>
        <?php
        } 
    }
}


/**
 * getThemeCSS
 * echo's the JS files for site
 */

function get_theme_CSS(){
    ?>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/bootstrap.min.css" type="text/css" rel="stylesheet"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/flat-ui.css" type="text/css" rel="stylesheet"/>
    <?php 
    $theme_path =  get_stylesheet_directory()."/css";
    $css_files = scandir($theme_path, 1);
    $files = array();
    if(file_exists($theme_path) && is_dir($theme_path)){
        
        foreach ($css_files as $key => $value){
            
            if (!in_array($value,array(".",".."))){
          
                $files[]  = $value; 

            }
        } 
        asort($files);
        
        foreach ($files as $file){
            echo "<link rel='stylesheet' href='". get_template_directory_uri() ."/css/$file' type='text/css'/>";
        } 
    }   
}

/**
 * Fecthed the json for a page from DB
 * @global type $wpdb
 * @param type $id
 */
function get_page_json($id){


    global $wpdb;
    
    $sql = $wpdb->prepare("SELECT json FROM {$wpdb->base_prefix}page_layouts
                           WHERE id = %d",$id);
    
    $json = $wpdb->get_var($sql);

    if($json == null)
        return array();
    
    $json = maybe_unserialize($json);
    
    return  $json;
}


/**
 * Reads the json layout and save it
 * 
 */
function save_json_structure(){
    
    $json = $_POST['json'];
    
    global $wpdb;
    
    $wpdb->update($wpdb->base_prefix.'page_layouts',
                    array(
                      'title'    => 'home-2',
                      'json'    => maybe_serialize($json)
                    ),
                    array('id' => 4));
    
    wp_send_json(array('code' => 'OK','json' => $json));
}
add_action('wp_ajax_save_json_structure','save_json_structure');
add_action('wp_ajax_nopriv_save_json_structure','save_json_structure');


/**
 * Reads the json layout and save it
 * 
 */
function publish_page(){
    
    $json       = $_POST['json'];
    $page_id    = $_POST['pageId'];
    
    update_post_meta($page_id, 'page_markup_json',$json);
    
    wp_send_json(array('code' => 'OK','json' => $json));
}
add_action('wp_ajax_publish_page','publish_page');
add_action('wp_ajax_nopriv_publish_page','publish_page');


/**
 * Retuns the jSON layout for the given ID
 */
function get_saved_layout(){

    $page_id = $_GET['pageId'];

    define('FOR_BUILDER', true);
    
    $json = get_page_markup_JSON($page_id);

    echo json_encode($json);
    
    die;
}
add_action('wp_ajax_get_saved_layout','get_saved_layout');
add_action('wp_ajax_nopriv_get_saved_layout','get_saved_layout');


//insert_room();
function insert_room(){
    $terms = array(10);
    $array=array('post_title' => 'Deluxe', 'post_content' => 'Thisis a deluxe room.', 'user_id' => 3, 'inventory' => 10,'terms'=>$terms);
    $attribute_array = array('weekday_price'=>'10','weekend_price'=>'20','num_of_adults'=>'2','num_of_children'=>'2','extra_adult'=>'10','extra_child'=>'10','include_tax'=>'yes','tax_percent'=>'12','terms_and_conditions'=>'agree');
    $addons_array = array('breakfast at bed'=>'10','lunch_buffet'=>'10');
    $tariff_array = array(array('start_date'=>date("Y/m/d"),'end_date'=>date("Y/m/d"),'attributes'=>$attribute_array,'add_ons'=>$addons_array));
    add_new_room(1,$array,$tariff_array);
    echo "yes";exit;
}

function add_new_room($blog_id,$array,$tariff_array){
   switch_to_blog($blog_id);
     $my_post = array(
       'post_title'    => $array['post_title'],
       'post_content'  => $array['post_content'],
       'post_status'   => 'publish',
       'post_author'   => $array['user_id'],
       'post_type'     => 'impruv_room'
     );
     print_r($array['terms']);exit;
     // Insert the post into the database
    $post_id = wp_insert_post( $my_post ); 
    update_post_meta($post_id, 'inventory', $array['inventory']);//adds thew inventory value to the room
    var_dump( wp_set_object_terms($post_id, $array['terms'], 'impruv_room_facility'));exit;;
    add_room_tariff($post_id,$tariff_array);
    restore_current_blog();
   
}


function add_room_tariff($post_id,$tariff_array){
     global $wpdb;
    foreach($tariff_array as $tariff)
    {   if(is_array($tarriff))
        $start_date = $tariff['start_date'];
        $end_date = $tariff['end_date'];
        $attributes = maybe_serialize($tariff['attributes']);
        $add_ons = maybe_serialize($tariff['add_ons']);
        $wpdb->insert( 
    	$wpdb->prefix.'room_tariffs', 
    	array( 
    		      'start_date' => $start_date, 
    		      'end_date' => $end_date,
                'post_id' => $post_id,
                'attributes' => $attributes,
                'add_ons' => $add_ons
             )
        );
        
    }
}


function agc_register_parent_site_menus(){
    
    register_nav_menus( array(
        'header_menu' => 'Header Menu',
        'footer_menu' => 'Footer Menu'
    )); 
}
 add_action('init', 'agc_register_parent_site_menus');


/**
 * Function to return the actual content markup
 */
function get_content_markup(){

    $json = $_POST['json'];

    $data = array();

    if(!isset($json))
       $data[] =  "Nothing Found";
    
    foreach($json as $section){
        
        $d      = elements_markup($section['elements']);
        $data   = array_merge($data,$d);
    }

    if($data)
        echo json_encode(array('code' => 'OK'   , 'data' => $data));
    else
        echo json_encode(array('code' => 'ERROR', 'message' => 'Failed'));
    die;
}
add_action('wp_ajax_get_content_markup','get_content_markup'); 
add_action('wp_ajax_nopriv_get_content_markup','get_content_markup');



/**
 * recursive function definition
 */
function elements_markup($elements){

    $e = array();

    foreach ($elements as $element) {
        
        if($element['type'] === 'BuilderRow' || $element['type'] === 'BuilderRowColumn'){
            
            if(isset($element['elements']) && count($element['elements']) > 0){
                $eles   = elements_markup($element['elements']);
                $e      = array_merge($e , $eles); 
            }
        }
        else{
            $e[$element['id']] = add_element_markup($element);    
        }

    }

    return $e;

}


/**
 * Get site details
 */
/* function get_site_data(){

$blogdetails = get_blog_details(get_current_blog_id());
header('Content-Type: application/json');
echo json_encode(array('code' => 'OK', 'sitetitle'=> $blogdetails->blogname) );
die();

}
add_action('wp_ajax_get_site_data','get_site_data');
add_action('wp_ajax_nopriv_get_site_data','get_site_data');
*/





/**
 * Get site details
 *
 */
function get_site_data_ajx(){
	 
	 
	
	$site_id = $_GET['siteprofile_id'];
	
	$site_profile_details = get_site_data($site_id);

	header('Content-Type: application/json');
	echo json_encode(array('code' => 'OK', 'siteProfileData'=> $site_profile_details) );
	die();

}
add_action('wp_ajax_get_site_data_ajx','get_site_data_ajx');
add_action('wp_ajax_nopriv_get_site_data_ajx','get_site_data_ajx');



/**
 *  Function to get site details
 * @param int site id $site_id
 * @return array containing site profile data
*/
function get_site_data($site_id){

	$site = new SiteModel($site_id);
	$site_profile_data = $site->get_site_profile();

	return $site_profile_data;
	 
}



/**
 * Function to save site profile (business details, social)
 * Type: Ajax call
 *
 */
function save_site_data_ajx(){

	$siteform_social = array();
	$siteform_business = array();

	$site_form_data = array();

	$siteform_social =  serializedform_to_array($_POST['siteprofile_social']);
	$siteform_business = serializedform_to_array($_POST['siteprofile_business']);

	$site_form_data = array('business'=>$siteform_business,'social'=>$siteform_social);

	if(save_site_data($site_form_data)){

		header('Content-Type: application/json');
		echo json_encode(array('code' => 'OK','site_data'=>array_merge($siteform_social,$siteform_business)) );
		die();
	}
	else{
			
		header('Content-Type: application/json');
		echo json_encode(array('code' => 'FAILED', 'msg'=> 'Could not save site profile') );
		die();
	}

}
add_action('wp_ajax_save_site_data_ajx','save_site_data_ajx');
add_action('wp_ajax_nopriv_save_site_data_ajx','save_site_data_ajx');




/**
 * Function to Save site Details
 * @param array containign business details & social details
 * Ex: $site_form_data sitedata( 'business'=>array('ph'=>99),
 * 							  'social'=>array('facebook'=>'myfbid') )
 * @return boolean
*/
function save_site_data($site_form_data){

	$site = new SiteModel(get_current_blog_id());

	if($site->save_site_profile($site_form_data))
		
		return true;
	else
		
		return false;


}




/**
 * Function accepts serialized form data and returns aray containing form field name-value
 * return array containing all form key,values
 */
function serializedform_to_array($serialized_form)
{
	if(count($serialized_form)>0){

		$ar_formdata = array();
		foreach($serialized_form as $key_form_data=> $value_form_data){

			$value_form_data['name'] = str_replace('[','', $value_form_data['name']);
			$value_form_data['name'] = str_replace(']','', $value_form_data['name']);

			if(array_key_exists($value_form_data['name'], $ar_formdata)){

				$ar_formdata[$value_form_data['name']].=", ".$value_form_data['value'];
			}
			else{

				$ar_formdata[$value_form_data['name']]  =  $value_form_data['value'];
			}

		}
	}
	return $ar_formdata;
}



/**
 * Function to get user profile
 */
function get_user_profile_ajx()
{
	
		$user_profile_details = get_user_data(get_current_user_id());

		header('Content-Type: application/json');
		echo json_encode(array('code' => 'OK','user_data'=>'userdata') );
		die();
}
add_action('wp_ajax_get_user_profile_ajx','get_user_profile_ajx');
add_action('wp_ajax_nopriv_get_user_profile_ajx','get_user_profile_ajx');




function get_user_data($user_id)
{
	$user = new ImpruwUser($user_id);
	
	$user_data = $user->get_user_basic_info();
	
	return $user_data;
}


/**
 * Function to save user profile
 */
function save_user_profile_ajx()
{
	$userform_general =  serializedform_to_array($_POST['userprofile_general']);
	
	
	$user_form_data = array('general'=>$userform_general);
	
	
		
	$profile_save_status = save_user_profile($user_form_data,get_current_user_id());
	if(!is_string($profile_save_status)){
	
		header('Content-Type: application/json');
		echo json_encode(array('code' => 'OK','msg'=>'User profile updated successfully' ) );
		die();
	}
	else{
			
		header('Content-Type: application/json');
		echo json_encode(array('code' => 'FAILED', 'msg'=> $profile_save_status) );
		die();
	}
}
add_action('wp_ajax_save_user_profile_ajx','save_user_profile_ajx');
add_action('wp_ajax_nopriv_save_user_profile_ajx','save_user_profile_ajx');



function save_user_profile($user_data, $user_id)
{
	
	$user_data['ID'] =  $user_id;
		
	$user = new ImpruwUser(get_current_user_id());
	$profile_save_status = $user->save_user_profile($user_data); 
	
	return $profile_save_status;
	
 
}

function update_user_passwrd_ajx()
{
	 
	
	$userform_password =  serializedform_to_array($_POST['userprofile_passdata']);
	
	$user_form_data = array('passdata'=>$userform_password);
	$update_status = update_user_passwrd($user_form_data,get_current_user_id());
		
	if(is_string($update_status)){
		
		header('Content-Type: application/json');
		echo json_encode(array('code' => 'FAILED', 'msg'=> $update_status) );
		die();
	}
	else{
		
		header('Content-Type: application/json');
		echo json_encode(array('code' => 'OK','msg'=>'Password changed successfully' ) );
		die();
		
	}
		
 	
}
add_action('wp_ajax_update_user_passwrd_ajx','update_user_passwrd_ajx');
add_action('wp_ajax_nopriv_update_user_passwrd_ajx','update_user_passwrd_ajx');


/**
 * Function to  update user password
 * @param unknown $user_data
 * @param unknown $user_id
 * @return boolean
 */
function update_user_passwrd($user_pass_data, $user_id)
{
	 
	$user = new ImpruwUser($user_id);
	
	$update_status = $user->reset_user_password($user_pass_data);
	return $update_status;
	
}

/**
 * Reads all registered menus and returns as array
 */
function get_site_menu(){

    $menu_id = $_GET['menu-id'];

    $wp_menu = get_menu_to_array($menu_id);
     
    wp_send_json($wp_menu);

    die;
}
add_action('wp_ajax_get_site_menu','get_site_menu');


/**
 * Retuns the menu data
 * @param $menu_id The menu Id
 */
function get_menu_to_array($menu_id){

    $menu = get_term_by('id', $menu_id,'nav_menu');

    if($menu === false)
        return array('code' => 'ERROR', 'message' => 'Invalid menu id');
        
    $m = wp_get_nav_menu_items($menu_id);
            
    $sorted_menu_items =  array();
    
    //create all top level menu
    foreach ( (array) $m as $menu_item ) {
        
        $mn = array(
            'ID'            => $menu_item->ID,
            'menuOrder'     => $menu_item->menu_order,
            'title'         => $menu_item->title,
            'url'           => $menu_item->url
        );
        
        if((int)$menu_item->menu_item_parent === 0){

            $sorted_menu_items[$menu_item->menu_order] = $mn;
        }
       
    }

    //add submenus
    foreach ( (array) $m as $menu_item ) {
        
        $mn = array(
            'ID'            => $menu_item->ID,
            'menuOrder'     => $menu_item->menu_order,
            'title'         => $menu_item->title,
            'url'           => $menu_item->url
        );
        
        if((int)$menu_item->menu_item_parent !== 0){
            $sorted_menu_items[$menu_item->menu_item_parent]['subMenu'][] = $mn;
        }
       
    }

    $wp_menu = array(
                    'id'            => (int)$menu->term_id,
                    'name'          => $menu->name,
                    'slug'          => $menu->slug,
                    'description'   => $menu->description,
                    'items'         => $sorted_menu_items
                );

    return $wp_menu;
}

function update_menu_order(){

    $hierarchy = $_POST['hierarchy'];

    $menu_id   = $_POST['menuId'];

    $order = 1;
    foreach ($hierarchy as $key => $value) {
        
        $p_id = $value['id'];
        
        wp_update_post(array('ID' => $p_id, 'menu_order' => $order));

        $order++;

        if(isset($value['children'])){

            $parent = $p_id;
            
            foreach ($value['children'] as $k => $v) {
                
                $p_id = $v['id'];
        
                wp_update_post(array('ID' => $p_id, 'menu_order' => $order));
                update_post_meta($p_id,'_menu_item_menu_item_parent',$parent);

                $order++;
            }

        }
    
    }

    wp_send_json(array( 'code' => 'OK', 'items' => get_menu_to_array($menu_id)));

    die;
}
add_action('wp_ajax_update_menu_order','update_menu_order');


/**
 * Reads all registered menus and returns as array
 */
function get_site_menus(){

    $menus = get_terms( 'nav_menu', array( 'hide_empty' => true ) );

    $wp_menus = array();

    if(is_array($menus) && count($menus) > 0){

        foreach($menus as $menu){
            
            $m = wp_get_nav_menu_items($menu->term_id);
            
            $sorted_menu_items =  array();
            
            foreach ( (array) $m as $menu_item ) {
                $mn = array(
                    'ID'            => $menu_item->ID,
                    'menuOrder'     => $menu_item->menu_order,
                    'title'         => $menu_item->title,
                    'url'           => $menu_item->url
                );
                
                if($menu_item->menu_item_parent != 0){
                    $sorted_menu_items[$menu_item->menu_item_parent]['subMenu'][] = $mn;
                }
                else{
                    $sorted_menu_items[$menu_item->ID] = $mn;
                }
            }
           
            $wp_menus[] = array(
                            'id'            => (int)$menu->term_id,
                            'name'          => $menu->name,
                            'slug'          => $menu->slug,
                            'description'   => $menu->description,
                            'items'         => $sorted_menu_items
                        );
        
        }
    }
    
    wp_send_json($wp_menus[0]);

    die;
}
add_action('wp_ajax_get_site_menus','get_site_menus');
add_action('wp_ajax_nopriv_get_site_menus','get_site_menus');

//add_action('init',function(){
//    
//    get_site_menus();
//});

/**
 * Ajax function to add / update a menu item
 */
function save_menu_item(){

    if('POST' !== $_SERVER['REQUEST_METHOD'])
        wp_send_json(array('code' => 'ERROR', 'message' => 'Invalid request'));

    $menu_id    = $_POST['menu-id'];

    $item_id    = $_POST['item-id'];

    $item_title = $_POST['item-title'];

    $item_url   = $_POST['item-url'];

    if((int)$item_id === 0){
        
        $item = wp_update_nav_menu_item($menu_id, 0 , array(
                                                'menu-item-title'   => $item_title,
                                                'menu-item-classes' => sanitize_title($item_title),
                                                'menu-item-url'     =>  $item_url, 
                                                'menu-item-type'    => 'custom',
                                                'menu-item-status'  => 'publish'));
        if ( is_wp_error($item) )
            wp_send_json(array('code' => 'ERROR', 'message' => $item->get_error_message()));
        else
           wp_send_json(array('code' => 'OK', 'itemID' => $item));
    }
    else{

        wp_update_post(array('ID'           => $item_id, 
                             'post_title'   => $item_title,
                            ));

        update_post_meta($item_id,'_menu_item_url', esc_url_raw($item_url) );
        wp_send_json(array('code' => 'OK', 'itemID' => $item_id));
    }
}
add_action('wp_ajax_save_menu_item','save_menu_item');


/**
 * Removes a menu item
 */
function remove_menu_item(){

    $item_id = $_POST['itemId'];

    if ( is_nav_menu_item( $item_id ) && wp_delete_post( $item_id, true ) )
        wp_send_json(array('code' => 'OK','itemID' => $item_id));
    else
        wp_send_json(array('code' => 'ERROR', 'message' => 'Failed to remove. Please try again'));

    die;
}
add_action('wp_ajax_remove_menu_item','remove_menu_item');


/**
 * JSON to be stored
 */
function show_json(){
    
    $json = array(
        'header' => array(
            'elements' => array(
                array(
                    'type'      => 'BuilderRow',
                    'draggable' => false,
                    'editable'  => false,
                    'elements'  => array(
                        array(
                            'type'          => 'BuilderRowColumn',
                            'extraClasses'     => 'topStrip',
                            'colClass'       => 12,
                            'elements'      => array(
                                array(
                                    'type'          => 'ContainerElement',
                                    'extraClasses'  => 'head container',
                                    'elements'      => array(
                                        array(
                                            'type'      => 'BuilderRow',
                                            'extraClasses' => 'row logobar',
                                            'draggable' => false,
                                            'editable'  => false,
                                            'elements'  => array(
                                                array(
                                                    'type'          => 'BuilderRowColumn',
                                                    'extraClasses'  => 'logo col-xs-12',
                                                    'colClass'      => 4,
                                                    'elements'      => array(
                                                        array(
                                                            'type'      => 'ImageElement',
                                                            'extraClasses' => 'logo-title',
                                                            'editable'  => true,
                                                            'draggable' => false,
                                                            'data'      => array(
                                                                'attachmentId' => 14,
                                                                'size'         => 'large'
                                                            )
                                                        )
                                                    )
                                                ),
                                                array(
                                                    'type'          => 'BuilderRowColumn',
                                                    'extraClasses'  => 'cta col-xs-12',
                                                    'colClass'      => 8,
                                                    'content'       => '<div class="contact"><span class="glyphicon glyphicon-earphone"></span>'.__("+34 954 227 116").'</div>
                                    <div class="rates"><a href="#">'.__("Check Rates",'impruwclientparent').'</a></div>',
                                                    'elements'      => array()
                                                )
                                            )
                                        ),
                                        array(
                                            'type'      => 'BuilderRow',
                                            'draggable' => false,
                                            'editable'  => false,
                                            'elements'  => array(
                                                array(
                                                    'type'          => 'BuilderRowColumn',
                                                    'colClass'      => 12,
                                                    'elements'      => array(
                                                        array(
                                                            'type'          => 'MenuElement',
                                                            'extraClasses'  => 'slimmenu menubar',
                                                            'markupStyle'   => 'type1',
                                                            'editable'  => true,
                                                            'draggable' => false,
                                                            'data'      => array(
                                                                'menuName'      => 'Main menu'
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),
        'page' => array(
            'elements' => array(
                array(
                   'type'      => 'BuilderRow',
                   'draggable' => false,
                   'editable'  => false,
                   'elements'  => array(
                       array(
                           'type'          => 'BuilderRowColumn',
                           'colClass'  => 12,
                           'extraClasses'     => 'slideshow',
                           'elements'      => array(
                                   array(
                                      'type'      => 'SliderElement',
                                      'draggable' => false,
                                      'editable'  => false,
                                      'extraClasses' => 'slide'
                                  )
                               )
                           )
                       )
                ),
                array(
                'type'      => 'BuilderRow',
                'draggable' => false,
                'editable'  => false,
                'elements'  => array(
                    array(
                        'type'          => 'BuilderRowColumn',
                        'colClass'  => 12,
                        'extraClasses'     => 'shadeBox',
                        'elements'      => array(
                            array(
                                'type'          => 'ContainerElement',
                                'extraClasses'  => 'pageContent',
                                'elements'      => array(
                                     array(
                                        'type'      => 'BuilderRow',
                                        'draggable' => false,
                                        'editable'  => false,
                                        'elements'  => array(
                                             array(
                                                'type'      => 'BuilderRowColumn',
                                                'colClass'  => 12,
                                                'extraClasses' => 'boxHead',
                                                'elements'      => array(
                                                    array(
                                                        'type'      => 'TitleElement',
                                                        'draggable' => false,
                                                        'editable'  => false,
                                                        'extraClasses' => 'boxTitle',
                                                        'content'   => '<h3>'.__("Rooms",'impruwclientparent').'</h3>'
                                                    ),
                                                    array(
                                                        'type'      => 'TextElement',
                                                        'draggable' => false,
                                                        'editable'  => false,
                                                        'extraClasses' => 'titleLink',
                                                        'content'   => '<a href="#">'.__("View All",'impruwclientparent').'</a>'
                                                    )   
                                                 )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                 )
             ),
             array(
                'type'      => 'BuilderRow',
                'draggable' => false,
                'editable'  => false,
                'elements'  => array(
                    array(
                        'type'          => 'BuilderRowColumn',
                        'colClass'  => 12,
                        'elements'      => array(
                            array(
                                'type'          => 'ContainerElement',
                                'extraClasses'  => 'pageContent',
                                'elements'      => array(
                                     array(
                                        'type'      => 'BuilderRow',
                                        'draggable' => false,
                                        'editable'  => false,
                                        'elements'  => array(
                                             array(
                                                'type'      => 'BuilderRowColumn',
                                                'colClass'  => 12,
                                                'extraClasses' => 'boxHead',
                                                'elements'      => array(
                                                    array(
                                                        'type'      => 'TitleElement',
                                                        'draggable' => false,
                                                        'editable'  => false,
                                                        'extraClasses' => 'boxTitle',
                                                        'content'   => '<h3>'.__("You CAN",'impruwclientparent').'</h3>'
                                                    ) 
                                                 )
                                            )
                                        )
                                     ),
                                    array(
                                        'type'      => 'BuilderRow',
                                        'draggable' => false,
                                        'editable'  => false,
                                        'elements'  => array(
                                             array(
                                                'type'      => 'BuilderRowColumn',
                                                'colClass'  => 6,
                                                'extraClasses' => 'boxContent2 divider',
                                                'elements'      => array(
                                                    array(
                                                        'type'      => 'TextElement',
                                                        'draggable' => false,
                                                        'editable'  => false,
                                                        'content'   => '<p>'.__("It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.",'impruwclientparent').'</p>'
                                                    ) 
                                                 )
                                            ),
                                            array(
                                                'type'      => 'BuilderRowColumn',
                                                'colClass'  => 6,
                                                'extraClasses' => 'boxContent2',
                                                'elements'      => array(
                                                    array(
                                                        'type'      => 'AddressElement',
                                                        'draggable' => false,
                                                        'editable'  => false,
                                                    ) 
                                                 )
                                            )
                                        ) 
                                    )
                                )
                            )
                        )
                    )
                 )
             ),
             array(
                'type'      => 'BuilderRow',
                'draggable' => false,
                'editable'  => false,
                'elements'  => array(
                    array(
                        'type'          => 'BuilderRowColumn',
                        'colClass'      => 12,
                        'extraClasses'  => 'socialBox shadeBox',
                        'elements'      => array(
                            array(
                                'type'          => 'ContainerElement',
                                'extraClasses'  => 'pageContent',
                                'elements'      => array(
                                    array(
                                        'type'      => 'BuilderRow',
                                        'draggable' => false,
                                        'editable'  => false,
                                        'elements'  => array(
                                             array(
                                                'type'      => 'BuilderRowColumn',
                                                'colClass'  => 12,
                                                'extraClasses' => 'boxHead',
                                                'elements'      => array(
                                                    array(
                                                        'type'      => 'TitleElement',
                                                        'draggable' => false,
                                                        'editable'  => false,
                                                        'content'   => '<div class="infoPoint">'.__("Connect With Us",'impruwclientparent').'</div>'
                                                    ) 
                                                 )
                                            )
                                        )
                                     ),
                                    array(
                                        'type'      => 'BuilderRow',
                                        'draggable' => false,
                                        'editable'  => false,
                                        'elements'  => array(
                                             array(
                                                'type'      => 'BuilderRowColumn',
                                                'colClass'  => 12,
                                                'elements'      => array(
                                                        array(
                                                            'type'      => 'SocialElement',
                                                            'draggable' => false,
                                                            'editable'  => false,
                                                            'elements'  => array() 
                                                        )
                                                 )
                                            )
                                        ) 
                                    )
                                )
                            )
                        )
                    )
                 )
             )
          )
       ),
       'footer' => array(
           'elements' => array(
               array(
                'type'      => 'BuilderRow',
                'draggable' => false,
                'editable'  => false,
                'extraClasses' => 'foot',
                'elements'  => array(
                    array(
                        'type'          => 'BuilderRowColumn',
                        'colClass'      => 12,
                        'elements'      => array(
                            array(
                                'type'          => 'ContainerElement',
                                'extraClasses'  => 'pageContent',
                                'elements'      => array(
                                    array(
                                        'type'      => 'BuilderRow',
                                        'draggable' => false,
                                        'editable'  => false,
                                        'elements'  => array(
                                             array(
                                                'type'      => 'BuilderRowColumn',
                                                'colClass'  => 12,
                                                'elements'      => array(
                                                    array(
                                                            'type'          => 'MenuElement',
                                                            'extraClasses'  => 'footerLinks text-center',
                                                            'markupStyle'   => 'type2',
                                                            'editable'  => true,
                                                            'draggable' => false,
                                                            'data'      => array(
                                                                'menuName'      => 'Footer menu'
                                                            )
                                                     )
                                                 )
                                            )
                                        )
                                     )
                                )
                            )
                        )
                    )
                 )
              )
          )
       )
    );
    
    return $json; 
 
  
 
}
 
