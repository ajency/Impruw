<?php
/**
 * Template Name: New Dashboard
 */
?>
<!DOCTYPE html>
<html>
<head>
    <title>Impruw Dashboard</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <link rel="shortcut icon" href="<?php echo get_parent_template_directory_uri(); ?>/images/favicon.png" type="image/x-icon" />
    <!--[if lt IE 9]>
    <script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
    <![endif]-->
    <?php wp_head(); ?>
</head>
<body>
<div class="aj-imp-container container-fluid">
    <div class="row aj-upper-content">
        <div class="aj-imp-left col-md-3 col-sm-4" id="aj-imp-left">
        </div>
        <!-- /aj-imp-left -->
        <div id="aj-imp-right" class="aj-imp-right col-md-9 col-sm-8"></div>
        <!-- /aj-imp-right -->
    </div>
    <div class="row" id="footer-section">
        <div class="aj-imp-foot-left col-md-3 col-sm-4">
            &nbsp;
        </div>
        <div class="aj-imp-foot-right aj-imp-dash-footer col-md-9 col-sm-8">
            &copy;2014 <a href="#">Impruw.com</a>
        </div>
    </div>
</div>
<!-- Dialog region code -->
<div id="dialog-region" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"></div>
<div id="login-region" class="modal" tabindex="-1" role="dialog" aria-hidden="true"></div>
<div id="initial-loader"></div>
<script>
    var USER = <?php echo json_encode(get_user_model()); ?>;
    var ROOMS = <?php echo json_encode(get_roomss()); ?>;
    var FACILITIES = <?php echo json_encode(get_terms( 'impruw_room_facility', 
                                                        array('hide_empty' => 0))) ?>;
    var LANGUAGES = <?php echo json_encode(get_all_languages()); ?>;
    var BLOGID = <?php echo get_current_blog_id(); ?>;

    var THEMEURL = '<?php echo get_parent_template_directory_uri(); ?>';
    var SITEURL = '<?php echo site_url(); ?>';
    var AJAXURL = ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';
    var USERDATA = <?php $impruwUserModel = new ImpruwUser(get_current_user_id());
                        echo json_encode($impruwUserModel->get_user_basic_info());
                    ?>;
    var SITEID = {'id':<?php echo get_current_blog_id(); ?>}
    var UPLOADURL = '<?php echo admin_url('async-upload.php'); ?>';
    var _WPNONCE = '<?php echo wp_create_nonce('media-form'); ?>';
    var _RVNONCE = '<?php echo wp_create_nonce("revslider_actions"); ?>';
    var APPSTATE = <?php echo impruw_app_model() ?>;
    var STATISTICS = '<?php echo get_option('statistics_enabled', 'false'); ?>';

    /************************* Bootstrap Data *************************/
    var PLANS = <?php echo json_encode(get_plans()); ?>;
    var DATERANGE = <?php echo json_encode(get_date_range()); ?>;

    /*************************Language Phrases************************/
    var PHRASES = <?php echo json_encode(load_language_phrases());?>;
    var WPML_DEFAULT_LANG  = '<?php echo wpml_get_default_language(); ?>';
    var WPML_DEFAULT_LANGUAGE_NAME  = '<?php echo get_native_language_name(wpml_get_default_language());?>';
</script>
<script src="<?php echo get_parent_template_directory_uri() ?>/bower_components/pace/pace.js"></script>
<script src="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/plugins/ckeditor/ckeditor.js"></script>
<?php if ( ENV === 'production' ): ?>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/app/production/dashboard-main.js?ver=<?php echo JSVERSION ?>"></script>
<?php else: ?>
    <script data-main="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/dashboard-main"
            src="<?php echo get_parent_template_directory_uri(); ?>/bower_components/requirejs/require.js"></script>
<?php endif; ?>
</body>
</html>
