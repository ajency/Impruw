<?php

/**
 * This class is responsible for all actions/functions related to
 * Room Summary Element
 *
 */
include_once PARENTTHEMEPATH . 'modules/rooms/functions.php';

class RoomSummary extends Element {

    /**
     * The default type property for element
     * @var String
     */
    var $type = 'roomsummary';

    /**
     * The config to create a row element
     *
     * @param array $element
     */
    function __construct( $element ) {

        parent::__construct( $element );

        $this->room_id = isset( $element[ 'room_id' ] ) ? $element[ 'room_id' ] : 0;

        if ( is_singular( 'impruw_room' ) ) {
            $this->room_id = get_the_ID();
            $this->markup  = $this->generate_single_room_summary();
            return;
        }

        if ( (int)$this->room_id === 0 || get_post( $this->room_id ) == null ) {
            $this->markup = $this->generate_dummy_markup();
            return;
        }

        $thumbnail_id = get_post_thumbnail_id($this->room_id );
        
        $this->image_id = $thumbnail_id > 0 ? $thumbnail_id : 0;
        
        $this->room   = get_room( $this->room_id , FALSE);
        $this->style  = $element[ 'style' ];
        $this->markup = $this->generate_markup();
        
    }

    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup() {

        $html = $this->get_room_summary();

        return $html;
    }

    function generate_single_room_summary() {

        $this->room = get_room( $this->room_id , FALSE);

        $template   = '<div class="room-summary-container ' . $this->margins . ' ">
                        <div class="room-summary-title">
                            <h4>Room Summary</h4>
                        </div>
                        <div class="room-summary">
                            <div class="room-summary-item">
                                <span class="key">No. of Rooms</span>
                                <span class="value">{{no_of_rooms}}</span>
                            </div>
                            <div class="room-summary-item">
                                <span class="key">Check-in</span>
                                <span class="value">{{check-in}}</span>
                            </div>
                            <div class="room-summary-item">
                                <span class="key">Check-out</span>
                                <span class="value">{{check-out}}</span>
                            </div>
                           <div class="room-summary-item">
                                <span class="key">Additional policy</span>
                                <span class="value"> {{additional-policy}}</span>
                            </div>
                        </div>
                    </div>';

        global $me;

        return $me->render( $template, $this->room );
    }

    /**
     * Returns the room summary markup
     * @return [type] [description]
     */
    function get_room_summary() {

        $data           = $this->room;
        $link_room_id = icl_object_id($this->room_id, 'impruw_room', true,ICL_LANGUAGE_CODE);
        $data[ 'link' ] = get_permalink( $link_room_id );
        $path = wp_get_attachment_image_src($this->image_id, 'medium');
        if($path !== false) {
            $data[ 'image_url' ] = $path[0];
        }

        if ( empty( $data[ 'image_url' ] ) ) {
            $template = '<div class="roomsummary ' . $this->margins . ' ">
                            <div class="room-img">
                                 <div class="image-placeholder">
                                    <span class="glyphicon glyphicon-picture"></span>
                                 </div>
                            </div>
                            <div class="room-title"><a href="{{link}}">{{post_title}}</a></div>
                            <div class="room-excerpt">{{post_content}}</div>
                            <div class="room-actions">
                                    <div class="price"><small>Number of Rooms:</small> {{no_of_rooms}}</div>
                                    <a href="{{link}}" class="btn btn-room">View Details</a>
                            </div>
                        </div>';

        } else {
            $template = '<div class="roomsummary ' . $this->margins . ' ">
                            <div class="room-img">
                                 <a href="{{link}}"><img src="{{image_url}}" width="100%" class="img-responsive"></a>
                            </div>
                            <div class="room-title"><a href="{{link}}">{{post_title}}</a></div>
                            <div class="room-excerpt">{{post_content}}</div>
                            <div class="room-actions">
                                    <div class="price"><small>Number of Rooms:</small> {{no_of_rooms}}</div>
                                    <a href="{{link}}" class="btn btn-room">View Details</a>
                            </div>
                        </div>';
        }

        global $me;

        return $me->render( $template, $data );
    }

    function generate_dummy_markup() {

        $language_code = wpml_get_current_language();
        $english_content = 'choose a room to display from settings. your room description, image, number of rooms and link to the single room page will be displayed here. to make any changes to the room go to room from your dashboard.';
        $translated_content = impruw_wpml_get_string_translation($english_content, $language_code);

        $template = '<div class="roomsummary ' . $this->margins . ' "><div class="room-img">
                         <div class="image-placeholder"><span class="glyphicon glyphicon-picture"></span></div>
                    </div>
                    <div class="room-title">Your Room Title</div>
                    <div class="room-excerpt">' .$translated_content. '</div>
                    <div class="room-actions">
                            <div class="price"><small>Total:</small> 0 rooms</div>
                            <a href="#" class="btn btn-room">View Details</a>
                    </div></div>';
        global $me;

        return $me->render( $template, array() );
    }

}
