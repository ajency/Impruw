<?php
/**
 * This class is responsible for all actions/functions related to 
 * GalleryElement
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

class GalleryElement extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'galleryelement';
    
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
    var $class_name  = 'gallery';
    
    
    
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

        if(isset($config['dataSource'])){
           $this->data_source['image-ids']  = is_array($config['dataSource']) ? $config['dataSource'] : array();
        }
        
        $this->markup           = $this->get_gallery();
        
    }

    /**
     * [get_gallery description]
     * @return [type] [description]
     */
    function get_gallery(){

        if(empty($this->data_source['image-ids']))
            return '<p>Nothing found</p>';

        //set filter
        add_filter('wp_get_attachment_link', 'add_rel_attribute', 100, 6);

        $ids = implode(',', $this->data_source['image-ids']);

        $html = do_shortcode("[gallery ids='$ids']");
        //$html = do_shortcode('[gallery ids="96,92,93"]');

        remove_filter('wp_get_attachment_link', 'add_rel_attribute', 100, 6);

        return $html;
    }



    
}
