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
		<div class="aj-imp-register-form">
			<div class="row">
				<div class="col-sm-12 aj-imp-register-header">
					<h1>Sign Up <span>Impruw</span></h1>
					<p class="desc">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					</p>
				</div>
			</div>
			<div class="row">
				<div class="col-md-7 aj-imp-register-left">
					<form class="form-horizontal clearfix" method="post"  name="frm_registration" id="frm_registration"  parsley-validate>
						<div class="row">
							<label for="inputName" class="col-sm-3 control-label">Name</label>
							<div class="col-sm-7">
								<div class="form-group">
									<input type="text" class="form-control" id="inputName"  name="inputName" placeholder="Name" required   parsley-trigger="blur" parsley-validation-minlength="0" >
									<span class="help-block">eg. Richard Parker</span>
								</div>
							</div>
						</div>
						<div class="row">
							<label for="inputEmail" class="col-sm-3 control-label">Email</label>
							<div class="col-sm-7">
								<div class="form-group">
									<input type="email" class="form-control" id="inputEmail"  name="inputEmail" placeholder="Email"   required  parsley-type="email" parsley-trigger="blur" parsley-validation-minlength="0">
									<span class="help-block">eg. richard@mail.com</span>
								</div>
							</div>
						</div>
						<div class="row aj-imp-site-name">
							<label for="inputSitename" class="col-sm-3 control-label">Site Name</label>
							<div class="col-sm-7">
								<div class="form-group">
									<input type="text" class="form-control" id="inputSitename" name="inputSitename" placeholder="Site Name"  required  parsley-trigger="blur" parsley-validation-minlength="0" parsley-type="alphanum"  >
									<span class="help-block">eg. florist.impruw.com</span>
								</div>
							</div>
							<div class="col-sm-2 aj-imp-domain">
								.impruw.com
							</div>
						</div>
						<div class="row">
							<label for="inputPass" class="col-sm-3 control-label">Password</label>
							<div class="col-sm-7">
								<div class="form-group">
									<input type="password" class="form-control parsley-validated" id="inputPass" name="inputPass" placeholder="Password"  required  parsley-equalto="#inputPass"     parsley-trigger="blur" parsley-validation-minlength="0" >
									<span class="help-block">at least 6 to 12 characters long</span>
								</div>
							</div>
						</div>
						<div class="row">
							<label for="inputRepass" class="col-sm-3 control-label">Retype Password</label>
							<div class="col-sm-7">
								<div class="form-group">
									<input type="password" class="form-control parsley-validated parsley-error"   id="inputRepass" name="inputRepass" placeholder="Retype Password"  required   parsley-equalto="#inputPass"   parsley-trigger="blur" parsley-validation-minlength="0"  >
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
											 
									<!-- <script type="text/javascript" src="http://www.google.com/recaptcha/api/challenge?k=6LdRNusSAAAAAGyPG3zLJrr-R2v0xJQcWrEJ0jky "> </script>
									  
									  <noscript>
									     <iframe src="http://www.google.com/recaptcha/api/noscript?k=6LdRNusSAAAAAGyPG3zLJrr-R2v0xJQcWrEJ0jky "
									         height="300" width="500" frameborder="0"></iframe><br>
									     <textarea name="recaptcha_challenge_field" rows="3" cols="40">
									     </textarea>
									     <input type="hidden" name="recaptcha_response_field" value="manual_challenge">
									  </noscript>
  -->
  
  
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
										I agree to the Terms &amp; Conditions
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
									<button type="button" class="btn btn-wide aj-imp-submit" id="btn_create" name="btn_create"  >Start Creating!</button> <img id="registration_loader" src="<?php echo site_url()."/wp-content/themes/impruwmain/images/loader.gif"; ?>" width="38" height="30"  style="display:none;"/>
									
								</div>
							</div>
						</div>
					</form>
				</div>
				<div class="col-md-5 aj-imp-register-right">
					<div class="aj-imp-register-steps">
						<span class="number">2</span>
						Easy steps to get your new website up and running
					</div>
					<div class="aj-imp-reg-step">
						<h4>Step 1:</h4>
						<h5>Create a site in less than 30 minutes.</h5>
						<p>
							Our site builder makes it fast and easy to create a professional website in under 30 minutes. Customize your site with additional functionality like social media, contact forms and more.
						</p>
					</div>
					<div class="aj-imp-reg-step">
						<h4>Step 2:</h4>
						<h5>Publish and get found.</h5>
						<p>
							With just one click you can publish your website to the web and make it a mobile friendly version. We also have search engine optimisiation (SEO) tools so you can get found on Google, Yahoo! and Bing.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php //getThemeJS() ;?>
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
		var ajaxurl = '<?php echo admin_url( 'admin-ajax.php' ); ?>';
	</script>  
    
    
    
     <script> 
    jQuery(document).ready(function(){

    	$( '#frm_registration' ).parsley();

    	

		jQuery("#btn_create").on("click",function(){

			jQuery("#registration_loader").show();
			if(jQuery( '#frm_registration').parsley( 'validate' ))
			{
				console.log("valid form")
				if(jQuery("#inputSitename").attr("site_exists") == 1 )
				{
					jQuery("#registration_loader").hide();
					return false
				}
				if(jQuery("#inputEmail").attr("email_exists") == 1)
				{
					jQuery("#registration_loader").hide();
						return false	;
				}	

					console.log(jQuery("#frm_registration").serializeArray());

					 var data = {
							action: 'save_new_user',													 
							frmdata:jQuery("#frm_registration").serializeArray()
						};
					
			        
					 // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
						jQuery.post(ajaxurl, data, function(response) {
										 	
							if(response.code =='000')
							{	
								console.log(response.msg)
								jQuery("#registration_loader").hide(); 
								jQuery("#registration_status").html(response.msg)
								return true
							}
							else if(response.code =='002')
							{	
								alert("invalid captcha")
							
								 jQuery("#recaptcha_reload").click();
								 jQuery("#registration_loader").hide();
								 jQuery("#registration_status_div").show()
								jQuery("#registration_status").html(response.msg)
								 
								 console.log(response.msg)
								 return false;
							} 
						});//end  jQuery.post(ajaxurl, data, function(response)	
				
			}
			else
			{
				jQuery("#registration_status_div").show()
				jQuery("#registration_status").html("Please fill the required details.")
				jQuery("#registration_loader").hide();
				console.log("invalid form")
				return false
				
			}
			
		})
        
    })
    
    
     jQuery("#inputEmail").blur(function() { 
        console.log("focusout"+jQuery.trim(jQuery("#inputEmail").val()));

        var data = {
				action: 'check_email_exists',
			//	tbl_field: 'user_login',
				email:jQuery.trim(jQuery("#inputEmail").val())
			};
		
        
		 // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
			jQuery.post(ajaxurl, data, function(response) {
							 	
				if(response.code =='000')
				{	
					console.log(response.msg)
					jQuery("#emailexists_error").remove();
					jQuery("#inputEmail").attr("email_exists",1);
					jQuery("#inputEmail").after("<ul id='emailexists_error'> <li   class='required' >Email Id already exists</li></ul>");
					jQuery("#inputEmail").focus();
					return false
				}
				else
				{	
					jQuery("#inputEmail").attr("email_exists",0);
					jQuery("#emailexists_error").remove(); 
					console.log(response.msg)
					 return true;
				} 
			});//end  jQuery.post(ajaxurl, data, function(response)
        
      })  
      
      
      console.log(ajaxurl)
      
       jQuery("#inputSitename").blur(function() { 
        console.log("site name on blur"+jQuery.trim(jQuery("#inputSitename").val())+"--");

        var inputsitename = jQuery.trim(jQuery("#inputSitename").val())

        var regx = /^[A-Za-z0-9]+$/;
        


        
		if( (inputsitename!="") && (regx.test(inputsitename)) )
		{
        
		        var data = {
						action: 'check_sitename_exists',
					//	tbl_field: 'user_login',
						sitename:jQuery("#inputSitename").val()
					};
				console.log("response.....")
		        
				 // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
					jQuery.post(ajaxurl, data, function(response) {
						console.log(response);				 	
						if(response.code =='000')
						{	
							console.log(response.msg)
							jQuery("#site_exists_error").focus();
							jQuery("#site_exists_error").remove();
							jQuery("#inputSitename").attr("site_exists","1")
							jQuery("#inputSitename").after("<ul id='site_exists_error'><li class='required' >"+response.msg+"</li></ul>");
							jQuery("#inputSitename").focus();
							return false
						}
						else
						{	
							jQuery("#inputSitename").attr("site_exists","0") 
							jQuery("#site_exists_error").remove();
							console.log(response.msg);
							 return true	
						} 
					});//end  jQuery.post(ajaxurl, data, function(response)
		}//end if(jQuery("#inputSitename").val()!="")


		jQuery( '#inputEmail' ).parsley( 'addListener', {
			'onFieldSuccess': function ( elem ) { alert("listner test"); console.log(elem);



			  } });
		
        
      }) 
      
      
    </script> 
    
    
    
   <script> 
   /* jQuery(document).ready(function(){
    
   /* jQuery('input').keyup(function() {
    var $th = $(this);
    $th.val( $th.val().replace(/[^a-zA-Z0-9]/g, function(str) { alert('You typed " ' + str + ' ".\n\nPlease use only letters and numbers.'); return ''; } ) );

});* / 




    
    
    jQuery("#inputName").focusout(function() { 
        console.log(jQuery("focusout"+"#inputName").val());
      })
     /* .blur(function() {
        console.log(jQuery("blur"+jQuery("#inputName").val() );
      });* /
    


    
    })*/
    
    </script>