define ['app'
		'apps/builder/site-builder/elements/roomfacilities/views'
		#'apps/builder/site-builder/elements/roomfacilities/settings/controller'
		],
		(App)->

			App.module 'SiteBuilderApp.Element.RoomFacilities', (RoomFacilities, App, Backbone, Marionette, $, _)->

				# menu controller
				class RoomFacilities.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->

						_.defaults options.modelData,
											element  	: 'RoomFacilities'
											

						super(options)
						
					bindEvents:->
						# start listening to model events
						@listenTo @layout.model, "change:style", @renderElement
						super()

					_getRoomFacilitiesView:(model, template)->
						new RoomFacilities.Views.RoomFacilitiesView
											model 	: model
											template : template
												

					# setup templates for the element
					renderElement:()=>
						@removeSpinner()
						# get the roomfacilities element template
						#template = @_getElementTemplate @layout.model
						view = @_getRoomFacilitiesView @layout.model 
						@layout.elementRegion.show view