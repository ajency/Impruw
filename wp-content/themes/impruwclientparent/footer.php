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
    <span title="<?php echo __('Impruw is a Drag and Drop Website Builder', 'impruw'); ?>">
        <?php echo __('Powered By', 'impruw'); ?> 
        <a  href="http://impruw.com" target="_blank">
            <img src="<?php echo get_parent_template_directory_uri(); ?>/images/impruw-hand.png"> 
            <?php echo __('Impruw.com', 'impruw'); ?>
        </a>
    </span>
</div> 

<?php  if(is_impruw_demo_site()) : 
        include_once( dirname( __FILE__ ) . '/demosite.php' );
    endif; ?>

<div id="fb-root"></div>
<script type="text/javascript">
    var THEMEURL = '<?php echo get_parent_template_directory_uri(); ?>';
    var CHILDTHEMEURL = '<?php echo get_template_directory_uri(); ?>';
    var SITEURL = '<?php echo site_url(); ?>';
    var AJAXURL = '<?php echo admin_url('admin-ajax.php'); ?>';
    var HOTELADDRESS = '<?php echo get_hotel_address() ?>';
    var ISDEMOTHEME = '<?php echo in_array(get_current_blog_id(), explode(',', THEME_ID)) ?>';
    var PHRASES = <?php echo json_encode(load_language_phrases(FALSE));?>;
    var FOOTER = "<?php echo apply_filters('impruw_footer_selector', '');?>";
</script>
<?php if ( is_singular('impruw_room') ): ?>
    <script type="text/javascript">
        var PLANS = <?php echo json_encode(get_plans(FALSE)); ?>;
        var DATERANGE = <?php echo json_encode(get_date_range(FALSE)); ?>;
        var TARIFF = <?php echo json_encode(get_tariff(get_the_ID())); ?>;
        var CURRENCY = '<?php echo  get_option( 'currency', 'NOK' ); ?>';
        var BOOKING = <?php echo json_encode(get_bookings()); ?>;
    </script>
<?php endif; ?>
<?php wp_footer(); ?>
<!-- JS Error Tracking -->
<script>
    (function(_,e,rr,s){_errs=[s];var c=_.onerror;_.onerror=function(){var a=arguments;_errs.push(a);
    c&&c.apply(this,a)};var b=function(){var c=e.createElement(rr),b=e.getElementsByTagName(rr)[0];
    c.src="//beacon.errorception.com/"+s+".js";c.async=!0;b.parentNode.insertBefore(c,b)};
    _.addEventListener?_.addEventListener("load",b,!1):_.attachEvent("onload",b)})
    (window,document,"script","5440a65769c1935122000238");
</script>
 
</body>
</html>