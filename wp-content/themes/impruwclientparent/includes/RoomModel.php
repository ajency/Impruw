<?php

/**
 *  This class represents room.
 *  All of the functionality related to room is maintained in this class.
 *  Class contains functions for geting room data.  
 *   
 */
class RoomModel {

	/**
	 *  The room ID
	 */
	var $room_id;

	 

	/**
	 * Constructor for the class
	 * @param $room_id INT - The room ID to create the instance for
	 * @return void
	 */
	function __construct($room){
	
		if(is_object($room))
			$this->room = $room;
		else		
			$this->room = get_post($room); 
		
	}
	
	 
	
	/**
	 * 
	 * Enter description here ...
	 * @param unknown_type $property
	 */
	function get($property){
		
		if(isset($this->room->$property))
			return $this->room->$property;
			
		return '';	
	}
	
	
	function get_all_roomdata(){
		  
		$daterange_tariff = $this->get_room_tariffs(2);
		
		$rooom_data = array('roomType'			=> $this->get('post_title'),
							'roomShortDesc'		=> $this->get('post_excerpt'),
							'roomDesc'			=> $this->get('post_content'),
							'inventory'			=> get_post_meta($this->get('ID'),'inventory',true),
							'id'				=> (int) $this->get('ID'),
							'checkintime'		=> get_option('checkin-time'),
							'checkinformat'		=> get_option('checkin-format'),
							'daterangetariff' 	=> $daterange_tariff
						);
												
		return $rooom_data; 				
	
	}
	
	
function get_room_tariffs($LIMIT=1){
	
	global $wpdb ; 
	
	$plans = maybe_unserialize(get_option('plans'));
	
	$plan_tariff_array = maybe_unserialize(get_post_meta($this->room->ID, 'room-plantariff',true))	;
	
	$plan_tariff = implode(',',$plan_tariff_array);
		 
	  $qry_tariff = "SELECT b.from_date as from_date, b.to_date as to_date, a.plan_id as plan_id, a.tarriff as tariff 
							FROM {$wpdb->prefix}datetarriff a 
							LEFT JOIN 	{$wpdb->prefix}daterange  b 
							on a.daterange_id = b.id  
							WHERE a.id in(".$plan_tariff.") 
							LIMIT 0,".$LIMIT."
						";
	 
	  /* $qry_tariff =  $wpdb->prepare("SELECT b.from_date as from_date, b.to_date as to_date, a.plan_id as plan_id, a.tarriff as tariff 
							FROM {$wpdb->prefix}datetarriff a 
							LEFT JOIN 	{$wpdb->prefix}daterange  b 
							on a.daterange_id = b.id  
							WHERE a.id in(%s) 
							LIMIT 0,%d",$plan_tariff,$LIMIT);*/
	  
	 
 
	$daterange_tariff = array();
		
	$qry_result = $wpdb->get_results($qry_tariff);
	
	if($qry_result){
	 	foreach($qry_result as  $plan__tariff ){

	 				$tariff = maybe_unserialize($plan__tariff->tariff);
					$weekday_tariff = $tariff['weekday']['tariff'] ;
					$weekend_tariff = $tariff['weekend']['tariff'];
					
	 				foreach($plans as $plan){
	 					if($plan['id']==$plan__tariff->plan_id)
	 						$plan_name = $plan['label'];
	 				}
	 		
			 		$daterange_tariff[] = array(
			 									'fromDate'		=> date('d/m/Y',strtotime($plan__tariff->from_date)),
			 									'toDate'		=> date('d/m/Y',strtotime($plan__tariff->to_date)),
			 									'planId'		=> $plan__tariff->plan_id,
			 									'weekdayTariff' => $weekday_tariff,
			 									'weekEndTariff' => $weekend_tariff,
			 									'planName'		=> ucwords($plan_name)
			 							);
	 		
	 	}
	 	
	 }
	 return($daterange_tariff);	
	 
	  	
	 
}	 
	
	/*function array_keynames_to_json($data_array){
		if(is_array($data_array)){
				foreach($data_array as $data_key=>$data_value ){
					$new_key = 
					$new_data_array[] = $data_value;
				}
		}
		
	}*/
	
	

	/**
	 * Function to get the room data
	 * uses other functions of the class to get the required data
	 * @return array The room data
	 */
	function get_room_data(){
 
		//get no of rooms
		$room_data = array();		 
	 	
	 	return($room_data);
	}
	
	/**
	 * 
	 * 
	 * @param unknown_type $roomdata
	 */
	function get_additional_data($roomdata){
		
	 $room_data ['inventory'] = get_post_meta($roomdata,'inventory',true);	
	 return $room_data ;

	 
	}
	
	
	/**
	 * 
	 *  
	 * @param unknown_type $room_id
	 */
	function delete_room($room_id){
		
		
	}
	
	
	
	 
	
	
}