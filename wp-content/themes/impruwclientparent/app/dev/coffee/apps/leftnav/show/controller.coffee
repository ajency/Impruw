
define ['dashboard-app'], (App)->

	App.module 'LeftNav.Show', (Show, App, Backbone, Marionette, $, _)->

		@startWithParent = false

		Show.Controller =

			showLeftNav : ()->
				