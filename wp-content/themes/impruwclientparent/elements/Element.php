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
    var $tag_name        = 'div';
    
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
    var $class_name      = '';
    
    /**
     * The extra classes to be set for element property for element.
     * Empty string by default
     * @var String 
     */
    var $extra_classes   = '';
    
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
    function generate_random_ID(){
        
        return $this->type . '-' . rand(100000, 999999);
        
    }
    
    /**
     * Returns the $markup property if the element
     * @return string The actual markup of the element
     */
    function get_markup(){
       
        return $this->markup;
        
    }
    
    /**
     * Checks if elements has child elements based on 
     * elements property
     * @return boolean
     */
    function has_child_elements(){
        
        if(is_array($this->elements) && count($this->elements) > 0)
            return true;
        
        return false;
        
    }
    
    /**
     * Checks if element has child elements and returns
     * @return array() Array of elements if present or empty array if no elements
     */
    function get_elements(){
        
       return $this->elements;
      
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        $html       = $this->get_open_tag();
        
        $html       .= $this->get_close_tag();
        
        return $html;
    }
    
    /**
     * Creates the open tag for the element
     */
    function get_open_tag($args = array()){
        
        $this->id   = $this->generate_random_ID();

        $attr = '';    

        if(!empty($args)){
            foreach($args as $key => $val){
                $attr .= " $key='$val'";
            }
        }

        $html       = "<{$this->tag_name} id='{$this->id}' class='{$this->get_classes()}'$attr>";
        
        return $html;
    }
    
    /**
     * Creates the closing tag for the element
     */
    function get_close_tag(){
        
        $html  = "</{$this->tag_name}><!--{$this->tag_name}#{$this->id}-->";
        
        return $html;
    }
    
    /**
     * returns the space separated set of classes
     * to assign to element
     * @return string space separated classes
     */
    function get_classes(){
        
        return $this->class_name . ' ' . $this->extra_classes;
        
    }
}
