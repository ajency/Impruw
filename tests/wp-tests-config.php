<?php

/* Path to the WordPress codebase you'd like to test. Add a backslash in the end. */

define( 'ABSPATH',  str_replace("/tests","",dirname( __FILE__ )) . '/' );

// Test with multisite enabled: (previously -m)
define( 'WP_TESTS_MULTISITE', true );

// Force known bugs: (previously -f)
define( 'WP_TESTS_FORCE_KNOWN_BUGS', true );

// Test with WordPress debug mode on (previously -d)
define( 'WP_DEBUG', true );

// ** MySQL settings ** //

// This configuration file will be used by the copy of WordPress being tested.
// wordpress/wp-config.php will be ignored.

// WARNING WARNING WARNING!
// These tests will DROP ALL TABLES in the database with the prefix named below.
// DO NOT use a production database or one that is shared with something else.

define( 'DB_NAME', 'impruw_test' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

$table_prefix  = 'wptests_';   // Only numbers, letters, and underscores please!

//define( 'WP_DEFAULT_THEME', 'impruwmain' ); // setup default theme
define( 'WP_DEFAULT_THEME', 'impruwclientparent' );

define( 'WP_TESTS_DOMAIN', 'impruw.com' );
define( 'WP_TESTS_EMAIL', 'impruwadmin@mailinator.com' );
define( 'WP_TESTS_TITLE', 'Impruw' );

define( 'WP_PHP_BINARY', 'php' );

define( 'WPLANG', '' );