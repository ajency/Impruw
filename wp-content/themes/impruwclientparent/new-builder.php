<?php
/**
 * Template Name: New Builder
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width">
    <title><?php wp_title( '|', TRUE, 'right' ); ?></title>
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <!--[if lt IE 9]>
    <script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
    <![endif]-->
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/jqueryui.css" rel="stylesheet" media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/bootstrap.min.css" rel="stylesheet"
          media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/flat-ui.css" rel="stylesheet" media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/jquery.resizableColumns.css" rel="stylesheet" media="screen"/>


    <!-- Wordpress image editor -->
    <link href="<?php echo site_url(); ?>//wp-includes/css/dashicons.min.css" rel="stylesheet" media="screen">
    <link href="<?php echo site_url(); ?>/wp-includes/js/imgareaselect/imgareaselect.css" rel="stylesheet"
          media="screen">
    <link href="<?php echo site_url(); ?>/wp-admin/css/media-rtl.css" rel="stylesheet" media="screen">
    <link href="<?php echo site_url(); ?>/wp-admin/css/media.css" rel="stylesheet" media="screen">


    <link href="<?php echo get_parent_template_directory_uri(); ?>/builder/css/main.css" rel="stylesheet"
          media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/builder/css/builder.css" rel="stylesheet"
          media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/builder/css/custom.css" rel="stylesheet"
          media="screen"/>
    <link rel="shortcut icon" href="wp-content/themes/impruwclientparent/images/favicon.png" type="image/x-icon" />

    <link href="<?php echo get_template_directory_uri(); ?>/css/slimmenu.min.css" rel="stylesheet" media="screen"/>
    <link href="<?php echo get_theme_style_sheet_file_path(); ?> " rel="stylesheet" media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/pace.css" rel="stylesheet" media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/jquery.minicolors.css" rel="stylesheet"
          media="screen">
</head>
<body <?php body_class(); ?>>
<!-- Notifications -->
<div id="notifications-region"></div>
<!-- Notifications -->

<!-- Lost Connection -->
<div class="conn-lost-overlay"></div>
<!-- Lost Connection -->

<div id="fb-root"></div>

<div id="choose-theme-region"></div>
<div class="aj-imp-builder container">
    <div id="header-region"></div>
    <div id="builder-region"></div>
    <div id="elements-box-region"></div>
</div>

<div id="login-region"></div>
<div id="settings-region"></div>
<div id="dialog-region" class="modal "></div>
<!-- /.modal -->
<div id="initial-loader"></div>

<script type="text/javascript">
    var USER = <?php echo json_encode(get_user_model()); ?>;
    var ROOMS = <?php echo json_encode(get_roomss()); ?>;
    var PAGES = <?php echo json_encode(get_all_menu_pages()); ?>;
    var THEMECOLORSETS = <?php echo json_encode(get_theme_color_sets()); ?>;
    var THEMES = <?php echo json_encode(get_impruw_themes()); ?>;
    var FACILITIES = <?php echo json_encode(get_terms( 'impruw_room_facility', 
                                                        array('hide_empty' => 0))) ?>;
    var LANGUAGES = <?php echo json_encode(get_all_languages()); ?>;
    var ELEMENTS = <?php echo json_encode(get_elementbox_elements()); ?>;
    var BLOGID = <?php echo get_current_blog_id(); ?>;


    var THEMEURL = '<?php echo get_parent_template_directory_uri(); ?>';
    var SITEURL = '<?php echo site_url(); ?>';
    var AJAXURL = ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';
    var UPLOADURL = '<?php echo admin_url('async-upload.php'); ?>';
    var _WPNONCE = '<?php echo wp_create_nonce('media-form'); ?>';
    var _RVNONCE = '<?php echo wp_create_nonce("revslider_actions"); ?>';
    var JSVERSION = '<?php echo JSVERSION; ?>';
    
    var ISTHEMESELECTED = <?php echo is_theme_choosed() ?>;
    var LOGOID = <?php echo get_option('logo_id', 0) ?>;
    var LOGOUTURL = '<?php echo wp_logout_url(site_url()); ?>';
    var DASHBOARDURL = '<?php echo site_url('dashboard'); ?>';
    var BUILDERURL = '<?php echo site_url('site-builder'); ?>';
    var CURRENTTHEME = '<?php echo wp_get_theme()->get_stylesheet() ?>';
    var THEMECOLORSET = '<?php echo get_option('current_color_set','default'); ?>';
    var AUTOSAVEINTERVAL = 6000 * 10 * 2 ;
    var PHRASES = <?php echo json_encode(load_language_phrases());?>;
    var ADDRESS = '<?php echo get_hotel_address() ?>';
    var WPML_DEFAULT_LANG  = '<?php echo wpml_get_default_language(); ?>';
    var WPML_DEFAULT_LANGUAGE_NAME  = '<?php echo get_native_language_name(wpml_get_default_language());?>';
    var PLUGIN_URI  = '<?php echo WP_PLUGIN_URL; ?>';
    var ISTHEMEEDITOR = '<?php echo current_user_can( 'edit_impruw_theme' ) ? 'yes' : 'no' ?>';
    var MENUID = 0;
    var HOTELADDRESS = <?php echo json_encode(get_site_details()) ?>;
    var ISDEMOTHEME = '<?php echo in_array(get_current_blog_id(), explode(',', THEME_ID)) ?>';
    var heartbeatSettings = <?php echo json_encode(wp_heartbeat_settings(array())); ?>;
</script>
<!-- <script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script> -->
<script src="<?php echo get_parent_template_directory_uri() ?>/app/dev/js/plugins/pace.js"></script>
<!-- Unused Elements Box -->
<div id="fl_menu" class="aj-imp-trash-elements"></div>
<!-- Unused Elements Box -->

<script src="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/plugins/flippant.min.js"></script>
<script src="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/plugins/ckeditor/ckeditor.js"></script>

<?php if ( ENV === 'production' ): ?>
    
     
    <script
        src="<?php echo get_parent_template_directory_uri(); ?>/app/production/builder-main.js?ver=<?php echo JSVERSION ?>"></script>
<?php else: ?>
    <!--  <script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script> 

    <script src="<?php  get_parent_template_directory_uri(); ?>/app/dev/js/plugins/ckeditor.js"></script>-->

    <script data-main="http://localhost/impruw/wp-content/themes/impruwclientparent/app/dev/js/builder-main"
            src="<?php echo get_parent_template_directory_uri(); ?>/js/require.js"></script>
<?php endif; ?>

</body>
</html>
