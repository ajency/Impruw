    <?php
/**
 * This class is responsible for all actions/functions related to 
 * Room Facilities Element
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

class RoomFacilities extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'roomfacilities';

    
    /**
     * The config to create a row element
     * @param array $element
     */
    function __construct($element, $post_id = 0) {
        
        parent::__construct($element);

        $this->post_id = $post_id;

        if($this->post_id === 0 && get_the_ID() > 0)
            $this->post_id = get_the_ID();
        
        $this->room= get_room($this->post_id,FALSE);
        
        $this->markup  = $this->generate_markup();
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        $html = $this->get_room_facilities();
        
        return $html;
    }

    /**
     * Returns the room title markup
     * @return [type] [description]
     */
    function get_room_facilities(){

       /* if($this->post_id === 0)
            return '';

        $facilities = wp_get_post_terms($this->post_id, 'impruw_room_facility');

        $html = sprintf('<ul class="%s">', $this->get_classes());

        if(is_array($facilities)){

            foreach ($facilities as $facility) {
                $html .= sprintf('<li><a href="%s">%s</a></li>', 'javascript:void(0)', $facility->name);
            }
            
        }

        $html .= '</ul>';

        return $html;
            */
        $template = "<div class='room-facilities-container'>
                        <div class='room-facilities-title'>
                                <h5>Room Features</h5>
                                <h4>Standard Book</h5>
                        </div>
                        <ul class='facilities clearfix'>
                                <li class='roomfacilities'>{{facilities}}</li>";
        
        $data = $this->room['facilities'] ;
        
        global $me;
        
        $temp = 0;
        
        $html = ""; 
        
        foreach ($data as $key => $value) {
           if($temp != 0){
              $template_inner = "<li class='roomfacilities'>{{facilities}}</li>";
              $data_new = array('facilities' => $value);
              $html .= $me->render($template_inner,$data_new);
           }
             else{
                  $data_new = array('facilities' => $value);
                  $temp = 1;
                  $html .= $me->render($template,$data_new);              
                
             }
        }
        $html .= '</ul></div>';
        
        return $html;

        
    }

}
