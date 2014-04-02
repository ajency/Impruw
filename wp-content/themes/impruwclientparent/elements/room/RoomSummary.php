<?php
/**
 * This class is responsible for all actions/functions related to 
 * Room Summary Element
 *
 */
class RoomSummary extends Element {
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'roomsummary';

    
    /**
     * The config to create a row element
     * @param array $element
     */
    function __construct($element) {
        
        parent::__construct($element);
        
        $this->room_id= $element['room_id'];
        $this->room = get_room($element['room_id']);
        $this->style = $element['style'];
        $this->markup  = $this->generate_markup();
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        $html = $this->get_room_summary();
        
        return $html;
    }

    /**
     * Returns the room summary markup
     * @return [type] [description]
     */
    function get_room_summary(){  
       $data= $this->room;
       $data['link']= get_permalink( $this->room_id );
       $data['thumbnail_id']= wp_get_attachment_thumb_url(get_post_thumbnail_id( $this->room_id ));
    
       $template = '<div class="roomsummary">
                        <div class="room-img">
                             <img src="{{thumbnail_id}}" class="img-responsive">
                        </div>
                        <div class="room-title">{{post_title}}</div>
                        <div class="room-excerpt">{{post_content}}</div>
                        <div class="room-actions">
                                <div class="price">$99<small>/night</small></div>
                                <a href="{{link}}" class="btn btn-room">View Details</a>
                        </div>
                    </div>';
       
       global $me;
       
       return $me->render($template, $data);
    }
}
