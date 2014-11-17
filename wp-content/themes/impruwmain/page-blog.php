<?php
/**
 * Template Name: Blog Page
 */
get_header();
?>

	<section class="impruw-blog">
		<div id="content" class="site-content" role="main">

			<?php if ( have_posts() ) : ?>

			<header class="archive-header">
				<h1 class="archive-title"><?php printf( __( 'Category Archives: %s', 'impruwmain' ), single_cat_title( '', false ) ); ?></h1>

				<?php
					// Show an optional term description.
					$term_description = term_description();
					if ( ! empty( $term_description ) ) :
						printf( '<div class="taxonomy-description">%s</div>', $term_description );
					endif;
				?>
			</header><!-- .archive-header -->

			<?php
					// Start the Loop.
					while ( have_posts() ) : the_post();

					/*
					 * Include the post format-specific template for the content. If you want to
					 * use this in a child theme, then include a file called called content-___.php
					 * (where ___ is the post format) and that will be used instead.
					 */ ?>
					<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
						<?php twentyfourteen_post_thumbnail(); ?>

						<header class="entry-header">
							<?php if ( in_array( 'category', get_object_taxonomies( get_post_type() ) ) && twentyfourteen_categorized_blog() ) : ?>
							<div class="entry-meta">
								<span class="cat-links"><?php echo get_the_category_list( _x( ', ', 'Used between list items, there is a space after the comma.', 'impruwmain' ) ); ?></span>
							</div>
							<?php
								endif;

								if ( is_single() ) :
									the_title( '<h1 class="entry-title">', '</h1>' );
								else :
									the_title( '<h1 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h1>' );
								endif;
							?>

							<div class="entry-meta">
								<?php
									if ( 'post' == get_post_type() )
										twentyfourteen_posted_on();

									if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) :
								?>
								<span class="comments-link"><?php comments_popup_link( __( 'Leave a comment', 'impruwmain' ), __( '1 Comment', 'impruwmain' ), __( '% Comments', 'impruwmain' ) ); ?></span>
								<?php
									endif;

									edit_post_link( __( 'Edit', 'impruwmain' ), '<span class="edit-link">', '</span>' );
								?>
							</div><!-- .entry-meta -->
						</header><!-- .entry-header -->

						<?php if ( is_search() ) : ?>
						<div class="entry-summary">
							<?php the_excerpt(); ?>
						</div><!-- .entry-summary -->
						<?php else : ?>
						<div class="entry-content">
							<?php
								the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'impruwmain' ) );
								wp_link_pages( array(
									'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'impruwmain' ) . '</span>',
									'after'       => '</div>',
									'link_before' => '<span>',
									'link_after'  => '</span>',
								) );
							?>
						</div><!-- .entry-content -->
						<?php endif; ?>

						<?php the_tags( '<footer class="entry-meta"><span class="tag-links">', '', '</span></footer>' ); ?>
						</article><!-- #post-## -->

					<?php endwhile;
					// Previous/next page navigation.
					twentyfourteen_paging_nav();

				else :
					// If no content, include the "No posts found" template.
					get_template_part( 'content', 'none' );

				endif;
			?>
		</div><!-- #content -->
	</section><!-- #primary -->

<?php get_footer(); ?>