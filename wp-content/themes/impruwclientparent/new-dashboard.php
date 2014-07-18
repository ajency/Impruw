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
    <!-- Bootstrap -->
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/pace.css" rel="stylesheet" media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/bootstrap.min.css" rel="stylesheet"
          media="screen">
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/flat-ui.css" rel="stylesheet" media="screen">
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/main.min.css" rel="stylesheet" media="screen">
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/jquery.minicolors.css" rel="stylesheet"
          media="screen">
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/jquery.timepicker.css" rel="stylesheet"
          media="screen">
    <link href="<?php echo get_parent_template_directory_uri(); ?>/dashboard/css/dashboard.css" rel="stylesheet"
          media="screen">
    <link rel="shortcut icon" href="wp-content/themes/impruwclientparent/images/favicon.png" type="image/x-icon" />

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="../../assets/js/html5shiv.js"></script>
    <script src="../../assets/js/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div class="aj-imp-container container">
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
    var THEMEURL = '<?php echo get_parent_template_directory_uri(); ?>';
    var SITEURL = '<?php echo site_url(); ?>';
    var AJAXURL = '<?php echo admin_url('admin-ajax.php'); ?>';
    var USERDATA = <?php $impruwUserModel = new ImpruwUser(get_current_user_id());
echo json_encode($impruwUserModel->get_user_basic_info());
?>;
    var SITEID = {'id':<?php echo get_current_blog_id(); ?>}
    var UPLOADURL = '<?php echo admin_url('async-upload.php'); ?>';
    var _WPNONCE = '<?php echo wp_create_nonce('media-form'); ?>';
    var APPSTATE = <?php echo impruw_app_model() ?>;
    var STATISTICS = '<?php echo get_option('statistics_enabled', 'false'); ?>';

    /************************* Bootstrap Data *************************/
    var PLANS = <?php echo json_encode(get_plans()); ?>;
    var DATERANGE = <?php echo json_encode(get_date_range()); ?>;

    /*************************Language Phrases************************/
    var PHRASES = <?php echo json_encode(load_language_phrases());?>;
    var WPML_DEFAULT_LANG  = '<?php echo wpml_get_default_language(); ?>';
</script>
<script src="<?php echo get_parent_template_directory_uri() ?>/app/dev/js/plugins/pace.js"></script>
<?php if ( ENV === 'production' ): ?>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/plugins/ckeditor.js"></script>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/app/production/dashboard-main.js?ver=<?php echo
    JSVERSION ?>"></script>
<?php else: ?>
    <!--<script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script> -->
    <script src="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/plugins/ckeditor.js"></script>
    <script data-main="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/dashboard-main"
            src="<?php echo get_parent_template_directory_uri(); ?>/dashboard/require.js"></script>
<?php endif; ?>
</body>
</html>
