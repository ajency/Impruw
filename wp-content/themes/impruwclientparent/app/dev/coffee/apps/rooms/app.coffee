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
				edit = new RoomsApp.Edit.Controller 
												model : room
												region : App.dialogRegion
												 
				#edit.showEdit()
				console.log room


		App.vent.on "edit:room:clicked", (room)->
			API.edit(room)

		RoomsApp.on 'start': ->
			_.logAppMsg "Room Module started..."
			
			new RoomsApp.Router
				controller : API