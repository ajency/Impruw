<?php
/**
 * This class is responsible for all actions/functions related to 
 * Menu Element
 *
 * @category   Configurable element
 * @package    Impruw
 * @author     Suraj Air<suraj@ajency.in>
 * @author     Suraj Air<suraj@ajency.in>
 * @date       29th Nov 13
 * @copyright  2013 Ajency.in
 * @license    http://www.php.net/license/3_01.txt  PHP License 3.01
 * @version    Release: 0.1
 * @since      Class available since Release 0.1
 * @deprecated NA
 */

class MenuElement extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'menu';
    
    /**
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $className  = 'menu';
    
    /**
     * Set draggable property of element.
     * All elements are draggable by defaults
     * @var boolean 
     */
    var $tagName        = 'ul';
    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($config) {
        
        if(isset($config['extraClasses'])){
            $this->extraClasses = $config['extraClasses'];
        }
        
        if(isset($config['data'])){
            $this->data   = $config['data'];
        }
        
        $this->markup = $this->generateMarkup();
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generateMarkup(){
        
        //$html       = $this->getOpenTag();
        
        $html       = $this->getMenu();
        
        //$html       .= $this->getCloseTag();
        
        return $html;
    }
    
    /**
     * 
     * @return string
     */
    function getMenu(){
        
        $mname = $this->getMenuName();
        
        if($mname === ''){
            return '';
        }
        
        $this->id = $this->generateRandomId();
        
        $args = array(
            'echo'              => false,
            'container'         => 'ul',
            'container_class'   => $this->getClasses(),
            'container_id'      => $this->generateRandomId(),
            'items_wrap'        => '<ul id="' . $this->id . '" class="'.$this->getClasses().'">%3$s</ul>',
            'walker'            => new Walker_Style1_Menu()
        );
        
        return wp_nav_menu($args) . "<!--{$this->tagName}#{$this->id}-->";
       
    }
    
    /**
     * 
     * @return int
     */
    function getMenuName(){
        
        if(isset($this->data['menuName'])){
            return $this->data['menuName'];
        }
        
        return '';
    }
    
}


class Walker_Style1_Menu extends Walker {

    // Tell Walker where to inherit it's parent and id values
    var $db_fields = array(
        'parent' => 'menu_item_parent', 
        'id'     => 'db_id' 
    );

    /**
     * At the start of each element, output a <li> and <a> tag structure.
     * 
     * Note: Menu objects include url and title properties, so we will use those.
     */
    function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
            
            $li = "\n<li class='%s'><a href='%s'>%s</a>\n";
            
            $class = '';
            if((int)$item->object_id === get_the_ID()) 
                    $class = 'active';
            
            if(in_array('menu-item-has-children', $item->classes)){
                $class = 'sub-collapser';
                $li = "\n<li class='%s'><a href='%s'>%s <span class='glyphicon glyphicon-chevron-down'></span></a>\n";
            }
            $output .= sprintf($li,
                                $class,
                                $item->url,
                                (int)$item->menu_order === 1 ? '<span class="glyphicon glyphicon-home"></span>' : $item->title
                            );
    }
    
    function end_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
            
            $output .= '</li>';
    }
    
    /**
     * 
     * @param type $output
     * @param type $depth
     * @param type $args
     */
    function start_lvl(&$output, $depth = 0, $args = array()) {
        $output .= '<ul class="dropDrown">';
    }
    
    /**
     * 
     * @param type $output
     * @param type $depth
     * @param type $args
     */
    function end_lvl(&$output, $depth = 0, $args = array()) {
        $output .= '</ul>';
    }

}
