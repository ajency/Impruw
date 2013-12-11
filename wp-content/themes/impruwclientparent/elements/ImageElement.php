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

class ImageElement extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'image';
    
    /**
     * Set draggable property of element.
     * All elements are draggable by defaults
     * @var boolean 
     */
    var $tag_name        = 'div';
    
    /**
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $class_name  = '';
    
    
    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($config) {
        
        if(isset($config['extraClasses'])){
            $this->extra_classes = $config['extraClasses'];
        }
        
        if(isset($config['data'])){
            $this->data         = $config['data'];
        }
        
        $this->markup           = $this->generate_markup();
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        $html       = $this->get_open_tag();
        
        $html       .= $this->get_image();
        
        $html       .= $this->get_close_tag();
        
        return $html;
    }
    
    /**
     * 
     * @return int
     */
    function get_image_id(){
        
        if(isset($this->data['attachmentId'])){
            return (int)$this->data['attachmentId'];
        }
        
        return 0;
    }
    
    /**
     * 
     * @return string
     */
    function get_image_size(){
        
        if(isset($this->data['size'])){
            return $this->data['size'];
        }
        
        return array('700','200');
    }
    
    /**
     * 
     * @return string
     */
    function get_image(){
        
        $a_id = $this->get_image_id();

        $size = $this->get_image_size();
        
        $path = get_template_directory_uri() . '/js/holder.js/100%x220';

        if($a_id === 0){
            return  "<img src='$path' class='img-responsive' />";
        }

        $path = wp_get_attachment_image_src($a_id, $size);
        
        if($path !== false) {
            return "<img src='{$path[0]}' class='img-responsive' />";
        }
        else{
            return "<img src='". get_template_directory_uri(). "'/js/holder.js/100%x220' class='img-responsive'/>";
        }
            
    }
    
}
