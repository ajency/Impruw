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
                    'name'      => 'White Shaded Background'
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
    'Address' => array(
                            array(
                    'name' => 'Room Tariff Plans',
                    'template' => '<div class="room-tariff-container">
                                        <div class="room-tariff-title">
                                            <h4>Room Price</h4>
                                            <h5>Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada</h5>
                                        </div>
                                        <div class="room-tariff-actions">
                                            <button class="btn btn-xs btn-add-range">Add Date Range</button>
                                            <button class="btn btn-xs btn-add-plan">Add Plan</button>
                                        </div>
                                        <div class="room-tariff-grid">
                                            <div class="tariff package-names clearfix">
                                                <div class="packages">
                                                    <div class="package-blocks header clearfix">
                                                        <div class="package-block-outer">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="package-desc">
                                                                    Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="package-block-outer">
                                                            <div class="block clearfix">
                                                                <h6>Package 2</h6>
                                                                <div class="package-desc">
                                                                    Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="package-block-outer">
                                                            <div class="block clearfix">
                                                                <h6>Package 3</h6>
                                                                <div class="package-desc">
                                                                    Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="package-block-outer">
                                                            <div class="block clearfix">
                                                                <h6>Package 4</h6>
                                                                <div class="package-desc">
                                                                    Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="package-block-outer">
                                                            <div class="block clearfix">
                                                                <h6>Package 5</h6>
                                                                <div class="package-desc">
                                                                    Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room.
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
                                                    <div class="package-blocks clearfix">
                                                        <div class="package-block-outer">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="package-desc">
                                                                    Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room.
                                                                </div>
                                                                <div class="weekday">
                                                                    Weekdays
                                                                    <span class="price">$100</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    Weekends
                                                                    <span class="price">$120</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Adult</div>
                                                                <div class="weekday">
                                                                    <span class="price">$20</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Child</div>
                                                                <div class="weekday">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$5</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="package-block-outer">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="package-desc">
                                                                    Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room.
                                                                </div>
                                                                <div class="weekday">
                                                                    Weekdays
                                                                    <span class="price">$100</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    Weekends
                                                                    <span class="price">$120</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Adult</div>
                                                                <div class="weekday">
                                                                    <span class="price">$20</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Child</div>
                                                                <div class="weekday">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$5</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="package-block-outer">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="package-desc">
                                                                    Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room.
                                                                </div>
                                                                <div class="weekday">
                                                                    Weekdays
                                                                    <span class="price">$100</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    Weekends
                                                                    <span class="price">$120</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Adult</div>
                                                                <div class="weekday">
                                                                    <span class="price">$20</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Child</div>
                                                                <div class="weekday">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$5</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="package-block-outer">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="package-desc">
                                                                    Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room.
                                                                </div>
                                                                <div class="weekday">
                                                                    Weekdays
                                                                    <span class="price">$100</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    Weekends
                                                                    <span class="price">$120</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Adult</div>
                                                                <div class="weekday">
                                                                    <span class="price">$20</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Child</div>
                                                                <div class="weekday">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$5</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="package-block-outer">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="package-desc">
                                                                    Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room.
                                                                </div>
                                                                <div class="weekday">
                                                                    Weekdays
                                                                    <span class="price">$100</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    Weekends
                                                                    <span class="price">$120</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Adult</div>
                                                                <div class="weekday">
                                                                    <span class="price">$20</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Child</div>
                                                                <div class="weekday">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$5</span>
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
                                                    <div class="package-blocks clearfix">
                                                        <div class="package-block-outer">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="package-desc">
                                                                    Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room.
                                                                </div>
                                                                <div class="weekday">
                                                                    Weekdays
                                                                    <span class="price">$100</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    Weekends
                                                                    <span class="price">$120</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Adult</div>
                                                                <div class="weekday">
                                                                    <span class="price">$20</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Child</div>
                                                                <div class="weekday">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$5</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="package-block-outer">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="package-desc">
                                                                    Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room.
                                                                </div>
                                                                <div class="weekday">
                                                                    Weekdays
                                                                    <span class="price">$100</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    Weekends
                                                                    <span class="price">$120</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Adult</div>
                                                                <div class="weekday">
                                                                    <span class="price">$20</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Child</div>
                                                                <div class="weekday">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$5</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="package-block-outer">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="package-desc">
                                                                    Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room.
                                                                </div>
                                                                <div class="weekday">
                                                                    Weekdays
                                                                    <span class="price">$100</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    Weekends
                                                                    <span class="price">$120</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Adult</div>
                                                                <div class="weekday">
                                                                    <span class="price">$20</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Child</div>
                                                                <div class="weekday">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$5</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="package-block-outer">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="package-desc">
                                                                    Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room.
                                                                </div>
                                                                <div class="weekday">
                                                                    Weekdays
                                                                    <span class="price">$100</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    Weekends
                                                                    <span class="price">$120</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Adult</div>
                                                                <div class="weekday">
                                                                    <span class="price">$20</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Child</div>
                                                                <div class="weekday">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$5</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="package-block-outer">
                                                            <div class="block clearfix">
                                                                <h6>Package 1</h6>
                                                                <div class="package-desc">
                                                                    Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room.
                                                                </div>
                                                                <div class="weekday">
                                                                    Weekdays
                                                                    <span class="price">$100</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    Weekends
                                                                    <span class="price">$120</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Adult</div>
                                                                <div class="weekday">
                                                                    <span class="price">$20</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="tariff-label clearfix">Extra Child</div>
                                                                <div class="weekday">
                                                                    <span class="price">$10</span>
                                                                </div>
                                                                <div class="weekend">
                                                                    <span class="price">$5</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                   </div>'
                ),

        )
);
