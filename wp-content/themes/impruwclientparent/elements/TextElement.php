<?php
/**
 * This class is responsible for all actions/functions related to 
 * Text Element
 *
 * @category   Inline editable element
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

class TextElement extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'text';
    
    /**
     * Default content for element
     * @var String 
     */
    var $content    = '';
    
   /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($config) {
        
        if(isset($config['extraClasses'])){
            $this->extraClasses = $config['extraClasses'];
        }
        
        if(isset($config['content'])){
            $this->markup         = $config['content'];
        }
        
        if(isset($config['content'])){
            $this->content          = $config['content'];
        }
        
        $this->markup               = $this->generateMarkup();
        
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generateMarkup(){
        
        $html       = $this->getOpenTag();
        
        $html       .=  $this->content;
        
        $html       .= $this->getCloseTag();
        
        return $html;
    }
    
   
}
