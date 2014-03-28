define ['app', 'controllers/base-controller', 'apps/statistics/weeklydata/weeklydata'], (App, AppController, layoutTpl)->

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

				@show layout



		class StatisticsLayout extends Marionette.Layout

			template : '<div id="weekly-data-region"></div>
						<div id="overview-data-region"></div>
						<div id="all-traffic-data-region"></div>'

			regions : 
				weeklyDataRegion : '#weekly-data-region'
				overviewDataRegion : '#overview-data-region'
				allTrafficDataRegion : '#all-traffic-data-region'


		Statistics.on "start",->
			new StatisticsRouter
						controller : API