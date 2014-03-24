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
			getTariffCollection:->
				tariffCollection


		App.reqres.setHandler "get:tariffs:collection", ->
			API.getTariffCollection()