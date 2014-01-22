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
	<script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <?php get_theme_JS() ;?>
	<?php wp_footer(); ?>
	<script>
		$('.carousel').carousel();
		function initialize() {
            var map_canvas = document.getElementById('map_canvas');
            
            if(map_canvas === null)
              return;

            var youcou = new google.maps.LatLng(37.390345, -6.022595);
            var marker;
            var map_options = {
              center: new google.maps.LatLng(37.385299, -5.989634),
              zoom: 14,
              scrollwheel: false,
              mapTypeId: google.maps.MapTypeId.TERRAIN 
            }
            var map = new google.maps.Map(map_canvas, map_options)
            marker = new google.maps.Marker({
            map:map,
            draggable:true,
            animation: google.maps.Animation.DROP,
            position: map.getCenter()
          });
          google.maps.event.addListener(marker, 'click', toggleBounce);
          }
          
          function toggleBounce() {

              if (marker.getAnimation() != null) {
                marker.setAnimation(null);
              } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
              }
            }
          google.maps.event.addDomListener(window, 'load', initialize);
	</script>
</body>
</html>