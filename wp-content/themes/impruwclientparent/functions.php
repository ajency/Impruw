<?php
/*
File Name: functions.php
Description: This file has a list of the following functions used in this theme

1)  generateMarkup - Generates the markup for a specific section.
2)  addElementMarkup - function to create taxonomies under post type emails and also creates immediate, batch and marketing terms under email_type
3)  getBuilderRowMarkup - Generates the row markup.
4)  getBuilderRowColumnMarkup - Generates the row markup.
5)  getImageElementMarkup - Generates the row markup.
6)  getSliderElementMarkup - Generates the row markup.
7)  getMenuElementMarkup - Generates the row markup.
7)  getMenuElementMarkup - Generates the row markup.
7)  getMenuElementMarkup - Generates the row markup.
7)  getMenuElementMarkup - Generates the row markup.
7)  getMenuElementMarkup - Generates the row markup.
7)  getMenuElementMarkup - Generates the row markup.
7)  getMenuElementMarkup - Generates the row markup.
7)  getMenuElementMarkup - Generates the row markup.
7)  getMenuElementMarkup - Generates the row markup.
7)  getMenuElementMarkup - Generates the row markup.
7)  getMenuElementMarkup - Generates the row markup.
7)  getMenuElementMarkup - Generates the row markup.
7)  getMenuElementMarkup - Generates the row markup.
7)  getMenuElementMarkup - Generates the row markup.
7)  getMenuElementMarkup - Generates the row markup.
 */
getThemeJS();
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


function addElementMarkup($element){
    
    $html = '';
    
    if(!isset($element['type']))
        var_dump($element);
        
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
    
    $defaults = array('className' => 'row');
    
    $classnames = $defaults['className'];
    
    if(isset($element['className']))
        $classnames .= ' ' . $element['className'];
    
    $html = "<div class='$classnames'>";
    
    if(isset($element['elements']) && count($element['elements']) > 0){
        
        
        foreach($element['elements'] as $ele){
        
            $html .= addElementmarkup($ele);
        
        }
        
    }
    
    $html .= "</div>";
    
    return $html;
    
}

/**
 * Generates the row markup
 * @param type $element
 */
function getBuilderRowColumnMarkup($element){
    
    
    $defaults = array('className' => 'column');
    
    $classnames = $defaults['className'];
    
    if(isset($element['className']))
        $classnames .= ' ' . $element['className'];
    
    if(isset($element['currentClass']))
         $classnames .= ' col-md-' . $element['currentClass'];
    
    $html = "<div class='$classnames'>";
    
    if(isset($element['content']))
        $html .= ' ' . $element['content'];
    
    if(isset($element['elements']) && count($element['elements']) > 0){
        
        
        foreach($element['elements'] as $ele){
        
            $html .= addElementmarkup($ele);
        
        }
        
    }
    
    $html .= "</div>";
    
    return $html;
    
}

/**
 * Generates the row markup
 * @param type $element
 */
