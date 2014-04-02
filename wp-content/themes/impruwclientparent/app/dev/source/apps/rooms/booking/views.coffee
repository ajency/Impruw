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

					template : '<h4>
									<span class="glyphicon glyphicon-calendar"></span>
									Monthly Calendar
									<span class="excerpt">Donec vulputate nibh et odio vehicula, id porttitor quam malesuada</span>
								</h4>
								<div id="room-booking-calendar"></div>
								<br><br><br>
								<ul class="list-inline daterange-legends">
									{{#dateRanges}}
										<li><span class="{{class}}">&nbsp;</span>{{name}}</li>
									{{/dateRanges}}
								</ul>'

					onShow:->
						@$el.find '#room-booking-calendar'
							.datepicker
								inline: true
								numberOfMonths : 2
								#showOtherMonths: true
								onSelect : @triggerOnSelect
								beforeShowDay: @highlightDaysByDateRange

						@setDateRangeColor()

					# sets a background color for daterange
					setDateRangeColor:=>
						colors = ['green','red', 'orange', 'blue', 'pink'] # you can specify rgb() color or hexadecimal
						templateHelpers = Marionette.getOption @, 'templateHelpers'
						dateRanges = templateHelpers['dateRanges']

						# assign color for each daterange
						_.each dateRanges, (range, index)->
							# assign color
							$("td.#{range.class},span.#{range.class}").css 'background', colors[index]


					triggerOnSelect:(date)=>
						@trigger "date:selected", date

					highlightDaysByDateRange:(date)=>
						dateRangeName = App.request "get:daterange:name:for:date", date
						className = _.slugify dateRangeName

						className += " " + App.request "get:avaliability:status", date

						return [true, className]

				#Plans list view
				class View.PlansView extends Marionette.CompositeView

					className : 'plans-view'

					itemView : BookingPlanSingle

					emptyView : BookingPlanEmpty

					template : '<div class="date-range">
									You have selected
									<b>18 Jan to 16 Jan </b>
								</div>
								<div class="room-plans">
											
								</div>'

				# booking plans single view
				class BookingPlanSingle extends Marionette.ItemView

					template : '<div class="room-booking-plan">
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
								</div>'

				# booking plans if not plans are added
				class BookingPlanEmpty extends Marionette.ItemView

					template : '<p>No Plans found for the selected date</p>'