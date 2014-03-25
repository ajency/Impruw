
define ['app', 'controllers/base-controller'
		'apps/builder/header/show/views'], (App, AppController)->

			App.module 'HeaderApp.Show', (Show, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class Show.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->

						pages = App.request "get:editable:pages"

						@view = view = new Show.Views.MainView
											collection : pages	

						@listenTo view, "add:new:page:clicked", ->
							App.execute "show:add:new:page", region : App.dialogRegion

						@listenTo view, 'editable:page:changed',(pageId)->
															# set the cookie
															$.cookie 'current-page-id', pageId
															App.execute "editable:page:changed", pageId
						
						@show  view,
								loading : true

					getHomePageId:->
						@view.getHomePageId()
