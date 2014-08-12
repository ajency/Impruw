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
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $class_name = 'nav';

    /**
     * Set draggable property of element.
     * All elements are draggable by defaults
     * @var boolean 
     */
    var $tag_name = 'ul';
    var $item_view_tag_name = 'li';

    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($element) {
        parent::__construct($element);
        
        $this->menu_id      = '';
        if(isset($element['menu_id']))
            $this->menu_id = $element['menu_id'];
        
        $this->justified = $element['justified'];
        $this->style = sanitize_title($element['style']);
        $this->markup = $this->generateMarkup();
    }

    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generateMarkup() {
        $html = $this->get_menu();
        return $html;
    }

    /**
     * 
     * @return string
     */
    function get_menu() {
        
        global $me;
        $html = "";

        $menu = get_menu_to_array($this->menu_id, 'id');


        if (isset($menu['code']) == "ERROR")
                return $html;

//        $justified = $this->justified ? 'nav-justified' : '';
//
//        $html = "<ul class='nav {$this->style} $justified {$this->margins}'>";
//        foreach ($menu['menu_items'] as $item):
//            $html .= '<li>' . $me->render('<a href="{{menu_item_url}}">{{menu_item_title}}</a>', $item) . '</li>';
//        endforeach;
//
//        $html .= "</ul>";

        $menu_name = $menu['menu_name'];

        $justified = $this->justified ? 'nav-justified' : '';
        $menu_class = 'nav '.$this->style.' '.$justified.' '.$this->margins;

        $html = wp_nav_menu( array('menu' => $menu_name, 'container' => false ,'menu_class'=>$menu_class, 'echo'=> false));


        return $html;
    }

}
