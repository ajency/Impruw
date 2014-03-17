define ['app','apps/leftnav/show/controller'], (App)->

	App.module 'LeftNav', (LeftNav, App, Backbone, Marionette, $, _)->

		API = 
			show : ()->

				controller = new LeftNav.Show.Controller
											region : App.leftRegion
				

		LeftNav.on 'start', ->
			
			_.logAppMsg "LeftNav Module started..."

			API.show()
			

		