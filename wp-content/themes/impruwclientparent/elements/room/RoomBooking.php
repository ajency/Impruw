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
class RoomBooking extends Element {

    /**
     * The default type property for element
     * @var String 
     */
    var $type = 'roombooking';

    /**
     * The config to create a row element
     * @param array $element
     */
    function __construct($element, $post_id = 0) {

        parent::__construct($element);

        /* $this->post_id = $post_id;

          if ($this->post_id === 0 && get_the_ID() > 0)
          $this->post_id = get_the_ID();

          $this->room = get_room($this->post_id); */

        $this->markup = $this->generate_markup();
    }

    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */ 
    function generate_markup() {
     $html = ' 
         <script src="http://localhost/impruw/childsite/wp-content\themes\impruwclientparent\dashboard\lib\jquery.ui.min.js"></script>
            <h4 class="aj-imp-sub-head scroll-ref">Room Booking</h4>
            <div class="room-booking" id="room-booking-region">
                <div class="row room-booking-container">
                    <div class="col-md-8">
                        <div class="room-booking-calender" id="calendar-region">
                            <h4>
                                 <span class="glyphicon glyphicon-calendar"></span>
                                 Monthly Calendar <span class="excerpt">Donec vulputate nibh et 
                                 odio vehicula, id porttitor quam malesuada</span>
                            </h4> 
                            <div id="room-booking-calendar"></div>
                            <br>
                            <br>
                            <br>
                            <ul class="list-inline daterange-legends">
                                <li><span class="">&nbsp;</span>
                                </li>
                                <li><span class="">&nbsp;</span>
                                </li>
                                <li><span class="">&nbsp;</span>
                                </li>
                                <li><span class="">&nbsp;</span>
                                </li>
                                <li><span class="">&nbsp;</span>
                                </li>
                                <li><span class="">&nbsp;</span>
                                </li>
                                <li><span class="">&nbsp;</span>
                                </li>
                                <li><span class="">&nbsp;</span>
                                </li>
                                <li><span class="">&nbsp;</span>
                                </li>
                                <li><span class="">&nbsp;</span>
                                </li>
                                <li><span class="">&nbsp;</span>
                                </li>
                                <li><span class="">&nbsp;</span>
                                </li>
                                <li><span class="">&nbsp;</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-4 room-booking-data" id="plans-details-region">
                        <div class="date-range">
                            You have selected
                            <b>18 Jan to 16 Jan </b>
                        </div>
                        <div class="room-booking-plan">
                            <h5>Plan 1 </h5>
                            <p>Room. Lorem Ipsum is simply dummy text of the printing
                            and typesetting industry.</p>

                            <div class="booking-detail">
                                Max Adults:
                                <span>02</span>
                            </div>
                            <div class="booking-detail">
                                Max Children:
                                <span>  02</span>
                            </div>
                            <div class="clearfix"></div>
                            <h6>Additional Charge</h6>
                            <div class="booking-detail">
                                per extra Adult : $200

                            </div>
                            <div class="booking-detail">
                                per extra Child : $152

                            </div>
                            <div class="clearfix"></div>

                            <div class="booking-price">WEEKDAYS <b>$300</b>
                            </div>
                        </div>

                        <div class="room-booking-plan">
                            <h5>Plan 2 </h5>
                            <p>Room. Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry.</p>

                            <div class="booking-detail">
                                Max Adults:
                                <span>02</span>
                            </div>
                            <div class="booking-detail">
                                Max Children:
                                <span>  02</span>
                            </div>
                            <div class="clearfix"></div>
                            <h6>Additional Charge</h6>
                            <div class="booking-detail">
                                per extra Adult : $200

                            </div>
                            <div class="booking-detail">
                                per extra Child : $152

                            </div>
                            <div class="clearfix"></div>

                            <div class="booking-price">WEEKENDDAYS <b>$300</b>
                            </div>
                        </div>
                    </div>
                </div>
                         ';

     return $html;
    }

}
