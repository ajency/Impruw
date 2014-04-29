define [
		'app'
		'apps/statistics/show/controller'
		], (App)->


	App.module 'StatisticsApp', (StatisticsApp, App, Backbone, Marionette, $, _)->

		class StatisticsApp.Router extends Marionette.AppRouter

			appRoutes :
				'statistics' : 'show'


		#public API
		API = 
			show : ()->
				new StatisticsApp.Show.Controller
						region : App.rightRegion

		
		StatisticsApp.on 'start': ->
			
			new StatisticsApp.Router
						controller : API