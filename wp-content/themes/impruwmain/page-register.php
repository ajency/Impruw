<?php
/**
 * Template Name: Register
 */
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
        <script>var ajaxurl = '<?php echo admin_url( 'admin-ajax.php' ); ?>';
        var siteurl = '<?php echo site_url(); ?>'; 
        </script>
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
        <div class="pull-right"><?php do_action('icl_language_selector');?></div>
		<div class="aj-imp-register-form">
			<div class="row">
				<div class="col-sm-12 aj-imp-register-header">
					<h1><?php echo __('Sign Up','impruwmain');?> <span><?php echo __('Impruw','impruwmain'); ?></span></h1>
					<p class="desc">
					 <?php echo __('Simplest way to create a website in minutes.','impruwmain');  
						 ?>  
					</p>
				</div>
			</div>
			<div class="row">
				<div class="col-md-7 aj-imp-register-left">
					<form class="form-horizontal clearfix" method="post"  name="frm_registration" id="frm_registration"    >
						<?php  $ajax_nonce = wp_create_nonce( "frm_registration" ); 
						echo "<script> var ajax_nonce ='".$ajax_nonce."' </script>";
						?>
						<span id="register_message" name="register_success"  ></span>
						<a href="#register_success" id="scrolltosuccess"  > &nbsp; </a>
						<div class="form-group">
							<label for="inputName" class="col-sm-3 control-label"><?php echo __('Name','impruwmain'); ?></label>
 
							<div class="col-sm-7 col-sm-offset-3">
								
									<input type="text" class="form-control" id="inputName"  name="inputName" placeholder="<?php echo __('Richard Parker','impruwmain'); ?>" required   
                                                                               parsley-validation-minlength="0"  parsley-minlength="3" parsley-trigger="blur" parsley-regexp="^[a-zA-Z ]+$" 
                                                                               value="<?php if(isset($_REQUEST['inputName'])) echo $_REQUEST['inputName']; ?>" 
                                                                               parsley-required-message="<?php echo __('Please enter firstname lastname','impruwmain'); ?>"  
                                                                               parsley-minlength-message="<?php echo __('Name should be atleast 3 characters long','impruwmain')?>"  >
                                                                        <div class="p-messages"></div>
                                                               
							</div>
						</div>
						<div class="form-group">
							<label for="inputEmail" class="col-sm-3 control-label"><?php echo __('Email','impruwmain'); ?></label>
 
							<div class="col-sm-7 col-sm-offset-3">
								 
									<input type="email" class="form-control parsley-validated parsley-error" 
                                                                               id="inputEmail"  name="inputEmail" placeholder="<?php echo __('richard@mail.com','impruwmain');?>"     
                                                                               parsley-required="true"  parsley-trigger="blur"  
                                                                               parsley-validation-minlength="0"  parsley-type="email"         
                                                                               value="<?php if(isset($_REQUEST['inputName'])) echo $_REQUEST['inputEmail']; ?>"  
                                                                               parsley-required-message="<?php echo __('Please enter email Id','impruwmain'); ?>"   
                                                                               parsley-remote="<?php echo admin_url( 'admin-ajax.php?action=check_email_exists'); ?>"   >
									<div class="p-messages"></div>
                                                                 
							</div>
						</div>
						<div class="form-group">
							<label for="inputLmail" class="col-sm-3 control-label"><?php echo _('Language'); ?></label>

							<div class="col-sm-7 col-sm-offset-3">
								 
									<select name="inputLanguage" id="inputLanguage"  required  parsley-required-message="<?php echo __('Please select language','impruwmain'); ?>"   > 
										
									 	<option value="en" <?php if($norwegian_sel==false)  echo " selected "; ?> >English</option>
									  	<option value="nb" <?php if($norwegian_sel==true)  echo " selected "; ?>>Norwegian</option>
 
									</select>
                                                                        <div class="p-messages"></div>
									<!-- <span class="help-block"></span> -->
								 
							</div>
						</div>
						
						 
						
						
						<div class="form-group aj-imp-site-name">
							<label for="inputSitename" class="col-sm-3 control-label"><?php echo __('Name','impruwmain');?></label>
 
							<div class="col-sm-7 col-sm-offset-3">
								 
									<input type="text" class="form-control parsley-validated parsley-error" id="inputSitename" name="inputSitename" placeholder="<?php echo __('richards-hotel','impruwmain');?>"     parsley-required="true"    parsley-trigger="blur"  parsley-validation-minlength="0"  parsley-type="alphanum"    parsley-remote="<?php echo admin_url( 'admin-ajax.php' ).'?action=check_sitename_exists'; ?>"   value="<?php if(isset($_REQUEST['inputSitename'])) echo $_REQUEST['inputSitename']; ?>"   parsley-required-message="<?php echo __('Please enter sitename','impruwmain');?>"  >
										<!-- <span class="help-block"></span> -->
                                                                        <div class="p-messages"></div>
								 
							</div>
							<div class="col-sm-2 aj-imp-domain">
								<?php echo __('.impruw.com','impruwmain');?>
							</div>
						</div>
						<div class="form-group">
							<label for="inputPass" class="col-sm-3 control-label"><?php echo __('Password','impruwmain');?></label>
 
							<div class="col-sm-7 col-sm-offset-3">
								 
									<input type="password" class="form-control parsley-validated parsley-error" id="inputPass" name="inputPass" placeholder="<?php echo __('at least 6 to 12 characters long','impruwmain'); ?>"  parsley-required="true"  parsley-equalto="#inputPass"     parsley-trigger="blur" parsley-validation-minlength="0" parsley-minlength="6"  parsley-required-message="<?php echo __("Please enter password",'impruwmain');?>"    >
									<div class="p-messages"></div>
								 
							</div>
						</div>
						<div class="form-group">
							<label for="inputRepass" class="col-sm-3 control-label"><?php echo __('Retype Password','impruwmain');?></label>
 
							<div class="col-sm-7 col-sm-offset-3">
								 
									<input type="password" class="form-control parsley-validated parsley-error"   id="inputRepass" name="inputRepass" placeholder="<?php echo __('Passwords should match','impruwmain');?>"  required   parsley-equalto="#inputPass"   parsley-trigger="blur" parsley-validation-minlength="0"   parsley-required-message="<?php echo __('Please retype password','impruwmain'); ?>"  parsley-equalto-message="<?php echo __("Password entered do not match",'impruwmain'); ?>"   >
									<!-- <span  class="help-block"></span> -->
                                                                        <div class="p-messages"></div>
								 
							</div>
						</div>
					 	<div class="form-group">
							<div class="col-sm-offset-3 col-sm-7">
								<!-- <div class="aj-imp-captcha-image"> -->
									<script type="text/javascript">
											 var RecaptchaOptions = {
											    theme : 'white'
											 };
											 </script>
											 
											 
											 <?php
         									  require_once('User/recaptchalib.php');
          									$publickey = "6LciY-sSAAAAAPwDgD2HyP7OnStWWCHid8NGYXQO "; // you got this from the signup page
          									echo recaptcha_get_html($publickey); 
        										?>
										 
  
                                          <div class="p-messages"></div>                                                                                          
            
							<!-- 	</div> -->
							</div>
						</div> 
                          <div class="form-group margin-1">
							<div class="col-sm-offset-3 col-sm-7">
								<div class="form-group">
									<label for="checkbox2" class="checkbox">
										<input type="checkbox" data-toggle="checkbox"  id="checkbox2" name="checkbox2"  value="1"   required  class="parsley-validated parsley-error"   parsley-trigger="blur" parsley-validation-minlength="0">
                                                                                <?php echo __('I agree to the Terms &amp; Conditions','impruwmain') ;?>
                                                                                <div class="p-messages"></div> 
									</label>
								</div>
							</div>
						</div>
						
						<div class="row" id="registration_status_div">
							<div class="col-sm-offset-3 col-sm-7">
								<div class="form-group">
								<!--	<span id="registration_status"></span>	-->	
								</div>
							</div>
						</div>
						
						
						
						<div class="row">
							<div class="col-sm-offset-3 col-sm-7">
								<div class="form-group">
									<!--  <button type="submit" class="btn btn-wide aj-imp-submit">Start Creating!</button> --> 
									<button type="button" class="btn btn-wide aj-imp-submit" id="btn_create_site" name="btn_create"  ><?php echo __('Start Creating!','impruwmain'); ?></button> 
                                                                        <img id="registration_loader" src="<?php echo site_url()."/wp-content/themes/impruwmain/images/loader.gif"; ?>" width="38" height="30"  style="display:none;"/>
									
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
	
	<?php wp_footer(); ?>
	
</body>
</html>
    
    
    
    