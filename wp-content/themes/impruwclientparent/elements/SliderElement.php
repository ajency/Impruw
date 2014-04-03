<?php
/**
 * This class is responsible for all actions/functions related to 
 * SliderElement
 *
 * @category   element
 * @package    Impruw
 * @author     Suraj Air<suraj@ajency.in>
 * @author     Suraj Air<suraj@ajency.in>
 * @date       3rd Dec 13
 * @copyright  2013 Ajency.in
 * @license    http://www.php.net/license/3_01.txt  PHP License 3.01
 * @version    Release: 0.1
 * @since      Class available since Release 0.1
 * @deprecated NA
 */

class SliderElement extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'slider';
    
    /**
     * Set draggable property of element.
     * All elements are draggable by defaults
     * @var boolean 
     */
    var $tag_name    = 'div';
    
    /**
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $class_name  = 'carousel';
    
    
    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($element) {
        
        parent::__construct($element);
       
        $this->slider_id = $element['slider_id'];

        $this->markup   = $this->generate_markup();

    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
    	
    	if(!slider_exists($this->slider_id))
    		return '';
        
        $slider = new RevSlider();
        $slider->initByID($this->slider_id);
        ob_start();
        echo do_shortcode("[rev_slider {$slider->getID()}]");
        $html = ob_get_clean();
        return $html;
    }
    
  
    
}
