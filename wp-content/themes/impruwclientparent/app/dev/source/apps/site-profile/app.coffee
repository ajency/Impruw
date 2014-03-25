define [
		'app'
		'apps/site-profile/edit/controller'
		], (App)->

			App.module 'SiteProfileApp', (SiteProfileApp, App, Backbone, Marionette, $, _)->

				#@startWithParent = false

				class SiteProfileApp.Router extends Marionette.AppRouter

					appRoutes :
						'site-profile' : 'show'

				#public API
				API = 
					show : ()->
						edit = new SiteProfileApp.Edit.Controller
						edit.showSiteProfile()


				SiteProfileApp.on 'start': ->
					
					_.logAppMsg "Site Profile Module started..."
					
					new SiteProfileApp.Router
						controller : API