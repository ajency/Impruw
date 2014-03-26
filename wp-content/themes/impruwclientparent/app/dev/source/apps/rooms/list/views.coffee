define ['app'],
		(App, mainviewTpl, roomsingleTpl, emptyTpl)->


			App.module 'RoomsApp.List.Views', (Views, App, Backbone, Marionette, $, _)->

				class RoomSingle extends Marionette.ItemView

					template : roomsingleTpl
				

				class EmptyView extends Marionette.ItemView

					template : emptyTpl


				class Views.RoomsListView extends Marionette.CompositeView

					template : mainviewTpl
					
					itemViewContainer: '.room-list tbody'

					itemView : RoomSingle

					emptyView : EmptyView


				class Views.RoomListLayout extends Marionette.Layout

					template : '<header class="aj-imp-dash-header row">
									<div class="aj-imp-dash-title col-xs-12">
										<h2 class="aj-imp-page-head">Rooms</h2>
									</div>
								</header>
								<a href="#rooms/add" class="btn btn-default btn-lg add-room"><span class="icon icon-plus"></span> Add Room</a>
								<div id="room-list"></div>'

					className: 'rooms-layout'

					regions : 
						roomRegion : '#room-list'

					events:
						'click .add-room' : -> @trigger "add:new:room:clicked"
				