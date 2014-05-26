<?php
    /**
     * Template Name: New Password
     */
    get_header();

    if(isset($_GET['action']) &&  $_GET['action'] == "resetpass"):

        //check user authentication
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

        $errors = new WP_Error();
        //check if both passwords match
        if ( isset($_POST['pass1']) && $_POST['pass1'] != $_POST['pass2'] )
            $errors->add( 'password_reset_mismatch', __( 'The passwords do not match.' ) );

        do_action( 'validate_password_reset', $errors, $user );

        if ( ( ! $errors->get_error_code() ) && isset( $_POST['pass1'] ) && !empty( $_POST['pass1'] ) ) {
            reset_password($user, $_POST['pass1']);
            login_header( __( 'Password Reset' ), '<p class="message reset-pass">' . __( 'Your password has been reset.' ) . ' <a href="' . esc_url( wp_login_url() ) . '">' . __( 'Log in' ) . '</a></p>' );
            login_footer();
            exit;
        }

        wp_enqueue_script('utils');
        wp_enqueue_script('user-profile');

        login_header(__('Reset Password'), '<p class="message reset-pass">' . __('Enter your new password below.') . '</p>', $errors );

    endif;

?>

<?php
    get_footer();
