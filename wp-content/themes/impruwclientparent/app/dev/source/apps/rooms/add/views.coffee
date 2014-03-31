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
							data = Backbone.Syphon.serialize @
							#if @$el.valid()
							@trigger "save:new:room", data

						'click .add-gallery-images':-> @trigger "show:edit:slider"


					onShowSuccessMessage:->
						@$el.prepend '<div class="alert alert-success">Saved successfully</div>'
						@$el.find('#btn_resetroom').click()
						$('html, body').animate
							scrollTop: 0
						,1000

					onSetSliderId :(slider_id)->
						@$el.find('input[name="slider_id"]').val slider_id

					regions : 
						facilitiesRegion 	: '#facilities-region'
						galleryRegion 		: '#gallery-region'
						roomTariffRegion	: '#room-tariff-region'
						roomBookingRegion   : '#room-booking-region'