define [
		'app'
		'apps/my-profile/show/controller'
		'apps/my-profile/general/controller'
		'apps/my-profile/password/controller'
		'apps/my-profile/language/controller'
		], (App)->

	App.module 'MyProfileApp', (MyProfileApp, App, Backbone, Marionette, $, _)->

		#@startWithParent = false

		class MyProfileApp.Router extends Marionette.AppRouter

			appRoutes :
				'my-profile' : 'show'


		#public API
		API = 
			show : ()->
				new MyProfileApp.Show.Controller
						region : App.rightRegion

		
		MyProfileApp.on 'start': ->
			
			new MyProfileApp.Router
						controller : API