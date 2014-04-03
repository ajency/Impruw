<?php
/**
 * This class is responsible for all actions/functions related to 
 * Room Summary Element
 *
 */
include_once PARENTTHEMEPATH.'modules/rooms/functions.php';

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
        
        $this->room_id = isset($element['room_id']) ? $element['room_id'] : 0;
        
        if(is_singular('impruw_room')){
        	$this->room_id = get_the_ID();
        	$this->markup = $this->generate_single_room_summary();
        	return;
        }
        
        if($this->room_id === 0 || get_post($this->room_id) == null){
       		$this->markup  = $this->generate_dummy_markup();
       		return;
       	}
       		
        
        $this->room = get_room($this->room_id);
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
    
    function generate_single_room_summary(){
    	$this->room = get_room($this->room_id);
    	
    	$template = '<div class="room-summary-container">
                        <div class="room-summary-title">
                            <h4>Room Summary</h4>
                        </div>
                        <div class="room-summary">
                            <div class="room-summary-item">
                                <span class="key">No. of Rooms</span>
                                <span class="value">3</span>
                            </div>
                            <div class="room-summary-item">
                                <span class="key">Guests</span>
                                <span class="value">2</span>
                            </div>
                            <div class="room-summary-item">
                                <span class="key">Room Type</span>
                                <span class="value">Double Deluxe Room</span>
                            </div>
                            <div class="room-summary-item">
                                <span class="key">Check-in</span>
                                <span class="value">10.00 AM</span>
                            </div>
                            <div class="room-summary-item">
                                <span class="key">Check-out</span>
                                <span class="value">1.00 PM</span>
                            </div>
                            <div class="room-summary-desc">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.
                                <button class="btn btn-sm btn-book">Booking &amp; Availability</button>
                            </div>
                        </div>
                    </div>';
    	
    	global $me;
    	
    	return $me->render($template, $this->room);
    }

    /**
     * Returns the room summary markup
     * @return [type] [description]
     */
    function get_room_summary(){  
       $data= $this->room;
       $data['link']= get_permalink( $this->room_id );
       if(empty($data['thumbnail_url']))
           $data['thumbnail_url'] = 'http://localhost/impruw/childsite/wp-content/uploads/'
                                    .'sites/81/2014/03/5-yama-zbrush-model-by-jemark-150x150.jpg';
           

       $template = '<div class="roomsummary"><div class="room-img">
                         <img src="{{thumbnail_url}}" class="img-responsive">
                    </div>
                    <div class="room-title">{{post_title}}</div>
                    <div class="room-excerpt">{{post_content}}</div>
                    <div class="room-actions">
                            <div class="price">$99<small>/night</small></div>
                            <a href="{{link}}" class="btn btn-room">View Details</a>
                    </div></div>';
       
       global $me;
       
       return $me->render($template, $data);
    }
    
    function generate_dummy_markup(){
    	$template = '<div class="roomsummary"><div class="room-img">
                         <img src="http://classicgreen2.unpruwen.com/wp-content/themes/impruwclientparent/images/dummy/2.jpg" class="img-responsive">
                    </div>
                    <div class="room-title">Room Title</div>
                    <div class="room-excerpt">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s</div>
                    <div class="room-actions">
                            <div class="price">$99<small>/night</small></div>
                            <a href="#" class="btn btn-room">View Details</a>
                    </div></div>';
    	global $me;
    	 
    	return $me->render($template, array());
    }
}
