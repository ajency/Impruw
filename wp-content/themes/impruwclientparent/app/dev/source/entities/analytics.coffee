define ['app'
		'backbone'],(App, Backbone)->

		App.module "Entities.Analytics", (Analytics, App, Backbone, Marionette, $, _)->

			#Analytics Model
			class Analytics.AnalyticsModel extends Backbone.AssociatedModel

				idAttribute : 'date'

			#Analytics Collection
			class Analytics.AnalyticsCollection extends Backbone.Collection

				model : Analytics.AssociatedModel


			#Public API for antity
			API = 

				# create a empty collection of analytics and store it in offline store
				createStoreCollection:->
					analyticsCollection = new Media.AnalyticsCollection
					App.request "set:collection", 'analyticscollection', analyticsCollection




			#request handlers
			App.commands.setHandler "create:analytics:store", ->
				API.createStoreCollection()