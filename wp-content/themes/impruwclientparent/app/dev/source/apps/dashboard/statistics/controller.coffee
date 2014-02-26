define ['app'
		'controllers/base-controller'
		'text!apps/dashboard/statistics/templates/layout.html'
		'apps/dashboard/statistics/charts-loader'], (App, AppController, layoutTpl)->

			App.module 'DashboardApp.Statistics', (Statistics, App, Backbone, Marionette, $, _)->

				class Statistics.Router extends Marionette.AppRouter
					appRoutes :
						'statistics' : 'showStatistics'

				class StatisticsLayout extends Marionette.Layout

					template : layoutTpl

					regions : 
						chart1Region : '#stats-chart1'

				class Statistics.Controller extends AppController

					initialize:->
						layout = @_getLayout()

						@listenTo layout, "show", =>
							@_setRegions layout
							@_loadCharts()

						@show layout

					_setRegions:(layout)->
						@regions = layout.regions

					_getLayout:->
						new StatisticsLayout

					_loadCharts:->
						Statistics.OverViewChart.start region : @region.chart1Region



				#PUBLIC API
				API = 
					showStatistics : ()->
						new Statistics.Controller						

				Statistics.on 'start', ->
					new Statistics.Router
								controller : API