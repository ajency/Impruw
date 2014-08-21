<?php

/**
 * This class is responsible for all actions/functions related to 
 * Room Tariff Element
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
class RoomTariff extends Element {

    /**
     * The default type property for element
     * @var String 
     */
    var $type = 'roomtariff';

    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($element, $post_id = 0) {

        parent::__construct($element);

        //$this->room_id = get_the_ID();
        $this->room_id = get_the_ID();

        $this->date_range = $this->get_date_range();

        $this->tariff = $this->get_tariff($this->room_id);

        $this->plans = $this->get_plans();

        $this->markup = $this->generate_markup();
    }

    function get_date_range() {
        global $wpdb;

        $table_name = $wpdb->prefix . 'daterange';

        $query = "SELECT * FROM $table_name ORDER BY from_date ASC";

        $date_ranges = $wpdb->get_results( $query, ARRAY_A );

        $date_range_array = array();
        $current_language = wpml_get_current_language();
        $default_language = wpml_get_default_language();

        foreach ($date_ranges as $date_range) {

        //unserialize plan_name and plan_description 
            $daterange_name_unserialized = maybe_unserialize( $date_range['daterange_name'] );

            if(is_array($daterange_name_unserialized)){
                $daterange_name = isset($daterange_name_unserialized[$current_language]) ? $daterange_name_unserialized[$current_language] : $daterange_name_unserialized[$default_language];
            }
            else{
                $daterange_name = $daterange_name_unserialized;
            }

            $date_range_array[ ] = array(
                'id' => $date_range['id'],
                'from_date' =>  $date_range['from_date'],
                'to_date' => $date_range['to_date'],
                'daterange_name' => $daterange_name,
                'daterange_colour' => $date_range['daterange_colour']
                );
        }

        return $date_range_array;
    }

    function get_tariff($room_id) {

        global $wpdb;

        $table_name = $wpdb->prefix . 'tariffs';

        $english_room_id = icl_object_id($room_id, 'impruw_room', true,'en');

        $query = "SELECT * FROM $table_name WHERE room_id = $english_room_id ";

        $tariff = $wpdb->get_results($query, ARRAY_A);

        return $tariff;
    }

    function get_plans() {
        global $wpdb;

        $table_name = $wpdb->prefix . 'plans';

        $query = "SELECT * FROM $table_name ORDER BY ID ASC";

        $plans = $wpdb->get_results($query, ARRAY_A);

        $current_language = wpml_get_current_language();
        $default_language = wpml_get_default_language();

        foreach ($plans as $plan) {
            //unserialize plan_name and plan_description 
            $plan_name_unserialized = maybe_unserialize( $plan['plan_name'] );
            $plan_desc_unserialized = maybe_unserialize( $plan['plan_description'] );

            if(is_array($plan_name_unserialized)){
                $plan_name = isset($plan_name_unserialized[$current_language]) ? $plan_name_unserialized[$current_language] : $plan_name_unserialized[$default_language];
            }
            else{
                $plan_name = $plan_name_unserialized;
            }

            if(is_array($plan_desc_unserialized)){
                $plan_description = isset($plan_desc_unserialized[$current_language]) ? $plan_desc_unserialized[$current_language] : $plan_desc_unserialized[$default_language];        
            }
            else{
                $plan_description = $plan_desc_unserialized;
            }


            $plan_array[ ] = array(
                'id' => $plan['id'],
                'plan_name' =>  $plan_name,
                'plan_description' => $plan_description
                );
        }

        return $plan_array;
    }

    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup() {

        $html = '<div id="room-tariff-region">
                    <div class="room-tariff-container">
                        <div class="room-tariff-title">
                            <h4>Room Price</h4>
                            <h5>View the prices for different dates here.</h5>
                        </div>
                        <div class="room-tariff-grid" id="room-tariff-grid">';

        $html .= $this->get_package_region();

        $html .= $this->get_tariff_region();

        $html .= '</div></div></div>';


        return $html;
    }

    function get_package_region() {

        global $me;

        $template = '<div id="packages-region">
                        <div class="tariff package-names clearfix">
                            <div class="packages">
                                <div class="package-blocks header clearfix">';
        $plans = $this->plans;

        foreach ($plans as $key => $value) {

            $data = array('plan_name' => $plans[$key]['plan_name'],
                'plan_description' => $plans[$key]['plan_description']);

            $html = '<div class="package-block-outer">
                        <div class="block clearfix"> 
                            <h6>{{plan_name}}</h6>
                            <div class="package-desc"> {{plan_description}} </div> 
                        </div>
                    </div>';

            $template .= $me->render($html, $data);
        }

        $template .= '</div></div></div></div>';

        return $template;
    }

    function get_tariff_region() {

        global $me;

        $date_range = $this->date_range;

        $template = '<div id="tariff-region">';

        foreach ($date_range as $key => $value) {

            $data = array('from_date' => date('d/M ', strtotime($date_range[$key]['from_date'])),
                'to_date' => date('d/M ', strtotime($date_range[$key]['to_date'])),
                'daterange_name' => $date_range[$key]['daterange_name']);

            $html = '<div class="tariff clearfix">
                        <div class="date-range">
                            <div class="range-name">{{daterange_name}}</div>
                            <div class ="from">From
                                <span class="date">{{from_date}} </span>        
                            </div>
                            <div class="to">To
                                <span class="date">{{to_date}} </span>
                            </div>
                        </div>
                        <div class="packages">';

            $html .= $this->get_plan_tariff($date_range[$key]['id']);

            $html .= '</div>
                    </div>';

            $template .= $me->render($html, $data);
        }

        $template .= '</div>';


        return $template;
    }

    function get_plan_tariff($date_range_id) {

        global $me;

        $plans = $this->plans;

        $currency = get_option( 'currency' );

        $html = '<div class="package-blocks clearfix">';

        foreach ($plans as $key2 => $value2) :

            $data = $this->check_tariff($plans[$key2]['id'], $date_range_id);

            if (!empty($data)) {
                
                $data['plan_name'] = $plans[$key2]['plan_name'];
                $data['plan_description'] = $plans[$key2]['plan_description'];
                
                $template = '<div class="package-block-outer" id="">
                    <div class="package-header"> 
                        <h6>{{plan_name}}</h6>
                        <div class="package-desc"> {{plan_description}} </div> 
                    </div>
                    <div class="block clearfix">

                    <div class="weekday">Weekdays
                    <span class="price">'.$currency.'&nbsp;{{wd_charge}}</span>
                    </div>

                    <div class="weekend">Weekends
                    <span class="price">'.$currency.'&nbsp;{{we_charge}}</span>
                    </div>

                    <div class="tariff-label clearfix">Extra Adult</div>

                    <div class="weekday">
                    <span class="price">'.$currency.'&nbsp;{{wd_extra_adult}}</span>
                    </div>

                    <div class="weekend">
                    <span class="price">'.$currency.'&nbsp;{{we_extra_adult}}</span>
                    </div>

                    <div class="tariff-label clearfix">Extra Child</div>

                    <div class="weekday">
                    <span class="price">'.$currency.'&nbsp;{{wd_extra_child}}</span>
                    </div>

                    <div class="weekend">
                    <span class="price">'.$currency.'&nbsp;{{we_extra_child}}</span>
                    </div>

                    </div>
                    </div>
                    ';

                $html .= $me->render($template, $data);
            } else {

                $html .= '<div class="package-block-outer" id="">'
                        . '<div class="package-header"><h6>' . $plans[$key2]['plan_name'] . '</h6>'
                        . '<div class="package-desc"> ' . $plans[$key2]['plan_description'] . '</div></div>'
                        . '<div class="block empty clearfix">'
                        . '<span class="no-data">'
                        . '<span class="glyphicon glyphicon-exclamation-sign"></span>'
                        . '</span>'
                        . '<div class="tariff-label clearfix">No Data Available</div>'
                        . '</div>'
                        . '</div> ';
            }


        endforeach;

        $html .= '</div>';

        return $html;
    }

    function check_tariff($plan_id, $daterange_id) {

        $tariff = $this->tariff;


        foreach ($tariff as $key => $value):
            if ($tariff[$key]['daterange_id'] == $daterange_id &&
                    $tariff[$key]['plan_id'] == $plan_id) {

                $weekday_key = array('wd_charge', 'wd_max_adults', 'wd_max_children',
                    'wd_extra_adult', 'wd_extra_child');

                $weekend_key = array('we_charge', 'we_max_adults', 'we_max_children',
                    'we_extra_adult', 'we_extra_child');

                $weekday_value = maybe_unserialize($tariff[$key]['weekday']);
                $weekend_value = maybe_unserialize($tariff[$key]['weekend']);

                $weekday = array_combine($weekday_key, $weekday_value);
                $weekend = array_combine($weekend_key, $weekend_value);

                $data = array_merge($weekday, $weekend);

                return $data;
            }
        endforeach;
    }

}
