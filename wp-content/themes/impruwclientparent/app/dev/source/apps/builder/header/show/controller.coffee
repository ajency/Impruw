
define ['app', 'controllers/base-controller'
		'apps/builder/header/show/views'], (App, AppController)->

			App.module 'HeaderApp.Show', (Show, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class Show.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->

						pages = App.request "get:editable:pages"

						view = new Show.Views.MainView
										collection : pages	
						
						@show  view,
								loading : true


			App.HeaderApp.Show.Controller		