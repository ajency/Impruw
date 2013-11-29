<?php
/*
    File Name: functions.php
    Description: This file has a list of the following functions used in this theme
 */


define('PARENTTHEMEPATH', ABSPATH . 'wp-content/themes/impruwclientparent/');
require_once PARENTTHEMEPATH . 'elements/Element.php';


//add theme support
add_theme_support('menus');

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
    
    if($column->hasChildElements()){
        
        foreach($column->getElements() as $ele){
            
            $html .= addElementmarkup($ele);
            
        }

    }
    
    $html .= $column->getCloseTag();
    
    return $html;
   
}

/**
 * Generates the row markup
 * @param type $element
 */
function getImageElementMarkup($element){
        
    require_once PARENTTHEMEPATH . 'elements/ImageElement.php';
    
    $image = new ImageElement($element);

    $html = $image->getMarkup();
    
    return $html;
    
}

/**
 * Generates the row markup
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
    
    $classnames = '';
    
    if(isset($element['extraClasses']))
        $classnames .= ' ' . $element['extraClasses'];
    
    $html = "<ul class='$classnames'>";
    
    if(isset($element['content']))
        $html .= $element['content'];
    else    
        $html .=  '<li><a href="#">Menu 1</a></li>
                   <li><a href="#">Menu 2</a></li>';
    
    $html .= '</ul>';
    
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
 * echo's the JS files for site
 */
function getThemeJS() {
?>
    <script src="<?php echo get_parent_tempalte_directory_uri(); ?>/js/jquery.min.js"></script>
    <script src="<?php echo get_parent_tempalte_directory_uri(); ?>/js/bootstrap.min.js"></script>
    <?php
    $theme_path = get_stylesheet_directory() . "/js";
    $js_files = scandir($theme_path, 1);
    foreach ($js_files as $key => $value) {
        if (!in_array($value, array(".", ".."))) {
        ?>
              <script src="<?php echo get_template_directory_uri(); ?>/js/<?php echo $value ?>"></script>
        <?php
        }
    }
}

/**
 * 
 */
function getThemeCSS() {
?>
    <link href="<?php echo get_parent_tempalte_directory_uri(); ?>/css/bootstrap.min.css" type="text/css" rel="stylesheet"/>
    <link href="<?php echo get_parent_tempalte_directory_uri(); ?>/css/flat-ui.css" type="text/css" rel="stylesheet"/>
    <?php
    $theme_path = get_stylesheet_directory() . "/css";
    $css_files = scandir($theme_path, 1);
    foreach ($css_files as $key => $value) {
        if (!in_array($value, array(".", ".."))) {
        ?>
            <link href="<?php echo get_template_directory_uri(); ?>/css/<?php echo $value ?>" type="text/css" rel="stylesheet"/>
        <?php
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
                                    'type'      => 'ContainerElement',
                                    'extraClasses' => 'head container',
                                    'elements'  => array(
                                        array(
                                            'type'      => 'BuilderRow',
                                            'extraClasses' => 'row logobar',
                                            'draggable' => false,
                                            'editable'  => false,
                                            'elements'  => array(
                                                array(
                                                    'type'          => 'BuilderRowColumn',
                                                    'extraClasses'     => 'logo col-xs-12',
                                                    'colClass'  => 4,
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
                                                    'extraClasses'     => 'cta col-xs-12',
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
                                                    'elements'      => array()
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
                        'elements'      => array()
                    )
                 )
             )
          )
       )
    );
    
    return $json;
  
}
//add_action('init','show_json');