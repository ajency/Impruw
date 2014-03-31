define ['app'
		'text!apps/rooms/add/templates/add-room.html'],
		(App, addRoomTpl)->

			App.module 'RoomsApp.Booking.View', (View, App, Backbone, Marionette, $, _)->

				class View.BookingRoomLayout extends Marionette.Layout

					className : 'row'
						
					template : '<div class="col-md-9" id="calendar-region"></div>
								<div class="col-md-3" id="plans-details-region"></div>'

					regions:
						calendarRegion : '#calendar-region'
						plansDetailsRegion : '#plans-details-region'


					
				class View.CalendarView extends Marionette.CompositeView

					template : 'add left side markup here
								<div id="room-booking-calendar"></div>'

					onShow:->
						@$el.find '#room-booking-calendar'
							.datepicker
								inline: true
								numberOfMonths : 2


				class View.PlansView extends Marionette.CompositeView

					className : 'plans-view'

					template : 'Add plans view markup here'