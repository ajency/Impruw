define ['app'
		'text!apps/rooms/list/templates/mainview.html'
		'text!apps/rooms/list/templates/singleroom.html'
		'text!apps/rooms/list/templates/emptyview.html'],
		(App, mainviewTpl, roomsingleTpl, emptyTpl)->


			App.module 'RoomsApp.List.Views', (Views, App, Backbone, Marionette, $, _)->

				class RoomSingle extends Marionette.ItemView

					tagName: "tr"

					template : roomsingleTpl
				

				class EmptyView extends Marionette.ItemView

					template : emptyTpl


				class Views.RoomsListView extends Marionette.CompositeView

					template : mainviewTpl
					
					itemViewContainer: '.room-list tbody'

					itemView : RoomSingle

					emptyView : EmptyView


				class Views.RoomListLayout extends Marionette.Layout

					template : '<div id="room-list"></div>'

					className: 'rooms-layout'

					regions : 
						roomRegion : '#room-list'

					events:
						'click .add-room' : -> @trigger "add:new:room:clicked"
				