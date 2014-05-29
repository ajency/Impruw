        </div>
        <footer class="aj-imp-lo-footer">
            <img src="<?php echo get_template_directory_uri(); ?>/images/impruw-hand.png" title="Impruw" alt="Impruw" />
            <div class="copyright">
                &copy;<?php _e('2013','impruwmain')?> <?php _e('All Rights Reserved. ','impruwmain')?> <?php _e('Impruw','impruwmain');?><sup>&reg;</sup> <?php _e('is a Registered Trademark. ','impruwmain');?> <?php echo __('Terms ','impruwmain');?> &amp; <?php echo __('Privacy ','impruwmain');?>
            </div>
        </footer>
    <?php wp_footer(); ?>
    
    <script type="text/javascript">
    	jQuery(document).ready(function(){
    		jQuery('.login-btn').popover({
    			'placement': 'auto bottom',
    			'html': true,
    			'content': '<form id="frm_login" name="frm_login"><div class="form-group"><input type="email" class="form-control" id="InputEmail" placeholder="Email"></div><div class="form-group"><button id="btn_login2" name="btn_login2" type="button" class="btn btn-xs btn-block aj-imp-submit">Sign In</button></div></form>',
    			'container': 'body'
    		});
    		jQuery('.login-btn').on('shown.bs.popover', function () {
				jQuery('.popover').addClass('login-pop');
				jQuery('#btn_login2').click(function() {

			            var data = {
			                action: 'user_interim_login',
			                pdemail: jQuery('#InputEmail').val()
			            };

			            jQuery.post(ajaxurl, data, function(response) {

			                if (response.code == 'OK') {
			                	//console.log(response.email);
			                    window.location.href = response.blog_url + '/sign-in?email='+response.email;
			                    return true;
			                } else if ((response.code == 'ERROR')) {

			                    $("#login_loader").hide();
			                    $("#login_status_div").show()
			                    $("#login_status").html('<div class="alert alert-error">' +
			                        '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
			                        response.msg + '</div>')

			                    return false;
			                }
			            });


			    });
			})
    	});
    </script>

</body>


