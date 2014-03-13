define ['app', 'controllers/base-controller'
		'apps/rooms/list/views', 'entities/rooms'], (App, AppController)->

	App.module 'RoomsApp.List', (List, App, Backbone, Marionette, $, _)->

		class List.Controller extends AppController

			initialize:()->

				@layout = @_getLayout()

				#listen to the button clicked trigger
				@listenTo @layout, 'add:new:room:clicked',() ->
					App.execute "show:add:room"

				@show @layout
				
			_getLayout:->
						new List.View.RoomListLayout

			_renderRegion:()->
						#render the views in the region
						console.log "button is clicked"
						#@layout.roomRegion.show @_getRoomListView() 

			_getRoomListView:()->
						new List.View.RoomCollection
					
			

		App.commands.setHandler "show:rooms:list", (opts)->

				#if not opt.region throw new Error 'Region not specified'

				new List.Controller
							region : opts.region 