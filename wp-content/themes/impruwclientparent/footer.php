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
  <script type="text/javascript">
  var AJAXURL = "<?php echo admin_url('admin-ajax.php'); ?>";
  </script>
	<script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <?php get_theme_JS() ;?>
	<?php wp_footer(); ?>
	<script>

		var marker, map ;

    $('.carousel').carousel();
    
    geocoder = new google.maps.Geocoder();

		function initialize() {

      var address = $('#map_canvas').attr('data-address');

      geocoder.geocode( { 'address': address}, function(results, status) {
        
        if (status == google.maps.GeocoderStatus.OK) {
          
          map.setCenter(results[0].geometry.location);
          
          marker = new google.maps.Marker({
            map:map,
            //draggable:true,
            animation: google.maps.Animation.DROP,
            position: map.getCenter()
          });
          
          //google.maps.event.addListener(marker, 'click', toggleBounce);
        
        } 
        else {
          
          alert('Geocode was not successful for the following reason: ' + status);
        
        }

      });

      var map_canvas = document.getElementById('map_canvas');
      
      if(map_canvas === null)
        return;

      var map_options = {
        //center: new google.maps.LatLng(37.385299, -5.989634),
        zoom: 17,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.TERRAIN 
      }
      
      map = new google.maps.Map(map_canvas, map_options)
    
    }
    
    function toggleBounce() {

        if (marker.getAnimation() != null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
    
    $(document).ready(function(){
    
      initialize();

    });

	</script>
</body>
</html>