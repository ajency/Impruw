define [
		'app'
		'apps/rooms/list/controller'
		'apps/rooms/add/controller'
		], (App)->

	App.module 'RoomsApp', (RoomsApp, App, Backbone, Marionette, $, _)->

		#@startWithParent = false

		class RoomsApp.Router extends Marionette.AppRouter

			appRoutes :
				'rooms' : 'list'
				'rooms/add/:id' : 'add'


		#public API
		API = 
			# list rooms route handler
			list : ()->
				App.execute "show:rooms:list", 
								region : App.rightRegion

			#add room route handler
			add :(room)->

				if not _.isObject room
					roomId = parseInt room
					room = new App.Entities.Rooms.Room({id : roomId}) 

				add = new RoomsApp.Add.Controller 
											model : room
												 

		# Setup router on module start event
		RoomsApp.on 'start': ->
			_.logAppMsg "Room Module started..."
			
			new RoomsApp.Router
				controller : API