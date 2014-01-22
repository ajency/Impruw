define ['dashboard-app','apps/leftnav/show/controller'], (app, ShowController)->

	app.module 'LeftNav', (LeftNav, App, Backbone, Marionette, $, _)->

		@startWithParent = false

		class LeftNav.Router extends Marionette.AppRouter

			appRoutes : 
				'leftNav' : 'show'

		API = 
			show : 
				new ShowController

		LeftNav.on 'start': ->
			_.logAppMsg "LeftNav Module started..."
			new Router 
				controller : API
			

		