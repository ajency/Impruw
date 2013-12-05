<?php
/*
    File Name: functions.php
    Description: This file has a list of the following functions used in this theme
 */


define('PARENTTHEMEPATH', ABSPATH . 'wp-content/themes/impruwclientparent/');
require_once PARENTTHEMEPATH . 'elements/Element.php';


//add theme support
add_theme_support('menus');

//remove wordpress admin bar
show_admin_bar(false);


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
        'label' => __('room'),
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
        'search_items' => __('Search Facilities'),
        'all_items' => __('All Facilities'),
        'parent_item' => __('Parent Facility'),
        'parent_item_colon' => __('Parent Facility:'),
        'edit_item' => __('Edit Facility'),
        'update_item' => __('Update Facility'),
        'add_new_item' => __('Add New Facility'),
        'new_item_name' => __('New Facility'),
        'menu_name' => __('Facility')
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
function generateMarkup($section){
    
    global $post, $markupJSON;
    
    $markupJSON = getPageMarkupJSON($post->ID);
    
    $json = $markupJSON[$section];
    
    $html = '';
    
    foreach($json['elements'] as $element){
        
        $html .= addElementmarkup($element);
        
    }
    
    return $html;
}

/**
 * Gets the markup
 * @param type $element
 * @return type
 */
