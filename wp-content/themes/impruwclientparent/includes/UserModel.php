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
		$user_info = get_userdata($this);
		 
		$new_user_data = array ( 'ID' => $user_data['ID'] ,
				'user_email' => $user_data['general']['user_email'],
				'display_name'=>$user_data['general']['display_name'] ) ;
		
		if(wp_update_user($new_user_data))
			return true;
		else
			return false;
		
	
	}
	
	
	
	/**
	 * Handles resetting the user's password.
	 *
	 * @param object $user The user
	 * @param string $new_pass New password for the user in plaintext
	 */
	function reset_user_password($user_pass_data) {
		
		var_dump($this);
		echo"---------------------------";
		var_dump($this->get_user_basic_info());
		
		//do_action('password_reset', $user, $new_pass);
		if ( wp_check_password( $user_pass_data['passdata']['currentpass'], $this->data->user_pass, $this->data->ID) ){
			
			echo "password match";
			wp_set_password($user_pass_data['passdata']['newpass1'], $this->data->ID);
			
			wp_password_change_notification($this);
			
		}
		else
		{
			echo "password do not match";
		}
			
	
		
		
		return true;
	}
	

}