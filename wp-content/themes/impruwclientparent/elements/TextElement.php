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
    function __construct($element) {
        
        parent::__construct($element);

        echo $current_language = ICL_LANGUAGE_CODE;
        $this->content = stripcslashes(trim($element['content'][$current_language]));
        
        $this->markup           = $this->generate_markup();

        
        
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        echo "Generate markup";
        $attr = array();
        
        if(defined('FOR_BUILDER'))
            $attr['contenteditable'] = 'true';

        $html = '';
        // if(empty($this->content))
        //     $html       .= $this->get_open_tag($attr);
        
        $html           .= "<p class='text'>{$this->content}</p>";
        // if(empty($this->content))
        //     $html       .= $this->get_close_tag();
        
        return $html;
    }

   
}
