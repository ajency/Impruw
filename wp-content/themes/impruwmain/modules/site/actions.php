<?php

add_action('delete_blog', 'handle_site_deletion', 100, 2);

/**
 * 
 * @param type $site_id
 * @param type $drop
 */
function handle_site_deletion($site_id, $drop){
    
    // drop revslider plugin tables
    switch_to_blog($site_id);
    
    // run revslider uninstall.php
    
    require_once ABSPATH . PLUGINDIR . '/revslider/uninstall.php';
    
    restore_current_blog();
    
    return true;
    
}