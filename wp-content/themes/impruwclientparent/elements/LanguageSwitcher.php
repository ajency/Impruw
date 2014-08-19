<?php
/**
 * Created by PhpStorm.
 * User: Nutan
 * Date: 21/7/14
 * Time: 11:44 AM
 */

class LanguageSwitcher extends Element {

    /**
     * The default type property for element
     * @var String
     */
    var $type       = 'image';

    /**
     * Set draggable property of element.
     * All elements are draggable by defaults
     * @var boolean
     */
    var $tag_name        = 'div';

    /**
     * The default classname property for element.
     * Empty string by default
     * @var String
     */
    var $class_name  = 'lang-sel';



    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($element) {

        parent::__construct($element);

        //$this->margins = $this->get_margin_classes($element);

        $this->markup    = $this->generate_markup();

        $this->style = sanitize_title($element['style']);
    }

    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){

        $html .= "<div class='lang-sel {$this->style_class}'>";
        ob_start();

        do_action('icl_language_selector');

        $html .= ob_get_clean();
        $html .= "</div>";

        return $html;
    }

}
