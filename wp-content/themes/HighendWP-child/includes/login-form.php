<?php
/**
 * @package WordPress
 * @subpackage Highend
 */
?>
<!-- START #login-form -->
    

    <form id="frm_login" name="frm_login" class="hb-login-form">
        <div class="form-group">
            <input type="email" class="form-control" id="InputEmail" placeholder="<?php _e('Email', 'impruwmain'); ?>">
        </div>
        <div class="form-group">
            <button id="btn_login2" name="btn_login2" type="button" class="hb-button hb-carrot no-three-d hb-small-button aj-imp-submit"><?php  _e('Sign In', 'impruwmain'); ?></button>
        </div>
        <div id="login_status_div" class="hidden">
            <span class="icon icon-warning">
            
            </span> 
            <span id="login_status">
                
            </span>
        </div>
    </form>