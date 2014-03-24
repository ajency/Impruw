define ["app", 'backbone'], (App, Backbone) ->

	# App state entity
	App.module "Entities.Tariffs", (Tariffs, App, Backbone, Marionette, $, _)->

		# tariffs model
		class Tariff extends Backbone.Model

			name : 'tariff'

			defaults : ->
				'' : ''
				'' : ''

		# tariff collection
		class TariffCollection extends Backbone.Collection

			model : Tariff

			url : ->
				"#{AJAXURL}?action=fetch-tariffs"


		# create  a tariffs collection
		tariffCollection = new TariffCollection

		API = 
			# get tariff collection
			getTariffCollection:->
				tariffCollection

			# fetch the tariff model
			getTariff :(id)->
				tariff = new Tariff id : id
				tariff.fetch()
				tariff


		App.reqres.setHandler "get:tariffs:collection", ->
			API.getTariffCollection()

		App.reqres.setHandler "get:tariff",(id)->
			API.getTariff id