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
    var $class_name  = 'contactform';
    
    
    
    /**
     * The config to create a row element
     * @param array $config
     */
    function __construct($element) {
        
        parent::__construct($element);
        
        $this->style_class = sanitize_title($element['style']);
        
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

        <form>
		  <div class="row">
		    <div class="col-md-6">
		      <label>First Name</label>
		      <input type="text" placeholder="Your First Name" name="c-first-name" required class="form-control flat"/>
		      <label>Last Name</label>
		      <input type="text" placeholder="Your Last Name" name="c-last-name" class="form-control flat"/>
		      <label>Email Address</label>
		      <input type="email" placeholder="Your Email Address" name="c-email" required class="email form-control flat"/>
		      <label>Subject</label>
		      <select id="subject" name="c-subject" placeholder="Choose One:" class="form-control flat">
		        <option value="na" selected="">Choose One:</option>
		        <option value="service">General Customer Service</option>
		        <option value="suggestions">Suggestions</option>
		        <option value="product">Product Support</option>
		      </select>
		    </div>
		    <div class="col-md-6">
		      <label>Message</label>
		      <textarea id="message" rows="5" name="c-message" required placeholder="Your Message" class="form-control flat"></textarea>
		      <button type="button" id="contact-form-save" class="btn btn-default">Send Message</button>
		    </div>
		  </div>
		</form>
        <?php

        $html .= ob_get_clean();
        
        $html       .= $this->get_close_tag();
        
        return $html;
    }

    
}
