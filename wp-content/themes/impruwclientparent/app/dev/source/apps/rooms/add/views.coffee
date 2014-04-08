define ['app'
		'text!apps/rooms/add/templates/add-room.html'],
		(App, addRoomTpl)->

			App.module 'RoomsApp.Add.View', (View, App, Backbone, Marionette, $, _)->

				class View.AddRoomLayout extends Marionette.Layout
						
					tagName: 'div'

					className : 'add-room-container scroll-indicator-container'

					template : addRoomTpl

					events:
						'click #btn_saveroom' : ->
							if @$el.find('form').valid()
								data = Backbone.Syphon.serialize @
								@trigger "save:new:room", data
							else
								ele = @$el.find('.field-error').get(0)
								$.scrollTo ele

						'click .add-gallery-images':-> @trigger "show:edit:slider"

					onShow:->
						@$el.scrollSections()
						
						# set affix
						@$el.find('*[data-spy="affix"]').affix()

						a=@$el.find('*[data-spy="affix"]').html()
						console.log a

						# affix width
						w = $('.aj-imp-right').width()
						console.log w
						@$el.find('*[data-spy="affix"]').width(w)

						m = $('.aj-imp-left').width()
						console.log m
						@$el.find('*[data-spy="affix"]').css('margin-left', m)
						

					onShowSuccessMessage:->
						@$el.find('.alert').remove()
						@$el.prepend '<div class="alert alert-success">New room added successfully</div>'
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