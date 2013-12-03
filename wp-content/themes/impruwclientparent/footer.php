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
                    <?php echo generateMarkup('footer'); ?>
		</footer><!-- .site-footer -->
	</div><!-- .container -->
        <?php getThemeJS() ;?>
	<?php wp_footer(); ?>
</body>
</html>