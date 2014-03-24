define ["app", 'backbone'], (App, Backbone) ->

	# App state entity
	App.module "Entities.DateRange", (DateRange, App, Backbone, Marionette, $, _)->

		# daterange model
		class DateRange extends Backbone.Model

			name : 'daterange'

			defaults : ->
				'start_date' : 0
				'end_date' 	 : 0

		# daterange collection
		class DateRangeCollection extends Backbone.Collection

			model : DateRange

			url : ->
				"#{AJAXURL}?action=fetch-daterange"


		# create  a daterange collection
		dateRangeCollection = new DateRangeCollection

		API = 
			getDateRangeCollection:->
				dateRangeCollection
				dateRangeCollection.fetch()
				dateRangeCollection


		App.reqres.setHandler "get:daterange:collection",->
			API.getDateRangeCollection()