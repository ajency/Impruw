<?php
/**
 * Template Name: Register
 */
get_header();
?>

<div class="aj-imp-register-form">
    <div class="row">
        <div class="col-sm-12 aj-imp-register-header">
            <h1><?php echo __('Sign Up', 'impruwmain'); ?> <span><?php echo __('Impruw', 'impruwmain'); ?></span></h1>
            <p class="desc">
                <?php echo __('Simplest way to create a website in minutes.', 'impruwmain');
                ?>  
            </p>
        </div>
    </div>
    <div class="row">
        <div class="col-md-7 aj-imp-register-left">
            <form class="form-horizontal clearfix" method="post"  name="frm_registration" id="frm_registration"    >
                <?php
                $ajax_nonce = wp_create_nonce("new_user_registration");
                echo "<script> var ajax_nonce ='" . $ajax_nonce . "' </script>";
                ?>
                <span id="register_message" name="register_success"  ></span>
                <a href="#register_success" id="scrolltosuccess"  > &nbsp; </a>
                <div class="form-group">
                    <label for="inputName" class="col-sm-3 control-label"><?php echo __('Your Full Name', 'impruwmain'); ?></label>

                    <div class="col-sm-7 col-sm-offset-3">

                        <input type="text" class="form-control" id="inputName"  name="display_name" placeholder="<?php echo __('First Name Last Name', 'impruwmain'); ?>" required   
                               parsley-validation-minlength="0"  parsley-minlength="3" parsley-trigger="blur" parsley-regexp="^[a-zA-Z ]+$" 
                               value="" 
                               parsley-required-message="<?php echo __('Enter your first name and last name.', 'impruwmain'); ?>"  
                               parsley-minlength-message="<?php echo __('Name should be atleast 3 characters long', 'impruwmain') ?>"  >
                        <div class="p-messages"></div>

                    </div>
                </div>
                <div class="form-group">
                    <label for="inputEmail" class="col-sm-3 control-label"><?php echo __('Your Email', 'impruwmain'); ?></label>

                    <div class="col-sm-7 col-sm-offset-3">

                        <input type="email" class="form-control parsley-validated parsley-error" 
                               id="inputEmail"  name="user_email" placeholder="<?php echo __('someone@mail.com', 'impruwmain'); ?>"     
                               parsley-required="true"  parsley-trigger="blur"  
                               parsley-validation-minlength="0"  parsley-type="email"         
                               value=""  
                               parsley-required-message="<?php echo __('Enter a valid email address as it will be your User ID as well.', 'impruwmain'); ?>"   
                               pasrsley-remote="<?php echo admin_url('admin-ajax.php?action=check_email_exists'); ?>"   >
                        <div class="p-messages"></div>

                    </div>
                </div>
                <div class="form-group">
                    <label for="inputLmail" class="col-sm-3 control-label"><?php echo __('Choose your preferred language', 'impruwmain'); ?></label>

                    <div class="col-sm-7 col-sm-offset-3">

                        <select name="user_language" id="inputLanguage"  required  parsley-required-message="<?php echo __('Please select any one of the languages available.', 'impruwmain'); ?>"   > 

                            <option value="en" <?php if ($norwegian_sel == false) echo " selected "; ?> ><?php echo __('English', 'impruwmain'); ?></option>
                            <option value="nb" <?php if ($norwegian_sel == true) echo " selected "; ?>><?php echo __('Norwegian', 'impruwmain'); ?></option>

                        </select>
                        <div class="p-messages"></div>
                        <!-- <span class="help-block"></span> -->

                    </div>
                </div>

                <div class="form-group aj-imp-site-name">
                    <label for="inputSitename" class="col-sm-3 control-label"><?php echo __('Choose your new website name', 'impruwmain'); ?></label>

                    <div class="col-sm-7 col-sm-offset-3">

                        <input type="text" class="form-control parsley-validated parsley-error" id="inputSitename" name="site_name" placeholder="<?php echo __('Website name', 'impruwmain'); ?>"     parsley-required="true"    parsley-trigger="blur"  parsley-validation-minlength="0"  parsley-type="alphanum"    psarsley-remote="<?php echo admin_url('admin-ajax.php') . '?action=check_sitename_exists'; ?>"   value="<?php if (isset($_REQUEST['inputSitename'])) echo $_REQUEST['inputSitename']; ?>"   parsley-required-message="<?php echo __('We need a site name to begin.', 'impruwmain'); ?>"  >
                                <!-- <span class="help-block"></span> -->
                        <div class="p-messages"></div>

                    </div>
                    <div class="col-sm-2 aj-imp-domain">
                        <?php echo __('.impruw.com', 'impruwmain'); ?>
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputPass" class="col-sm-3 control-label"><?php echo __('Password', 'impruwmain'); ?></label>

                    <div class="col-sm-7 col-sm-offset-3">

                        <input type="password" class="form-control parsley-validated parsley-error" id="inputPass" name="user_pass" placeholder="<?php echo __('Easy to remember, hard to guess', 'impruwmain'); ?>"  parsley-required="true"  parsley-equalto="#inputPass"     parsley-trigger="blur" parsley-validation-minlength="0" parsley-minlength="6"  parsley-required-message="<?php echo __("Your password needs to be atleast 6 characters long.", 'impruwmain'); ?>"    >
                        <div class="p-messages"></div>

                    </div>
                </div>
                <div class="form-group">
                    <label for="inputRepass" class="col-sm-3 control-label"><?php echo __('Retype Password', 'impruwmain'); ?></label>

                    <div class="col-sm-7 col-sm-offset-3">

                        <input type="password" class="form-control parsley-validated parsley-error"   id="inputRepass" name="inputRepass" placeholder="<?php echo __('Confirm your password', 'impruwmain'); ?>"  required   parsley-equalto="#inputPass"   parsley-trigger="blur" parsley-validation-minlength="0"   parsley-required-message="<?php echo __('Please retype your password.', 'impruwmain'); ?>"  parsley-equalto-message="<?php echo __("Your passwords don't match. Try again.", 'impruwmain'); ?>"   >
                        <!-- <span  class="help-block"></span> -->
                        <div class="p-messages"></div>

                    </div>
                </div>
                <!--<div class="form-group">
                        <label for="" class="col-sm-3 control-label"><?php echo __('Prove you are not spam', 'impruwmain'); ?></label>
                        <div class="col-sm-offset-3 col-sm-7">
                                <div class="aj-imp-captcha-image"> 
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

                                </div> 
                        </div>
                </div> -->
                <!-- HneyPt -->
                <div class="form-group hidden">
                    <label for="inputHoney" class="col-sm-3 control-label"><?php echo __('Please leave this field blank if you see it.', 'impruwmain'); ?></label>

                    <div class="col-sm-7 col-sm-offset-3">

                        <input type="text" class="form-control parsley-validated parsley-error"   id="inputHoney" name="inputHoney" placeholder="<?php echo __('Honeypot', 'impruwmain'); ?>"  >
                        <!-- <span  class="help-block"></span> -->
                        <div class="p-messages"></div>

                    </div>
                </div>
                <!-- HneyPt -->
                <div class="form-group margin-1">
                    <div class="col-sm-offset-3 col-sm-7">
                        <div class="form-group">
                            <label for="checkbox2" class="checkbox">
                                <input type="checkbox" data-toggle="checkbox"  id="checkbox2" name="checkbox2"  value="1"   required  class="parsley-validated parsley-error"   parsley-trigger="blur" parsley-validation-minlength="0">
                                <?php echo __('By signing up you agree to our terms of use.', 'impruwmain'); ?>
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
                            <button type="button" class="btn btn-wide aj-imp-submit" id="btn_create_site" name="btn_create"  ><?php echo __('Get started!', 'impruwmain'); ?></button> 
                            <img id="registration_loader" src="<?php echo site_url() . "/wp-content/themes/impruwmain/images/loader.gif"; ?>" width="38" height="30"  style="display:none;"/>

                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-md-5 aj-imp-register-right">
            <div class="aj-imp-reg-step">
                <p>
                    <?php echo __('Once you sign up along with your new Impruw account your website will also be created. Take the next step and activate your account using the activation link sent to your email address.', 'impruwmain'); ?>
                </p>
                <p>
                    <?php echo __('If you don\'t see it in your inbox check your spam folder. ', 'impruwmain'); ?>
                </p>
                <p>
                    <?php echo __('Still don\'t see it?', 'impruwmain'); ?>
                    <br>
                    <a href="#"><?php echo __('Click here to resend activation mail', 'impruwmain'); ?></a>
                </p>
            </div>
            <div class="aj-imp-reg-step">
                <h5><?php echo __('What happens next?', 'impruwmain'); ?></h5>
                <p>
                    <?php echo __('Once your account is activated you can use our site builder  to create a professional website in under 30 minutes. Choose template that suit your need, customize your site and even add additional functionality like social media, bookings, contact forms and more. ', 'impruwmain'); ?>
                </p>
                <h5><?php echo __('Still facing problems?', 'impruwmain'); ?></h5>
                <p>
                    <?php echo __('Send us a mail on support@impruw.com', 'impruwmain'); ?>
                </p>
            </div>
        </div>
    </div>
</div>

<?php get_footer();