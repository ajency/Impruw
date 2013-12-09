<?php
/**
 * Template Name: Login
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
					<h1><?php echo __('Login','impruwmain'); ?>  <span><?php echo __('Impruw','impruwmain');?></span></h1>
					<p class="desc">
						<?php echo __('Lorem Ipsum is simply dummy text of the printing and typesetting industry.','impruwmain'); ?>
					</p>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 aj-imp-login">
					<form class="form-horizontal clearfix" id="frm_login" name="frm_login" >
					<?php   $ajax_nonce = wp_create_nonce( "frm_login" ); 
						echo "<script> var ajax_nonce ='".$ajax_nonce."' </script>";
						?>
						<span id="login_status"></span>
						<div class="row">
							<label for="inputEmail" class="col-sm-3 control-label"><?php echo __('Email','impruwmain'); ?></label>
							<div class="col-sm-7 col-sm-offset-3">
								<div class="form-group">
									<input type="email" class="form-control  parsley-validated parsley-error" id="inputEmail"  name="inputEmail" placeholder="Email"    parsley-required="true"    parsley-trigger="blur"    parsley-validation-minlength="0"   parsley-type="email"   parsley-required-message="<?php echo __('Please Enter Email','impruwmain'); ?>" />
								</div> 
							</div>
						</div>
						<div class="row">
							<label for="inputPass" class="col-sm-3 control-label"><?php echo __('Password','impruwmain');?></label>
							<div class="col-sm-7 col-sm-offset-3">
								<div class="form-group">
									<input type="password" class="form-control  parsley-validated parsley-error" id="inputPass"  name="inputPass" placeholder="Password"    parsley-required="true"     parsley-trigger="blur" parsley-validation-minlength="0"    parsley-required-message="<?php echo __('Please Enter Password','impruwmain');?>" />
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-offset-3 col-sm-7">
								<div class="form-group">
									<button type="button" id="btn_login" name="btn_login" class="btn btn-wide aj-imp-submit"><?php echo __('Login','impruwmain'); ?></button>
									<img id="login_loader" src="<?php echo site_url()."/wp-content/themes/impruwmain/images/loader.gif"; ?>" width="38" height="30"  style="display:none;"/>
									<a href="#" class="aj-imp-log-forgot"><?php echo __('Forgot your password?','impruwmain');?></a>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-offset-3 col-sm-7">
								<div class="form-group">
									<?php echo __('Dont have an account?','impruwmain');?> <a href="<?php  echo site_url()."/register"; ?>"><?php echo __('Sign Up','impruwmain');?></a>
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