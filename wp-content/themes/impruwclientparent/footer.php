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
    var HOTELADDRESS = '<?php echo get_hotel_address() ?>';
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
<script src="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/plugins/jquery.validate.js"></script>
<?php get_theme_JS(); ?>

<script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
<script>
    var map, geocoder;
    function initialize() {

        if(jQuery('#map_canvas').length === 0)
            return;

        geocoder = new google.maps.Geocoder();

        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(-34.397, 150.644)
        };

        geocoder.geocode({'address': HOTELADDRESS}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            }
            else{
                jQuery('#map_canvas').html('<div class="empty-view"><span class="glyphicon glyphicon-map-marker"></span>Please add an address for your site.</div>');
            }
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
</script>

<!-- Site Preview Options -->
<?php if(isset($_GET['preview'])):?>

    <script src="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/plugins/jquery.tabSlideOut.v1.3.js"></script>
    <script type="text/javascript">
        jQuery(function(){
            jQuery('.options-div').tabSlideOut({
                tabHandle: '.handle',                     //class of the element that will become your tab
                tabLocation: 'left',                      //side of screen where tab lives, top, right, bottom, or left
                speed: 300,                               //speed of animation
                action: 'click',                          //options: 'click' or 'hover', action to trigger animation
                topPos: '150px',                          //position from the top/ use if tabLocation is left or right
                fixedPosition: true                       //options: true makes it stick(fixed position) on scroll
            });
        });
    </script>
    <style type="text/css">
        .options-div {
            background: #333;
            width: 200px;
            padding: 0.5em;
            color: #fff;
            z-index: 9999;
            border-radius: 0 0 2px 0;
        }
        .options-div .handle {
            background: #333;
            padding: 0.4em 0.5em 0.5em;
            color: #fff;
            font-size: 1.5em;
            border-radius: 0 2px 2px 0;
        }
        .options-div .handle:hover {
            color: #FF7E00
        }
        .options-div h5 {
            font-size: 1.2em;
            text-transform: uppercase;
        }
        .options-div .option-colors {
            list-style: none;
            padding: 0;
        }
        .options-div .option-colors li a {
            display: block;
            margin-bottom: 0.5em;
            color: #ccc;
            padding: 0.5em;
            border-radius: 2px;
        }
        .options-div .option-colors li a:hover, .options-div .option-colors li a.active {
            background: #222;
            color: #fff;
        }
        .options-div .option-colors li a h6 {
            font-weight: 300;
            font-size: 0.8em;
        }
        .options-div .option-colors li a .color {
            display: inline-block;
            width: 15px;
            height: 15px;
            border: 1px solid #fff;
            margin: 0 0.2em 0.3em 0;
        }
    </style>

    <div class="options-div">
        <a class="handle" href="#"><span class="glyphicon glyphicon-cog"></span></a>
        <h5>Color Options</h5>
        <ul class="option-colors">
            <li>
                <a href="#" class="active">
                    <h6>Default</h6>
                    <span class="color" style="background: #24D07C;"></span>
                    <span class="color" style="background: #E223A1;"></span>
                    <span class="color" style="background: #39435C;"></span>
                    <span class="color" style="background: #545D73;"></span>
                    <span class="color" style="background: #E1E1E1;"></span>
                </a>
            </li>
            <li>
                <a href="#">
                    <h6>Lemon Dash</h6>
                    <span class="color" style="background: #ECFF33;"></span>
                    <span class="color" style="background: #212121;"></span>
                    <span class="color" style="background: #2F8F74;"></span>
                    <span class="color" style="background: #A0FB70;"></span>
                    <span class="color" style="background: #E1E1E1;"></span>
                </a>
            </li>
            <li>
                <a href="#">
                    <h6>Desert Song</h6>
                    <span class="color" style="background: #72451E;"></span>
                    <span class="color" style="background: #E7512E;"></span>
                    <span class="color" style="background: #B6AEA1;"></span>
                    <span class="color" style="background: #CBCBC1;"></span>
                    <span class="color" style="background: #E1E1E1;"></span>
                </a>
            </li>
        </ul>
    </div>
<?php endif; ?>

<?php wp_footer(); ?>
</body>
</html>