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
        <script>var ajaxurl = '<?php echo admin_url( 'admin-ajax.php' ); ?>';</script>
	<?php wp_head(); ?>
</head>

<body <?php //body_class(); ?>>

<?php
//var_dump($_REQUEST);

$norwegian_sel = false; 
if(isset($_REQUEST['lang']))
{
	if($_REQUEST['lang']=='nb')
	{
		$norwegian_sel = true;
	}
}
?>
    <div class="aj-imp-container container">
		<div class="aj-imp-register-form">
			<div class="row">
				<div class="col-sm-12 aj-imp-register-header">
					<h1><?php echo __('Sign Up','impruwmain');?> <span><?php echo __('Impruw','impruwmain'); ?></span></h1>
					<p class="desc">
					 <?php echo __('Lorem Ipsum is simply dummy text of the printing and typesetting industry.','impruwmain');  do_action('icl_language_selector');
						 ?>  
					</p>
				</div>
			</div>
			<div class="row">
				<div class="col-md-7 aj-imp-register-left">
					<form class="form-horizontal clearfix" method="post"  name="frm_registration" id="frm_registration"  parsley-validate  data-persist="garlic" >
						<div class="row">
							<label for="inputName" class="col-sm-3 control-label"><?php echo __('Name','impruwmain'); ?></label>
							<div class="col-sm-7">
								<div class="form-group">
									<input type="text" class="form-control" id="inputName"  name="inputName" placeholder="<?php echo __('Name','impruwmain'); ?>" required   parsley-trigger="blur" parsley-validation-minlength="0" value="<?php if(isset($_REQUEST['inputName'])) echo $_REQUEST['inputName']; ?>"  parsley-required-message="Please Enter Firstname Lastname">
									<span class="help-block"><?php echo __('eg. Richard Parker','impruwmain'); ?></span>
								</div>
							</div>
						</div>
						<div class="row">
							<label for="inputEmail" class="col-sm-3 control-label"><?php echo __('Email','impruwmain'); ?></label>
							<div class="col-sm-7">
								<div class="form-group">
									<input type="email" class="form-control" id="inputEmail"  name="inputEmail" placeholder="<?php echo __('Email','impruwmain');?>"   required  parsley-type="email" parsley-trigger="blur" parsley-validation-minlength="0" parsley-remote="<?php echo admin_url( 'admin-ajax.php' ).'?action=check_email_exists'; ?>"   value="<?php if(isset($_REQUEST['inputName'])) echo $_REQUEST['inputEmail']; ?>"  parsley-required-message="Please Enter Email Id" >
									<span class="help-block"><?php echo __('eg. richard@mail.com','impruwmain');?></span>
								</div>
							</div>
						</div>
						
						
						
						 
						
						<div class="row">
							<label for="inputLmail" class="col-sm-3 control-label"><?php echo _('Language'); ?></label>
							<div class="col-sm-7">
								<div class="form-group">
									<select name="inputLanguage" id="inputLanguage"  required  parsley-required-message="Please Select Language"> 
										<option value="">Select</option>
									 	<option value="English" <?php if($norwegian_sel==false)  echo " selected "; ?> >English</option>
									  	<option value="Norwegian" <?php if($norwegian_sel==true)  echo " selected "; ?>>Norwegian</option>
									</select>
									<span class="help-block"><?php echo _('eg. richard@mail.com');?></span>
								</div>
							</div>
						</div>
						
						 
						
						
						<div class="row aj-imp-site-name">
							<label for="inputSitename" class="col-sm-3 control-label"><?php echo __('Name','impruwmain');?></label>
							<div class="col-sm-7">
								<div class="form-group">
									<input type="text" class="form-control" id="inputSitename" name="inputSitename" placeholder="<?php echo __('Site Name','impruwmain');?>"  required  parsley-trigger="blur" parsley-validation-minlength="0" parsley-type="alphanum"   parsley-validation-minlength="0" parsley-remote="<?php echo admin_url( 'admin-ajax.php' ).'?action=check_sitename_exists'; ?>"   value="<?php if(isset($_REQUEST['inputName'])) echo $_REQUEST['inputSitename']; ?>"   parsley-required-message="Please Enter Sitename"  >
									<span class="help-block"><?php echo __('eg. florist.impruw.com','impruwmain');?></span>
								</div>
							</div>
							<div class="col-sm-2 aj-imp-domain">
								<?php echo __('.impruw.com','impruwmain');?>
							</div>
						</div>
						<div class="row">
							<label for="inputPass" class="col-sm-3 control-label"><?php echo __('Password','impruwmain');?></label>
							<div class="col-sm-7">
								<div class="form-group">
									<input type="password" class="form-control parsley-validated" id="inputPass" name="inputPass" placeholder="<?php echo __('Password','impruwmain'); ?>"  parsley-required="true"  parsley-equalto="#inputPass"     parsley-trigger="blur" parsley-minlength="6"  parsley-required-message="Please Enter Password" >
									<span class="help-block"><?php echo __('at least 6 to 12 characters long','impruwmain'); ?></span>
								</div>
							</div>
						</div>
						<div class="row">
							<label for="inputRepass" class="col-sm-3 control-label"><?php echo __('Retype Password','impruwmain');?></label>
							<div class="col-sm-7">
								<div class="form-group">
									<input type="password" class="form-control parsley-validated parsley-error"   id="inputRepass" name="inputRepass" placeholder="<?php echo __('Retype Password','impruwmain');?>"  required   parsley-equalto="#inputPass"   parsley-trigger="blur" parsley-validation-minlength="0"   parsley-required-message="Please Retype Password"  parsley-equalto-message="Password Entered Do Not Match">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-offset-3 col-sm-7">
								<div class="aj-imp-captcha-image">
									<!--  <img src="images/captcha-1.jpg" /> -->
									
									  <script type="text/javascript">
											 var RecaptchaOptions = {
											    theme : 'white'
											 };
											 </script>
											 
											 
											 <?php
         									 require_once('User/recaptchalib.php');
          									$publickey = "6LdRNusSAAAAAGyPG3zLJrr-R2v0xJQcWrEJ0jky"; // you got this from the signup page
          									echo recaptcha_get_html($publickey);
        										?>
										 
  
  
								</div>
							</div>
						</div>
					<!--   	<div class="row">
							<label for="inputCaptcha" class="col-sm-3 control-label">Enter the Code</label>
							<div class="col-sm-7">
								<div class="form-group">
									<input type="text" class="form-control" id="inputCaptcha"  name="inputCaptcha" placeholder="Enter the Code" required   parsley-trigger="blur" parsley-validation-minlength="0" >
								</div>
							</div>
						</div> -->
						<div class="row margin-1">
							<div class="col-sm-offset-3 col-sm-7">
								<div class="form-group">
									<label for="checkbox2" class="checkbox checked">
										<input type="checkbox" data-toggle="checkbox" checked="checked" id="checkbox2" name="checkbox2"  value="1"   parsley-required="true"  class="parsley-validated parsley-error"   parsley-trigger="blur" parsley-validation-minlength="0">
										<?php echo __('I agree to the Terms &amp; Conditions','impruwmain') ;?>
									</label>
								</div>
							</div>
						</div>
						
						<div class="row" id="registration_status_div">
							<div class="col-sm-offset-3 col-sm-7">
								<div class="form-group">
									<span id="registration_status"></span>		
								</div>
							</div>
						</div>
						
						
						
						<div class="row">
							<div class="col-sm-offset-3 col-sm-7">
								<div class="form-group">
									<!--  <button type="submit" class="btn btn-wide aj-imp-submit">Start Creating!</button> --> 
									<button type="button" class="btn btn-wide aj-imp-submit" id="btn_create" name="btn_create"  ><?php echo __('Start Creating!','impruwmain'); ?></button> <img id="registration_loader" src="<?php echo site_url()."/wp-content/themes/impruwmain/images/loader.gif"; ?>" width="38" height="30"  style="display:none;"/>
									
								</div>
							</div>
						</div>
					</form>
				</div>
				<div class="col-md-5 aj-imp-register-right">
					<div class="aj-imp-register-steps">
						<span class="number">2</span>
						<?php echo __('Easy steps to get your new website up and running','impruwmain');?>
					</div>
					<div class="aj-imp-reg-step">
						<h4><?php echo __('Step 1:','impruwmain');?></h4>
						<h5><?php echo __('Create a site in less than 30 minutes.','impruwmain');?></h5>
						<p>
							<?php echo __('Our site builder makes it fast and easy to create a professional website in under 30 minutes. Customize your site with additional functionality like social media, contact forms and more.','impruwmain'); ?>
						</p>
					</div>
					<div class="aj-imp-reg-step">
						<h4><?php echo __('Step 2:','impruwmain');?></h4>
						<h5><?php echo __('Publish and get found.','impruwmain');?></h5>
						<p>
							<?php echo __('With just one click you can publish your website to the web and make it a mobile friendly version. We also have search engine optimisiation (SEO) tools so you can get found on Google, Yahoo! and Bing.','impruwmain');?>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php //getThemeJS() ;?>
	<!--[if lte IE 7]>
    <script src="https://raw.github.com/mattpowell/localstorageshim/master/localstorageshim.min.js" type="text/javascript"></script>
<![endif]-->
	<?php wp_footer(); ?>
	
</body>
    
    
   <!-- jQuery (necessary for Bootstrap's JavaScript plugins)  
    <script src="js/jquery-2.0.3.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed  
    <script src="js/bootstrap.min.js"></script>
    <script src="js/flatui-checkbox.js"></script>
    <script src="js/bootstrap-select.js"></script>
    <script src="js/flatui-radio.js"></script> -->
	<script>
		jQuery("select").selectpicker();
		
	</script>  
    
    
    
    