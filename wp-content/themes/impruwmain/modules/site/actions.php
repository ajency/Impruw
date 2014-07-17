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

    $wpml_table_names = array(
        'icl_content_status',
        'icl_core_status',
        'icl_flags',
        'icl_languages',
        'icl_languages_translations',
        'icl_locale_map',
        'icl_message_status',
        'icl_node',
        'icl_reminders',
        'icl_strings',
        'icl_string_positions',
        'icl_string_status',
        'icl_string_translations',
        'icl_translate',
        'icl_translate_job',
        'icl_translations',
        'icl_translation_status'
    );

    foreach ( $wpml_table_names as $wpml_table_name ) {
        $table_name = $wpdb->prefix . $wpml_table_name;
        $wpdb->query( "DROP TABLE IF EXISTS $table_name" );
    }

    restore_current_blog();

    return TRUE;
}

function redirect_if_logged_in() {

    if ( is_user_logged_in() && !is_page_with_login_required() )
        wp_redirect( get_user_dashboard_url() );

}

add_action( 'template_redirect', 'redirect_if_logged_in' );

function check_wp_admin_access() {

    if ( !is_user_logged_in() )
        return;

    if ( is_current_user_impruw_manager() || is_super_admin() || is_network_admin() )
        return;

    if ( is_admin() && !defined( 'DOING_AJAX' ) ) {
        if ( is_user_logged_in() ) {
            wp_safe_redirect( get_user_dashboard_url() );
            die();
        } else {
            wp_safe_redirect( wp_login_url( site_url( 'dashboard' ) ) );
            die();
        }
    }
}

add_action( 'wp_loaded', 'check_wp_admin_access' );

function is_page_with_login_required() {

    $pages = array( 'login', 'register', 'home', 'new-password', 'reset-password', 'user-activation' );

    $pages = array_map( 'is_page', $pages );

    return array_search( TRUE, $pages ) === FALSE;

}

function get_user_dashboard_url() {

    if ( is_current_user_impruw_manager() )
        return admin_url();

    $user_id      = get_current_user_id();
    $primary_blog = get_user_meta( $user_id, "primary_blog", TRUE );

    $site_url = get_site_url( $primary_blog );

    $dashboard_url = $site_url . "/dashboard";

    return $dashboard_url;
}

function is_current_user_impruw_manager() {

    $user = get_userdata( get_current_user_id() );

    if ( !is_array( $user->roles ) )
        $user->roles = array();

    return in_array( 'impruw_manager', $user->roles );
}