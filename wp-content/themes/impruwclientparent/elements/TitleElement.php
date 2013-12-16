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
    * Default tag name
    */
    var $tag_name   = 'h3';

    /**
     * Class name
     */
    var $class_name  = 'title';
    
    
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
        
        $html = '';
        if(empty($this->content))
            $html       = $this->get_open_tag(array('contenteditable' => 'true'));

        $html       .=  ($this->content === '') ? 'Enter your title here' : $this->content;
        
        if(empty($this->content))
            $html       .= $this->get_close_tag();
        
        return $html;
    }
    
   
}
