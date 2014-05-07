
define ['app', 'controllers/base-controller'
		'apps/builder/header/show/views'], (App, AppController)->

			App.module 'HeaderApp.Show', (Show, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class Show.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->

						themeColorCollection = App.request "get:themes:color:collection"

						view = @getView themeColorCollection 	

						@listenTo view, "add:new:page:clicked", ->
							App.execute "show:add:new:page", region : App.dialogRegion
						
						@show  view,
								loading:true

					getView :(themeColorCollection)->
						new Show.Views.MainView
								collection : themeColorCollection
