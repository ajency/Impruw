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

        if(isset($config['dataSource'])){
            $this->data  = (int) $config['dataSource'];
        }

        $this->markup  = $this->generate_markup();

    }

    /**
     * [generate_markup description]
     * @return [type] [description]
     */
    function generate_markup(){
        
        $html = '';

        if($this->data === 0)
            return $html;

        global $post;
        $post = get_post($this->data);

        setup_postdata($post);

        ob_start(); 

        ?>
        <div class="roomBox">
            <div class="img-holder">
                <?php echo the_post_thumbnail('full', array('class' => 'img-responsive img-center')) ?>
            </div>
            
            <div class="subTitle roomName"><a href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a></div>
            <p class="roomDesc"><?php echo get_the_excerpt(); ?></p>
            
            <div class="row">
                <div class="col-sm-6 roomRate"><span class="currency">&dollar;</span> <span class="amount">210</span> / night</div>
                <div class="col-sm-6 roomDetail"><a href="<?php echo get_permalink(); ?>" class="detailBtn">View Details</a></div>
            </div>
        </div>
        <?php
        
        $html .= ob_get_clean();

        return $html;
    }
    
}
