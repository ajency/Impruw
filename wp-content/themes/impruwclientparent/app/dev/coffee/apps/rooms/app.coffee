define [
		'app'
		'apps/rooms/list/controller'
		'apps/rooms/edit/controller'
		], (App)->

	App.module 'RoomsApp', (RoomsApp, App, Backbone, Marionette, $, _)->

		#@startWithParent = false

		class RoomsApp.Router extends Marionette.AppRouter

			appRoutes :
				'rooms' : 'list'
				'rooms/edit/:id' : 'edit'


		#public API
		API = 
			list : ()->
				list = new RoomsApp.List.Controller
				list.showListView()

			edit :(room)->

				if not _.isObject room
					roomId = parseInt room
					room = new App.Entities.Rooms.Room({id : roomId}) 

				edit = new RoomsApp.Edit.Controller 
											model : room
												 


		App.vent.on "edit:room:clicked", (room)->
			API.edit(room)

		RoomsApp.on 'start': ->
			_.logAppMsg "Room Module started..."
			
			new RoomsApp.Router
				controller : API