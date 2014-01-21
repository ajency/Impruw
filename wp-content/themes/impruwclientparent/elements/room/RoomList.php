<?php
/**
 * This class is responsible for all actions/functions related to 
 * Room List Element
 *
 * @category   element
 * @package    Impruw
 * @author     Suraj Air<suraj@ajency.in>
 * @author     Suraj Air<suraj@ajency.in>
 * @date       13 Jan 14
 * @copyright  2014 Ajency.in
 * @license    http://www.php.net/license/3_01.txt  PHP License 3.01
 * @version    Release: 0.1
 * @since      Class available since Release 0.1
 * @deprecated NA
 */

class RoomList extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'roomlist';
    
    /**
     * Set draggable property of element.
     * All elements are draggable by defaults
     * @var boolean 
     */
    var $tag_name    = 'div';
    
    /**
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $class_name  = 'room-list';
    
    
    
    /**
     * The config to create a room list element
     * @param array $config
     */
    function __construct($config, $post_id = 0) {
        
        parent::__construct($config);

        $this->markup  = $this->generate_markup();

    }

    /**
     * [generate_markup description]
     * @return [type] [description]
     */
    function generate_markup(){
        
        $html = '';

        $rooms = new WP_Query(array('post_type'=>'impruw_room','posts_per_page' => -1));

        ob_start(); 

        while($rooms->have_posts()) : $rooms->the_post();

        ?>
        <div class="roomBox">
            <?php echo the_post_thumbnail('full', array('class' => 'img-responsive img-center')) ?>
            <div class="row">
                <div class="subTitle roomName"><a href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a></div>
            </div>
            <p><?php echo get_the_excerpt(); ?></p>
            <div class="line-separator"></div>
                <?php
                $facilities = wp_get_post_terms(get_the_ID(), 'impruw_room_facility');

                if(is_array($facilities)){
                    //Set the counter to 1
                    $i = 1;

                    //Open the row div
                    echo '<div class="row">';

                        foreach ($facilities as $facility) {
                            echo sprintf('<div class="col-sm-4 roomAmenity"><span class="glyphicon glyphicon-ok"></span> %s</div>', $facility->name);

                            // After 3 close the row div and open a new one
                            if($i % 3 == 0) {echo '</div><div class="row">';}
                            $i++;
                        }
                    
                    //Close the row div
                    echo '</div>';
                    
                } ?>
            <div class="line-separator"></div>
            <div class="row">
                <div class="col-xs-6 roomRate"><!-- <span class="currency">kr</span> <span class="amount">210</span> / night--></div>
                <div class="col-xs-6 roomDetail"><a href="<?php echo get_permalink(); ?>" class="detailBtn">View Details</a></div>
            </div>
        </div>
        <?php
        
        endwhile;

        $html .= ob_get_clean();

        return $html;
    }
    
}
