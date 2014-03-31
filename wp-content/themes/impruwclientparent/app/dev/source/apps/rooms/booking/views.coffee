define ['app'
		'text!apps/rooms/add/templates/add-room.html'],
		(App, addRoomTpl)->

			App.module 'RoomsApp.Booking.View', (View, App, Backbone, Marionette, $, _)->

				class View.BookingRoomLayout extends Marionette.Layout

					className : 'row room-booking'
						
					template : '<div class="col-md-8 room-booking-calender" id="calendar-region"></div>
								<div class="col-md-4 room-booking-data" id="plans-details-region"></div>'

					regions:
						calendarRegion : '#calendar-region'
						plansDetailsRegion : '#plans-details-region'


					
				class View.CalendarView extends Marionette.CompositeView

					template : '
											<h4>
											<span class="glyphicon glyphicon-calendar"></span>
											Montly Calendar
												<span class="excerpt">Donec vulputate nibh et odio vehicula, id porttitor quam malesuada</span>
											</h4>
											<div id="room-booking-calendar"></div>
											<br><br><br>
											<ul class="list-inline">
												<li><span class="date-range1">&nbsp;</span>Date Range 1</li>
												<li><span class="date-range2">&nbsp;</span>Date Range 2</li>
												<li><span class="date-range3">&nbsp;</span>Date Range 3</li>
											</ul>
											'

					onShow:->
						@$el.find '#room-booking-calendar'
							.datepicker
								inline: true
								numberOfMonths : 2


				class View.PlansView extends Marionette.CompositeView

					className : 'plans-view'

					template : '<div class="date-range">
												You have selected
												<b>18 Jan to 16 Jan </b>
											</div>
											<div class="room-plans">
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
											</div></div>

                                   '