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
											element  	: 'RoomSummary'
											

						super(options)
						
					bindEvents:->
						# start listening to model events
						@listenTo @layout.model, "change:style", @renderElement
						super()

					_getRoomSummaryView:(model, template)->
						new RoomSummary.Views.RoomSummaryView
												model 	: model
												template : template
												

					# setup templates for the element
					renderElement:()=>
						@removeSpinner()
						# get the address element template
						template = @_getElementTemplate @layout.model
						view = @_getRoomSummaryView @layout.model, template
						@layout.elementRegion.show view