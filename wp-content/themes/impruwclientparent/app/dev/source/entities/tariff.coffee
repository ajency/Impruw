define ["app", 'backbone'], (App, Backbone) ->

	# App state entity
	App.module "Entities.Tariffs", (Tariffs, App, Backbone, Marionette, $, _)->

		# tariffs model
		class Tariff extends Backbone.Model

			name : 'tariff'

			defaults : ->
				'plan_id' : 0
				'daterange_id' : 0
				'weekday' : {}
				'weekend' : {}

		# tariff collection
		class TariffCollection extends Backbone.Collection

			model : Tariff

			url : ->
				"#{AJAXURL}?action=fetch-tariffs"


		# create  a tariffs collection
		tariffCollection = new TariffCollection

		API = 
			# get tariff collection
			getTariffCollection:(roomId)->
				tariffCollection.fetch 
								reset : true
								data : 
									room_id : roomId

				tariffCollection

			getTariffsForDateRange:(daterangeId)->
				tariffCollection.where 'daterange_id': daterangeId


			# fetch the tariff model
			getTariff :(id)->
				tariff = new Tariff id : id
				tariff.fetch()
				tariff


		App.reqres.setHandler "get:tariffs:collection",(roomId)->
			API.getTariffCollection roomId

		App.reqres.setHandler "get:tariffs:for:daterange",(daterangeId)->
			API.getTariffsForDateRange daterangeId

		App.reqres.setHandler "get:tariff",(id)->
			API.getTariff id