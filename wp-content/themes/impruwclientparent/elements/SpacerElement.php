<?php
/**
 * This class is responsible for all actions/functions related to 
 * Social Element
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

class SpacerElement extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'spacer';
    
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
    var $class_name  = 'spacer';
    
    
    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($element) {
        
       parent::__construct($element);

        $this->type_class = isset($element['type']) ? sanitize_title($element['type']) : '';
        $this->height = isset($element['height']) ? (int) $element['height'] : '';
        
        $this->markup           = $this->generate_markup();
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        
        $html   = "<div class='spacer {$this->type_class}'><hr class='{$this->style_class}'";

        if($this->type_class !== 'line')
            $html .= "style='height : {$this->height}px;'";

        $html .= "></div>";
        
        
        return $html;
    }
    

    
}
