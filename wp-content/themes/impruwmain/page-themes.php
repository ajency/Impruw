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
	    <a class="btn btn-hg register-link" href="http://impruw.com/register/"><?php echo __('Start Creating!', 'impruwmain'); ?></a>
	</div>
    <div class="aj-imp-block-list">
		<ul>
			<li class="block">
				<img src="http://minimal.impruw.com/wp-content/uploads/2014/07/MinimalTheme-244x300.png" class="img-responsive"> 
				<h6 class="desc"><?php echo __('Minimal Theme', 'impruwmain'); ?></h6> 
				<div class="aj-imp-choose-btn">  
					<a class="btn" target="_blank" href="http://minimal.impruw.com"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;<?php echo __('Preview', 'impruwmain'); ?></a> 
				</div> 
			</li>

			<li class="block">
				<img src="http://minimal.impruw.com/wp-content/uploads/2014/01/template3-225x300.jpg" class="img-responsive"> 
				<h6 class="desc"><?php echo __('Blue Bold', 'impruwmain'); ?></h6> 
				<div class="aj-imp-choose-btn"> 
					<a class="btn" target="_blank" href="http://bluebold.impruw.com"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;<?php echo __('Preview', 'impruwmain'); ?></a> 
				</div> 
			</li>

			<li class="block">
				<img src="http://minimal.impruw.com/wp-content/uploads/2014/01/template1-225x300.jpg" class="img-responsive"> 
				<h6 class="desc"><?php echo __('Classic Green', 'impruwmain'); ?></h6> 
				<div class="aj-imp-choose-btn"> 
					<a class="btn" target="_blank" href="http://classicgreen.impruw.com"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;<?php echo __('Preview', 'impruwmain'); ?></a> 
				</div> 
			</li>

			<li class="block">
				<img src="http://minimal.impruw.com/wp-content/uploads/2014/03/template2-225x300.jpg" class="img-responsive"> 
				<h6 class="desc"><?php echo __('Pink Theme', 'impruwmain'); ?></h6> 
				<div class="aj-imp-choose-btn"> 
					<a class="btn" target="_blank" href="http://pinktheme.impruw.com"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;<?php echo __('Preview', 'impruwmain'); ?></a> 
				</div> 
			</li>

			<li class="block">
				<img src="http://minimal.impruw.com/wp-content/uploads/2014/06/template4-225x300.jpg" class="img-responsive"> 
				<h6 class="desc"><?php echo __('Neon Theme', 'impruwmain'); ?></h6> 
				<div class="aj-imp-choose-btn"> 
					<a class="btn" target="_blank" href="http://neon.impruw.com"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;<?php echo __('Preview', 'impruwmain'); ?></a> 
				</div> 
			</li>

			<li class="block">
				<img src="http://minimal.impruw.com/wp-content/uploads/2014/05/screenshot-225x300.png" class="img-responsive"> 
				<h6 class="desc"><?php echo __('Diamond Theme', 'impruwmain'); ?></h6> 
				<div class="aj-imp-choose-btn"> 
					<a class="btn" target="_blank" href="http://diamond.impruw.com"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;<?php echo __('Preview', 'impruwmain'); ?></a> 
				</div> 
			</li>
		</ul>
	</div>
</div>

<?php 
endwhile;
endif;

get_footer();