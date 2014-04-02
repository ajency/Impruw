define ["app", 'backbone', 'moment'], (App, Backbone, moment) ->

	# App state entity
	App.module "Entities.Booking", (Booking, App, Backbone, Marionette, $, _)->

		# Booking model
		class Booking extends Backbone.Model

			name : 'Booking'

			defaults : ->
				'room_id'	: 0
				'status' 	: 'available'
				'from_date'	: ''
				'to_date'	: '' 

		# Booking collection
		class BookingCollection extends Backbone.Collection

			model : Booking

			# url to fetch dateranges
			url : ->
				"#{AJAXURL}?action=fetch-bookings"

			# get bookings on
			getBookingOn:(date)->
				date = if _.isString(date) then moment(date) else date
				time = date.getTime()

				checkBooking =(booking)->
					from = booking.get 'from_date'
					to   = booking.get 'to_date'

					from = moment(from).subtract('days',1)
					to = moment(to).add('days',1)

					moment(time).isAfter(from) and moment(time).isBefore(to)  

				# find the booking model
				models = @filter checkBooking

				if models.length > 0
					return models[0]
				else 
					return false


		bookings = new BookingCollection

		# API to access 
		API = 
			fetchRoomBookings:(roomId)->
				bookings.fetch 
							reset : true # so it will remove previously fetched models
							data : 
								room_id : roomId

				bookings

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
