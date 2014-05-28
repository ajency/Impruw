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
    			'content': '<form><div class="form-group"><input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email"></div><div class="form-group"><button type="submit" class="btn btn-xs btn-block aj-imp-submit">Sign In</button></div></form>',
    			'container': 'body'
    		});
    		jQuery('.login-btn').on('shown.bs.popover', function () {
				jQuery('.popover').addClass('login-pop');
			})
    	});
    </script>

</body>


