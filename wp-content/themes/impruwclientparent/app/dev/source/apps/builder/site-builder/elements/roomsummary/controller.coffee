define ['app'
		'apps/builder/site-builder/elements/roomsummary/views'
		'apps/builder/site-builder/elements/roomsummary/settings/controller'],
		(App)->

			App.module 'SiteBuilderApp.Element.RoomSummary', (RoomSummary, App, Backbone, Marionette, $, _)->

				# menu controller
				class RoomSummary.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->

						_.defaults options.modelData,
											element  : 'RoomSummary'
											room_id  : 0
											style 	 : 'Room Summary Default'
											

						super(options)
						
					bindEvents:->
						# start listening to model events
						@listenTo @layout.model, "change:style", @renderElement
						@listenTo @layout.model, "change:room_id", @renderElement
						super()

					_getRoomSummaryView:(model, template)->
						opt = 
							model : model

						if @isSingleRoomPage()
							opt.isSingleRoom = true
						else if model.get('ID') is 0
							opt.roomNotSet = true
						else
							opt.template = template

						new RoomSummary.Views.RoomSummaryView opt
												

					isSingleRoomPage:->
						pageName = App.request "get:current:editable:page:name"
						pageName is 'Single Room'
												

					# setup templates for the element
					renderElement:()=>
						@removeSpinner()
						roomId = @layout.model.get 'room_id'		
						model = App.request "get:room:model" , roomId 
						App.execute "when:fetched", model , =>
							# get the address element template
								template = @_getElementTemplate @layout.model
								view = @_getRoomSummaryView model, template
								@layout.elementRegion.show view