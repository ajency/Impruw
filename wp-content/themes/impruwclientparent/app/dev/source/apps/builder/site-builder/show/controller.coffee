
define ['app', 'controllers/base-controller'
		'apps/builder/site-builder/show/views'], (App, AppController)->

			App.module 'SiteBuilderApp.Show', (Show, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class Show.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->

						view = new Show.View.MainView	

						# listen to element dropped event for next action
						@listenTo view, "element:dropped", (evt, ui)->
							App.vent.trigger "element:dropped", evt, ui

						@show  view


			App.SiteBuilderApp.Show.Controller		