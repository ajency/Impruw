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
				'rooms/add' : 'add'


		#public API
		API = 
			# list rooms route handler
			list : ()->
				App.execute "show:rooms:list", 
								region : App.rightRegion

			#add room route handler
			add :()->
				App.execute "show:add:room"
												 

		# Setup router on module start event
		RoomsApp.on 'start': ->
			new RoomsApp.Router
						controller : API