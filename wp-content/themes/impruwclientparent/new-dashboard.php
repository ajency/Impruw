<?php
/**
 * Template Name: New Dashboard
 */
?>
<!DOCTYPE html>
<html>
<head>
<title>Impruw Dash Layout</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<!-- Bootstrap -->
<link href="<?php echo get_parent_template_directory_uri(); ?>/css/bootstrap.min.css" rel="stylesheet" media="screen">
<link href="<?php echo get_parent_template_directory_uri(); ?>/css/flat-ui.css" rel="stylesheet" media="screen">
<link href="<?php echo get_parent_template_directory_uri(); ?>/css/main.min.css" rel="stylesheet" media="screen">
<link href="<?php echo get_parent_template_directory_uri(); ?>/dashboard/css/dashboard.css" rel="stylesheet" media="screen">
<link href="<?php echo get_parent_template_directory_uri(); ?>/css/nv.d3.css" rel="stylesheet" media="screen">
<link href="<?php echo get_parent_template_directory_uri(); ?>/css/jquery.minicolors.css" rel="stylesheet" media="screen">


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
       	var USERDATA 	= <?php  $impruwUserModel =  new ImpruwUser(get_current_user_id()); echo json_encode($impruwUserModel->get_user_basic_info());  ?>;
        var SITEID 		= {'id':<?php echo get_current_blog_id(); ?>}
        var UPLOADURL 	= '<?php echo admin_url('async-upload.php'); ?>';
        var _WPNONCE 	= '<?php echo wp_create_nonce('media-form');?>'; 
        var APPSTATE 	= <?php echo impruw_app_model() ?>;

		/************************* Bootstrap Data *************************/
		
		var PLANS = <?php echo json_encode(get_plans()); ?>;
		var DATERANGE = <?php echo json_encode(get_date_range()); ?>;
		
// 		var DATERANGE = [{id:1, form_data : '2014-01-01', to_data : '2014-03-31', label : 'date range one' },
// 		                 {id:2, form_data : '2014-04-01', to_data : '2014-04-20', label : 'date range two' },
// 		                 {id:3, form_data : '2014-04-21', to_data : '2014-06-01', label : 'date range three' }];
        
// 		var PLANS = [{id: 1, plan_name : 'Plan Name 1', plan_description : 'Plan description 1' },
// 		             {id: 2, plan_name : 'Plan Name 2', plan_description : 'Plan description 2' },
// 		             {id: 3, plan_name : 'Plan Name 3', plan_description : 'Plan description 3' },
// 		             {id: 4, plan_name : 'Plan Name 4', plan_description : 'Plan description 4' }];

//        	var  TARIFFS = [];
     </script>

    <?php if(ENV === 'production'): ?>
        <script src="<?php echo get_parent_template_directory_uri(); ?>/app/production/dashboard-main.js?ver=<?php echo JSVERSION ?>"></script> 
    <?php else: ?>
   		<!--<script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script> -->
		<script data-main="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/dashboard-main"
			src="<?php echo get_parent_template_directory_uri(); ?>/dashboard/require.js">
    <?php endif; ?>
	
		 
	</script>
	
	

</body>
</html>
