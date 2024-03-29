<?php
/**
 * This class is responsible for all actions/functions related to 
 * BuilderRowColumn Element
 *
 * @category   layout
 * @package    Impruw
 * @author     Suraj Air<suraj@ajency.in>
 * @author     Suraj Air<suraj@ajency.in>
 * @date       28th Nov 13
 * @copyright  2013 Ajency.in
 * @license    http://www.php.net/license/3_01.txt  PHP License 3.01
 * @version    Release: 0.1
 * @since      Class available since Release 0.1
 * @deprecated NA
 */

class ImageWithText extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'image';
    
    /**
     * Set draggable property of element.
     * All elements are draggable by defaults
     * @var boolean 
     */
    var $tag_name        = 'div';
    
    /**
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $class_name  = 'imagewithtext';
    
    
    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($element) {
        
        parent::__construct($element);
        
        $this->image_id = isset($element['image_id']) ? $element['image_id'] : 0;
        //$this->size 	= $element['size'];
        $this->align    = isset($element['align']) ? $element['align'] : 'left';

        $current_language = ICL_LANGUAGE_CODE;
        $content = '';
        if(is_array($element[ 'content' ])){
            $content        = isset( $element[ 'content' ][ $current_language ] ) ? $element[ 'content' ][
        $current_language ] : $element[ 'content' ][ wpml_get_default_language() ];
        }
        else{
            $content = $element[ 'content' ];
        }
        $this->content  = stripcslashes(trim( $content ));

        $this->link = isset($element['link']) && $element['link']!= '' ? $element['link'] : false;
        $this->target = isset($element['target']) ? $element['target'] : '_self'; 
        $this->link_check = isset($element['link_check']) && ($element['link_check'] == 'true') ? true : false; 

        $this->style 	= sanitize_title($element['style']);
        $this->markup   = $this->generate_markup();

    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
    	
    	global $me;
    	
    	
    	
    	$template = '{{#image}}';
        if($this->link_check){
            $template .= '<a href="{{link}}" target="{{target}}">';
        }                      
		$template .= '<img src="{{imageurl}}" alt="{{title}}" class="{{alignclass}} img-responsive"/>';
        if($this->link_check){
            $template .= '</a>';
        }                        
		$template .= '{{/image}}
					{{#placeholder}}
						<div class="image-placeholder {{alignclass}}"><span class="glyphicon glyphicon-picture"></span>Image</div>
					{{/placeholder}}
					<div class="editor">{{{content}}}</div>
					<div class="clearfix"></div>';
    	
    	$data = array();
    	
    	if($this->image_id > 0){
    		$data['image'] = true;
    		$image = wp_prepare_attachment_for_js($this->image_id);
    		
    		$data['imageurl'] = $image['sizes']['thumbnail']['url'];
    		$data['title'] = $image['title'];
            $data['link'] = $this->link;
            $data['target']	= $this->target;
    	}
    	else{
    		$data['placeholder'] = true;
    	}
    	
    	$data['alignclass'] = $this->align == 'right' ? 'pull-right' : 'pull-left';
    	$data['content'] = $this->content;
        $data['margin-css'] = $this->margins;
    	
    	$html = $this->get_open_tag();
    	$html .= $me->render($template, $data);
    	$html .= $this->get_close_tag();
    	
    	return $html;
    }
    
}
