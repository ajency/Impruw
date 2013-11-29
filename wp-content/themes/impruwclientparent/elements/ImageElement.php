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
    var $tagName        = 'div';
    
    /**
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $className  = '';
    
    
    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($config) {
        
        if(isset($config['extraClasses'])){
            $this->extraClasses = $config['extraClasses'];
        }
        
        if(isset($config['data'])){
            $this->data         = $config['data'];
        }
        
        $this->markup           = $this->generateMarkup();
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generateMarkup(){
        
        $html       = $this->getOpenTag();
        
        $html       .= $this->getImage();
        
        $html       .= $this->getCloseTag();
        
        return $html;
    }
    
    /**
     * 
     * @return int
     */
    function getImageId(){
        
        if(isset($this->data['attachmentId'])){
            return (int)$this->data['attachmentId'];
        }
        
        return 0;
    }
    
    /**
     * 
     * @return string
     */
    function getImageSize(){
        
        if(isset($this->data['size'])){
            return $this->data['size'];
        }
        
        return 'large';
    }
    
    /**
     * 
     * @return string
     */
    function getImage(){
        
        $aid = $this->getImageId();
        
        if($aid === 0){
            return '';
        }
        
        $size = $this->getImageSize();
        
        $path = wp_get_attachment_image_src($aid, $size);
        
        if($path !== false) {
            return "<img src='{$path[0]}' class='img-responsive' />";
        }
        else{
            return "<img src='http://placehold.it/{$size[0]}x{$size[1]}' class='img-responsive' width='{$size[0]}' height='{$size[1]}'/>";
        }
            
    }
    
}
