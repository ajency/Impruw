define ['app'
		'apps/builder/site-builder/elements/roomtariff/views'
		#'apps/builder/site-builder/elements/roomtariff/settings/controller'
		],
		(App)->

			App.module 'SiteBuilderApp.Element.RoomTariff', (RoomTariff, App, Backbone, Marionette, $, _)->

				# menu controller
				class RoomTariff.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->

						_.defaults options.modelData,
											element  	: 'RoomTariff'
											

						super(options)

				
						
					bindEvents:->
						# start listening to model events
						@listenTo @layout.model, "change:style", @renderElement
						super()

					_getRoomTariffView:(model)->
						new RoomTariff.Views.RoomTariffView
											model 	: model
											
											
												

					# setup templates for the element
					renderElement:()=>
						@removeSpinner()
						view = @_getRoomTariffView @layout.model
						@layout.elementRegion.show view