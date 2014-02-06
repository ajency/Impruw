define ['app','apps/builder/header/show/controller'], (App)->

	App.module 'HeaderApp', (HeaderApp, App, Backbone, Marionette, $, _)->

		#PUBLIC API
		API = 
			show : ()->

				new HeaderApp.Show.Controller
								region : App.headerRegion


		HeaderApp.on 'start', ->
			
			API.show()

		