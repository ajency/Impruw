define ['app'
		'apps/builder/site-builder/elements/roomdescription/views'
		#'apps/builder/site-builder/elements/roomdescription/settings/controller'
		],
		(App)->

			App.module 'SiteBuilderApp.Element.RoomDescription', (RoomDescription, App, Backbone, Marionette, $, _)->

				# menu controller
				class RoomDescription.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->

						_.defaults options.modelData,
											element  	: 'RoomDescription'
											

						super(options)
						
					bindEvents:->
						# start listening to model events
						@listenTo @layout.model, "change:style", @renderElement
						super()

					_getRoomDescriptionView:(model)->
						new RoomDescription.Views.RoomDescriptionView
											model 	: model
											
											
												

					# setup templates for the element
					renderElement:()=>
						@removeSpinner()
						view = @_getRoomDescriptionView @layout.model
						@layout.elementRegion.show view