function addElementMarkup($element){
    
    $html = '';
    
    switch($element['type']){

        case 'BuilderRow':
            $html = getBuilderRowMarkup($element);
            break;
        case 'BuilderRowColumn':
            $html = getBuilderRowColumnMarkup($element);
            break;
        case 'ContainerElement':
            $html = getContainerMarkup($element);
            break;
        case 'ImageElement':
            $html = getImageElementMarkup($element);
            break;
        case 'MenuElement':
            $html = getMenuElementMarkup($element);
            break;
        case 'TitleElement':
            $html = getTitleElementMarkup($element);
            break;
        case 'TextElement':
            $html = getTextElementMarkup($element);
            break;
        case 'AddressElement':
            $html = getAddressElementMarkup($element);
            break;
        case 'SocialElement':
            $html = getSocialElementMarkup($element);
            break;
        case 'SliderElement':
            $html = getSliderElementMarkup($element);
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
function getBuilderRowMarkup($element){
    
    require_once PARENTTHEMEPATH . 'elements/BuilderRow.php';
    
    $row = new BuilderRow($element);
    
    $html = $row->getOpenTag();
    
    if($row->hasChildElements()){
        
        foreach($row->getElements() as $ele){
            
            $html .= addElementmarkup($ele);
            
        }

    }
    
    $html .= $row->getCloseTag();
    
    return $html;
    
}

/**
 * Generates the column markup
 * @param type $element
 */
function getBuilderRowColumnMarkup($element){
    
    require_once PARENTTHEMEPATH . 'elements/BuilderRowColumn.php';
    
    $column = new BuilderRowColumn($element);
    
    $html = $column->getOpenTag();
    
    $html .= (isset($element['content']) ? $element['content'] : '');//for testing
    
    if($column->hasChildElements()){
        
        foreach($column->getElements() as $ele){
            
            $html .= addElementmarkup($ele);
            
        }

    }
    
    $html .= $column->getCloseTag();
    
    return $html;
   
}

/**
 * Generates the image markup
 * @param type $element
 */
function getImageElementMarkup($element){
        
    require_once PARENTTHEMEPATH . 'elements/ImageElement.php';
    
    $image = new ImageElement($element);

    $html = $image->getMarkup();
    
    return $html;
    
}

/**
 * Generates the address markup
 * @param type $element
 */
function getAddressElementMarkup($element){
        
    require_once PARENTTHEMEPATH . 'elements/AddressElement.php';
    
    $address = new AddressElement($element);

    $html = $address->getMarkup();
    
    return $html;
    
}

/**
 * Generates the Social markup
 * @param type $element
 */
function getSocialElementMarkup($element){
        
    require_once PARENTTHEMEPATH . 'elements/SocialElement.php';
    
    $social = new SocialElement($element);

    $html = $social->getMarkup();
    
    return $html;
    
}

/**
 * Generates the title markup
 * @param type $element
 */
function getTitleElementMarkup($element){
        
    require_once PARENTTHEMEPATH . 'elements/TitleElement.php';
    
    $title = new TitleElement($element);

    $html = $title->getMarkup();
    
    return $html;
    
}

/**
 * Generates the text markup
 * @param type $element
 */
function getTextElementMarkup($element){
        
    require_once PARENTTHEMEPATH . 'elements/TextElement.php';
    
    $text = new TextElement($element);

    $html = $text->getMarkup();
    
    return $html;
}

/**
 * Generates the title markup
 * @param type $element
 */
function getSliderElementMarkup($element){
        
    require_once PARENTTHEMEPATH . 'elements/SliderElement.php';
    
    $slider = new SliderElement($element);

    $html = $slider->getMarkup();
    
    return $html;
    
}

/**
 * Generates the row markup
 * @param type $element
 */
function getMenuElementMarkup($element){
    
    require_once PARENTTHEMEPATH . 'elements/MenuElement.php';
    
    $menu = new MenuElement($element);
    
    $html = $menu->getMarkup();
    
    return $html;
}

/**
 * Generates the row markup
 * @param type $element
 */
function getContainerMarkup($element){
    
    require_once PARENTTHEMEPATH . 'elements/ContainerElement.php';
    
    $row = new ContainerElement($element);
    
    $html = $row->getOpenTag();
    
    if($row->hasChildElements()){
        
        foreach($row->getElements() as $ele){
            
            $html .= addElementmarkup($ele);
            
        }

    }
    
     $html .= $row->getCloseTag();
    
    return $html;
    
}

/**
 * Gets the page markup json from DB
 * @param type $page_id
 */
function getPageMarkupJSON($page_id){
    
    $json = show_json();//get_post_meta($page_id,'page_markup_json',true);
    
    return $json;
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
function getThemeJS()
{
    ?>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/js/jquery.min.js"></script>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/js/bootstrap.min.js"></script>
       <?php 
        $theme_path =  get_stylesheet_directory()."/js";
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
            <script src="<?php echo get_template_directory_uri(); ?>/js/<?php echo $file?>"></script>
        <?php
        } 
    }
}
?>
                 <?php

/**
 * getThemeCSS
 * echo's the JS files for site
 */

function getThemeCSS()
{
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
                                                    'content'       => '<div class="contact"><span class="glyphicon glyphicon-earphone"></span>+34 954 227 116</div>
									<div class="rates"><a href="#">Check Rates</a></div>',
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
                                                        'content'   => '<h3>Rooms</h3>'
                                                    ),
                                                    array(
                                                        'type'      => 'TextElement',
                                                        'draggable' => false,
                                                        'editable'  => false,
                                                        'extraClasses' => 'titleLink',
                                                        'content'   => '<a href="#">View All</a>'
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
                                                        'content'   => '<h3>You CAN</h3>'
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
                                                        'content'   => '<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.</p>'
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
                                                        'content'   => '<div class="infoPoint">Connect With Us</div>'
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

//insert_room();
function insert_room()
{
    $terms = array(10);
    $array=array('post_title' => 'Deluxe', 'post_content' => 'Thisis a deluxe room.', 'user_id' => 3, 'inventory' => 10,'terms'=>$terms);
    $attribute_array = array('weekday_price'=>'10','weekend_price'=>'20','num_of_adults'=>'2','num_of_children'=>'2','extra_adult'=>'10','extra_child'=>'10','include_tax'=>'yes','tax_percent'=>'12','terms_and_conditions'=>'agree');
    $addons_array = array('breakfast at bed'=>'10','lunch_buffet'=>'10');
    $tariff_array = array(array('start_date'=>date("Y/m/d"),'end_date'=>date("Y/m/d"),'attributes'=>$attribute_array,'add_ons'=>$addons_array));
    add_new_room(1,$array,$tariff_array);
    echo "yes";exit;
}
function add_new_room($blog_id,$array,$tariff_array)
{
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

function add_room_tariff($post_id,$tariff_array)
{
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

function agc_register_parent_site_menus()
{
    
 register_nav_menus( array(
        'header_menu' => 'Header Menu',
            'footer_menu' => 'Footer Menu'
) ); 
}
 add_action('init', 'agc_register_parent_site_menus');
