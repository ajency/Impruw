<?php
/**
 * This class is responsible for all actions/functions related to 
 * RoomGallery
 *
 * @category   element
 * @package    Impruw
 * @author     Suraj Air<suraj@ajency.in>
 * @author     Suraj Air<suraj@ajency.in>
 * @date       13 Jan 14
 * @copyright  2014 Ajency.in
 * @license    http://www.php.net/license/3_01.txt  PHP License 3.01
 * @version    Release: 0.1
 * @since      Class available since Release 0.1
 * @deprecated NA
 */

require_once PARENTTHEMEPATH . 'elements/SliderElement.php';

include_once PARENTTHEMEPATH.'modules/slider/functions.php';

class RoomGallery extends SliderElement {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'roomgallery';
    
    /**
     * Set draggable property of element.
     * All elements are draggable by defaults
     * @var boolean 
     */
    var $tag_name    = 'div';
    
    /**
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $class_name  = 'room-gallery';
    
   
    function __construct($element, $post_id = 0) {

        
        //parent::__construct($element );
            
        $this->slider_id = isset($element['slider_id']) ? $element['slider_id'] : $this->get_slider_id();
           
        $this->markup    =  $this->slider_id === 0 ? '' :  $this->generate_markup();
    }
    
    function get_slider_id(){
       
       if (!is_singular ( 'impruw_room' )) 
           return 0;
       
       // ge the room id
       $room_id = get_the_ID();
       
       $slider_id = get_post_meta ( $room_id, 'slider_id', true );
       
       if ($slider_id === '')
           return 0;         
       else
           return (int)$slider_id;
 
    }

    /**
     * [get_room_images description]
     * @return [type] [description]
     */
    function generate_markup(){
       
        $sliderID = $this->slider_id;
       
        $slides =get_slides($sliderID);
        
        $html = '';
        
        if(is_singular('impruw_room'))
        	$html = '<h3>Gallery Or add markup here</h3>';
        	
        $html .= '<ul class="gallery">';
        
        foreach ($slides as $key => $value) {
           
           $image_path = $slides[$key]["thumb_url"];
           
           $html .= '<li class="isotope-element"><img src="'.$image_path.'"></li>' ; 
        }
        
        $html .= '</ul>';
          
        return $html;
	}
    
}
