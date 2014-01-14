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
		
		
		$rooom_data = array('roomType'		=> $this->get('post_title'),
							'roomShortDesc'	=> $this->get('post_excerpt'),
							'roomDesc'		=> $this->get('post_content'),
							'inventory'		=> get_post_meta($this->get('ID'),'inventory',true),
							'id'			=> (int) $this->get('ID'),
							'checkintime'	=> get_option('checkin-time'),
							'checkinformat'	=> get_option('checkin-format') 	
						);
												
		return $rooom_data; 				
	
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
	
	
	function get_additional_data($roomdata){
		
	 $room_data ['inventory'] = get_post_meta($roomdata,'inventory',true);	
	 return $room_data ;

	 
	}
	 
	
	
}