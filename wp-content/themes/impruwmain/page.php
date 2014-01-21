<?php
/**
 * Template Name: Default
 */

get_header();

if ( have_posts() ) : while ( have_posts() ) : the_post();
?>

<div class="aj-imp-register-form">
	<div class="row">
		<div class="col-sm-12 aj-imp-register-header">
			<h1><?php the_title(); ?></h1>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12 aj-imp-page-content">
			<?php 
				// Get Post Content
				the_content();
			?>
		</div>
	</div>
</div>
		
<?php
endwhile; endif;

 get_footer(); ?>    