
define ['app', 'controllers/base-controller'
		'apps/builder/site-builder/show/views'], (App, AppController)->

			App.module 'SiteBuilderApp.Show', (SiteBuilderApp, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class Show.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->

						_entities = @_getEntities()

						view = new Show.View.MainView	

						@show  view


			App.SiteBuilderApp.Show.Controller		