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
    var $tagName        = 'div';
    
    /**
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $className  = '';
    
    
    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($config) {
        
        if(isset($config['extraClasses'])){
            $this->extraClasses = $config['extraClasses'];
        }
        
        
        $this->markup           = $this->generateMarkup();
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generateMarkup(){
        
        $html       = $this->getOpenTag();
        
        $html       .= $this->getAddress();
        
        $html       .= $this->getCloseTag();
        
        return $html;
    }
    
    /**
     * returns the address markup
     * @return string
     */
    function getAddress(){
        
        
        $contactAt = array( "address"   => "YOUCOU 12 Seville", 
                            "phoneno"   => "34 954 227 116", 
                            "email"     => "info@corraldelrey.com");//get_blog_option(get_current_blog_id(), 'contact-at');
        
        if(!is_array($contactAt)){
            return '';
        }
        
        $html = '';
        
        foreach($contactAt as $key => $val){
            
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
