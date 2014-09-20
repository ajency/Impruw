<?php
/**
 * Template Name: 404
 */
get_header();
?>
    <div class="aj-imp-login-form">
        <div class="row">
            <div class="col-sm-12 aj-imp-login-header">
                <h1><?php echo __( 'Uh Oh!', 'impruwmain' ); ?>
                    <span><?php echo __( 'Not Found.', 'impruwmain' ); ?></span>
                </h1>
                <p class="desc">
                    <?php echo __( 'We could not find what you were looking for.', 'impruwmain' ); ?>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 aj-imp-login btn-home">
            	<span class="link button action-button">
	            	<a href="<?php echo site_url(); ?>"><?php echo __( 'Go Home', 'impruwmain' ); ?></a>
	            </span>
            </div>
        </div>
    </div>
    <style type="text/css">
        .error404 .site-style-container {
            height: 100vh;
        }
    	.btn-home {
    		text-align: center;
    	}
    </style>
    <script type="text/javascript">
        jQuery(document).ready(function () {
            jQuery('.error404.logged-in').css({'visibility': 'visible'})
        });
    </script>
<?php
get_footer();