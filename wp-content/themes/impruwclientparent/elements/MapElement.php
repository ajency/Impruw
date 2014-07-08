<?php
/**
 * This class is responsible for all actions/functions related to 
 * Cpntact form Element
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

class MapElement extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'map';
    
    /**
     * Set draggable property of element.
     * All elements are draggable by defaults
     * @var boolean 
     */
    var $tag_name   = 'div';
    
    /**
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $class_name  = 'map';
    
    
    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($config) {
        
        parent::__construct($config);

        $this->heightRatio  = isset($config['heightRatio'])?(float)$config['heightRatio']:0.4;
        
        $this->markup           = $this->generate_markup();
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        $html       = $this->get_open_tag();
        
        $html       .= $this->get_map();
        
        $html       .= $this->get_close_tag();
        
        return $html;
    }

    /**
     * [get_map description]
     * @return [type] [description]
     */
    function get_map(){
		ob_start();
        $heightRatio = $this->heightRatio;
        ?> 
        <!-- Google maps API -->
        <div id="map_canvas" ></div>
        <script type="text/javascript">
		var HOTELADDRESS = '<?php echo get_hotel_address(); ?>';
        </script>
        <?php
        echo "<script>jQuery('#map_canvas').height(parseInt(jQuery('#map_canvas').width())*".$heightRatio.");</script>";
        $html = ob_get_clean();

        return $html;


    }

    
}
