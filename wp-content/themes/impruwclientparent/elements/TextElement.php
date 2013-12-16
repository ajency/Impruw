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
        
        parent::__construct($config);
        
        if(isset($config['content'])){
            $this->content          = trim($config['content']);
        }
        
        $this->markup               = $this->generate_markup();
        
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        $html       = $this->get_open_tag(array('contenteditable' => 'true'));
        
        $html       .=  empty($this->content) ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                                 when an unknown printer took a galley of type and scrambled it to make a 
                                                 type specimen book. It has survived not only five centuries, but also the 
                                                 leap into electronic typesetting" : $this->content;
        
        $html       .= $this->get_close_tag();
        
        return $html;
    }
    
   
}
