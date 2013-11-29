<?php
/**
 * This class contains all the generic functions which will be required across all 
 * elements. 
 *
 * @category   Element
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

class Element {
    
    /**
     * Holds the ID for an element
     * display in content mode in builder and actual site
     * @see generateRandomId()
     * @var String  
     */
    var $id             = '';
    
    /**
     * Holds the actual markup for the elment which is used to 
     * display in content mode in builder and actual site
     * @var String  
     */
    var $markup         = '';
    
    /**
     * Set draggable property of element.
     * All elements are draggable by defaults
     * @var boolean 
     */
    var $draggable      = true;
    
    /**
     * Set draggable property of element.
     * All elements are draggable by defaults
     * @var boolean 
     */
    var $tagName        = 'div';
    
    /**
     * Set editable property of element.
     * All elements are editable by defaults
     * @var boolean 
     */
    var $editable       = true;
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type           = 'element';
    
    /**
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $className      = '';
    
    /**
     * The extra classes to be set for element property for element.
     * Empty string by default
     * @var String 
     */
    var $extraClasses   = '';
    
    /**
     * Default elements list
     * @var array 
     */
    var $elements       = array();
    
    /**
     * The default data property for element.
     * used to generate the actual markup
     * @var String 
     */
    var $data  =  array();
    
    
    /**
     * Checks the type of element
     * @param string $type
     * @return boolean
     */
    function is($type){
        
        if($this->type === $type)
            return true;
        
        return false;
        
    }
    
    /**
     * Uses type proeprty + random number genration logic to 
     * create a unique ID for each element
     * @return string - random generated ID
     */
    function generateRandomId(){
        
        return $this->type . '-' . rand(100000, 999999);
        
    }
    
    /**
     * Returns the $markup property if the element
     * @return string The actual markup of the element
     */
    function getMarkup(){
       
        return $this->markup;
        
    }
    
    /**
     * Checks if elements has child elements based on 
     * elements property
     * @return boolean
     */
    function hasChildElements(){
        
        if(is_array($this->elements) && count($this->elements) > 0)
            return true;
        
        return false;
        
    }
    
    /**
     * Checks if element has child elements and returns
     * @return array() Array of elements if present or empty array if no elements
     */
    function getElements(){
        
       return $this->elements;
      
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generateMarkup(){
        
        $html       = $this->getOpenTag();
        
        $html       .= $this->getCloseTag();
        
        return $html;
    }
    
    /**
     * Creates the open tag for the element
     */
    function getOpenTag(){
        
        $this->id   = $this->generateRandomId();
        
        $html       = "<{$this->tagName} id='{$this->id}' class='{$this->getClasses()}'>";
        
        return $html;
    }
    
    /**
     * Creates the closing tag for the element
     */
    function getCloseTag(){
        
        $html  = "</{$this->tagName}><!--{$this->tagName}#{$this->id}-->";
        
        return $html;
    }
    
    /**
     * returns the space separated set of classes
     * to assign to element
     * @return string space separated classes
     */
    function getClasses(){
        
        return $this->className . ' ' . $this->extraClasses;
        
    }
}
