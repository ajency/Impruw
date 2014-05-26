<?php
    /**
     * Template Name: Password Reset
     */
    get_header();


    // check if the url parameters are set
    if(isset($_GET['action']) && $_GET['action'] == "reset_password"):

        // Check if the password reset key matches with the user activation key in db
        $user = check_password_reset_key($_GET['key'], $_GET['login']);

        if ( is_wp_error($user) ) {
            if ( $user->get_error_code() === 'expired_key' )
                echo 'The key has expired';
                //wp_redirect( site_url( 'wp-login.php?action=lostpassword&error=expiredkey' ) );
            else
                echo 'The key has does not match user records';
                //wp_redirect( site_url( 'wp-login.php?action=lostpassword&error=invalidkey' ) );
            exit;
        }
        else{ ?>
            <div class="aj-imp-login-form">
                <div class="row">
                    <div class="col-sm-12 aj-imp-login-header">
                        <h1>Reset Password  <span>Impruw</span>
                        </h1>
                        <p class="desc">
                            Reset your Password to Sign in to Impruw                
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 aj-imp-forgot">
                        <form name="resetpassform" id="resetpassform" action="<?php echo esc_url( site_url( 'new-password?action=resetpass&key=' . urlencode( $_GET['key'] ) . '&login=' . urlencode( $_GET['login'] ), 'login_post' ) ); ?>" method="post" autocomplete="off" class="form-horizontal clearfix">
                            <input type="hidden" id="user_login" value="<?php echo esc_attr( $_GET['login'] ); ?>" autocomplete="off" />

                            <div class="form-group">
                                <label for="pass1" class="col-sm-3 control-label"><?php _e('New password') ?></label>
                                <div class="col-sm-6 col-sm-offset-3">
                                    <input type="password" name="pass1" id="pass1" class="form-control" value="" autocomplete="off" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="pass2" class="col-sm-3 control-label"><?php _e('Confirm new password') ?></label>
                                <div class="col-sm-6 col-sm-offset-3">
                                    <input type="password" name="pass2" id="pass2" class="form-control" value="" autocomplete="off" />
                                </div>
                            </div>

                            <?php
                            /**
                             * Fires following the 'Strength indicator' meter in the user password reset form.
                             *
                             * @since 3.9.0
                             *
                             * @param WP_User $user User object of the user whose password is being reset.
                             */
                            do_action( 'resetpass_form', $user );
                            ?>
                            <div class="row">
                                <div class="col-sm-offset-3 col-sm-7 submit">
                                    <input type="submit" name="wp-submit" id="wp-submit" class="btn btn-wide aj-imp-submit" value="<?php esc_attr_e('Reset Password'); ?>" />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-offset-3 col-sm-7">
                                    <span class="help-block"><?php _e('Hint: The password should be at least seven characters long. To make it stronger, use upper and lower case letters, numbers, and symbols like ! " ? $ % ^ &amp; ).'); ?></span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

<?php
        }
    endif;


    if(isset($_POST['wp-submit'])):
        echo "<p> We have sent you an email with a link to reset your password.
                 If you haven't received it in the next 5 minutes, check your spam folder or email us at support@impruw.com
             </p>";
        endif;

    get_footer();
