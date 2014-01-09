<?php 
/**
 * Template Name: Login
 */

get_header();
?>

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
						<div class="form-group">
							<label for="inputEmail" class="col-sm-3 control-label"><?php echo __('Email','impruwmain'); ?></label>
							<div class="col-sm-7 col-sm-offset-3">
								
									<input type="email" class="form-control  parsley-validated parsley-error" id="inputEmail"  name="inputEmail" placeholder="Email"    parsley-required="true"    parsley-trigger="blur"    parsley-validation-minlength="0"   parsley-type="email"   parsley-required-message="<?php echo __('Please Enter Email','impruwmain'); ?>" />
									<div class="p-messages"></div>
								 
							</div>
						</div>
						<div class="form-group">
							<label for="inputPass" class="col-sm-3 control-label"><?php echo __('Password','impruwmain');?></label>
							<div class="col-sm-7 col-sm-offset-3">
								 
									<input type="password" class="form-control  parsley-validated parsley-error" id="inputPass"  name="inputPass" placeholder="Password"    parsley-required="true"     parsley-trigger="blur" parsley-validation-minlength="0"    parsley-required-message="<?php echo __('Please Enter Password','impruwmain');?>" />
									<div class="p-messages"></div>
								 
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
									<?php echo __('Dont have an account?','impruwmain');?> <a href="<?php  echo site_url('register/'); ?>"><?php echo __('Sign Up','impruwmain');?></a>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
<?php get_footer(); ?>  