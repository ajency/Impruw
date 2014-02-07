define ['app','apps/builder/header/show/controller'], (App)->

	App.module 'SiteBuilderApp', (SiteBuilderApp, App, Backbone, Marionette, $, _)->

		#PUBLIC API
		API = 
			show : ()->

				new SiteBuilderApp.Show.Controller


		SiteBuilderApp.on 'start', ->
			
			API.show()

		