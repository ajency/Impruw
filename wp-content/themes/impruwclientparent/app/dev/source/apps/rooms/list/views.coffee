define ['app'],
		(App, mainviewTpl, roomsingleTpl, emptyTpl)->


			App.module 'RoomsApp.List.View', (View, App, Backbone, Marionette, $, _)->

				class View.RoomSingle extends Marionette.ItemView

					#template : roomsingleTpl
					template : '<h3>ROOM FEATURES</h3>'
					#tagName : 'tr'

					#events : 
						#'click a.addroom_link' : (e)-> 
								#@trigger 'add:room:clicked', @model

				class View.EmptyView extends Marionette.ItemView

					template : emptyTpl


				class View.MainView extends Marionette.CompositeView

					template : mainviewTpl
					
					itemViewContainer: '.room-list tbody'

					itemView : View.RoomSingle

					emptyView : View.EmptyView


				class View.RoomListLayout extends Marionette.Layout

					template : '<h4>Room Title</h4><input type="button" value="Add" class="add-room"/>
								<div id="room-list"></div>'

					className: 'rooms-layout'

					regions : 
						roomRegion : '#room-list'

					events:
						'click .add-room' : -> @trigger "add:new:room:clicked"
				