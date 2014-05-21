<?php
    /**
     * Template Name: Password Reset
     */
    get_header();
?>
    <div class="aj-imp-login-form">
        <div class="row">
            <div class="col-sm-12 aj-imp-login-header">
                <h1><?php echo __('Password Reset', 'impruwmain'); ?>  <span><?php echo __('Impruw', 'impruwmain'); ?></span>
                </h1>

                <p class="desc">
                    <?php echo __('Reset your password here.', 'impruwmain'); ?>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 aj-imp-login">
                <form class="form-horizontal clearfix" id="" name="">
                    
                    <div class="form-group">
                        <label for="inputEmail"
                               class="col-sm-3 control-label"><?php echo __('Email', 'impruwmain'); ?></label>

                        <div class="col-sm-8 col-sm-offset-3">

                            <input type="email" class="form-control  parsley-validated parsley-error" id="inputEmail"
                                   name="inputEmail" placeholder="Email ID you signed up with" parsley-required="true"
                                   parsley-trigger="blur" parsley-validation-minlength="0" parsley-type="email"
                                   parsley-required-message="<?php echo __('A valid email address is required to sign in', 'impruwmain'); ?>"/>

                            <div class="p-messages"></div>

                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputPass"
                               class="col-sm-3 control-label"><?php echo __('New Password', 'impruwmain'); ?></label>

                        <div class="col-sm-8 col-sm-offset-3">
                            <input type="password" class="form-control  parsley-validated parsley-error" id="inputPass"
                                   name="inputPass" placeholder="Password" parsley-required="true"
                                   parsley-trigger="blur" parsley-validation-minlength="0"
                                   parsley-required-message="<?php echo __('You need to enter a password', 'impruwmain'); ?>"/>

                            <div class="p-messages"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputPass"
                               class="col-sm-3 control-label"><?php echo __('Re-type Password', 'impruwmain'); ?></label>

                        <div class="col-sm-8 col-sm-offset-3">
                            <input type="password" class="form-control  parsley-validated parsley-error" id="inputPass"
                                   name="inputPass" placeholder="Password" parsley-required="true"
                                   parsley-trigger="blur" parsley-validation-minlength="0"
                                   parsley-required-message="<?php echo __('You need to enter a password', 'impruwmain'); ?>"/>

                            <div class="p-messages"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-offset-3 col-sm-7">
                            <button type="button" id="btn_login" name="btn_login"
                                    class="btn btn-wide aj-imp-submit"><?php echo __('Reset Password', 'impruwmain'); ?></button>
                            <img id="login_loader"
                                 src="<?php echo site_url() . "/wp-content/themes/impruwmain/images/loader.gif"; ?>"
                                 width="38" height="30" style="display:none;"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
<?php
    get_footer();
