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
        
        $this->widget_type             = $element['type'];

        $this->aspectRatio      = $element['aspectRatio'];

        $this->markup           = $this->generate_markup();

        



        
        
    }
    
    /**
     * Create the basic markup for an element
     * @uses className and tagName properties of element
     * @return String basic markup
     */
    function generate_markup(){
        
        $attr = array();
        
        
       

        // $html = $this->htmlData;
        // if(empty($this->content))
        //     $html       .= $this->get_open_tag($attr);
        $html = '';
        // var_dump($this);
        
        if ($this->widget_type == 'facebook'){
            $html = "<div class='fb-widget '>".$this->htmlData."</div>";
            $html  .= "<script>              
                    jQuery('.fb-widget ').last().find('div').attr('data-width',jQuery('.fb-widget ').last().parent().width());
                    (function(d, s, id) {
                      var js, fjs = d.getElementsByTagName(s)[0];
                      if (d.getElementById(id)) return;
                      js = d.createElement(s); js.id = id;
                      js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0';
                      fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));
                </script>";
        }

        elseif ($this->widget_type == 'youtube'){
            $html = "<div class='embed-responsive '>".$this->htmlData."</div>";
            $html .= "<script>
                jQuery('.embed-responsive').css('padding-bottom','".$this->aspectRatio."%');
                </script>";
        }
         elseif ($this->widget_type == 'tripadvisor'){
            $html = "<div class='widget'>".$this->htmlData."</div>";
            // $html .= "<script>
            //     jQuery('.embed-responsive').css('padding-bottom','".$this->aspectRatio."%');
            //     </script>";
        }
        else { 
            $html = "<div class=' '>".$this->htmlData."</div>";
        }
        // if(empty($this->content))
        //     $html       .= $this->get_close_tag();
        
        return $html;
    }
    
   
}
