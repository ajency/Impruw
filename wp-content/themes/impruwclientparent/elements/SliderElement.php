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
        
        if(isset($config['extraClasses'])){
            $this->extra_classes = $config['extraClasses'];
        }
        
        
        $this->markup           = $this->generate_markup();
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        $html       = $this->get_open_tag();
        
        $html       .= $this->get_slider();
        
        $html       .= $this->get_close_tag();
        
        return $html;
    }
    
    /**
     * returns the address markup
     * @return string
     */
    function get_slider(){
        
        ob_start();?>
        <!-- Indicators -->
            <ol class="carousel-indicators">
                  <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                  <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                  <li data-target="#carousel-example-generic" data-slide-to="2"></li>
            </ol>
            <!-- Wrapper for slides -->
            <div class="carousel-inner">
                  <div class="item active">
                      <img src="<?php echo get_template_directory_uri(); ?>/js/holder.js/100%x450" alt="...">
                  </div>
                  <div class="item">
                    <img src="<?php echo get_template_directory_uri(); ?>/js/holder.js/100%x450" alt="...">
                  </div>
            </div>
            <!-- Controls -->
            <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                  <span class="icon-prev"></span>
            </a>
            <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
                  <span class="icon-next"></span>
            </a>
        <?php
        $html = ob_get_clean();
        return $html;
            
    }
    
}
