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
	var $site_description; 

	/**
	 * Constructor for the class
	 * @param $site_id INT - The site ID to create the instance for
	 * @return void
	 */
	function __construct($site_id){

		$this->site_id 			= $site_id;
		$this->site_name 		= get_blog_details($this->site_id)->blogname;
		$this->site_description = get_blog_option($this->site_id,'blogdescription');

	}

	/**
	 * Function to get the profile data for the site
	 * uses other functions of the class to get the required data
	 * @return array The site profile data
	 */
	function get_site_profile(){

		return 	array(
					'id'				=> $this->site_id,
					'siteName' 			=> $this->site_name,
					'siteDescription'	=> $this->site_description
				);

	}
	
	
	/**
	 * Function to save site details
	 * 
	 * @param array  $siteData
	 */
	function save_site_profile($siteData){
			
		$address = array('street'		=> $siteData['street'],
						 'city'			=> $siteData['city'],
						 'postalcode'	=> $siteData['postalcode'],
						 'country'		=> $siteData['country']);
		
		$social = array('facebook'		=> $siteData['facebook'],			 
						'twitter'		=> $siteData['twitter']);
		
		
		save_site_address($address);
		save_social($social);
		
		return true;
	}
	
	
	/**
	 * 
	 * @param address array containing addresss fields -  $address_data
	 * @return boolean
	 */
	function save_site_address($address_data){
		
		
		//handle empty values
		update_blog_option($this->id, 'impruw_address', $address_data);
		return true;
	}
	
	
	/**
	 * 
	 * @param array containining social details -  $social_data
	 * @return boolean
	 */
	function save_social($social_data){
		
		//handle empty values
		update_blog_option($this->id, 'impruw_social', $social_data);
		return true;
	}
	
	
	
}