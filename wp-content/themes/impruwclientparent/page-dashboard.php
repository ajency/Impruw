<?php
/**
 * Template Name: Dashboard Page Template
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
		<div class="row">
			<div class="aj-imp-left col-md-3 col-sm-4">
				<div class="aj-imp-dash-mobile-header">
					<a href="#" id="nav-trigger"><span class="fui-list"></span> Menu</a>
				</div>
				<div class="aj-imp-dash-logo">
					<a href="#"><img src="<?php echo get_parent_template_directory_uri(); ?>/dashboard/images/impruw-logo.png" title="Impruw" alt="Impruw" class="img-responsive" /></a>
				</div>
				<nav class="aj-imp-dash-nav">
					<ul id="aj-imp-dash-menu">
						<li class="aj-imp-nav-create">
							<span class="icon"></span>
							<span class="arrow"></span>
							<a href="#">Site Builder</a>
						</li>
						<li class="aj-imp-nav-booking active">
							<span class="icon"></span>
							<span class="arrow"></span>
							<a href="#">Rooms</a>
							<ul class="sub-menu">
								<li>
									<a href="#room-list">View All</a>
								</li>
								<li>
									<a href="#add-room">Add Rooms</a>
								</li>
							</ul>
						</li>
						<li class="aj-imp-nav-profile">
							<span class="icon"></span>
							<span class="arrow"></span>
							<a href="#site-profile">My Site Profile</a>
						</li>
						<li class="aj-imp-nav-marketing">
							<span class="icon"></span>
							<span class="arrow"></span>
							<a href="#user-profile">My Profile</a>
						</li>
						<li class="aj-imp-nav-support">
							<span class="icon"></span>
							<span class="arrow"></span>
							<a href="#support">Support</a>
						</li>
					</ul>
				</nav>
			</div>
			<!-- /aj-imp-left -->
			<div class="aj-imp-right col-md-9 col-sm-8"></div>
			<!-- /aj-imp-right -->
		</div>
		<div class="row">
			<div class="aj-imp-foot-left col-md-3 col-sm-4">
				&nbsp;
			</div>
			<div class="aj-imp-foot-right aj-imp-dash-footer col-md-9 col-sm-8">
				&copy;2014 <a href="#">Impruw.com</a>
			</div>
		</div>
	</div>
	<script>
        var THEMEURL    = '<?php echo get_parent_template_directory_uri(); ?>';
        var SITEURL     = '<?php echo site_url(); ?>';
        var AJAXURL     = '<?php echo admin_url('admin-ajax.php'); ?>';
       <?php /* var SITEDATA 	= <?php  $impruwSiteModel = new SiteModel(get_current_blog_id()); echo json_encode($impruwSiteModel->get_site_profile());  ?>; */ ?>
        var USERDATA 	= <?php  $impruwUserModel =  new ImpruwUser(get_current_user_id()); echo json_encode($impruwUserModel->get_user_basic_info());  ?>;
        var SITEID 		= {'id':<?php echo get_current_blog_id(); ?>}
        var UPLOADURL = '<?php echo admin_url('async-upload.php'); ?>';
        var _WPNONCE = '<?php echo wp_create_nonce('media-form');?>'; 
        var JSVERSION   = '<?php echo JSVERSION; ?>';
     </script>

	<script
		data-main="<?php echo get_parent_template_directory_uri(); ?>/dashboard/init"
		src="<?php echo get_parent_template_directory_uri(); ?>/dashboard/require.js">
		 
	</script>
	
	

</body>
</html>
