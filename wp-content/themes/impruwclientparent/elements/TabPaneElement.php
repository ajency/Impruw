<?php
/**
 * This class is responsible for all actions/functions related to 
 * BuilderRow Element
 *
 * @category   Layout
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

class TabPane extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'tab';
    
    /**
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $class_name  = 'tab-pane';
    
    /**
     * Child elements for this row.(BuilderRowColumn)
     * @var array 
     */
    var $elements   = array();
    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($element) {
        
        $this->elements     = $element['elements'];
        // $this->style        = sanitize_title($element['style']);
        
    }
    
    function get_classes(){
        
        return $this->class_name  ;
        
    }

    function get_open_tag($args = array()){
        $html = "<div class='{$this->get_classes()}' role='tabpanel'>";
        return $html;
    }
    
}