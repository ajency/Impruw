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
     * @param array $config
     */
    function __construct($config, $post_id = 0) {
        
        parent::__construct($config);

        $this->post_id = $post_id;

        if($this->post_id === 0 && get_the_ID() > 0)
            $this->post_id = get_the_ID();

        $this->data_source = array();
        $this->data_source['image-ids'] = $this->get_room_images();

        $this->markup           = $this->get_gallery();


        
    }

    /**
     * [get_room_images description]
     * @return [type] [description]
     */
    function get_room_images(){

        $ids = get_post_meta($this->post_id, 'room-attachments', true);

        return is_array($ids) ? $ids : array();
    }

    /**
     * [get_gallery description]
     * @return [type] [description]
     */
    function get_gallery(){

        //set filter
        add_filter('wp_get_attachment_link', 'add_rel_attribute', 100, 6);

        $ids = implode(',', $this->data_source['image-ids']);

        //$html = do_shortcode("[gallery ids='95,93,92,91,94']");

        $html = do_shortcode('[gallery ids="96,92,93"]');

        remove_filter('wp_get_attachment_link', 'add_rel_attribute', 100, 6);

        return $html;
    }



    
}
