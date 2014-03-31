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
    
    
    
    /**
     * The config to create a row element
     * @param array $element
     */
    function __construct($element, $post_id = 0) {
        
        parent::__construct($element );
        
        $this->post_id = $post_id;

        if($this->post_id === 0 && get_the_ID() > 0)
            $this->post_id = get_the_ID();
        
        
        if(isset($element['slider_id'])){
           
            $this->slider_id = get_post_meta ( $this->post_id, 'slider_id', true );
           
        }
        else{
             $this->slider_id = $this->get_sliderID();
        }
        
        
        $this->markup           = $this->generate_markup();
  
/*
        $this->data_source = array();
        $this->data_source['image-ids'] = $this->get_room_images();*/
        
    }
    
    function get_sliderID(){
       
       if (is_singular ( 'impruw_room' )) {
           
           $page = get_post_meta (  $this->post_id, 'page-json', true );
           if ($page === '') {
                    
                    $p = get_page_by_title ( 'Single Room' );
                    $page = get_post_meta ( $p->ID, 'page-json', true );
           
                    foreach ($page as $key => $value) {
                        if($page[$key]['element'] == 'Gallery'){
                            $meta_id = $page[$key]['meta_id'];
                            $json =get_metadata_by_mid('post',$meta_id);
                            $json = (array) $json;
                            return $json['meta_value']['slider_id'];
                        }
                    }            
           }
       }
       else{
           $slider_id = get_post_meta ( $this->post_id, 'slider_id', true );
           return $slider_id;
       }
        
    }

    /**
     * [get_room_images description]
     * @return [type] [description]
     */
    function generate_markup(){
       
        $sliderID = $this->slider_id;
       
        $slides =get_slides($sliderID);
        
        $html = '<ul>';
        
        foreach ($slides as $key => $value) {
           
           $image_path = $slides[$key]["thumb_url"];
           
           $html .= '<li><img src="'.$image_path.'"></li>' ; 
        }
        
        $html .= '</ul>';
          
        return $html;
        /*
        $ids = get_post_meta($this->post_id, 'room-attachments', true);

        return $ids;
         
      */  
}
    
}
