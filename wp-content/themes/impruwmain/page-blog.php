<?php
/**
 * Template Name: Blog Page
 */
get_header();
?>

	<div id="content" class="impruw-blog aj-imp-register-form">

        <?php query_posts('post_type=post&post_status=publish&posts_per_page=10&paged='. get_query_var('paged')); ?>

	<?php if( have_posts() ): ?>

        <?php while( have_posts() ): the_post(); ?>

	    <div id="post-<?php echo get_the_ID(); ?>" <?php post_class(); ?>>
	    	<?php if ( has_post_thumbnail() ) { ?>
        		<a href="<?php the_permalink(); ?>" class="thumb">
        			<?php the_post_thumbnail( 'large' ); ?>
        		</a>
        	<?php } ?>
            <h2 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>

            <span class="meta"><strong><?php the_time('F jS, Y'); ?></strong> / <strong><?php the_author_link(); ?></strong> / <span class="comments"><?php comments_popup_link(__('0 comments','impruwmain'),__('1 comment','impruwmain'),__('% comments','impruwmain')); ?></span></span>

		<?php the_excerpt(__('Continue reading »','impruwmain')); ?>

            </div><!-- /#post-<?php get_the_ID(); ?> -->

        <?php endwhile; ?>

		<div class="navigation">
			<span class="newer"><?php previous_posts_link(__('« Newer','impruwmain')) ?></span> <span class="older"><?php next_posts_link(__('Older »','impruwmain')) ?></span>
		</div><!-- /.navigation -->

	<?php else: ?>

		<div id="post-404" class="noposts">

		    <p><?php _e('No posts found.','impruwmain'); ?></p>

	    </div><!-- /#post-404 -->

	<?php endif; wp_reset_query(); ?>

	</div><!-- /#content -->

<?php get_footer(); ?>