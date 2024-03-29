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


class RoomCarousel extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'roomcarousel';
    
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
    var $class_name  = 'room-carousel';
    
    
    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($config) {
        
        parent::__construct($config);

        $this->markup           = $this->get_carousel();


        
    }

    /**
     * [get_room_images description]
     * @return [type] [description]
     */
    function get_rooms(){

        $ids = get_post_meta($this->post_id, 'room-attachments', true);

        return $ids;
    }

    /**
     * [get_gallery description]
     * @return [type] [description]
     */
    function get_carousel(){

        $html = 'Room Carousel';

        return $html;
    }



    
}
