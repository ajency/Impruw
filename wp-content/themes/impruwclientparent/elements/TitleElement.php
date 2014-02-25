<?php
/**
 * This class is responsible for all actions/functions related to 
 * Title Element
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

class TitleElement extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'title';
    
    /**
     * Default content for element
     * @var String 
     */
    var $content    = '';


    /**
     * Class name
     */
    var $class_name  = 'title';
    
    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($element) {
        
        parent::__construct($element);
        
        $this->content = stripslashes($element['content']);
        $this->style = sanitize_title($element['style']);
        
        $this->markup  = $this->generate_markup();
        
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        $attr = array();
        
        $html = '';
        // if(empty($this->content))
        //     $html       .= $this->get_open_tag($attr);

        $html  .= "<h2 class='title {$this->style}'>{$this->content}</h2>";
        
        // if(empty($this->content))
        //     $html       .= $this->get_close_tag();
        
        return $html;
    }
    
   
}
