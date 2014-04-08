define ['app', 'controllers/base-controller', 
		'apps/statistics/weeklydata/weeklydata'
		'apps/statistics/siteanalytics/siteanalyticscontroller'], (App, AppController, layoutTpl)->

	App.module 'DashboardApp.Statistics', (Statistics, App, Backbone, Marionette, $, _)->

		# define the router
		class StatisticsRouter extends Marionette.AppRouter
			appRoutes :
				'statistics' : 'showStatistics'


		API = 
			showStatistics : ->
				new StatisticsController

		# main statistics controller
		class StatisticsController extends AppController

			initialize:(opt)->

				layout = new StatisticsLayout

				#listen to show event of layout and trigger apps
				@listenTo layout, "show", =>
					App.execute "show:weekly:data", region : layout.weeklyDataRegion
					#App.execute "show:site:analytics:data", region : layout.analyticsDataRegion

				@show layout

				App.vent.trigger "set:active:menu", 'statistics'



		class StatisticsLayout extends Marionette.Layout

			template : '<div id="weekly-data-region"></div>
						<div id="analytics-data-region"></div>'

			regions : 
				weeklyDataRegion : '#weekly-data-region'
				analyticsDataRegion : '#analytics-data-region'


		Statistics.on "start",->
			new StatisticsRouter
						controller : API