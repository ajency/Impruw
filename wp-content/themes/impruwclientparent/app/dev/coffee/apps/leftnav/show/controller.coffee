
define ['dashboard-app', 'controllers/base-controller'
		'apps/leftnav/show/views'], (App, AppController)->

	App.module 'LeftNav.Show', (Show, App, Backbone, Marionette, $, _)->

		class Show.Controller extends AppController

			showLeftNav : ()->
				
				@show new Show.View.LeftNav		