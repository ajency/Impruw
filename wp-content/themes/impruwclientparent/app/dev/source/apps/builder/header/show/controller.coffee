
define ['app', 'controllers/base-controller'
		'apps/builder/header/show/views'], (App, AppController)->

			App.module 'HeaderApp.Show', (Show, App, Backbone, Marionette, $, _)->

				# Controller class for showing header resion
				class Show.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->

						@layout = layout = @getLayout()
						
						#change theme color click
						@listenTo @layout ,"show:theme:color:clicked",->
							App.execute "show:theme:color:set", region : App.dialogRegion

						# heartbeat API
						@listenTo App.vent, 'page:took:over', (errorMessage)->
							layout.triggerMethod 'page:took:over', errorMessage

						@listenTo App.vent, 'page:released', ->
							layout.triggerMethod 'page:released'

						@show  @layout,
								loading:true

					getLayout :->
						new Show.Views.MainView
					




								
