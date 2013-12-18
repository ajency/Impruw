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
		//$user_info = get_userdata($this);
		 
		$new_user_data = array ( 'ID' => $user_data['ID'] ,
				'user_email' => $user_data['general']['user_email'],
				'display_name'=>$user_data['general']['display_name'] ) ;
		
		$email_user = email_exists($user_data['general']['user_email']);
		
		if($email_user){
			
			if($this->data->ID!=$email_user){
				
				$error = "User with this email id already exists.Please enter other email Id";
				
				return $error;
			}
		}
		else{
			if(wp_update_user($new_user_data)){
				
				if(isset($user_data['general']['new_feature_alert']))
					update_user_meta($user_data['ID'], 'impruw_featurealert' , $user_data['general']['new_feature_alert']);
				else
					update_user_meta($user_data['ID'], 'impruw_featurealert' , '');
				
				return true;
			}
			else
				
				return false;
			
		}
		
	
	}
	
	
	
	/**
	 * Handles resetting the user's password.
	 *
	 * @param object $user The user
	 * @param string $new_pass New password for the user in plaintext
	 */
	function reset_user_password($user_pass_data) {
		
		
		if ( wp_check_password( $user_pass_data['passdata']['currentpass'], $this->data->user_pass, $this->data->ID) ){
		 
		//	if(wp_set_password($user_pass_data['passdata']['newpass1'], $this->data->ID)){
			if(wp_update_user( array ( 'ID' => $this->data->ID, 'user_pass' => $user_pass_data['passdata']['newpass1'] ) ) ){
				wp_password_change_notification($this->data); 
				
				return true;
			}
			else{
				
				$error ="Pasword could not be changed";
				
				return $error;
			}
				
		}
		else{
			
			$error =  "Password incorrect";
			
			return $error;
		}
			
	
		
	}
	

}