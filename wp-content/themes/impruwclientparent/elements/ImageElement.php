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
    function __construct($element) {
        
        parent::__construct($element);
        
        $this->image_id = isset($element['image_id']) ? $element['image_id'] : 0;
        $this->size = $element['size'];
        $this->height = isset($element['heightRatio']) ? $element['heightRatio'] : 'auto';
        $this->position_top = isset($element['topRatio']) ? $element['topRatio'] : 0;
        
        if($element['element'] === 'Logo'){
            $this->link = site_url();
        }else{
            $this->link = isset($element['link']) ? $element['link'] : false;
        }


        $this->target = isset($element['target']) ? $element['target'] : '_self';
        // $this->margins = 
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
         
        $this->image_id;
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

        $a_id = $this->image_id;

        $size = $this->size;
        $height = $this->height;
        $position_top = $this->position_top;


        if($a_id === 0){
            return '<div class="image-placeholder"><span class="glyphicon glyphicon-picture"></span></div>';   
        }

        $path = wp_get_attachment_image_src($a_id, $size);

        $markup = '';

        if ($this->link !== false){
            $markup .= "<a href='".$this->link."' target='".$this->target."' >";
        }

        if($path !== false) {
            $markup .= "<div class='{$this->class_name}' style='overflow:hidden;'><img src='{$path[0]}' data-height='{$height}' data-top='{$position_top}' class='img-responsive  {$this->margins}' width='100%' style=' position: relative;' onload='imageLoaded(this)'/></div>";
            
        }
        else{
            $markup .= "<img data-src='". get_parent_template_directory_uri(). "'/js/holder.js/100%x220' class='img-responsive {$this->margins}'/>";
        }

        if ($this->link !== false)
            $markup .= "</a>";

        return $markup;
            
    }
    
}
