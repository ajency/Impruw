define ['app'
		'apps/menu-manager/show/controller'], (App)->

			App.module 'MenuManager', (MenuManager, App, Backbone, Marionette, $, _)->

				#@startWithParent = false

				class MenuManager.Router extends Marionette.AppRouter

					appRoutes :
						'menu-manager' : 'show'

				
				#public API
				API = 
					show:()->
						new MenuManager.Show.Controller
												region : App.dialogRegion

				
				MenuManager.on 'start': ->
					
					_.logAppMsg "MenuManager Module started..."
					
					new MenuManager.Router
							controller : API