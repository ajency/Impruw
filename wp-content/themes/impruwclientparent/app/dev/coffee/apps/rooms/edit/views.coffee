define ['app'
		'tpl!apps/rooms/edit/templates/editroom'],
		(App, editRoomTpl)->


			App.module 'RoomsApp.Edit.View', (View, App, Backbone, Marionette, $, _)->

				class View.EditRoom extends Marionette.ItemView

					template : editRoomTpl

					className : 'modal-dialog'

					dialog : 
						title : 'Edit Room'


				
			return App.RoomsApp.Edit.View