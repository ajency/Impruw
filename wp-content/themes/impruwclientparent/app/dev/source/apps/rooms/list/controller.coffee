define ['app', 'controllers/base-controller', 'apps/rooms/list/views'], (App, AppController)->

	App.module 'RoomsApp.List', (List, App, Backbone, Marionette, $, _)->

		class List.ListController extends AppController

			initialize:()->

				@layout = @_getLayout()
				
				# add the room list to roomRegion
				@listenTo @layout, "show", @showRoomsList

				#listen to the button clicked trigger
				@listenTo @layout, 'add:new:room:clicked',() ->
					App.execute "show:add:room"

				# trigger set:active:menu event
				App.vent.trigger "set:active:menu", 'rooms'

				@show @layout

			showRoomsList:->
				# get the collection
				collection = App.request "get:room:collection"
				
				listView = @_getRoomsListView collection

				@layout.roomListRegion.show listView
				
			_getLayout:->
				new List.Views.RoomListLayout

					
		App.commands.setHandler "show:rooms:list", (opts)->

				new List.ListController
							region : opts.region 