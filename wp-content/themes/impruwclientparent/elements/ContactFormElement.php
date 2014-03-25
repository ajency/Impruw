<?php
/**
 * This class is responsible for all actions/functions related to 
 * Cpntact form Element
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

class ContactFormElement extends Element {
    
    /**
     * The default type property for element
     * @var String 
     */
    var $type       = 'contactform';
    
    /**
     * Set draggable property of element.
     * All elements are draggable by defaults
     * @var boolean 
     */
    var $tag_name   = 'div';
    
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
        
        ob_start(); ?>

        <form id="contactForm" method="" action="">
            <fieldset>
                <div class="row">
                    <div class="col-md-6">
                        <input type="text" class="form-control flat" name="name" id="name" title="Enter your name" placeholder="Name"><br>
                        <input type="email" class="form-control flat" name="email" id="email" title="Enter your email" placeholder="Email Address"><br>
                        <input type="text" class="form-control flat" name="phonenumber" id="phonenumber" title="Enter your phone number" placeholder="Phone Number" value=""><br>
                    </div>
                    <div class="col-md-6">
                        <textarea name="message" class="form-control flat" id="message" title="Enter your message" placeholder="Your Message"></textarea><br>
                        <button class="submit btn btn-default" name="submit" type="submit" id="contact_submit">Send Message</button>
                    </div>
                </div>
            </fieldset>
        </form>
        <?php

        $html .= ob_get_clean();
        
        $html       .= $this->get_close_tag();
        
        return $html;
    }

    
}
