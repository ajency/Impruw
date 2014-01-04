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
class LogoElement extends Element {
    
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
        
        parent::__construct($config);
        
        if(isset($config['dataSource'])){
            $this->data  = $config['dataSource'];
        }
        
        $this->markup    = $this->generate_markup();
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        //$html       = $this->get_open_tag();
        
        $html       = $this->get_image();
        
        //$html       .= $this->get_close_tag();
        
        return $html;
    }
    
    /**
     * 
     * @return int
     */
    function get_image_id(){
         
        if(isset($this->data['attachmentID'])){
            return (int)$this->data['attachmentID'];
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
        
        $path = get_parent_template_directory_uri() . '/js/holder.js/100%x220/text:Logo';

        if($a_id === 0){
            return  sprintf("<a href='%s'><img data-src='%s' class='img-responsive' /></a>", site_url(), $path);
        }

        $image = wp_get_attachment_image_src($a_id, $size);
        
        if($image !== false) {
            return sprintf("<a href='%s'><img src='%s' class='img-responsive' /></a>", site_url(), $image[0]);
        }
        else{
            return sprintf("<a href='%s'><img data-src='%s' class='img-responsive' /></a>", site_url(), $path);
        }
            
    }
    
}
