define ['app','apps/dashboard/show/controller'], (App)->

	App.module 'DashboardApp', (DashboardApp, App, Backbone, Marionette, $, _)->

		class DashboardApp.Router extends Marionette.AppRouter

			appRoutes :
				'' : 'show'
				'dashboard' : 'show'

		API = 
			show : ()->

				controller = new DashboardApp.Show.Controller

				controller.showDashboard()
				

		DashboardApp.on 'start', ->
			
			_.logAppMsg "DashboardApp Module started..."

			new DashboardApp.Router
				controller : API
			

		