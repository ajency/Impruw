define ['app'
		'text!apps/rooms/add/templates/add-room.html'],
		(App, addRoomTpl)->

			App.module 'RoomsApp.Add.View', (View, App, Backbone, Marionette, $, _)->

				class View.AddRoomLayout extends Marionette.Layout
						
					tagName: 'form'

					className : 'form-horizontal clearfix'

					template : addRoomTpl

					events:
						'click #btn_saveroom' : ->
							# check for validation
							if @$el.valid()
								@trigger "save:new:room", Backbone.Syphon.serialize @

					onShowSuccessMessage:->
						@$el.prepend '<div class="alert alert-success">SAve successfully</div>'


					regions : 
						facilitiesRegion 	: '#facilities-region'
						galleryRegion 		: '#gallery-region'
						roomTariffRegion	: '#room-tariff-region'