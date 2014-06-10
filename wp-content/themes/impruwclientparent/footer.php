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
<script type="text/javascript">
    var THEMEURL = '<?php echo get_parent_template_directory_uri(); ?>';
    var SITEURL = '<?php echo site_url(); ?>';
    var AJAXURL = '<?php echo admin_url('admin-ajax.php'); ?>';
</script>
<?php if ( is_singular() ): ?>
    <script type="text/javascript">
        var PLANS = <?php echo json_encode(get_plans()); ?>;
        var DATERANGE = <?php echo json_encode(get_date_range()); ?>;
        //var TARIFF =
        <?php echo json_encode(get_tariff(2)); ?>;
        var TARIFF = <?php echo json_encode(get_tariff(get_the_ID())); ?>;
        var BOOKING = <?php echo json_encode(get_bookings()); ?>;
    </script>
<?php endif; ?>
<?php if ( is_page( 'contact-us' ) ): ?>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/plugins/jquery.validate.js"></script>
<?php endif; ?>

<?php get_theme_JS(); ?>
<?php if ( is_page( 'contact-us' ) ): ?>
    <script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script>
        var map, geocoder;
        function initialize() {
            geocoder = new google.maps.Geocoder();

            var mapOptions = {
                zoom: 8,
                center: new google.maps.LatLng(-34.397, 150.644)
            };
            map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

            geocoder.geocode({'address': HOTELADDRESS}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    </script>
<?php endif; ?>
<?php wp_footer(); ?>
</body>
</html>