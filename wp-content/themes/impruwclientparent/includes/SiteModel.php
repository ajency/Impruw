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
	//var $site_name;
	//var $site_description; 

	/**
	 * Constructor for the class
	 * @param $site_id INT - The site ID to create the instance for
	 * @return void
	 */
	function __construct($site_id){

		$this->site_id 			= $site_id;
		//$this->site_name 		= get_blog_details($this->site_id)->blogname;
		//$this->site_description = get_blog_option($this->site_id,'blogdescription');

	}

	/**
	 * Function to get the profile data for the site
	 * uses other functions of the class to get the required data
	 * @return array The site profile data
	 */
	function get_site_profile(){

		/*return 	array(
					'id'				=> $this->site_id,
					'siteName' 			=> $this->site_name,
					'siteDescription'	=> $this->site_description
				);
		*/
		$site_address = array();
		$site_social  = array();
		$site_general = array();
		
		
		$site_business = $this->get_site_business();
		
		$site_social = $this->get_site_social();
		
	 	$site_general = $this->get_site_general();

	 	
	 	 return(array('businessDetails'=>$site_business,'socialDetails'=>$site_social,'generalDetails'=>$site_general));
	}
	
	
	/**
	 * 
	 */
	function get_site_general(){
		
		$site_general_data = array('siteName'=>get_blog_details($this->site_id)->blogname);
		if($site_general_data)
			return $site_general_data;
		else
			return (array());
	}
	
	
	/**
	 * 
	 * @return array containing site address details
	 */
	function get_site_business(){
		
		$site_business_data = get_blog_option($this->site_id, 'impruw_address');
		if($site_business_data)
			return $site_business_data;
		else
			return (array());
	}
	
	/**
	 * Function to get  site social details (ex. twitter, facebook)
	 * @return arary containign site social details
	 */
	function get_site_social(){
		
		$site_social_data = get_blog_option($this->site_id,'impruw_social');
		if($site_social_data)
			return $site_social_data;
		else
			return (array());
	}
	
	
	
	
	/**
	 * Function to save site details
	 * 
	 * @param array  $siteData
	 */
	function save_site_profile($siteData){
		
	 
		$this->save_site_address($siteData['business']);
		$this->save_site_social($siteData['social']);
		
		return true;
	}
	
	
	/**
	 * 
	 * @param address array containing addresss fields -  $address_data
	 * @return boolean
	 */
	function save_site_address($address_data){
		 
		$defaults = array('street'  => '', 
						  'city'    => '', 
						  'country' => '');
		
		$address_data = wp_parse_args($address_data, $defaults);
		 
		update_blog_option($this->site_id, 'impruw_address',$address_data);		 
		 
		return true;
	}
	
	
	/**
	 * 
	 * @param array containining social details -  $social_data
	 * @return boolean
	 */
	function save_site_social($social_data){
		 
		$defaults = array('facebook'  => '',				 
						  'twitter'   => '');
		$social_data = wp_parse_args($social_data,$defaults);
		
		update_blog_option($this->site_id, 'impruw_social', $social_data);
	
		return true;
	}
	
	
	
}