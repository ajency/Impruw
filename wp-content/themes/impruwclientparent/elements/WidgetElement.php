<?php
/**
 * This class is responsible for all actions/functions related to 
 * Widget Element
 *
 * @category   element
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

class WidgetElement extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'widget';
    
    /**
     * Default content for element
     * @var String 
     */
    var $content    = '';
    
   /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($element) {
        
        parent::__construct($element);
        
        
        $this->htmlData         = stripcslashes(trim($element['widgetCode']));
        
        $this->markup           = $this->generate_markup();

        
        
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        $attr = array();
        
        $html = "<div class='embed-responsive embed-responsive-16by9'>".$this->htmlData."</div>";
       

        // $html = $this->htmlData;
        // if(empty($this->content))
        //     $html       .= $this->get_open_tag($attr);
        
        $html  .= "<script>
                
                jQuery('.fb-widget').last().find('div').attr('data-width',jQuery('.fb-widget').last().parent().width());
            console.log(jQuery('.fb_widget').last().width());
            </script>";
        // if(empty($this->content))
        //     $html       .= $this->get_close_tag();
        
        return $html;
    }
    
   
}
