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

        $current_language = ICL_LANGUAGE_CODE;
        $content = '';
        if(is_array($element[ 'content' ])){
            $content        = isset( $element[ 'content' ][ $current_language ] ) ? $element[ 'content' ][
        $current_language ] : $element[ 'content' ][ wpml_get_default_language() ];
        }
        else{
            $content = $element[ 'content' ];
        }
        $this->content  = stripcslashes(trim( $content ));

        $this->style = sanitize_title($element['style']);
        $this->justify = isset($element['justify']) && $element['justify']!= ''? $element['justify'] : false; 
        
        $this->markup  = $this->generate_markup();
        
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        $attr = array();
        

        $justify = '';
        if($this->justify){
            $justify .= "style='text-align: {$this->justify}'";
        }
        // if(empty($this->content))
        //     $html       .= $this->get_open_tag($attr);

        $html  = "<h2 class='title {$this->style}' {$justify} >{$this->content}</h2>";
        // $html .= $this->content;
        
        // if(empty($this->content))
        //     $html       .= $this->get_close_tag();
        
        return $html;
    }
    
   
}
