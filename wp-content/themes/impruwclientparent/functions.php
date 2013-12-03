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
        
    if(isset($element['content']))
        return $element['content'];
        
    return '<img src="http://placehold.it/350x50" width="100%" height="100%" />';
    
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
function get_parent_tempalte_directory_uri(){
    
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
    <script src="<?php echo get_parent_tempalte_directory_uri(); ?>/js/jquery.min.js"></script>
    <script src="<?php echo get_parent_tempalte_directory_uri(); ?>/js/bootstrap.min.js"></script>
       <?php 
    $theme_path =  get_stylesheet_directory()."/js";
    if(file_exists($theme_path) && is_dir($theme_path))
    {
        $js_files = scandir($theme_path, 1);
        foreach ($js_files as $key => $value)
       {
          if (!in_array($value,array(".","..")))
          {
             ?>
                 <script src="<?php echo get_template_directory_uri(); ?>/js/<?php echo $value?>"></script>
             <?php
          }

        }
    }
}


/**
 * getThemeCSS
 * echo's the JS files for site
 */

function getThemeCSS()
{
    ?>
    <link href="<?php echo get_parent_tempalte_directory_uri(); ?>/css/bootstrap.min.css" type="text/css" rel="stylesheet"/>
    <link href="<?php echo get_parent_tempalte_directory_uri(); ?>/css/flat-ui.css" type="text/css" rel="stylesheet"/>
    <link href="<?php echo get_parent_tempalte_directory_uri(); ?>/css/slimmenu.min.css" type="text/css" rel="stylesheet"/>
    <link href="<?php echo get_parent_tempalte_directory_uri(); ?>/css/style.css" type="text/css" rel="stylesheet"/>
    <?php 
    $theme_path =  get_stylesheet_directory()."/css";
    $css_files = scandir($theme_path, 1);
    if(file_exists($theme_path) && is_dir($theme_path))
    {
        foreach ($css_files as $key => $value)
       {
          if (!in_array($value,array(".","..")))
          {
             ?>
                 <link href="<?php echo get_template_directory_uri(); ?>/css/<?php echo $value?>" type="text/css" rel="stylesheet"/>
              <?php
          }
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
                                                            'type'      => 'MenuElement',
                                                            'extraClasses' => 'slimmenu menubar',
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
       )
    );
    
    return $json; 
}
