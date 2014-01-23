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
	
	
	/**
	 * 
	 * Function to get min,max of weekday & weekend tariff for a room
	 * @param array $daterange_tariff   containing daterange-tariff data 
	 */
	function min_max_weekday_weekend_tariff($daterange_tariff=array()){
		
		$tariff = array('max_weekend'	=> '' ,
						'min_weekend'	=> '',
						'max_weekday'	=> '',
						'min_weekday'	=> ''
						);
						
		if(empty($daterange_tariff)){
			$daterange_tariff = $this->get_room_tariffs();
		}

		if(!empty($daterange_tariff)){
			$tariff['max_weekend'] = max(array_col($daterange_tariff, 'weekEndTariff'));
			$tariff['min_weekend'] = min(array_col($daterange_tariff, 'weekEndTariff'));
			$tariff['max_weekday'] = max(array_col($daterange_tariff, 'weekdayTariff'));
			$tariff['min_weekday'] = min(array_col($daterange_tariff, 'weekdayTariff'));
			
		}
			
		 	
		return $tariff;  
		  
	}

	/**
	 * function to get all room data 
	 * 
	 * @param array $room_retrival_data   $room_retrival_data['noOFplansreqd'] = 2 
	 * 		  to get  limited no of daterange tariff for ex. on room list page
	 * returns array of room details
	 */
	function get_all_roomdata($room_retrival_data=array()){

	 	
		if(isset($room_retrival_data['noOFplansreqd'])){
			 //to get  limited no of daterange tariff for ex. on room list
			$daterange_tariff = $this->get_room_tariffs($room_retrival_data['noOFplansreqd']);
			
		}
		else{
			//returns all daterange tariff plans for a room
			$daterange_tariff = $this->get_room_tariffs();
		}
		
		$min_max_tariff = $this->min_max_weekday_weekend_tariff($daterange_tariff);
		
		
		//Get room attachment id, url
		$attachment_data = array();
		$room_attachments =  explode(',',$this->get_room_meta('room-attachments'));
		if(is_array($room_attachments)){
			foreach($room_attachments as $attachment){
				if($attachment!=''){
					$attachment_data[] = array('attach_id'	=> $attachment,
										  'attach_url'	=>  wp_get_attachment_thumb_url( $attachment )		
										);
				}
				
			}
			
		}
	
	
		
		$rooom_data = array('roomType'			=> $this->get('post_title'),
							'roomShortDesc'		=> $this->get('post_excerpt'),
							'roomDesc'			=> $this->get('post_content'),
							'inventory'			=> get_post_meta($this->get('ID'),'inventory',true),
							'id'				=> (int) $this->get('ID'),
							'checkintime'		=> get_option('checkin-time'),
							'checkinformat'		=> get_option('checkin-format'),
							'daterangetariff' 	=> $daterange_tariff,
							'facilities'		=> $this->get_room_facilities(),
							'roomAttachments'	=> $attachment_data,
							'roomFeaturedImg'	=> $this->get_featured_img(),
							'minmaxTariff'		=> $min_max_tariff
						);
												
		return $rooom_data; 				
	
	}
	
/**
 * Function to get the facilities selected for a room
 * 
 */
function get_room_facilities(){
	$selected_room_facilities = wp_get_post_terms($this->room->ID, 'impruw_room_facility', array("fields" => "names"));
	 return $selected_room_facilities;
}	



/**
 * Function to get featured image id and thumbnail url
 *  returns array containing featured image thumbnail id and url
 */
 
function get_featured_img(){
	 
	$featured_img_id = get_post_thumbnail_id($this->room->ID, 'thumbnail');
	$image_url = wp_get_attachment_image_src( $featured_img_id, 'thumbnail');
	 
	$featured_image = array('id' 	=> $featured_img_id,
							'url'	=> $image_url[0]
					 );
	 
	 return $featured_image;
	
}

/**
 * Function to get all daterange for room,  the tariff and the plan
 * Enter description here ...
 * @param unknown_type $LIMIT
 */
function get_room_tariffs($LIMIT=''){
	
	global $wpdb ; 
	
	$plans = maybe_unserialize(get_option('plans'));
	
	$plan_tariff_array = maybe_unserialize(get_post_meta($this->room->ID, 'room-plantariff',true))	;
	
	$plan_tariff = implode(',',$plan_tariff_array);
		 
	  $qry_tariff = "SELECT a.daterange_id as daterange_id, a.id as dateplan_tariffid, b.from_date as from_date, b.to_date as to_date, a.plan_id as plan_id, a.tarriff as tariff 
							FROM {$wpdb->prefix}datetarriff a 
							LEFT JOIN 	{$wpdb->prefix}daterange  b 
							on a.daterange_id = b.id  
							WHERE a.id in(".$plan_tariff.")";
	  if($LIMIT!='') 
	  	$qry_tariff.= "		LIMIT 0,".$LIMIT;
						
	 
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
	 		
			 		$daterange_tariff[] = array('daterangePlanTariffId' => $plan__tariff->dateplan_tariffid,
			 									'daterange_id'			=> $plan__tariff->daterange_id,
			 									'planId'				=> $plan__tariff->plan_id,
			 									'fromDate'				=> date('d/m/Y',strtotime($plan__tariff->from_date)),
			 									'toDate'				=> date('d/m/Y',strtotime($plan__tariff->to_date)),
			 									'weekdayTariff' 		=> $weekday_tariff,
			 									'weekEndTariff' 		=> $weekend_tariff,
			 									'planName'				=> ucwords($plan_name) 
			 									
			 							);
	 		
	 	}
	 	
	 }
	 return($daterange_tariff);	
	 
	  	
	 
}	 


/**
 * 'room-attachments'
 * Enter description here ...
 * @param unknown_type $room_metakey
 */
function get_room_meta($room_metakey){
		
	$room_meta_value = maybe_unserialize(get_post_meta($this->room->ID,$room_metakey,true));
	if($room_meta_value===false)
		return '';
	else 
		return $room_meta_value;
	
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
	 * Function to delete room
	 *  
	 * @param unknown_type $room_id
	 */
	function delete_room(){
		global $wpdb;
		
		$room_id = $this->room->ID;
		//get daterange-plan-tariff id 
		$room_tariff_arr = maybe_unserialize(get_post_meta($room_id,'room-plantariff',true));
		$room_tariff = implode(',',$room_tariff_arr);
		
		$qry_del_room_tariff = "DELETE FROM {$wpdb->prefix}datetarriff where id in (".$room_tariff.")";
		
		$result_del_tariff = $wpdb->query($qry_del_room_tariff);
		
		if($qry_del_room_tariff){
			
			$result_del = wp_delete_post($room_id);

			return $result_del;
			
		}
		else 
			return false;
		
		//delete tariff  for the room 
 		
		
	}
	
	
	
	 
	
	
}