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
							if @$el.valid()
								@trigger "save:new:room", Backbone.Syphon.serialize @

						'click .add-gallery-images':-> @trigger "show:edit:slider"


					onShowSuccessMessage:->
						@$el.prepend '<div class="alert alert-success">Saved successfully</div>'

					onSetSliderId :(slider_id)->
						@$el.find('input[name="slider_id"]').val slider_id

					regions : 
						facilitiesRegion 	: '#facilities-region'
						galleryRegion 		: '#gallery-region'
						roomTariffRegion	: '#room-tariff-region'