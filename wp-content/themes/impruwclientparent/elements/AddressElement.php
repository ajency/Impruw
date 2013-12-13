<?php
/**
 * This class is responsible for all actions/functions related to 
 * Address Element
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

class AddressElement extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'address';
    
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
    var $class_name  = '';
    
    
    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($config) {
        
        parent::__construct($config);
        
        $this->markup           = $this->generate_markup();
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        $html       = $this->get_open_tag();
        
        $html       .= $this->get_address();
        
        $html       .= $this->get_close_tag();
        
        return $html;
    }
    
    /**
     * returns the address markup
     * @return string
     */
    function get_address(){
        
        
        $contact_at = array( "address"   => "YOUCOU 12 Seville", 
                            "phoneno"   => "34 954 227 116", 
                            "email"     => "info@corraldelrey.com");//get_blog_option(get_current_blog_id(), 'contact-at');
        
        if(!is_array($contact_at)){
            return '';
        }
        
        $html = '';
        
        foreach($contact_at as $key => $val){
            
            $html .= "<div class='infoPoint'>";
            
            switch($key){
                case 'address':
                    $html .= "<span class='fui-home'></span>";
                    break;
                case 'phoneno':
                    $html .= '<span class="glyphicon glyphicon-earphone"></span>';
                    break;
                case 'email':
                    $html .= '<span class="fui-mail"></span>';
                    break;
            }
            
            $html .= " $val</div>";
            
        }
        
        return $html;
            
    }
    
}
