<?php
/**
 * Template Name: Reset Password
 */
get_header();
?>
    <div class="aj-imp-login-form">
        <div class="row">
            <div class="col-sm-12 aj-imp-login-header">
                <h1><?php echo icl_t('theme impruwlogin', 'reset_pswd_button', 'Reset Password'); ?>
                    <span><?php echo icl_t('theme impruwlogin', 'impruw', 'Impruw'); ?></span>
                </h1>

                <p class="desc">
                    <?php echo icl_t('theme impruwlogin', 'sign_in_description', 'To access your website first Sign in to Impruw'); ?>
                </p>
            </div>
        </div>
        <?php

        if(isset($_GET['key']) &&  $_GET['login']  &&  $_GET['action'] ){
            $user = check_password_reset_key($_GET['key'], $_GET['login']);

            if ( is_wp_error($user) ) {
                if ( $user->get_error_code() === 'expired_key' )
                    echo '<div class="alert alert-error">
                    <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
                    '.icl_t('theme impruwlogin', 'reset_pswd_expired_key', 'Expired Key').'</div>';
                else
                    echo '<div class="alert alert-error">
                    <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
                    '.icl_t('theme impruwlogin', 'reset_pswd_invalid_key', 'Invalid Key').'</div>';
                exit;
            }

        ?>
        <div class="row">
            <div id="display-msg"></div>
            <div class="col-sm-12 aj-imp-login">
                <form class="form-horizontal clearfix" id="change-password" name="change-password">
                    <?php
                    $ajax_nonce = wp_create_nonce( "change-password" );
                    echo "<script> var ajax_nonce ='" . $ajax_nonce . "' </script>";
                    ?>


                    <div class="form-group">
                        <label for="inputEmail"
                               class="col-sm-3 control-label"><?php echo icl_t('theme impruwlogin', 'new_password_label', 'New Password'); ?></label>
                        <div class="col-sm-6 col-sm-offset-3">
                            <input type="password" class="form-control  parsley-validated parsley-error" id="newPassword"
                                   name="newPassword" placeholder="<?php echo icl_t('theme impruwlogin', 'new_password_label', 'New Password'); ?>" parsley-required="true"
                                   parsley-trigger="blur" parsley-validation-minlength="0"
                                   parsley-required-message="<?php echo icl_t('theme impruwlogin', 'password_validation', 'You need to enter a password'); ?>"/>

                            <div class="p-messages"></div>
                            <input type="text" style="display: none" value="<?php echo $_GET['login'] ?>" id="email">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputPass"
                               class="col-sm-3 control-label"><?php echo icl_t('theme impruwlogin', 'password_label', 'Password'); ?></label>

                        <div class="col-sm-6 col-sm-offset-3">
                            <input type="password" class="form-control  parsley-validated parsley-error" id="confirmPassword"
                                   name="confirmPassword" placeholder="<?php echo icl_t('theme impruwlogin', 'password_label', 'Password'); ?>" parsley-required="true"
                                   parsley-trigger="blur" parsley-validation-minlength="0"
                                   parsley-required-message="<?php echo icl_t('theme impruwlogin', 'password_validation', 'You need to enter a password'); ?>"/>

                            <div class="p-messages"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-offset-3 col-sm-7">
                            <button type="button" id="reset-pass" name="reset-pass"
                                    class="btn btn-wide aj-imp-submit"><?php echo icl_t('theme impruwlogin', 'submit_btn_label', 'Submit'); ?></button>
                            <img class="login_loader"
                                 src="<?php echo site_url() . "/wp-content/themes/impruwmain/images/loader.gif"; ?>"
                                 width="38" height="30" style="display:none;"/>
                        </div>
                    </div>
                    <input type="reset" id="reset-form" style="display: none">
                </form>
            </div>
        </div>

        <?php }else { ?>
            <div class="alert alert-error">
                <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
                <?php echo icl_t('theme impruwlogin', 'invalid_url_msg', 'Invalid Url')?></div>
        <?php }?>

    </div>

<?php
get_footer();
