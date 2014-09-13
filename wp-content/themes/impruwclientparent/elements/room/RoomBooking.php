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
    function __construct( $element, $post_id = 0 ) {

        parent::__construct( $element );

        if ( isset($_GET[ 'preview' ]) && $_GET[ 'preview' ] === "true" ) {

            $this->markup = $this->generate_preview_markup();
        } else {
            $this->markup = $this->generate_markup();
        }


    }

    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup() {
        $html = '
         <script src="' . site_url() . '/wp-content/themes/impruwclientparent/dashboard/lib/jquery.ui.min.js"></script>
          <script src="' . site_url() . '/wp-content/themes/impruwclientparent/dashboard/lib/moment.min.js"></script>
              <script src="' . site_url() . '/wp-content/themes/impruwclientparent/dashboard/lib/moment-range.js"></script>
              
            <h4 class="booking-title">'.__("Booking &amp; Availability","impruwclientparent").'</h4>
            <div class="room-booking front" id="room-booking-region">

                <div class="row room-booking-container">
                    
                     <div class="col-md-8">
                            
                            <div class="room-booking-calender" id="calendar-region">
                                <h4>
                                     <span class="glyphicon glyphicon-calendar"></span>
                                     '.__("Monthly Calendar","impruwclientparent").' <span class="excerpt">'.__("Choose the dates you want to check availability for.","impruwclientparent").'</span>
                                </h4> 
                                <div id="room-booking-calendar"></div>
                                <br>
                                <br>
                                <br>
                                <ul class="list-inline daterange-legends"> ';

        $html .= $this->get_daterange_legends();

        $html .= '       </ul>
                            </div>
                            
                      </div>
                    
                      <div class="col-md-4 room-booking-data" id="plans-details-region">  
                            <div class="date-range">
                                <span class="display-label"></span>
                                <b> </b></br>
                                <span class="label label-success status"></span>
                            </div>
                            
                            <div id="myCarousel" class="carousel slide vertical">
                                
                                   <div class="carousel-inner">
                                     
                                        <div class="item active">
                                            
                                            <div class="room-booking-plan">
                                               
                                       
                                           </div> <!-- room-booking-plan end -->
                                     
                                          </div> <!-- carousel item  end -->
                                          
                                    </div> <!-- carousel inner end -->
                                    
                                    <a class="carousel-control left" href="#myCarousel" 
                                    data-slide="prev">‹</a>
                                    <a class="carousel-control right" href="#myCarousel" 
                                    data-slide="next">›</a>
                                    
                               </div> <!-- carousel end -->
                         
                          </div> <!-- plans-details-region end -->
                          
                    </div> <!-- room-booking-container end -->
                    
                </div> <!-- room-booking-region end  -->';

        return $html;
    }

    // slug the date range name
    function slugify( $str ) {
        $str = strtolower( trim( $str ) );
        $str = preg_replace( '/[^a-z0-9-]/', '-', $str );
        $str = preg_replace( '/-+/', "-", $str );
        return $str;
    }

    function get_daterange_legends() {
        global $me;

        $html = '';

        $daterange = get_date_range();


        foreach ( $daterange as $key => $value ) {

            $data = array(
                'daterange_name' => $daterange[ $key ][ 'daterange_name' ],
                'daterange_class' => $this->slugify( $daterange[ $key ][ 'daterange_name' ] )
            );

            $template = ' <li>
                            <span class="{{daterange_class}}">&nbsp;</span>
                            {{daterange_name}}
                         </li>';

            $html .= $me->render( $template, $data );
        }

        return $html;
    }

    function generate_preview_markup() {

        $currency = get_option( 'currency', 'NOK' );

        $html = '
         <script src="' . site_url() . '/wp-content/themes/impruwclientparent/dashboard/lib/jquery.ui.min.js"></script>
          <script src="' . site_url() . '/wp-content/themes/impruwclientparent/dashboard/lib/moment.min.js"></script>
              <script src="' . site_url() . '/wp-content/themes/impruwclientparent/dashboard/lib/moment-range.js"></script>

            <h4 class="booking-title">'.__("Booking &amp; Availability","impruwclientparent").'</h4>
            <div class="room-booking front" id="room-booking-region">

                <div class="row room-booking-container">

                     <div class="col-md-8">

                            <div class="room-booking-calender" id="calendar-region">
                                <h4>
                                     <span class="glyphicon glyphicon-calendar"></span>
                                     '.__("Monthly Calendar","impruwclientparent").' <span class="excerpt">'.__("Choose the dates you want to check availability for.","impruwclientparent").'</span>
                                </h4>
                                <div id="room-booking-calendar"></div>
                                <br>
                                <br>
                                <br>
                                <ul class="list-inline daterange-legends"> ';

        $html .= $this->get_daterange_legends();

        $html .= '       </ul>
                            </div>

                      </div>

                      <div class="col-md-4 room-booking-data" id="plans-details-region">
                            <div class="date-range">
                                <span class="display-label"></span>
                                <b> </b></br>
                                <span class="label label-success status"></span>
                            </div>

                            <div class="room-booking-plan">
                                    <h5>'.__("Plan 1","impruwclientparent").'</h5>
                                    <p>'.__("Add plans to the room by going to Rooms from Dashboard and add plans to your room there. You will be able to see the added plans on the live site.","impruwclientparent").'</p>

                                    <div class="booking-detail">
                                        '.__("Max Adults:","impruwclientparent").'
                                            <span>02</span>
                                    </div>
                                    <div class="booking-detail">
                                        '.__("Max Children:","impruwclientparent").'
                                        <span>02</span>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="plan-bg">
                                    <h6>'.__("Additional Charge","impruwclientparent").'</h6>
                                    <div class="booking-detail">
                                        '.__("per extra Adult :","impruwclientparent").' '.$currency.'200

                                    </div>
                                    <div class="booking-detail">
                                         '.__("per extra Child :","impruwclientparent").' '.$currency.'152

                                    </div>
                                    <div class="clearfix"></div>

                                    <div class="booking-price">'.__("WEEKDAYS","impruwclientparent").' <b>'.$currency.'300</b></div>
                                     </div>
                                </div>

                          </div> <!-- plans-details-region end -->

                    </div> <!-- room-booking-container end -->

                </div> <!-- room-booking-region end  -->';

        return $html;

    }
}
