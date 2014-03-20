#module "Room List App", ->
define ['underscore', 'apps/rooms/app'], (_)->

	test "Set Up Tests", ->
		ok App.RoomsApp, "App.RoomsApp must be present"
		ok App.RoomsApp.Router, "main router must be present"
		ok App.RoomsApp.List, "List app must be present"
		ok App.RoomsApp.List.ListController, "List controller must be present"
		ok App.RoomsApp.List.Views.RoomListLayout, "Rooms list view layout must be present"
		ok App.RoomsApp.List.Views.RoomsListView, "Rooms list view composite view must be present"

		# get layout
		controller = new App.RoomsApp.List.ListController
		ok controller._getLayout, "get the layout for the rooms list"

		ok 1

	console.log "log"

	


