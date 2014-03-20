define ['app', 'controllers/base-controller', 'apps/rooms/list/views'], (App, AppController)->

	App.module 'RoomsApp.List', (List, App, Backbone, Marionette, $, _)->

		class List.ListController extends AppController

			initialize:()->

				@layout = @_getLayout()

				#listen to the button clicked trigger
				@listenTo @layout, 'add:new:room:clicked',() ->
					App.execute "show:add:room"

				# trigger set:active:menu event
				App.vent.trigger "set:active:menu", 'rooms'

				@show @layout
				
			_getLayout:->
				new List.Views.RoomListLayout

					
		App.commands.setHandler "show:rooms:list", (opts)->

				new List.ListController
							region : opts.region 