<?php
/**
 * This class is responsible for all actions/functions related to 
 * Room description Element
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

class RoomDescription extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'roomdescription';

    
    /**
     * The config to create a row element
     * @param array $element
     */
    function __construct($element, $post_id = 0) {
        
        parent::__construct($element);

        $this->post_id = $post_id;

        if($this->post_id === 0 && get_the_ID() > 0)
            $this->post_id = get_the_ID();
        
        $this->room = get_room($this->post_id);
        
        $this->markup  = $this->generate_markup();
        
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        $html = $this->get_room_description();

        return $html;
    }

    /**
     * Returns the room description markup
     * @return [type] [description]
     */
    function get_room_description(){

      /*  if($this->post_id === 0)
            return '';

        $post = get_post($this->post_id);

        $content = $post->post_content;

        return $content;
       */
           $template = '<div class="room-description-container clearfix">
                            <div class="room-description">
                                    <div class="room-description-desc">{{post_content}}</div>
                            </div>
			</div>';
        
        
        $data = array();
        
        $data['post_content'] = $this->room['post_content'];
        
        global $me;

        return $me->render($template, $data);
    }

}