function getImageElementMarkup($element){
        
    if(isset($element['content']))
        return $element['content'];
        
    return '<img src="http://placehold.it/350x50" width="100%" height="100%" />';
    
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
    
    if(isset($element['className']))
        $classnames .= ' ' . $element['className'];
    
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
    
    $defaults = array('className' => 'container');
    
    $classnames = $defaults['className'];
    
    if(isset($element['className']))
        $classnames .= ' ' . $element['className'];
    
    $html = "<div class='$classnames'>";
    
    if(isset($element['elements']) && count($element['elements']) > 0){
        
        foreach($element['elements'] as $ele){
        
            $html .= addElementmarkup($ele);
        
        }
        
    }
    
    $html .= "</div>";
    
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
 * 
 */
function getThemeJS(){
    ?>
    <script src="<?php echo get_template_directory_uri(); ?>/impruwthemes/js/jquery.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/impruwthemes/js/bootstrap.min.js"></script>
       <?php 
    $theme_path =  get_stylesheet_directory()."/js";
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

/**
 * 
 */
function getThemeCSS(){
    ?>
    <link href="<?php echo get_template_directory_uri(); ?>/impruwthemes/css/bootstrap.min.css" type="text/css" rel="stylesheet"/>
    <link href="<?php echo get_template_directory_uri(); ?>/impruwthemes/css/flat-ui.css" type="text/css" rel="stylesheet"/>
    <link href="<?php echo get_template_directory_uri(); ?>/impruwthemes/theme1/css/slimmenu.min.css" type="text/css" rel="stylesheet"/>
    <link href="<?php echo get_template_directory_uri(); ?>/impruwthemes/theme1/css/style.css" type="text/css" rel="stylesheet"/>
    <?php 
    $theme_path =  get_stylesheet_directory()."/css";
    $css_files = scandir($theme_path, 1);
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
                            'className'     => 'topStrip',
                            'currentClass'  => 12,
                            'elements'      => array(
                                array(
                                    'type'      => 'ContainerElement',
                                    'className' => 'head container',
                                    'elements'  => array(
                                        array(
                                            'type'      => 'BuilderRow',
                                            'className' => 'row logobar',
                                            'draggable' => false,
                                            'editable'  => false,
                                            'elements'  => array(
                                                array(
                                                    'type'          => 'BuilderRowColumn',
                                                    'className'     => 'logo col-xs-12',
                                                    'currentClass'  => 4,
                                                    'elements'      => array(
                                                        array(
                                                            'type'      => 'ImageElement',
                                                            'className' => 'logo-title',
                                                            'editable'  => true,
                                                            'draggable' => false,
                                                            'content'   => '<img src="'.  get_template_directory_uri().'/impruwthemes/theme1/images/logo.jpg" height="100" class="img-responsive">',
                                                    
                                                        )
                                                    )
                                                ),
                                                array(
                                                    'type'          => 'BuilderRowColumn',
                                                    'className'     => 'cta col-xs-12',
                                                    'currentClass'  => 8,
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
                                                    'currentClass'  => 12,
                                                    'elements'      => array(
                                                        array(
                                                            'type'      => 'MenuElement',
                                                            'className' => 'slimmenu menubar',
                                                            'content'   => '<li class="active"><a href="index.html"><span class="glyphicon glyphicon-home"></span></a></li>
										<li class="sub-collapser">
											<a href="#">About Us <span class="glyphicon glyphicon-chevron-down"></span></a>
											<ul class="dropDrown">
											  <li><a href="content.html">abc</a></li>
											  <li><a href="#">123</a></li>
											</ul>
										</li>
										<li><a href="rooms.html">Rooms</a></li>
										<li class="sub-collapser">
											<a href="#">Services <span class="glyphicon glyphicon-chevron-down"></span></a>
											<ul class="dropDrown">
											  <li><a href="#">Action</a></li>
											  <li><a href="#">Another action</a></li>
											  <li><a href="#">Something else here</a></li>
											  <li><a href="#">Separated link</a></li>
											  <li><a href="#">One more separated link</a></li>
											</ul>
										</li>
										<li><a href="#">Our Blog</a></li>
										<li><a href="contact.html">Contacts</a></li>'
									
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
                        'currentClass'  => 12,
                        'className'     => 'slideshow',
                        'elements'      => array(
                                array(
                                    'type'       => 'SliderElement',
                                    'sliderType' => 2,
                                    'content'    => '<div id="carousel-example-generic" class="carousel slide">
                                                        <!-- Indicators -->
                                                        <ol class="carousel-indicators">
                                                              <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                                                              <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                                                              <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                                                        </ol>
                                                        <div class="carousel-inner">
                                                              <div class="item active">
                                                                <img src="'.  get_template_directory_uri().'/impruwthemes/theme1/images/slide1.jpg" alt="...">
                                                                <div class="carousel-caption">
                                                                      Moonlight over
                                                                      <div class="sub-caption">October, 24 - Moonlight over Thompson - The full moon\'s light</div>
                                                                </div>
                                                              </div>
                                                              <div class="item">
                                                                <img src="'.  get_template_directory_uri().'/impruwthemes/theme1/images/slide1.jpg" alt="...">
                                                                <div class="carousel-caption">
                                                                      Moonlight over 2
                                                                      <div class="sub-caption"><h6>October, 24 - Moonlight over Thompson - The full moon\'s light</h6></div>
                                                                </div>
                                                              </div>
                                                        </div>
                                                        <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                                                              <span class="icon-prev"></span>
                                                        </a>
                                                        <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
                                                              <span class="icon-next"></span>
                                                        </a>
                                                     </div>'
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
//add_action('init','show_json');