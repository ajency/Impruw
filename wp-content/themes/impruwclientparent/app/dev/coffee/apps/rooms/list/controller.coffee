define ['app', 'controllers/base-controller'
		'apps/rooms/list/views', 'entities/rooms'], (App, AppController)->

	App.module 'RoomsApp.List', (List, App, Backbone, Marionette, $, _)->

		class List.Controller extends AppController

			initialize:()->

				@rooms = App.request "get:room:entities"

				#@layout = @.getLayout()
			
			showListView : ()->	
				
				view = @.getMainView(@rooms)	

				view.on "itemview:edit:room:clicked", (iv, room)->
					App.vent.trigger "edit:room:clicked", room

				@show view,(loading : true)


			getMainView : (collection)->

				new List.View.MainView
					collection : collection

			
	App.RoomsApp.List.Controller		