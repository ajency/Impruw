<?php

/*
  File Name: site_shortcodes.php
  Description: This file has a list of the following shortcodes used to retrieve site information.
  1)  retrieve_site_information - shortcode to retrieve site's information based on the attribute passed

  /* ============================================================= */

/**
 * 
 * retrieve_site_information
 * shortcode to retrieve site information based on the attribute passed
 * 
 */
function retrieve_site_information($atts) 
{
    if (is_user_logged_in()) //check to see if user is logged in
        {
            global $wpdb;
            if (isset($atts['field'])) 
                {
                   
                   
                    if ($atts['field'] == "site_name")//retrieves the current blog's name
                    {
                         $site_name= get_bloginfo('blogname');                    
                         return $site_name;
                    }
                }
         }
    else 
         {
            return("Please log in");
         }
    return;
}
add_shortcode('site_info', 'retrieve_site_information');