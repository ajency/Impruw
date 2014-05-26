<?php
    /**
     * Template Name: Password Reset
     */
    get_header();

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

            <form name="resetpassform" id="resetpassform" action="<?php echo esc_url( site_url( 'new-password?action=resetpass&key=' . urlencode( $_GET['key'] ) . '&login=' . urlencode( $_GET['login'] ), 'login_post' ) ); ?>" method="post" autocomplete="off">
                <input type="hidden" id="user_login" value="<?php echo esc_attr( $_GET['login'] ); ?>" autocomplete="off" />

                <p>
                    <label for="pass1"><?php _e('New password') ?><br />
                        <input type="password" name="pass1" id="pass1" class="input" size="20" value="" autocomplete="off" /></label>
                </p>
                <p>
                    <label for="pass2"><?php _e('Confirm new password') ?><br />
                        <input type="password" name="pass2" id="pass2" class="input" size="20" value="" autocomplete="off" /></label>
                </p>

                <div id="pass-strength-result" class="hide-if-no-js"><?php _e('Strength indicator'); ?></div>
                <p class="description indicator-hint"><?php _e('Hint: The password should be at least seven characters long. To make it stronger, use upper and lower case letters, numbers, and symbols like ! " ? $ % ^ &amp; ).'); ?></p>

                <br class="clear" />

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
                <p class="submit"><input type="submit" name="wp-submit" id="wp-submit" class="button button-primary button-large" value="<?php esc_attr_e('Reset Password'); ?>" /></p>
            </form>

            <p id="nav">
                <a href="<?php echo esc_url( wp_login_url() ); ?>"><?php _e( 'Log in' ); ?></a>
            </p>




<?php
        }
    endif;

    get_footer();
