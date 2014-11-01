<?php
/**
 * Template Name: Impruw Themes Showcase
 */
get_header();

if (have_posts()) : while (have_posts()) : the_post();
?>

<div class="aj-imp-themes aj-imp-register-form">
    
    <h1 class="main-title">
    	<?php the_title(); ?>
    </h1>
    <div class="pg-content">
    	<?php
	    // Get Post Content
	    the_content();
	    ?>
	    <a class="btn btn-hg register-link" href="<?php echo site_url(); ?>/register/"><?php echo __('Start Creating!', 'impruwmain'); ?></a>
	</div>
	<div class="grid clearfix">
		<figure class="effect-zoe">
			<div class="browser-bar">&middot;&middot;&middot;</div>
			<a target="_blank" href="http://minimal.impruw.com">
				<img src="<?php echo get_template_directory_uri(); ?>/<?php echo get_language_based_image_path(); ?>/MinimalThemeScreen-c.jpg" class="img-responsive"> 
			</a>
			<figcaption>
				<h2><span><?php echo __('Minimal', 'impruwmain'); ?></span><?php echo __('Theme', 'impruwmain'); ?></h2>
				<p class="icon-links">
					<a target="_blank" href="http://minimal.impruw.com"><span class="glyphicon glyphicon-eye-open"></span></a>
				</p>
				<p class="description"><?php echo __('A beautiful minimal and clean theme that is subtle yet profound', 'impruwmain'); ?></p>
			</figcaption>			
		</figure>
		<figure class="effect-zoe">
			<div class="browser-bar">&middot;&middot;&middot;</div>
			<a target="_blank" href="http://bluebold.impruw.com">
				<img src="<?php echo get_template_directory_uri(); ?>/<?php echo get_language_based_image_path(); ?>/BlueBoldThemeScreen-c.jpg" class="img-responsive"> 
			</a>
			<figcaption>
				<h2><?php echo __('Blue', 'impruwmain'); ?><span><?php echo __('Bold', 'impruwmain'); ?></span></h2>
				<p class="icon-links">
					<a target="_blank" href="http://bluebold.impruw.com"><span class="glyphicon glyphicon-eye-open"></span></a>
				</p>
				<p class="description"><?php echo __('The bold look that perfectly fits in a ton of content', 'impruwmain'); ?></p>
			</figcaption>			
		</figure>
		<figure class="effect-zoe">
			<div class="browser-bar">&middot;&middot;&middot;</div>
			<a target="_blank" href="http://classicgreen.impruw.com">
				<img src="<?php echo get_template_directory_uri(); ?>/<?php echo get_language_based_image_path(); ?>/ClassicGreenThemeScreen-c.jpg" class="img-responsive"> 
			</a>
			<figcaption>
				<h2><?php echo __('Classic', 'impruwmain'); ?><span><?php echo __('Green', 'impruwmain'); ?></span></h2>
				<p class="icon-links">
					<a target="_blank" href="http://classicgreen.impruw.com"><span class="glyphicon glyphicon-eye-open"></span></a>
				</p>
				<p class="description"><?php echo __('Natural and fairly calm offering a soothing look to your website', 'impruwmain'); ?></p>
			</figcaption>			
		</figure>
		<figure class="effect-zoe">
			<div class="browser-bar">&middot;&middot;&middot;</div>
			<a target="_blank" href="http://pinktheme.impruw.com">
				<img src="<?php echo get_template_directory_uri(); ?>/<?php echo get_language_based_image_path(); ?>/PinkThemeScreen-c.jpg" class="img-responsive"> 
			</a>
			<figcaption>
				<h2><span><?php echo __('Pink', 'impruwmain'); ?></span><?php echo __('Theme', 'impruwmain'); ?></h2>
				<p class="icon-links">
					<a target="_blank" href="http://pinktheme.impruw.com"><span class="glyphicon glyphicon-eye-open"></span></a>
				</p>
				<p class="description"><?php echo __('Fun and vibrant colors with a unique layout', 'impruwmain'); ?></p>
			</figcaption>			
		</figure>
		<figure class="effect-zoe">
			<div class="browser-bar">&middot;&middot;&middot;</div>
			<a target="_blank" href="http://neon.impruw.com">
				<img src="<?php echo get_template_directory_uri(); ?>/<?php echo get_language_based_image_path(); ?>/NeonThemeScreen-c.jpg" class="img-responsive">
			</a>
			<figcaption>
				<h2><span><?php echo __('Neon', 'impruwmain'); ?></span><?php echo __('Theme', 'impruwmain'); ?></h2>
				<p class="icon-links">
					<a target="_blank" href="http://neon.impruw.com"><span class="glyphicon glyphicon-eye-open"></span></a>
				</p>
				<p class="description"><?php echo __('Bold colors designed to grab your attention', 'impruwmain'); ?></p>
			</figcaption>			
		</figure>
		<figure class="effect-zoe">
			<div class="browser-bar">&middot;&middot;&middot;</div>
			<a target="_blank" href="http://diamond.impruw.com">
				<img src="<?php echo get_template_directory_uri(); ?>/<?php echo get_language_based_image_path(); ?>/DiamondThemeScreen-c.jpg" class="img-responsive"> 
			</a>
			<figcaption>
				<h2><span><?php echo __('Diamond', 'impruwmain'); ?></span><?php echo __('Theme', 'impruwmain'); ?></h2>
				<p class="icon-links">
					<a target="_blank" href="http://diamond.impruw.com"><span class="glyphicon glyphicon-eye-open"></span></a>
				</p>
				<p class="description"><?php echo __('Diamond offers a stylish and classy look with a sleek design', 'impruwmain'); ?></p>
			</figcaption>			
		</figure>
	</div>
</div>

<?php 
endwhile;
endif;

get_footer();