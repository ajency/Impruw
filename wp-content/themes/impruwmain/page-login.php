<?php
/**
 * Template Name: Register
 */
//echo ABSPATH;
//include(ABSPATH."wp-content\\themes\impruwmain\User\user_management.php");
//include("/User/user_management.php");
?>
<!DOCTYPE html>
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
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	
	
	<!-- Bootstrap -->
  <!--   <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="css/flat-ui.css" rel="stylesheet" media="screen">
    <link href="css/main.min.css" rel="stylesheet" media="screen">
	<link href="../css/dashboard.css" rel="stylesheet" media="screen">
	-->
	
	
	<!--[if lt IE 9]>
	<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
	<![endif]-->
        <?php //getThemeCSS(); ?>
	<?php wp_head(); ?>
</head>

<body <?php //body_class(); ?>>
    <div class="aj-imp-container container">
		<div class="aj-imp-login-form">
			<div class="row">
				<div class="col-sm-12 aj-imp-login-header">
					<h1><?php echo __('Login','impruwmain'); ?> <span><?php echo __('Impruw','impruwmain');?></span></h1>
					<p class="desc">
						<?php echo __('Lorem Ipsum is simply dummy text of the printing and typesetting industry.','impruwmain'); ?>
					</p>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 aj-imp-login">
					<form class="form-horizontal clearfix"  parsley-validate  >
						<div class="row">
							<label for="inputEmail" class="col-sm-3 control-label"><?php echo __('Email','impruwmain'); ?></label>
							<div class="col-sm-7">
								<div class="form-group">
									<input type="email" class="form-control" id="inputEmail" placeholder="Email"  required   parsley-trigger="blur" parsley-validation-minlength="0"    parsley-required-message="Please Enter Email">
								</div>
							</div>
						</div>
						<div class="row">
							<label for="inputPass" class="col-sm-3 control-label"><?php echo __('Password','impruwmain'); ?></label>
							<div class="col-sm-7">
								<div class="form-group">
									<input type="password" class="form-control" id="inputPass" placeholder="Password"   required   parsley-trigger="blur" parsley-validation-minlength="0"    parsley-required-message="Please Enter Password">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-offset-3 col-sm-7">
								<div class="form-group">
									<button type="button" id="btn_login" class="btn btn-wide aj-imp-submit"><?php echo __('Login','impruwmain'); ?></button>
									<a href="#" class="aj-imp-log-forgot"><?php echo __('Forgot your password?','impruwmain'); ?></a>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-offset-3 col-sm-7">
								<div class="form-group">
									<?php echo __('Dont have an account','impruwmain?'); ?> <a href="register.html"><?php echo __('Sign Up','impruwmain'); ?></a>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
  <!--     <script src="js/jquery-2.0.3.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -- >
    <script src="js/bootstrap.min.js"></script>
    <script src="js/flatui-checkbox.js"></script>
    <script src="js/bootstrap-select.js"></script>
    <script src="js/flatui-radio.js"></script>
	<script>
		jQuery("select").selectpicker();
	</script> -->
	<?php wp_footer(); ?>
  </body>
</html>