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
    var $type       = 'roomtariff';

    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($config, $post_id = 0) {
        
        parent::__construct($config);

        $this->post_id = $post_id;

        if($this->post_id === 0 && get_the_ID() > 0)
            $this->post_id = get_the_ID();

        if(isset($config['dataSource'])){
            $this->data  = $config['dataSource'];
        }

        $this->markup  = $this->generate_markup();
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        $html = '';

        switch ($this->data) {
            case 'min':
                $html = $this->get_room_min_tariff();
                break;
            default:
                $html = $this->get_room_tariff();
                break;
        }
        
        
        return $html;
    }

    /**
     * Returns the room title markup
     * @return [type] [description]
     */
    function get_room_tariff(){
        
        ob_start(); ?>

        <div class="tariff">
            <dl>
                <dt>Economy Plan</dt>
                <dd>from kr <strong>210</strong> /night</dd>
                <dt>Regular Plan</dt>
                <dd>from kr <strong>280</strong> /night</dd>
                <dt>Deluxe Plan</dt>
                <dd>from kr <strong>350</strong> /night</dd>
            </dl>
        </div>
        <?php

        $html = ob_get_clean();

        return $html;
    }

    /**
     * Returns the room title markup
     * @return [type] [description]
     */
    function get_room_min_tariff(){
        
        ob_start(); ?>

        <div class="tariff">
            Starts from kr <strong>210</strong> /night
        </div>
        <?php

        $html = ob_get_clean();

        return $html;
    }

}
