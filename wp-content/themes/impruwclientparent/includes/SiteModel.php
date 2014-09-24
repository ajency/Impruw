<?php

    /**
     *  This class represents the Site.
     *  All of the funtinality related to Site is maintained in this class.
     *  Class contains functions for geting site profile data. saving profile data seo functions
     *  and manu more
     */
    class SiteModel
    {

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
         *
         * @param $site_id INT - The site ID to create the instance for
         *
         * @return void
         */
        function __construct($site_id)
        {

            $this->site_id = $site_id;
            //$this->site_name 		= get_blog_details($this->site_id)->blogname;
            //$this->site_description = get_blog_option($this->site_id,'blogdescription');

        }

        /**
         * Function to get the profile data for the site
         * uses other functions of the class to get the required data
         * @return array The site profile data
         */
        function get_site_profile()
        {

            /*return 	array(
                        'id'				=> $this->site_id,
                        'siteName' 			=> $this->site_name,
                        'siteDescription'	=> $this->site_description
                    );
            */


            $data = array();

            $data['siteName'] = get_option('blogname');

            $fields = array('businessLogoId', 'postalcode', 'street', 'phone', 'email', 'city', 'country', 'facebook', 'twitter');

            foreach ($fields as $key) {
                $data[$key] = (get_option($key) != FALSE ? get_option($key) : '');
            }

            return $data;
        }


        /**
         *
         */
        function get_site_general()
        {

            $businesslogo_id = get_option('sitebusiness-logo');

            if ($businesslogo_id !== FALSE)
                $businesslogo_url = wp_get_attachment_thumb_url($businesslogo_id); else {
                $businesslogo_id  = '';
                $businesslogo_url = '';
            }

            $site_general_data = array('siteName' => get_blog_details($this->site_id)->blogname, 'businessLogoId' => $businesslogo_id, 'businessLogoUrl' => $businesslogo_url);

            return $site_general_data;

        }


        /**
         *
         * @return array containing site address details
         */
        function get_site_business()
        {

            $address = array();

            $address['street']      = get_option('street', 'Street Name');
            $address['postal_code'] = get_option('postal_code', '4200001');
            $address['city']        = get_option('city', 'City');
            $address['country']     = get_option('country', 'Country');

            $address['email'] = get_option( 'site_email', get_bloginfo( 'admin_email' ) );//!empty($emails) ? $emails[0] : get_option('admin_email');

            $phoneno             = get_option('other_phone_no', array());
            $address['phone_no'] = !empty($phoneno) ? $phoneno[0] : 'Not Specified';

            return $address;
        }

        /**
         * Function to get  site social details (ex. twitter, facebook)
         * @return arary containign site social details
         */
        function get_site_social()
        {

            $site_social_data = get_option('impruw_social');
            if ($site_social_data)
                return $site_social_data; else
                return (array());
        }


        function get_site_language()
        {

            $wpml_options = get_option('icl_sitepress_settings');
            $default_lang = $wpml_options['default_language'];

            return $default_lang;

        }


        /**
         * Function to save site details
         *
         * @param array $siteData
         */
        function save_site_profile($siteData)
        {

            if (is_array($siteData)) {

                foreach ($siteData as $key => $value) {
                    update_option($key, $value);
                }

            }

            // $this->save_site_address($siteData['business']);
            // $this->save_site_social($siteData['social']);
            // $this->save_business_logo($siteData['businesslogo']);

            return TRUE;
        }


        /**
         *
         * @param int business Id
         *
         * @return boolean
         */
        function save_business_logo($business_logo)
        {

            switch_to_blog($this->site_id);
            $result = update_option('sitebusiness-logo', $business_logo);
            restore_current_blog();
            if (!$result)
                return $result;

            return TRUE;
        }


        /**
         *
         * @param address array containing addresss fields -  $address_data
         *
         * @return boolean
         */
        function save_site_address($address_data)
        {

            $defaults = array('street' => '', 'city' => '', 'country' => '');

            $address_data = wp_parse_args($address_data, $defaults);

            switch_to_blog($this->site_id);
            update_option('impruw_address', $address_data);
            restore_current_blog();

            return TRUE;
        }


        /**
         *
         * @param array containining social details -  $social_data
         *
         * @return boolean
         */
        function save_site_social($social_data)
        {

            $defaults    = array('facebook' => '', 'twitter' => '');
            $social_data = wp_parse_args($social_data, $defaults);

            switch_to_blog($this->site_id);
            update_option('impruw_social', $social_data);
            restore_current_blog();

            return TRUE;
        }

    }