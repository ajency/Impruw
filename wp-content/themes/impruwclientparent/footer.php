<?php
/**
 * The template for displaying the footer.
 *
 * Contains footer content and the closing of the
 *
 * @package    Impruw Site
 * @subpackage Impruw Site
 * @since      Impruw Site 1.0
 */
?>

<footer class="site-footer">
    <?php echo generate_markup( 'footer' ); ?>
</footer><!-- .site-footer -->
</div><!-- .container -->

<div class="power-up hide">
    <?php echo __('Powered By', 'impruw'); ?> 
    <a  href="http://impruw.com" target="_blank" 
        title="<?php echo __('Impruw is a Drag and Drop Website Builder', 'impruw'); ?>">
        <img src="<?php echo get_parent_template_directory_uri(); ?>/images/impruw-hand.png"> 
        <?php echo __('Impruw.com', 'impruw'); ?>
    </a>
</div>

<div id="fb-root"></div>

<?php wp_footer(); ?>
</body>
</html>