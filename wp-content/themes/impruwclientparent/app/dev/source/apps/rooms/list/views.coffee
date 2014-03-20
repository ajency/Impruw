define ['app'],
		(App, mainviewTpl, roomsingleTpl, emptyTpl)->


			App.module 'RoomsApp.List.Views', (Views, App, Backbone, Marionette, $, _)->

				class RoomSingle extends Marionette.ItemView

					#template : roomsingleTpl
					template : '<h3>ROOM FEATURES</h3>'
					#tagName : 'tr'

					#events : 
						#'click a.addroom_link' : (e)-> 
								#@trigger 'add:room:clicked', @model

				class EmptyView extends Marionette.ItemView

					template : emptyTpl


				class Views.RoomsListView extends Marionette.CompositeView

					template : mainviewTpl
					
					itemViewContainer: '.room-list tbody'

					itemView : RoomSingle

					emptyView : EmptyView


				class Views.RoomListLayout extends Marionette.Layout

					template : '<h4>Room Title</h4><input type="button" value="Add" class="add-room"/>
								<div id="room-list"></div>'

					className: 'rooms-layout'

					regions : 
						roomRegion : '#room-list'

					events:
						'click .add-room' : -> @trigger "add:new:room:clicked"
				