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
    var CHILDTHEMEURL = '<?php echo get_template_directory_uri(); ?>';
    var SITEURL = '<?php echo site_url(); ?>';
    var AJAXURL = '<?php echo admin_url('admin-ajax.php'); ?>';
    var HOTELADDRESS = '<?php echo get_hotel_address() ?>';
    var ISDEMOTHEME = '<?php echo in_array(get_current_blog_id(), explode(',', THEME_ID)) ?>';
    var PHRASES = <?php echo json_encode(load_language_phrases(FALSE));?>;
</script>
<?php if ( is_singular('impruw_room') ): ?>
    <script type="text/javascript">
        
        var PLANS = <?php echo json_encode(get_plans(FALSE)); ?>;
        var DATERANGE = <?php echo json_encode(get_date_range(FALSE)); ?>;
        var TARIFF = <?php echo json_encode(get_tariff(get_the_ID())); ?>;
        var BOOKING = <?php echo json_encode(get_bookings()); ?>;
        
    </script>
<?php endif; ?>
<script src="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/plugins/jquery.validate.js"></script>
<?php get_theme_JS(); ?>


<script>
    var map, geocoder;
    jQuery(document).ready(function(){

        if(jQuery('#map_canvas').length === 0)
            return;

        
        window.initializeMap = function(){

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
                    if(jQuery('#map_canvas').height() === 0)
                        jQuery('#map_canvas').height(300);
                }
                else{
                    jQuery('#map_canvas').html('<div class="empty-view"><span class="glyphicon glyphicon-map-marker"></span>Please add an address for your site.</div>');
                }
            });
        }
        jQuery.getScript('https://maps.googleapis.com/maps/api/js?sensor=false&callback=initializeMap');

    });

</script>

<!-- Site Preview Options -->
<?php
    $theme_preview_ids = explode(',', THEME_ID);
    if (in_array(get_current_blog_id(), $theme_preview_ids)): ?>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/js/jquery.cookie.js"></script>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/plugins/jquery.tabSlideOut.v1.3.js"></script>
   
    <style type="text/css">
        .options-div {
            background: #333;
            width: 200px;
            padding: 0.5em;
            color: #fff;
            z-index: 9999;
            border-radius: 0 0 2px 0;
            height: auto !important;
        }
        .options-div .handle {
            background: #333;
            padding: 0.4em 0.5em 0.5em;
            color: #fff;
            font-size: 1.5em;
            border-radius: 0 2px 2px 0;
            right: -54px !important;
        }
        .options-div.open .handle {
            right: -42px !important;
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

            <?php 
                $theme_set_color = theme_color_sets();
                $custom_set = get_option( 'custom_theme_color_set' );
                if ( !empty( $custom_set ) ) {

                    $custom_set_array = array( maybe_unserialize( $custom_set ) );

                    $theme_set_color = wp_parse_args( $custom_set_array, $theme_set_color );
                }
                // var_dump($theme_set_color);

                foreach ($theme_set_color as $color_scheme ) {
                    if ($color_scheme['name'] == 'custom') continue;
                    if( (isset($_COOKIE['color_scheme']) && $color_scheme['name'] == $_COOKIE['color_scheme']) || (!isset($_COOKIE['color_scheme']) && $color_scheme['name'] == 'Default') )
                        echo "<li> <a href='#' class='active' data-color='{$color_scheme['name']}'>";
                    else 
                        echo "<li> <a href='#' class='' data-color='{$color_scheme['name']}'>";
                    echo "<h6>{$color_scheme['name']}</h6>";
                    foreach ($color_scheme as $key => $value) {
                        if($key != 'name')
                            echo "<span class='color' style='background: ".$value['color'].";'></span>";
                    }

                    echo '</a></li>';
                } 
            ?>
            
        </ul>
    </div>
    <script type="text/javascript">
     
        jQuery(document).ready(function($){
            


            jQuery('.options-div').tabSlideOut({
                tabHandle: '.handle',                     //class of the element that will become your tab
                tabLocation: 'left',                      //side of screen where tab lives, top, right, bottom, or left
                speed: 100,                               //speed of animation
                action: 'click',                          //options: 'click' or 'hover', action to trigger animation
                topPos: '150px',                          //position from the top/ use if tabLocation is left or right
                fixedPosition: true                       //options: true makes it stick(fixed position) on scroll
            });
            

            jQuery('a[data-color]').click(function(e){
                e.preventDefault();
                color_scheme_name = jQuery(this).attr('data-color');
                $.cookie('color_scheme', color_scheme_name, {path: '/' });
                applyStyle(); 
                $(this).closest('.option-colors').find('a').removeClass('active');
                $(this).addClass('active');               
            });
            
            var stylesPromises = [];

            

            function applyStyle(){
                var styleURL = CHILDTHEMEURL + '/css/theme-style.css';
                var scheme = '';
                scheme = $.cookie('color_scheme')
                if( scheme !== undefined){
                    scheme = '-' + replaceAll(" ", "-", scheme).toLowerCase();
                    styleURL = CHILDTHEMEURL +'/color_scheme_css/theme-style' + scheme + '.css';
                }
                
                if(!stylesPromises[styleURL]){
                    stylesPromises[styleURL] = $.ajax({
                        url : styleURL, 
                        success : function(data, textStatus, jqxhr){
                            setHref(styleURL);
                        }
                    });
                }
                else{
                    setHref(styleURL);
                }

                function setHref(href){
                    var linkTag = '<link class="theme-style" href="'+href+'" type="text/css" rel="stylesheet"/>';
                    $('.theme-style').first().after(linkTag);
                    
                    setTimeout(function(){
                        $('.theme-style').first().remove();
                        $('body').css({visibility:'visible'});
                    }, 300);
                }
                
            }

            applyStyle();

        });

        function replaceAll(find, replace, str) {
          return str.replace(new RegExp(find, 'g'), replace);
        }

 
    </script>
<?php endif; ?>


<?php wp_footer(); ?>
</body>
</html>