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
        
        $this->image_id = $element['image_id'];
        $this->size 	= $element['size'];
        $this->align    = $element['align'];
        $this->content 	= stripslashes($element['content']);
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
    	
    	
    	
    	$template = '{{#image}}
						<img src="{{imageurl}}" alt="{{title}}" class="{{alignclass}} img-responsive"/>
					{{/image}}
					{{#placeholder}}
						<div class="image-placeholder {{alignclass}}"><span class="bicon icon-uniF10E"></span>Image</div>
					{{/placeholder}}
					<p class="editor">{{content}}</p>
					<div class="clearfix"></div>';
    	
    	$data = array();
    	
    	if($this->image_id > 0){
    		$data['image'] = true;
    		$image = wp_prepare_attachment_for_js($this->image_id);
    		
    		$data['imageurl'] = $image['sizes']['thumbnail']['url'];
    		$data['title'] = $image['title'];	
    	}
    	else{
    		$data['placeholder'] = true;
    	}
    	
    	$data['alignclass'] = $this->align == 'right' ? 'pull-right' : 'pull-left';
    	$data['content'] = $this->content;
    	
    	$html = $this->get_open_tag();
    	$html .= $me->render($template, $data);
    	$html .= $this->get_close_tag();
    	
    	return $html;
    }
    
}
