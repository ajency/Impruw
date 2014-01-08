<?php
/**
 * The template for displaying the footer.
 *
 * Contains footer content and the closing of the
 * 
 * @package Impruw Site
 * @subpackage Impruw Site
 * @since Impruw Site 1.0
 */
?>

		
		<footer class="site-footer">
                    <?php echo generate_markup('footer'); ?>
		</footer><!-- .site-footer -->
	</div><!-- .container -->
        <?php get_theme_JS() ;?>
	<?php wp_footer(); ?>
	<script>
		$('.carousel').carousel();
	</script>
</body>
</html>