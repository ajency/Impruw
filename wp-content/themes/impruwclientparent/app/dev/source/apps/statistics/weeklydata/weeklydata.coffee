define ['app', 'controllers/base-controller'], (App, AppController, layoutTpl)->

	App.module 'DashboardApp.Statistics.WeeklyData', (WeeklyData, App, Backbone, Marionette, $, _)->

		class WeeklyDataController extends AppController

			initialize:->

				# get the weekly collection
				collection = App.request "get:weekly:data"

				view = @_getWeeklyDataView collection

				@show view,
						loading : true


			_getWeeklyDataView:(collection)->
				new WeeklyDataView 
							collection : collection


		class SingleDayData extends Marionette.ItemView

			template : '<li>on{{formattedDate}} page per visits: {{ga:pageviewsPerVisit}}</li>'

			serializeData:->
				data = super()

				data.formattedDate = ->
					new Date @date

				data

		# create the composite view
		class WeeklyDataView extends Marionette.CompositeView

			template : '<div class="">on{{formattedDate}} single view {{ga:visits}}</div>
						<ul class="week-data"></ul>'

			itemViewContainer : '.week-data'

			itemView : SingleDayData

			serializeData:->
				data = super()

				data.formattedDate = ->
					new Date @date

				data

			onBeforeRender:->
				# pick out the model from collection
				return if not @collection
	
				@model = @collection.pop()


		App.commands.setHandler "show:weekly:data", (opt)->
			new WeeklyDataController opt
