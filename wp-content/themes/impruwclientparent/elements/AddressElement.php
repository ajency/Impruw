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
    var $class_name  = 'address';
    
    
    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($element) {
        
        parent::__construct($element);
        
        $this->style = $element['style'];

        $this->template = get_style_template($element);
        
        $this->markup  = $this->generate_markup();
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
        
        $site = new SiteModel(get_current_blog_id());

        $contact_at = $site->get_site_business();

        
        $defaults = array( "street"     => "Street Name",
                           "phone"      => "9998887771",
                           "email"      => "",
                           "postalcode" => "400002",
                           "country"    => "Country",
                           "city"       => "City");

        $contact_at  = wp_parse_args($contact_at , $defaults);

        $address = get_site_details();
        
        $contact_at['email'] = $address['site_email'];

        $themes = explode(',', THEME_ID);

        if(in_array(get_current_blog_id(), $themes)){
            $contact_at['email'] = 'info@impruw.com';     
        }

        global $me;
        $html = $me->render($this->template, $contact_at);
        return $html;
            
    }
    
}
