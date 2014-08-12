<?php

/**
 * This class is responsible for all actions/functions related to
 * Text Element
 *
 * @category   Inline editable element
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
class TextElement extends Element {

    /**
     * The default type property for element
     * @var String
     */
    var $type = 'text';

    /**
     * Default content for element
     * @var String
     */
    var $content = '';

    /**
     * The config to create a row element
     *
     * @param array $config
     */
    function __construct( $element ) {

        parent::__construct( $element );

        $current_language = ICL_LANGUAGE_CODE;
        $content = '';
        if(is_array($element[ 'content' ])){
            $content        = isset( $element[ 'content' ][ $current_language ] ) ? $element[ 'content' ][
        $current_language ] : $element[ 'content' ][ wpml_get_default_language() ];
        }
        else{
            $content = $element[ 'content' ];
        }
        $this->content  = stripcslashes(trim( $content ));

        $this->markup = $this->generate_markup();

    }

    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup() {

        $attr = array();

        if ( defined( 'FOR_BUILDER' ) )
            $attr[ 'contenteditable' ] = 'true';

        $html = '';
        // if(empty($this->content))
        //     $html       .= $this->get_open_tag($attr);

        $html .= "<p class='text'>{$this->content}</p>";
        // if(empty($this->content))
        //     $html       .= $this->get_close_tag();

        return $html;
    }

}
