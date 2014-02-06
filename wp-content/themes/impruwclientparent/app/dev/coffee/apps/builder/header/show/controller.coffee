
define ['app', 'controllers/base-controller'
		'apps/builder/header/show/views'], (App, AppController)->

			App.module 'HeaderApp.Show', (Show, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class Show.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->

						_entities = @_getEntities()

						view = new Show.View.MainView	

						@show  view,
								loading : true 
								entities: _entities

					# get all the entities for the controller
					# here we need pages and themes entities for header region
					_getEntities :->

						pages : App.request "get:editable:pages"
						themes: App.request "get:themes"

			App.HeaderApp.Show.Controller		