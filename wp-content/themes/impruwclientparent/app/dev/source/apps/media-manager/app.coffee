define ['app'
		'apps/media-manager/upload/controller'
		'apps/media-manager/all-media/controller'
		'apps/media-manager/show/controller'], (App)->

			App.module 'MediaManager', (MediaManager, App, Backbone, Marionette, $, _)->

				#@startWithParent = false

				class MediaManager.Router extends Marionette.AppRouter

					appRoutes :
						'media-manager' : 'show'

				
				#public API
				API = 
					show:()->
						new MediaManager.Show.Controller
												region : App.dialogRegion

				
				App.vent.on "show:media:manager", ->
						API.show()	

				MediaManager.on "start", ->
					new MediaManager.Router
								controller : API				