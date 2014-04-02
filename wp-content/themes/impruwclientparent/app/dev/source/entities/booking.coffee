define ["app", 'backbone', 'moment'], (App, Backbone, moment) ->

	# App state entity
	App.module "Entities.Booking", (Booking, App, Backbone, Marionette, $, _)->

		# Booking model
		class Booking extends Backbone.Model

			name : 'booking'

			defaults : ->
				'room_id'	: 0
				'status' 	: 'available'
				'bdate'		: ''

			parse:(resp)->
				if resp.code is 'OK'
					resp.data.id = parseInt resp.data.id
					resp.data.room_id = parseInt resp.data.room_id
					return resp.data
				resp

		# Booking collection
		class BookingCollection extends Backbone.Collection

			model : Booking

			# url to fetch dateranges
			url : ->
				"#{AJAXURL}?action=fetch-bookings"

			# get bookings on
			getBookingOn:(date)->
				date = if _.isString(date) then moment(date) else date
				#time = date.getTime()

				checkBooking =(booking)->
					bdate = new Date booking.get 'bdate'
					moment(date).isSame(bdate)  

				# find the booking model
				models = @filter checkBooking

				if models.length > 0
					return models[0]
				else 
					return false


		window.bookings = new BookingCollection

		# API to access 
		API = 
			fetchRoomBookings:(roomId)->
				bookings.roomId = roomId
				bookings.fetch 
							reset : true # so it will remove previously fetched models
							data : 
								room_id : roomId

				bookings

			setBookingStatusForDate:(date, status)->
				booking = bookings.getBookingOn date

				if not booking 
					booking = new Booking 
										bdate : date
					bookings.add booking
				
				booking.set 
						status : status
						room_id : bookings.roomId
							

				booking.save null,
							wait : true 


			getAvailabiltyStatus :(date)->
				# get the model
				model = bookings.getBookingOn date

				if _.isObject model
					model.get 'status'
				else
					return 'available'

		# handlers
		App.reqres.setHandler "fetch:room:bookings", (roomId)->
			API.fetchRoomBookings roomId

		App.reqres.setHandler "get:avaliability:status",(date)->
			API.getAvailabiltyStatus date

		App.commands.setHandler "set:booking:status:for:date", (date, status)->
			API.setBookingStatusForDate date, status
