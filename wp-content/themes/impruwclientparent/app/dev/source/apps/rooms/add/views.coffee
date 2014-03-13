define ['app'
		'text!apps/rooms/add/templates/add-room.html'],
		(App, addRoomTpl)->

			App.module 'RoomsApp.Add.View', (View, App, Backbone, Marionette, $, _)->

				class View.AddRoom extends Marionette.ItemView

					template : addRoomTpl

					tagName : 'form'

					className : 'form-horizontal clearfix'

					events:
						'click #btn_saveroom' : ->
							# check for validation
							if @$el.valid()
								@trigger "save:new:room", Backbone.Syphon.serialize @

					onShowSuccessMessage:->
						@$el.prepend '<div class="alert alert-success">SAve successfully</div>'


				class View.AddRoomLayout extends Marionette.Layout
					
					template : '<header class="aj-imp-dash-header row">
									<div class="aj-imp-dash-title col-xs-12">
										<h2 class="aj-imp-page-head">Add Room</h2>
									</div>
								</header>
								<div class="row" id="add-room-form"></div>
								<div class="row" id="facilities"></div>'

					regions : 
						formRegion : '#add-room-form'
						facilitiesRegion : '#facilities'

					events:
						'click .save-button' : ''