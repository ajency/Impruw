<?php
/**
 * This class is responsible for all actions/functions related to 
 * SliderElement
 *
 * @category   element
 * @package    Impruw
 * @author     Suraj Air<suraj@ajency.in>
 * @author     Suraj Air<suraj@ajency.in>
 * @date       3rd Dec 13
 * @copyright  2013 Ajency.in
 * @license    http://www.php.net/license/3_01.txt  PHP License 3.01
 * @version    Release: 0.1
 * @since      Class available since Release 0.1
 * @deprecated NA
 */

class SliderElement extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'slider';
    
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
    var $class_name  = 'carousel';
    
    
    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($config) {
        
        parent::__construct($config);

        if(isset($config['dataSource'])){
            $this->data_source = $config['dataSource'];
        }
        
        
        $this->markup           = $this->generate_markup();
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        $html       = $this->get_open_tag(array('data-ride'=> "carousel",'id' => 'impruw-carousel'));
        
        $html       .= $this->get_slider();
        
        $html       .= $this->get_close_tag();
        
        return $html;
    }

    /**
     * [get_images description]
     * @return [type] [description]
     */
    function get_images(){
        
        if(!isset($this->data_source['image-ids']) || !is_array($this->data_source['image-ids']))
            return array(0);

        return $this->data_source['image-ids'];
    }

    /**
     * Get image src
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    function get_image_src($id){

        if($id == 0)
            return get_parent_template_directory_uri() . '/js/holder.js/100%x400';


        $path = wp_get_attachment_image_src($id,'full');

        return $path[0];
    }
    
    /**
     * returns the address markup
     * @return string
     */
    function get_slider(){

        
        ob_start();?>
        <!-- Indicators
            <ol class="carousel-indicators">
                <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
            </ol>
            Wrapper for slides -->
            <div class="carousel-inner">
                <?php foreach($this->get_images() as $index => $image){ ?>
                    <div class="item <?php echo ($index === 0 ) ? 'active' : '' ?>">
                        <img <?php echo $image == 0 ? 'data-' : '' ?>src="<?php echo $this->get_image_src($image); ?>" alt="...">
                    </div>
                <?php } ?>
            </div>
            <!-- Controls -->
            <a class="left carousel-control" href="#impruw-carousel" data-slide="prev">
                  <span class="icon-prev"></span>
            </a>
            <a class="right carousel-control" href="#impruw-carousel" data-slide="next">
                  <span class="icon-next"></span>
            </a>
        <?php
        $html = ob_get_clean();
        return $html;
            
    }
    
}
