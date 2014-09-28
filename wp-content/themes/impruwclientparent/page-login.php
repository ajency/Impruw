<?php
/**
 * Template Name: Login
 */
get_header();
add_string_translations();
?>
    <div class="aj-imp-login-form">
        <div class="row">
            <div class="col-sm-12 aj-imp-login-header">
                <h1><?php echo icl_t('theme impruwlogin', 'sign_in', 'Sign in'); ?>
                    <span><?php echo icl_t('theme impruwlogin', 'impruw', 'Impruw'); ?></span>
                </h1>

                <p class="desc">
                    <?php echo icl_t('theme impruwlogin', 'sign_in_description', 'To access your website first Sign in to Impruw');?>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 aj-imp-login">
                <form class="form-horizontal clearfix" id="frm_login" name="login">
                    <?php
                    $ajax_nonce = wp_create_nonce( "frm_login" );
                    echo "<script> var ajax_nonce ='" . $ajax_nonce . "' </script>";
                    ?>
                    <span id="login_status"></span>

                    <div class="form-group">
                        <label for="inputEmail"
                               class="col-sm-3 control-label"><?php echo icl_t('theme impruwlogin', 'email_label', 'Email'); ?></label>

                        <div class="col-sm-6 col-sm-offset-3">

                            <input type="email" class="form-control  parsley-validated parsley-error" id="inputEmail"
                                   name="inputEmail" placeholder="<?php echo icl_t('theme impruwlogin', 'email_placeholder', 'Email ID you signed up with'); ?>" parsley-required="true"
                                   value="<?php echo isset($_GET[ 'email' ]) ? $_GET[ 'email' ] : ''; ?>"
                                   parsley-trigger="blur" parsley-validation-minlength="0" parsley-type="email"
                                   parsley-required-message="<?php echo icl_t('theme impruwlogin', 'email_validation_msg', 'A valid email address is required to sign in'); ?>"/>

                            <div class="p-messages"></div>

                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputPass"
                               class="col-sm-3 control-label"><?php echo icl_t('theme impruwlogin', 'password_label', 'Password'); ?></label>

                        <div class="col-sm-6 col-sm-offset-3">
                            <input type="password" class="form-control  parsley-validated parsley-error" id="inputPass"
                                   name="inputPass" placeholder="<?php echo icl_t('theme impruwlogin', 'password_label', 'Password'); ?>" parsley-required="true"
                                   parsley-trigger="blur" parsley-validation-minlength="0"
                                   parsley-required-message="<?php echo icl_t('theme impruwlogin', 'password_validation', 'You need to enter a password'); ?>"/>

                            <div class="p-messages"></div>
                        </div>
                        <div class="col-sm-3">
                            <a href="#"
                               class="aj-imp-log-forgot"><?php echo icl_t('theme impruwlogin', 'forgot_pswd_link_text', 'Forgot your password?'); ?></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-offset-3 col-sm-7">
                            <button type="button" id="login_btn" name="btn_login"
                                    class="btn btn-wide aj-imp-submit"><?php echo icl_t('theme impruwlogin', 'sign_in', 'Sign in'); ?></button>
                            <img class="login_loader"
                                 src="<?php echo site_url() . "/wp-content/themes/impruwmain/images/loader.gif"; ?>"
                                 width="38" height="30" style="display:none;"/>
                            <label for="checkbox3" class="checkbox keep-log">
                                <input type="checkbox" data-toggle="checkbox" id="checkbox3" name="checkbox3" value="1">
                                <?php echo icl_t('theme impruwlogin', 'keep_loggedin_checkbox', 'Keep me logged in.');?>
                            </label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-offset-3 col-sm-6" style="margin-top: 1em;">
                            <?php echo icl_t('theme impruwlogin', 'no_account_text', 'Dont have an account?');?> <a
                                href="<?php echo network_site_url( 'register' ); ?>"><?php echo icl_t('theme impruwlogin', 'sign_up_link_text', 'Sign Up!');?></a>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- Forgot Password Form -->
        <div class="row">
            <div id="display-msg"></div>
            <div class="col-sm-12 aj-imp-forgot hidden">
                <form class="form-horizontal clearfix" id="forgot_password_form" name="forgot_password_form">

                    <div class="form-group">
                        <label for="inputEmail"
                               class="col-sm-3 control-label"><?php echo icl_t('theme impruwlogin', 'email_label', 'Email'); ?></label>

                        <div class="col-sm-6 col-sm-offset-3">

                            <input type="email" class="form-control  parsley-validated parsley-error"
                                   id="forgotPasswordEmail"
                                   name="forgotPasswordEmail" placeholder="<?php echo icl_t('theme impruwlogin', 'email_placeholder', 'Email ID you signed up with'); ?>"
                                   parsley-required="true"
                                   parsley-validation-minlength="0"
                                   parsley-type="email"
                                   parsley-required-message="<?php echo icl_t('theme impruwlogin', 'email_validation_msg', 'A valid email address is required to sign in'); ?>"/>

                            <div class="p-messages"></div>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-offset-3 col-sm-7">
                            <button type="button" id="forgot_password_btn" name="forgot_password_btn"
                                    class="btn btn-wide aj-imp-submit"><?php echo icl_t('theme impruwlogin', 'reset_pswd_button', 'Reset Password'); ?></button>
                            <img class="login_loader"
                                 src="<?php echo site_url() . "/wp-content/themes/impruwmain/images/loader.gif"; ?>"
                                 width="38" height="30" style="display:none;"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-offset-3 col-sm-6" style="margin-top: 1em;">
                            <a href="#"
                               class="aj-imp-sign-back"><?php echo icl_t('theme impruwlogin', 'sign_in_back_link_text', '&laquo; Sign In'); ?></a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        jQuery(document).ready(function () {
            jQuery('.aj-imp-log-forgot').click(function (e) {
                e.preventDefault();
                jQuery('.aj-imp-login').addClass('hidden');
                jQuery('.aj-imp-forgot').removeClass('hidden');
            });
            jQuery('.aj-imp-sign-back').click(function (e) {
                e.preventDefault();
                jQuery('.aj-imp-login').removeClass('hidden');
                jQuery('.aj-imp-forgot').addClass('hidden');
            });
        });
    </script>
    <script src="<?php echo get_parent_template_directory_uri() ?>/js/parsley.js"></script>
    <?php 
        //Check for the current language and load the right parsley messages file
    $current_language = ICL_LANGUAGE_CODE;
    if ($current_language === 'nb'){
        ?>
        <script src="<?php echo get_parent_template_directory_uri() ?>/js/parsley/i18n/messages.no.js"></script>
        <?php       }?>
<?php
get_footer();
