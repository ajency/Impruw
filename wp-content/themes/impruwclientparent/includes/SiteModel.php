<?php

/**
 *  This class represents the Site.
 *  All of the funtinality related to Site is maintained in this class.
 *  Class contains functions for geting site profile data. saving profile data seo functions 
 *  and manu more
 */
class SiteModel {

	/**
	 *  The site ID
	 */
	var $site_id;

	/**
	 *  The site name
	 */
	var $site_name;

	/**
	 * Constructor for the class
	 * @param $site_id INT - The site ID to create the instance for
	 * @return void
	 */
	function __construct($site_id){

		$this->site_id 		= $site_id;

		$this->site_name 	= get_blog_details($this->site_id,'blog_name','');

	}

	/**
	 * Function to get the profile data for the site
	 * uses other functions of the class to get the required data
	 * @return array The site profile data
	 */
	function get_site_profile(){

		return 	array(
					'id'		=> $this->site_id,
					'siteName' 	=> $this->site_name
				);

	}
	
}