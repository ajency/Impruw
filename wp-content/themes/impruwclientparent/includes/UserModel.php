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

}