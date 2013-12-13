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
    var $tag_name        = 'ul';
    
    /**
     * The default classname property for element.
     * Empty string by default
     * @var String 
     */
    var $class_name  = 'social';
    
    
    
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
        
        $html       .= $this->get_social_links();
        
        $html       .= $this->get_close_tag();
        
        return $html;
    }
    
    /**
     * returns the getSocialLinks markup
     * @return string
     */
    function get_social_links(){
        
        
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
