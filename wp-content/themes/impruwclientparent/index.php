<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme and one of the
 * two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Impruw
 * @subpackage Impruw Site
 * @since Impruw Site 1.0
 */

get_header(); ?>

	<div class="site-page">
		<?php echo generate_markup('page'); ?>
	</div><!-- .site-page -->

<?php get_footer();