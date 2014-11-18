<?php
/**
 * Template Name: Blog Page
 */
get_header();
?>

	<div id="content" class="impruw-blog aj-imp-register-form">

		<h1 class="main-title">
	    	<?php the_title(); ?>
	    </h1>

	    <div class="row">
	    	<div class="col-sm-9">

        <?php query_posts('post_type=post&post_status=publish&posts_per_page=10&paged='. get_query_var('paged')); ?>

	<?php if( have_posts() ): ?>

        <?php while( have_posts() ): the_post(); ?>

	    <div id="post-<?php echo get_the_ID(); ?>" <?php post_class(); ?>>
	    	
            <h2 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>

            <span class="meta">
            	Posted by <strong><?php the_author_link(); ?></strong> | on <strong><?php the_time('F jS, Y'); ?></strong> | <span class="comments"><?php comments_popup_link(__('No comments yet','impruwmain'),__('1 comment','impruwmain'),__('% comments','impruwmain')); ?></span>
            </span>
            <?php if ( has_post_thumbnail() ) { ?>
        		<a href="<?php the_permalink(); ?>" class="thumb">
        			<?php the_post_thumbnail( 'large', array('class' => 'img-responsive') ); ?>
        		</a>
        	<?php } ?>
            <div class="excerpt">
				<?php the_excerpt(__('Read More','impruwmain')); ?>
			</div>

			<a href="<?php the_permalink(); ?>" class="more-link"><?php _e('Read More','impruwmain'); ?></a>

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
			</div>

			<div class="col-sm-3">
				<div class="blog-sidebar">
					<ul class="cat-list">
						<?php 
						    $args = array(
							'show_option_all'    => '',
							'orderby'            => 'name',
							'order'              => 'ASC',
							'style'              => 'list',
							'show_count'         => 0,
							'hide_empty'         => 1,
							'use_desc_for_title' => 1,
							'child_of'           => 0,
							'feed'               => '',
							'feed_type'          => '',
							'feed_image'         => '',
							'exclude'            => '',
							'exclude_tree'       => '',
							'include'            => '',
							'hierarchical'       => 1,
							'title_li'           => __( 'Categories' ),
							'show_option_none'   => __( 'No categories' ),
							'number'             => null,
							'echo'               => 1,
							'depth'              => 0,
							'current_category'   => 0,
							'pad_counts'         => 0,
							'taxonomy'           => 'category',
							'walker'             => null
						    );
						    wp_list_categories( $args ); 
						?>
					</ul>
				</div>
			</div>

		</div>

	</div><!-- /#content -->

<?php get_footer(); ?>