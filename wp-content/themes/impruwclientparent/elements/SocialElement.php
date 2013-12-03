<?php
/**
 * This class is responsible for all actions/functions related to 
 * Social Element
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

class SocialElement extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'social';
    
    /**
     * Set draggable property of element.
     * All elements are draggable by defaults
     * @var boolean 
     */
    var $tagName        = 'ul';
    
    /**
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $className  = 'social';
    
    
    
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
        
        $html       .= $this->getSocialLinks();
        
        $html       .= $this->getCloseTag();
        
        return $html;
    }
    
    /**
     * returns the getSocialLinks markup
     * @return string
     */
    function getSocialLinks(){
        
        
        $socials = array( "facebook"  => "http://someurl.com", 
                            "twitter"   => "http://someurl.com", 
                            "pinterest" => "http://someurl.com",
                            "flickr"    => "http://someurl.com",
                            "google-plus"  => "http://someurl.com",
                            "youtube"   => "http://someurl.com");//get_blog_option(get_current_blog_id(), 'contact-at');
        
        if(!is_array($socials)){
            return '';
        }
        
        $html = "";
        
        foreach($socials as $key => $val){
           
            $html .= '<li><a target="_BLANK" href="'.$val.'" aria-hidden="true" class="icon-'.$key.'"></a></li>';
            
        }
       
        
        return $html;
            
    }
    
}
