<?php

/*
  File Name: functions.php
  Description: This file has a list of the following functions used in this theme

  1)  site_template_directory_uri - Function to change the default template uri.

  /**
 * 
 * site_template_directory_uri
 * Function to change the default template uri.
 * @param type $template_dir_uri
 * @param type $template
 * @param type $theme_root_uri
 * @return text
 */

function site_template_directory_uri($template_dir_uri, $template, $theme_root_uri) {

    return site_url('wp-content/themes/blue-bold');
}

add_filter('template_directory_uri', 'site_template_directory_uri', 10, 3);

define('CURRENTTHEMEPATH', ABSPATH . 'wp-content/themes/blue-bold/');

/**
 * Logo size for the theme 
 **/
function get_logo_size(){
    return array(312,40);
}

global $element_templates;

$element_templates = array(
    'Menu' => array(
                array(
                    'name'      => 'Slimmenu'
                ),
                array(
                    'name'      => 'Footer Menu'
                ),
                array(
                    'name'      => 'Footer Menu 2'
                )
              ),
    'Title' => array(
                array(
                    'name'      => 'Title Super Text'
                ),
                array(
                    'name'      => 'Page Title',
                ),
                array(
                    'name'      => 'Footer Title'
                ),
                array(
                    'name'      => 'Footer Sub Title'
                ),
                array(
                    'name'      => 'Small Title'
                ),
                array(
                    'name'      => 'Grey Title Text'
                ),
                array(
                    'name'      => 'Emphasis Text'
                ),
                array(
                    'name'      => 'Inner Title'
                ),
                array(
                    'name'      => 'Thumb Title'
                ),
                array(
                    'name'      => 'Thumb Main Title'
                )
              ),
    'Row' => array(
                array(
                    'name'      => 'Blue Strip Top'
                ),
                array(
                    'name'      => 'Center Container'
                ),
                array(
                    'name'      => 'Grey Background'
                ),
                array(
                    'name'      => 'White Shaded Background'
                ),
                array(
                    'name'      => 'Footer Container'
                ),
                array(
                    'name'      => 'Column Dividers'
                )
             ),
    'Address' => array(
                array(
                    'name' => 'Default Style',
                    'template' => '<ul><li><span class="fui-home"></span> {{address}}</li><li><span class="glyphicon glyphicon-earphone"></span> {{phoneno}}</li><li><span class="fui-mail"></span> {{email}}</li></ul>'
                ),
                array(
                    'name' => 'Small Address',
                    'template' => '<div><div class="info">{{address}}</div><div class="info">{{phoneno}}</div><div class="info">{{email}}</div></div>'
                ),
                array(
                    'name' => 'Room Tariff Plans',
                    'template' => '<div class="room-tariff-container">
                                        <div class="room-tariff-title">
                                            <h4>Room Price</h4>
                                            <h5>Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada</h5>
                                        </div>
                                        <div class="room-tariff-grid">
                                            <div class="tariff clearfix">
                                                <div class="date-range">
                                                    <div class="from">
                                                        From <span class="date">21/03</span>
                                                    </div>
                                                    <div class="to">
                                                        To <span class="date">31/05</span>
                                                    </div>
                                                </div>
                                                <div class="packages">
                                                    <div class="row package-blocks">
                                                        <div class="col-sm-4">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="weekday">
                                                                    Weekdays
                                                                    <span class="price">$100</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    Weekends
                                                                    <span class="price">$120</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="weekday">
                                                                    Weekdays
                                                                    <span class="price">$100</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    Weekends
                                                                    <span class="price">$120</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="weekday">
                                                                    Weekdays
                                                                    <span class="price">$100</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    Weekends
                                                                    <span class="price">$120</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tariff clearfix">
                                                <div class="date-range">
                                                    <div class="from">
                                                        From <span class="date">21/03</span>
                                                    </div>
                                                    <div class="to">
                                                        To <span class="date">31/05</span>
                                                    </div>
                                                </div>
                                                <div class="packages">
                                                    <div class="row package-blocks">
                                                        <div class="col-sm-4">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="weekday">
                                                                    Weekdays
                                                                    <span class="price">$100</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    Weekends
                                                                    <span class="price">$120</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="weekday">
                                                                    Weekdays
                                                                    <span class="price">$100</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    Weekends
                                                                    <span class="price">$120</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="weekday">
                                                                    Weekdays
                                                                    <span class="price">$100</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    Weekends
                                                                    <span class="price">$120</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                   </div>'
                ),
                array(
                    'name' => 'Facilities List',
                    'template' => '<div class="room-facilities-container">
                                        <div class="room-facilities-title">
                                            <h5>Room Features</h5>
                                            <h4>Standard Book</h5>
                                        </div>
                                        <ul class="facilities clearfix">
                                            <li>Flat Screen Cable TV</li>
                                            <li>On-demand Movies (surcharge)</li>
                                            <li>Wireless High Speed Internet Access</li>
                                            <li>In room Safe Box</li>
                                            <li>Room Service</li>
                                            <li>Wake Up Service</li>
                                            <li>Mini Bar</li>
                                            <li>Multi-line Phone</li>
                                            <li>Hairdryer</li>
                                            <li>Bathtub</li>
                                        </ul>
                                   </div>'
                ),
                array(
                    'name' => 'Room Summary',
                    'template' => '<div class="room-summary-container">
                                        <div class="room-summary-title">
                                            <h4>Room Summary</h4>
                                        </div>
                                        <div class="room-summary">
                                            <div class="room-summary-item">
                                                <span class="key">No of Rooms</span>
                                                <span class="value">2</span>
                                            </div>
                                            <div class="room-summary-item">
                                                <span class="key">Guests</span>
                                                <span class="value">2</span>
                                            </div>
                                            <div class="room-summary-item">
                                                <span class="key">Room Type</span>
                                                <span class="value">Double Deluxe Room</span>
                                            </div>
                                            <div class="room-summary-item">
                                                <span class="key">Check In</span>
                                                <span class="value">10:00 am</span>
                                            </div>
                                            <div class="room-summary-item">
                                                <span class="key">Check Out</span>
                                                <span class="value">01:00 pm</span>
                                            </div>
                                            <div class="room-summary-desc">
                                                Lorem ipsum dolor sit amet, vestibulum curabitur congue in vitae.
                                                <button class="btn btn-sm btn-book">Booking &amp; Availability</button>
                                            </div>
                                        </div>
                                   </div>'
                )
            ),
    'Social' => array(
                array(
                    'name' => 'Default Style'
                ),
                array(
                    'name' => 'Small Social'
                )
            ),
    'Link' => array(
                array(
                    'name' => 'Default Style'
                ),
                array(
                    'name' => 'Button'
                )
            ),
    'ContactForm' => array(
            array(
                'name' => 'Style One'
            ),
            array(
                'name' => 'Style Two'
            )
        ),
    'ImageWithText' => array(
            array(
                'name' => 'Style One'
            ),
            array(
                'name' => 'Style Two'
            )
        )
);
