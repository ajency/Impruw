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

    function site_template_directory_uri($template_dir_uri, $template, $theme_root_uri)
    {

        return site_url('wp-content/themes/blue-bold');
    }

    add_filter('template_directory_uri', 'site_template_directory_uri', 10, 3);

    define('CURRENTTHEMEPATH', ABSPATH . 'wp-content/themes/blue-bold/');

    /**
     * Function to return the theme set colors
     *
     * @return colors array
     */
    function theme_color_sets(){

        $set_color = array(
            array(
                'name' => 'set1',
                'primary1' => 'orange',
                'secondary1' => 'green'
            ),
            array(
                'name' => 'set2',
                'primary1' => 'red',
                'secondary1' => 'black'
            )
        );

        return $set_color;
    }
    /**
     * Logo size for the theme
     **/
    function get_logo_size()
    {
        return array(312, 40);
    }

    global $element_templates;

    $element_templates = array('Menu' => array(array('name' => 'Footer Menu 2')), 'Title' => array(array('name' => 'Title Super Text'), array('name' => 'Page Title',), array('name' => 'Footer Title'), array('name' => 'Footer Sub Title'), array('name' => 'Small Title'), array('name' => 'Grey Title Text'), array('name' => 'Emphasis Text'), array('name' => 'Inner Title'), array('name' => 'Thumb Title'), array('name' => 'Thumb Main Title')), 'Row' => array(array('name' => 'Blue Strip Top'), array('name' => 'White Shaded Background')), 'Social' => array(array('name' => 'Default Style'), array('name' => 'Small Social')), 'Link' => array(array('name' => 'Default Style'), array('name' => 'Button')), 'ContactForm' => array(array('name' => 'Style One'), array('name' => 'Style Two')), 'ImageWithText' => array(array('name' => 'Style One'), array('name' => 'Style Two')), 'Address' => array(array('name' => 'Room Tariff Plans', 'template' => '<div class="room-tariff-container">
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
                                   </div>'), array('name' => 'Room Booking', 'template' => '<div class="row room-booking-container">
                                        <div class="col-md-8">
											<div class="room-booking-calender">
											
											<h4>
											<span class="glyphicon glyphicon-calendar"></span>
											Montly Calendar
												<span class="excerpt">Donec vulputate nibh et odio vehicula, id porttitor quam malesuada</span>
											</h4>
											</div>
										</div>
										<div class="col-md-4 room-booking-data">
											<div class="date-range">
												You have selected
												<b>18 Jan to 16 Jan </b>
											</div>
											<div class="room-booking-plan">
												<h5>Plan 1 </h5>
													<p>Room. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
													
														<div class="booking-detail">
															Max Adults:
																<span>02</span>
														</div>
														<div class="booking-detail">
															Max Children:
															<span>	02</span>
														</div>
														<div class="clearfix"></div>
														<h6>Additional Charge</h6>
																<div class="booking-detail">
																	per extra Adult : $200
																	
																</div>
																<div class="booking-detail">
																	 per extra Child : $152
																		
																</div>
																<div class="clearfix"></div>
																
																<div class="booking-price">WEEKDAYS <b>$300</b></div>
											</div>
											
												<div class="room-booking-plan">
												<h5>Plan 2 </h5>
													<p>Room. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
													
														<div class="booking-detail">
															Max Adults:
																<span>02</span>
														</div>
														<div class="booking-detail">
															Max Children:
															<span>	02</span>
														</div>
														<div class="clearfix"></div>
														<h6>Additional Charge</h6>
																<div class="booking-detail">
																	per extra Adult : $200
																	
																</div>
																<div class="booking-detail">
																	 per extra Child : $152
																		
																</div>
																<div class="clearfix"></div>
																
																<div class="booking-price">WEEKENDDAYS <b>$300</b></div>
											</div>
                                   </div>'),));
