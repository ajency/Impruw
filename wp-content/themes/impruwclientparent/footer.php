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
	<?php if(is_page('contact-us')): ?>
	<script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
	<script>
		var map;
		function initialize() {
		  var mapOptions = {
		    zoom: 8,
		    center: new google.maps.LatLng(-34.397, 150.644)
		  };
		  map = new google.maps.Map(document.getElementById('map_canvas'),
		      mapOptions);
		}
	
		google.maps.event.addDomListener(window, 'load', initialize);

	</script>
	<?php endif; ?>
	<?php wp_footer(); ?>
	
	</script>
</body>
</html>