define [
		'app'
		'apps/my-profile/edit/controller'
		], (App)->

	App.module 'MyProfileApp', (MyProfileApp, App, Backbone, Marionette, $, _)->

		#@startWithParent = false

		class MyProfileApp.Router extends Marionette.AppRouter

			appRoutes :
				'my-profile' : 'show'


		#public API
		API = 
			show : ()->
				edit = new MyProfileApp.Edit.Controller

		
		MyProfileApp.on 'start': ->
			
			new MyProfileApp.Router
						controller : API