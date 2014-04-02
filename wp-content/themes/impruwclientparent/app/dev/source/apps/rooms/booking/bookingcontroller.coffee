define ['app', 'controllers/base-controller'
		'apps/rooms/booking/views'], (App, AppController)->

	App.module 'RoomsApp.Booking', (Booking, App, Backbone, Marionette, $, _)->

		class Booking.Controller extends AppController

			initialize:(options)->

				{roomId} = options

				@bookings = App.request "fetch:room:bookings", roomId = 2

				@layout = layout = @getRoomBookingLayout(@bookings)	

				@listenTo layout, "show", @showBookingCalendarView
						
				@show layout, 
						loading : true

			showBookingCalendarView:=>

				dateRangeCollection = App.request "get:daterange:collection"

				templateHelpers = 
						dateRanges : dateRangeCollection.getDateRanges()

				@cview = cview = new Booking.View.CalendarView
											templateHelpers : templateHelpers

				# listen to date selected event
				@listenTo cview, "date:selected", @showBookingPlansView

				@layout.calendarRegion.show cview

			showBookingPlansView:(date)=>

				plansCollection = App.request "get:plans:collection", date

				pview = new Booking.View.PlansView 
										collection : plansCollection
										
				@layout.plansDetailsRegion.show pview

			getRoomBookingLayout : (c)->
				new Booking.View.BookingRoomLayout
										collection : c

			
		App.commands.setHandler "show:booking:app", (opts)->
				new Booking.Controller opts
								