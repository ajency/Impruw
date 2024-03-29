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
            
        if(!is_singular('impruw_room')) {
          $this->slider_id = $element['slider_id'];
        } else {
          $this->slider_id = $this->get_slider_id();
        } 
        
        if((int)$this->slider_id !== 0){
          $this->markup    =    $this->generate_markup();
        }
        else if((int)$this->slider_id === 0){
          if (isset($_GET['preview']) && $_GET['preview'] === "true"){
            $this->markup = $this->generate_preview_markup();
          }
          else{
            $this->markup = $this->generate_placeholder_markup(); 
          }
        }
    }

    function generate_placeholder_markup(){

      return '<div class="gallery-empty-view">
                <span class="glyphicon glyphicon-picture"></span>
                '.__("No Images Found in Gallery","impruwclientparent").'
              </div>';  

    }

    function generate_preview_markup(){

        $html = '';
        
        if(is_singular('impruw_room'))
          $html = '<h3 class="gallery-title">'.__("Gallery","impruwclientparent").'</h3>';
           

        $html .= '<ul class="gallery">';
        
        for($i = 1; $i <= 5; $i++) {
           
           $image_path = get_parent_template_directory_uri() . '/images/galler_thumb_' . $i . '.jpg';

           $image_full = get_parent_template_directory_uri() . '/images/galler_full_' . $i . '.jpg';
           
           $html .= '<li class="isotope-element"><a href="'.$image_full.'" data-lightbox="gallery"><img src="'.$image_path.'" class="img-responsive"></a></li>' ; 
        }
        
        $html .= '</ul>';
          
        return $html;

    }
    
    function get_slider_id(){
       
       if (!is_singular ( 'impruw_room' )) 
           return 0;
       
       // ge the room id
       $room_id  = icl_object_id(get_the_ID(), 'impruw_room', true,'en');
       
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
       
        $slides = get_slides($sliderID);
        
        $html = '';
        
        if(is_singular('impruw_room'))
        	$html = '<h3 class="gallery-title">'.__("Gallery","impruwclientparent").'</h3>';
        	 

        $html .= '<ul class="gallery">';
        
        foreach ($slides as $key => $value) {
           
           $image_path = $slides[$key]["thumb_url"];

           $image_full = $slides[$key]["full_url"];
           
           $html .= '<li class="isotope-element"><a href="'.$image_full.'" data-lightbox="gallery"><img src="'.$image_path.'" class="img-responsive"></a></li>' ; 
        }
        
        $html .= '</ul>';
          
        return $html;
	}
    
}
