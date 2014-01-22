define ['dashboard-app'], (app)->

	app.module 'Room', (Room, App, Backbone, Marionette, $, _)->

		@startWithParent = false

		Room.on 'start': ->
			_.logAppMsg "Room Module started..."