<?php
/**
 * Template Name: Reset Password
 */
get_header();
?>
    <div class="aj-imp-login-form">
        <div class="row">
            <div class="col-sm-12 aj-imp-login-header">
                <h1><?php echo __( 'Reset Password', 'impruwmain' ); ?>
                    <span><?php echo __( 'Impruw', 'impruwmain' ); ?></span>
                </h1>

                <p class="desc">
                    <?php echo __( 'To access your website first Sign in to Impruw', 'impruwmain' ); ?>
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
                    '.__( 'Expired Key', 'impruwmain' ).'</div>';
                else
                    echo '<div class="alert alert-error">
                    <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
                    '.__( 'Invalid Key', 'impruwmain' ).'</div>';
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
                               class="col-sm-3 control-label"><?php echo __( 'New Password', 'impruwmain' ); ?></label>
                        <div class="col-sm-6 col-sm-offset-3">
                            <input type="password" class="form-control  parsley-validated parsley-error" id="newPassword"
                                   name="newPassword" placeholder="<?php echo __( 'New Password', 'impruwmain' ); ?>" parsley-required="true"
                                   parsley-trigger="blur" parsley-validation-minlength="0"
                                   parsley-required-message="<?php echo __( 'You need to enter a password', 'impruwmain' ); ?>"/>

                            <div class="p-messages"></div>
                            <input type="text" style="display: none" value="<?php echo $_GET['login'] ?>" id="email">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputPass"
                               class="col-sm-3 control-label"><?php echo __( 'Password', 'impruwmain' ); ?></label>

                        <div class="col-sm-6 col-sm-offset-3">
                            <input type="password" class="form-control  parsley-validated parsley-error" id="confirmPassword"
                                   name="confirmPassword" placeholder="Password" parsley-required="true"
                                   parsley-trigger="blur" parsley-validation-minlength="0"
                                   parsley-required-message="<?php echo __( 'You need to enter a password', 'impruwmain' ); ?>"/>

                            <div class="p-messages"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-offset-3 col-sm-7">
                            <button type="button" id="reset-pass" name="reset-pass"
                                    class="btn btn-wide aj-imp-submit"><?php echo __( 'Submit', 'impruwmain' ); ?></button>
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
                Invalid Url</div>
        <?php }?>

    </div>

<?php
get_footer();
