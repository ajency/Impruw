
define ['app', 'controllers/base-controller'
		'apps/builder/header/show/views'], (App, AppController)->

			App.module 'HeaderApp.Show', (Show, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class Show.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->

						@view = view = new Show.Views.MainView	

						@listenTo view, "add:new:page:clicked", ->
							App.execute "show:add:new:page", region : App.dialogRegion
						
						@show  view