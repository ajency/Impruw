
define ['app', 'controllers/base-controller'
		'apps/builder/header/show/views'], (App, AppController)->

	App.module 'HeaderApp.Show', (Show, App, Backbone, Marionette, $, _)->

		class Show.Controller extends AppController

			initialize:(opt = {})->

				view = new Show.View.MainView	

				@show  view


	App.HeaderApp.Show.Controller		