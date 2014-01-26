
define ['app', 'controllers/base-controller'
		'apps/dashboard/show/views'], (App, AppController)->

	App.module 'DashboardApp.Show', (Show, App, Backbone, Marionette, $, _)->

		class Show.Controller extends AppController

			initialize:()->


			showDashboard : ()->

				view = new Show.View.MainView	

				@show  view, (loading : true)


	App.DashboardApp.Show.Controller		