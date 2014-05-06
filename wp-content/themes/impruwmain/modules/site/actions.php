<?php

    add_action('delete_blog', 'handle_site_deletion', 100, 2);

    /**
     *
     * @param type $site_id
     * @param type $drop
     */
    function handle_site_deletion($site_id, $drop)
    {

        // drop revslider plugin tables
        switch_to_blog($site_id);

        // run revslider uninstall.php

        require_once ABSPATH . PLUGINDIR . '/revslider/uninstall.php';

        //remove tariff tables
        global $wpdb;

        $wpdb->query("DROP TABLE {$wpdb->prefix}daterange");
        $wpdb->query("DROP TABLE {$wpdb->prefix}plans");
        $wpdb->query("DROP TABLE {$wpdb->prefix}tariffs");
        $wpdb->query("DROP TABLE {$wpdb->prefix}bookings");

        restore_current_blog();

        return TRUE;
    }
