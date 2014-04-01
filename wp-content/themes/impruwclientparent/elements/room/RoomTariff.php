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
    function __construct($element, $post_id = 0) {
        
        parent::__construct($element);
        
        //$this->room_id = get_the_ID();
        $this->room_id = 2;
        
        $this->date_range = $this->get_date_range();
        
        $this->tariff = $this->get_tariff($this->room_id);

        //$this->post_id = $post_id;
        
        
        /*if($this->post_id === 0 && get_the_ID() > 0)
            $this->post_id = get_the_ID();

        if(isset($element['dataSource'])){
            $this->data  = $element['dataSource'];
        }*/

        $this->markup  = $this->generate_markup();
    }
    
    function get_date_range(){
        global $wpdb;
        
        $table_name =  $wpdb->prefix.'daterange';
        
        $query = "SELECT * FROM $table_name ORDER BY FROM_DATE ASC";
        
        $date_range =$wpdb->get_results($query,ARRAY_A); 
        
        return $date_range;
    }
    
    function get_tariff($room_id) {
       
        global $wpdb;
        
        $table_name =  $wpdb->prefix.'tariff';
        
        $query = "SELECT * FROM $table_name WHERE ROOM_ID = $room_id ";
        
        $tariff =$wpdb->get_results($query,ARRAY_A); 
        
        return $tariff;
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        global  $me;
        
        $template ="";
        
        $html = '<div class="room-tariff-container">
                   <div class="room-tariff-grid" id="room-tariff-grid">
                        <div id="package-region"></div>
                        <div id="tariff-region">';
        
       // echo '<pre>';
       // print_r($this->date_range);
       $date_range= $this->date_range;
        
       // echo '<pre>';
       // print_r($date_range);
        
        foreach ($date_range as $key => $value) {
            
            $data = array('from_date' => $date_range[$key]['from_date'],
                           'to_date' => $date_range[$key]['to_date']  );
            
            $template = '<div class="">
                            <div class="date-range">
                                 <div class ="from">From
                                     <span class="date">{{from_date}} </span>        
                                 </div>
                                 <div class="to">To
                                     <span class="date">{{to_date}} </span>
                                 </div>
                             </div>
                             <div class="packages"></div>
                          </div>';
            
            $html .= $me->render($template,$data);
            
        }
      
        
        $html .=  '     </div>
                      </div>
                   </div>';
        
       
        return $html;

        
        
       /* $html = '';

        switch ($this->data) {
            case 'min':
                $html = $this->get_room_min_tariff();
                break;
            default:
                $html = $this->get_room_tariff();
                break;
        }
        
        
        return $html;*/
    }

    /**
     * Returns the room title markup
     * @return [type] [description]
     */
    function get_room_tariff(){
    	//require_once PARENTTHEMEPATH . 'includes/RoomModel.php';
    	 
    	
    	$room_obj = new RoomModel(get_the_ID()); 
    	
    	$daterangeplan_options = array(	'current'	   => true   //set true if daterange plans for current date is required
    									);
	 	$daterange_tariffs = $room_obj->get_room_tariffs($daterangeplan_options);
        
        ob_start();
         ?>

        <div class="tariff">
            <dl>
            	<?php
					foreach($daterange_tariffs as $daterange_tariffs){
						?><dt><?php echo $daterange_tariffs['planName']; ?></dt>
						<dd>from kr <strong><?php echo min($daterange_tariffs['weekdayTariff'],$daterange_tariffs['weekEndTariff']); ?></strong> /night</dd>
						
				<?php 	}
            	
            	?>
                <!-- <dt>Economy Plan</dt>
                <dd>from kr <strong>210</strong> /night</dd>
                <dt>Regular Plan</dt>
                <dd>from kr <strong>280</strong> /night</dd>
                <dt>Deluxe Plan</dt>
                <dd>from kr <strong>350</strong> /night</dd> -->
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
