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
class BuilderRowColumn extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'column';
    
    /**
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $class_name  = 'column';
    
    /**
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $col_class   = 12;
    
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

        parent::__construct($element);    
        
        $this->elements = $element['elements'];
        $this->className = 'col-md-'.  $element['className'];

    }
    
    /**
     * returns the space separated set of classes
     * to assign to element
     * @return string space separated classes
     * @override
     */
    function get_classes(){
        
        $class = $this->className;
        
        return $class . ' ' . $this->class_name . ' ' . $this->extra_classes;
        
    }
    
}
