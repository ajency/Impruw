<?php

/**
 * This class is responsible for all actions/functions related to 
 * Room Title Element
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
class RoomTitle extends Element {

    /**
     * The default type property for element
     * @var String 
     */
    var $type = 'roomtitle';

    /**
     * The config to create a row element
     * @param array $element
     */
    function __construct($element, $post_id = 0) {

        parent::__construct($element);

        $this->post_id = $post_id;

        if ($this->post_id === 0 && get_the_ID() > 0)
            $this->post_id = get_the_ID();

        $this->room = get_room($this->post_id);

        $this->markup = $this->generate_markup();
    }

    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup() {

        $html = $this->get_room_title();

        return $html;
    }

    /**
     * Returns the room title markup
     * @return [type] [description]
     */
    function get_room_title() {

        $template = '<div class="room-title-container clearfix">
                            <div class="room-title">
                                    <h1>{{post_title}}</h1>
                                    <div class="room-title-desc">{{post_excerpt}}</div>
                            </div>
                            <div class="room-title-actions">
                                   <a href="#room-booking-region" class="btn btn-sm btn-book">Booking &amp; Availability</a>
                            </div>
                    </div>';


        $data = array();

        if ($this->room['post_title'] == '')
            
            $data['post_title'] = 'Room Title';
        
        else {
            $data['post_title'] = $this->room['post_title'];
        }
        
        global $me;

        return $me->render($template, $data);
    }

}
