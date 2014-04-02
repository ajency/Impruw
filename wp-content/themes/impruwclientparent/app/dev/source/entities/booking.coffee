define ["app", 'backbone', 'moment'], (App, Backbone, moment) ->

	# App state entity
	App.module "Entities.Booking", (Booking, App, Backbone, Marionette, $, _)->

		# Booking model
		class Booking extends Backbone.Model

			name : 'Booking'

			defaults : ->
				'room_id'	: 0
				'status' 	: 'unavailable'
				'date' 		: new Date() 

		# Booking collection
		class BookingCollection extends Backbone.Collection

			model : Booking

			# url to fetch dateranges
			url : ->
				"#{AJAXURL}?action=fetch-bookings"


		API = 
			getAvailabiltyStatus :(date)->
				return 'avaliable'

		App.reqres.setHandler "get:avaliability:status",(date)->
			API.getAvailabiltyStatus date
