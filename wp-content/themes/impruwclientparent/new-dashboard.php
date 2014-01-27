<?php
/**
 * Template Name: New Dashboard
 */
?>
<!DOCTYPE html>
<html>
<head>
<title>Impruw Dash Layout</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Bootstrap -->
<link href="<?php echo get_parent_template_directory_uri(); ?>/css/bootstrap.min.css" rel="stylesheet" media="screen">
<link href="<?php echo get_parent_template_directory_uri(); ?>/css/flat-ui.css" rel="stylesheet" media="screen">
<link href="<?php echo get_parent_template_directory_uri(); ?>/css/main.min.css" rel="stylesheet" media="screen">
<link href="<?php echo get_parent_template_directory_uri(); ?>/dashboard/css/dashboard.css" rel="stylesheet" media="screen">

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

	<script>
        var THEMEURL    = '<?php echo get_parent_template_directory_uri(); ?>';
        var SITEURL     = '<?php echo site_url(); ?>';
        var AJAXURL     = '<?php echo admin_url('admin-ajax.php'); ?>';
       <?php /* var SITEDATA 	= <?php  $impruwSiteModel = new SiteModel(get_current_blog_id()); echo json_encode($impruwSiteModel->get_site_profile());  ?>; */ ?>
        var USERDATA 	= <?php  $impruwUserModel =  new ImpruwUser(get_current_user_id()); echo json_encode($impruwUserModel->get_user_basic_info());  ?>;
        var SITEID 		= {'id':<?php echo get_current_blog_id(); ?>}
        var UPLOADURL 	= '<?php echo admin_url('async-upload.php'); ?>';
        var _WPNONCE 	= '<?php echo wp_create_nonce('media-form');?>'; 
        var APPSTATE 	= <?php echo impruw_app_model() ?>;
     </script>

	<script
		data-main="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/dashboard-main"
		src="<?php echo get_parent_template_directory_uri(); ?>/dashboard/require.js">
		 
	</script>
	
	

</body>
</html>
