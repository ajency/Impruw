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