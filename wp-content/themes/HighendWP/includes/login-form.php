<?php
/**
 * @package WordPress
 * @subpackage Highend
 */
?>
<!-- START #login-form -->
    <!-- <form action="<?php// echo wp_login_url( apply_filters( 'the_permalink', get_permalink() ) ) ; ?>" id="hb-login-form" name="hb-login-form" method="post" class="hb-login-form" >
        <p><input type="text" id="username" name="log" placeholder="<?php// _e('Username', 'hbthemes'); ?>" class="required requiredField text-input"/></p>
        <p><input type="password" id="password" name="pwd" placeholder="<?php// _e('Password', 'hbthemes'); ?>" class="required requiredField text-input"></p>
        <p class="hb-checkbox clearfix">
            <label><input name="rememberme" type="checkbox" id="rememberme" value="forever" class="hb-remember-checkbox" /><?php // _e('Remember me?', 'hbthemes'); ?></label>
            <?php 
            // if(get_option('users_can_register')) { ?>
            	<a href="<?php // bloginfo('wpurl'); ?>/wp-login.php?action=register" id="quick-register-button"><?php // _e('Register','hbthemes'); ?></a>
            <?php // } ?>
        </p>

        <a href="#" id="hb-submit-login-form" class="hb-button no-three-d hb-small-button"><?php // _e('Login', 'hbthemes'); ?></a>

    </form> -->

    <form id="frm_login" name="frm_login" class="hb-login-form">
        <div class="form-group">
            <input type="email" class="form-control" id="InputEmail" placeholder="<?php echo __('Email') ; ?>">
        </div>
        <div class="form-group">
            <button id="btn_login2" name="btn_login2" type="button" class="hb-button hb-carrot no-three-d hb-small-button aj-imp-submit"><?php echo  __( 'Sign In' ); ?></button>
        </div>
        <div id="login_status_div" class="hidden">
            <span class="icon icon-warning">
            
            </span> 
            <span id="login_status">
                
            </span>
        </div>
    </form>