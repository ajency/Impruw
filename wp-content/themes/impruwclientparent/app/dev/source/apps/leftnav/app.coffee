define ['app','apps/leftnav/show/controller'], (App)->

	App.module 'LeftNav', (LeftNav, App, Backbone, Marionette, $, _)->

		API = 
			show : ()->

				controller = new LeftNav.Show.Controller
											region : App.leftRegion

				controller.showLeftNav()
				

		LeftNav.on 'start', ->
			
			_.logAppMsg "LeftNav Module started..."

			API.show()
			

		