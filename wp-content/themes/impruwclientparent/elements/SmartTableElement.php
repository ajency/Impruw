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
class SmartTableElement extends Element {

    /**
     * The default type property for element
     * @var String
     */
    var $type = 'smarttable';

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
        $content = array();
        if(isset($element[ 'contents' ])){
            $content = isset( $element[ 'contents' ][ $current_language ] ) ? 
                    $element[ 'contents' ][ $current_language ] : 
                    $element[ 'contents' ][ wpml_get_default_language() ];
        }

        $this->content = $content;

        $this->style_extra = isset($element[ 'innerStyle' ]) ? 
                sanitize_title( $element[ 'innerStyle' ] ) : '';
     
        $this->markup = $this->generate_markup();

    }

    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup() {

        $attr = array();

        
        $html = '';
        
        $html .= "<div class='smart-table {$this->style_class} {$this->style_extra}'>";

        foreach ($this->content as $content_array) {
            $html .= '<dl class="smart-cell">';
            foreach ($content_array as $key => $value) {
                if ($key == 'dt')
                    $html .= "<dt>{$value}</dt>";
                elseif ($key == 'dd')
                    $html .= "<dd>{$value}</dd>";
                elseif ( $key == 'em' )
                    $html .= "<dd class='emphasis'>{$value}</dd>";
            }
            $html .= '</dl>';
        }
        $html .= '</div>';

        $preview = (isset( $_GET[ 'preview' ] )) ? $_GET[ 'preview' ] : false ; 
        $final_markup = (display_element_markup($this->element)) ? $html : get_markup_for_addon($this->element,$preview) ; 

        return $final_markup;
    }

}
