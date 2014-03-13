define ['app'
		'apps/builder/site-builder/elements/roomtitle/views'
		#'apps/builder/site-builder/elements/roomtitle/settings/controller'
		],
		(App)->

			App.module 'SiteBuilderApp.Element.RoomTitle', (RoomTitle, App, Backbone, Marionette, $, _)->

				# menu controller
				class RoomTitle.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->

						_.defaults options.modelData,
											element  	: 'RoomTitle'
											

						super(options)
						
					bindEvents:->
						# start listening to model events
						@listenTo @layout.model, "change:style", @renderElement
						super()

					_getRoomTitleView:(model)->
						new RoomTitle.Views.RoomTitleView
											model 	: model
											
											
												

					# setup templates for the element
					renderElement:()=>
						@removeSpinner()
						view = @_getRoomTitleView @layout.model
						@layout.elementRegion.show view