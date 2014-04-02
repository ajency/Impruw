define ['app'
		'apps/builder/site-builder/elements/roombooking/views'
		],
		(App)->

			App.module 'SiteBuilderApp.Element.RoomBooking', (RoomBooking, App, Backbone, Marionette, $, _)->

				# menu controller
				class RoomBooking.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->

						_.defaults options.modelData,
											element  	: 'RoomBooking'
											

						super(options)
						
					bindEvents:->
						# start listening to model events
						@listenTo @layout.model, "change:style", @renderElement
						super()

					_getRoomBookingView:(model)->
						new RoomBooking.Views.RoomBookingView
											model 	: model
											
											
												

					# setup templates for the element
					renderElement:()=>
						@removeSpinner()
						view = @_getRoomBookingView @layout.model
						@layout.elementRegion.show view