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
        
        $args = array(
            'echo'              => false,
            'container'         => 'ul',
            'container_class'   => $this->getClasses(),
            'container_id'      => $this->generateRandomId(),
            'items_wrap'        => '<ul id="'. $this->generateRandomId(). '" class="'.$this->getClasses().'">%3$s</ul>'
        );
        
//        $menu_items = wp_get_nav_menu_items($mname);
//        _wp_menu_item_classes_by_context($menu_items);
//        $sorted_menu_items = $menu_items_with_children = array();
//	foreach ((array) $menu_items as $menu_item) {
//            $sorted_menu_items[$menu_item->menu_order] = $menu_item;
//            if ($menu_item->menu_item_parent)
//                $menu_items_with_children[$menu_item->menu_item_parent] = true;
//        }
//
//        // Add the menu-item-has-children class where applicable
//        if ($menu_items_with_children) {
//            foreach ($sorted_menu_items as &$menu_item) {
//                if (isset($menu_items_with_children[$menu_item->ID]))
//                    $menu_item->classes[] = 'sub-collapser';
//            }
//        }
//
//        unset( $menu_items, $menu_item );
//        print_r($sorted_menu_items);
        
        return wp_nav_menu($args);
       
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
