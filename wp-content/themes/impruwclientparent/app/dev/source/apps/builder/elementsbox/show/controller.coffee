
define ['app', 'controllers/base-controller'
		'apps/builder/elementsbox/show/views'], (App, AppController)->

		App.module 'ElementsBoxApp.Show', (Show, App, Backbone, Marionette, $, _)->

			class Show.Controller extends AppController

				initialize:(opt = {})->

					elements = App.request "get:elementbox:elements"

					view = new Show.Views.MainView
											collection : elements	

					@show  view,
							loading : true


		App.ElementsBoxApp.Show.Controller		