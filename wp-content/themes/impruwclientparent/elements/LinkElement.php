<?php

/**
 * This class is responsible for all actions/functions related to
 * Title Element
 *
 * @category   layout
 * @package    Impruw
 * @author     Suraj Air<suraj@ajency.in>
 * @author     Suraj Air<suraj@ajency.in>
 * @date       28th Nov 13
 * @copyright  2013 Ajency.in
 * @license    http://www.php.net/license/3_01.txt  PHP License 3.01
 * @version    Release: 0.1
 * @since      Class available since Release 0.1
 * @deprecated NA
 */
class LinkElement extends Element {

    /**
     * The default type property for element
     * @var String
     */
    var $type = 'link';

    /**
     * Default content for element
     * @var String
     */
    var $content = '';


    /**
     * Class name
     */
    var $class_name = 'link';


    /**
     * The config to create a row element
     *
     * @param array $config
     */
    function __construct( $element ) {

        parent::__construct( $element );

        $this->link   = $element[ 'link' ];
        $this->text   = $element[ 'text' ];
        $this->target = $element[ 'target' ];
        $this->style  = sanitize_title( $element[ 'style' ] );
        $this->markup = $this->generate_markup();

    }

    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup() {

        $template = '<span class="link {{style}}"><a href="http://{{link}}" target="{{target}}">{{text}}</a></span>';
        global $me;

        return $me->render( $template, $this );
    }

}