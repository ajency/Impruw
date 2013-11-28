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

class BuilderRow extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'row';
    
    /**
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $className  = 'row';
    
    /**
     * Child elements for this row.(BuilderRowColumn)
     * @var array 
     */
    var $elements   = array();
    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($config) {
        
        if(isset($config['elements'])){
            $this->elements     = $config['elements'];
        }
        
        if(isset($config['extraClasses'])){
            $this->extraClasses = $config['extraClasses'];
        }
        
        $this->markup = $this->generateMarkup();
    }
    
}
