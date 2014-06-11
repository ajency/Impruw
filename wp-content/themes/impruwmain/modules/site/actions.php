<?php

add_action( 'delete_blog', 'handle_site_deletion', 100, 2 );

/**
 *
 * @param type $site_id
 * @param type $drop
 */
function handle_site_deletion( $site_id, $drop ) {

    // drop revslider plugin tables
    switch_to_blog( $site_id );

    // run revslider uninstall.php

    require_once ABSPATH . PLUGINDIR . '/revslider/uninstall.php';

    //remove tariff tables
    global $wpdb;

    $wpdb->query( "DROP TABLE {$wpdb->prefix}daterange" );
    $wpdb->query( "DROP TABLE {$wpdb->prefix}plans" );
    $wpdb->query( "DROP TABLE {$wpdb->prefix}tariffs" );
    $wpdb->query( "DROP TABLE {$wpdb->prefix}bookings" );

    restore_current_blog();

    return TRUE;
}

function redirect_if_logged_in() {

    if ( is_user_logged_in() && !is_page_with_login_required() )
        wp_redirect( get_user_dashboard_url() );

}

add_action( 'template_redirect', 'redirect_if_logged_in' );

function is_page_with_login_required() {

    $pages = array( 'login', 'register', 'home', 'new-password', 'reset-password', 'user-activation' );

    $pages = array_map( 'is_page', $pages );

    return array_search( TRUE, $pages ) === FALSE;

}

function get_user_dashboard_url() {

    $user_id      = get_current_user_id();
    $primary_blog = get_user_meta( $user_id, "primary_blog", TRUE );

    $site_url = get_site_url( $primary_blog );

    $dashboard_url = $site_url . "/dashboard";

    return $dashboard_url;
}