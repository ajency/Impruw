<?php
/**
 * Template Name: Single Blog Post
 */
get_header();
?>

	<div id="content" class="impruw-blog single-post aj-imp-register-form">

	    <div class="row">
	    	<div class="col-sm-12">

				<?php if( have_posts() ): ?>

			        <?php while( have_posts() ): the_post(); ?>

				    <div id="post-<?php echo get_the_ID(); ?>" <?php post_class(); ?>>

				    	<h1 class="main-title">
					    	<?php the_title(); ?>
					    </h1>

			            <span class="meta">
			            	<strong><?php the_time('F jS, Y'); ?></strong> | Categories :<?php the_category(', '); ?> | <span class="comments"><?php comments_popup_link(__('No comments yet','impruwmain'),__('1 comment','impruwmain'),__('% comments','impruwmain')); ?></span>
			            </span>
			            <?php if ( has_post_thumbnail() ) { ?>
			        		<a href="<?php the_permalink(); ?>" class="thumb">
			        			<?php the_post_thumbnail( 'large', array('class' => 'img-responsive') ); ?>
			        		</a>
			        	<?php } ?>
			            <div class="excerpt">
							<?php the_content(); ?>
						</div>

			        </div><!-- /#post-<?php get_the_ID(); ?> -->

			        <?php endwhile; ?>

					<?php comments_template(); // Get comments.php template ?>

				<?php else: ?>

					<div id="post-404" class="noposts">

					    <p><?php _e('No posts found.','impruwmain'); ?></p>

				    </div><!-- /#post-404 -->

				<?php endif; ?>
			</div>

		</div>

	</div><!-- /#content -->

<?php get_footer(); ?>