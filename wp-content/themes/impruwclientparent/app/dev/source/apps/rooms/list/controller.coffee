define ['app', 'controllers/base-controller', 'apps/rooms/list/views'], (App, AppController)->

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

					
		App.commands.setHandler "show:rooms:list", (opts)->

				new List.Controller
							region : opts.region 