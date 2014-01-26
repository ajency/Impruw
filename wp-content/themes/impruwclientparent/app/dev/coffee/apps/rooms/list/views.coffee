define ['app'
		'tpl!apps/rooms/list/templates/mainview'
		'tpl!apps/rooms/list/templates/singleroom'
		'tpl!apps/rooms/list/templates/emptyview'],
		(App, mainviewTpl, roomsingleTpl, emptyTpl)->


			App.module 'RoomsApp.List.View', (View, App, Backbone, Marionette, $, _)->

				class View.RoomSingle extends Marionette.ItemView

					template : roomsingleTpl

					tagName : 'tr'

					events : 
						'click a.editroom_link' : (e)-> 
								e.preventDefault()
								@trigger 'edit:room:clicked', @model

				class View.EmptyView extends Marionette.ItemView

					template : emptyTpl


				class View.MainView extends Marionette.CompositeView

					template : mainviewTpl
					
					itemViewContainer: '.room-list tbody'

					itemView : View.RoomSingle

					emptyView : View.EmptyView


				
			return App.RoomsApp.List.View