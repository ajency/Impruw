<?php

/**
 * Gets the site Details
 * @param type $site_id
 * @return type
 */
function get_site_details($site_id) {

    return array(
        'site_id' => $site_id,
        'site_domain' => get_site_domain($site_id),
        'site_name' => get_option('blogname'),
        'admin_email' => get_option('admin_email'),
        'street' => get_option('street',''),
        'postal_code' => get_option('postal_code',''),
        'city' => get_option('city',''),
        'country' => get_option('country',''),
        'other_emails' => get_option('other_emails',array()),
        'other_phone_no' => get_option('other_phone_no',array())
    );
}


/**
 * Returns the domain of the site
 * @param type $domain
 * @return string
 */
function get_site_domain($site_id){
    
    // new site will be created from main site always. hence, blog_id is 1
    $site = get_blog_details($site_id);
    
    $domain = '';
    
    if (is_subdomain_install() )
        $domain = $domain . '.' . preg_replace( '|^www\.|', '', $site->domain );    
    else 
        $domain = $site->domain;
    
    return $domain;
}
