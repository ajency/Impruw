define ['app', 'controllers/base-controller'
		'apps/rooms/booking/views'], (App, AppController)->

	App.module 'RoomsApp.Booking', (Booking, App, Backbone, Marionette, $, _)->

		class Booking.Controller extends AppController

			initialize:(options)->

				@layout = layout = @getRoomBookingLayout()	

				@listenTo layout, "show", @showBookingCalendarView
					#@showBookingPlansView()
						
				@show layout

			showBookingCalendarView:=>
				@cview = cview = new Booking.View.CalendarView

				# listen to date selected event
				@listenTo cview, "date:selected", @showBookingPlansView

				@layout.calendarRegion.show cview

			showBookingPlansView:(date)=>

				plansCollection = App.request "get:plans:collection", date

				pview = new Booking.View.PlansView 
										collection : plansCollection
										
				@layout.plansDetailsRegion.show pview

			getRoomBookingLayout : ()->
				new Booking.View.BookingRoomLayout

			
		App.commands.setHandler "show:booking:app", (opts)->
				new Booking.Controller opts
								