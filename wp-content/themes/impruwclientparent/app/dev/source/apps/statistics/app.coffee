define [
		'app'
		'apps/statistics/show/controller'
		'apps/statistics/realtime/controller'
		'apps/statistics/visits/controller'
		'apps/statistics/traffic/controller'
		], (App)->


	App.module 'StatisticsApp', (StatisticsApp, App, Backbone, Marionette, $, _)->

		class StatisticsApp.Router extends Marionette.AppRouter

			appRoutes :

				'statistics' : 'show'
				'statistics/realtime' : 'realtime'
				'statistics/visits'   : 'visits'
				'statistics/traffic'  : 'traffic'


		#public API
		API =
			getSiteModel  :->
				siteProfile = App.request "get:site:model"
				siteProfile

			show : ()->
				@sitemodel  =  @getSiteModel()
				new StatisticsApp.Show.Controller
						region : App.rightRegion
						model  : @sitemodel

			realtime : () ->
				@sitemodel  =  @getSiteModel()
				App.execute "show:realtime:view",
							region : App.rightRegion
							model  : @sitemodel
			visits : () ->
				@sitemodel  =  @getSiteModel()
				App.execute "show:visits:view",
							region : App.rightRegion
							model  : @sitemodel
			traffic : () ->
				@sitemodel  =  @getSiteModel()
				App.execute "show:traffic:view",
							region : App.rightRegion
							model  : @sitemodel
						
						
		
		StatisticsApp.on 'start': ->			
			new StatisticsApp.Router
						controller : API