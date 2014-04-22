
define ['app', 'controllers/base-controller'
		'apps/builder/elementsbox/show/views'], (App, AppController)->

		App.module 'ElementsBoxApp.Show', (Show, App, Backbone, Marionette, $, _)->

			# show actual view
			class Show.Controller extends AppController

				initialize:(opt = {})->

					elements = App.request "get:elementbox:elements"

					view = new Show.Views.MainView
											collection : elements	

					@show  view,
							loading : true

			# show error
			class Show.ErrorController extends AppController

				initialize:(opt = {})->

					view = new Show.Views.ErrorView	

					@show  view
	