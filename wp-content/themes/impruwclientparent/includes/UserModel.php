<?php

/**
 *  This class represents the USer.
 *  All of the funtinality related to single User is maintained in this class.
 *  Class contains functions for geting user profile data. saving profile data
 *  and much more
 */
class ImpruwUser extends WP_User{

	/**
	 * Constructor for the class
	 * @param $site_id INT - The site ID to create the instance for
	 * @return void
	 */
	function __construct($user_id){

		 parent::__construct($user_id);

	}

	/**
	 * Gets the users basic info. Usually loaded on all pages.
	 * @return array User's basic info
	 */
	function get_user_basic_info(){

		return 	array(
					'id' 			=> $this->data->ID,
					'userLogin'		=> $this->data->user_login,
					'userEmail'		=> $this->data->user_email,
					'displayName'	=> $this->data->display_name,
					'roles'			=> $this->roles,
					'capabilities'	=> $this->allcaps
				);
	}
	
	
	/**
	 * 
	 * @param array containing new user details to be updated $user_data
	 * @return boolean
	 */
	function save_user_profile($user_data){
		
		 
		$new_user_data = array ( 'ID' => $user_data['ID'] ,
				'user_email' => $user_data['general']['user_email'],
				'display_name'=>$user_data['general']['display_name'] ) ;
		
		if(wp_update_user($new_user_data))
			return true;
		else
			return false;
		
	
	}
	

}