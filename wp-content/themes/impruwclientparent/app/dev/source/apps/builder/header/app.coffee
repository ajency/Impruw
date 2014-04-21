define ['app','apps/builder/header/show/controller'], (App)->

	App.module 'HeaderApp', (HeaderApp, App, Backbone, Marionette, $, _)->

		headerController = null

		#PUBLIC API
		API = 
			# show the header region
			show : ()->
				headerController = new HeaderApp.Show.Controller
											region : App.headerRegion

			
		# show the region on start
		HeaderApp.on 'start', ->
			API.show()

		