define ['marionette'
		'backbone'
		'tpl!builder/templates/modal/singleroom.tpl'
		'tpl!builder/templates/modal/rooms.tpl'],
		(Marionette, Backbone, singleRoomTpl)->

			class RoomSingle extends Marionette.ItemView

				template : singleRoomTpl

				events :
					'click' : 'roomSelected'

				roomSelected :->
					getAppInstance().vent.trigger 'room-selected', @model


			class RoomsView extends Marionette.CollectionView

				itemView : RoomSingle