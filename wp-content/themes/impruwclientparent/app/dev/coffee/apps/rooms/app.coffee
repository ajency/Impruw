define [
		'dashboard-app'
		'apps/rooms/list/controller'
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

			edit :(id)->
				edit = new RoomsApp.Edit.Controller id
				edit.showEdit()

		RoomsApp.on 'start': ->
			_.logAppMsg "Room Module started..."
			
			new RoomsApp.Router
				controller : API