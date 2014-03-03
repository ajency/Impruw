define ['app'
		'apps/builder/site-builder/elements/slider/views'
		'apps/builder/site-builder/elements/slider/settings/controller'],
		(App)->

			App.module 'SiteBuilderApp.Element.Slider', (Slider, App, Backbone, Marionette, $, _)->

				# menu controller
				class Slider.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->

						_.defaults options.modelData,
											element  	: 'Slider'
											slider_id 	: 0

						super(options)
						
					bindEvents:->
						# start listening to model events
						@listenTo @layout.model, "change:style", @renderElement
						super()

					_getSliderView:(collection)->
						new Slider.Views.SliderView
											collection : collection
												

					# setup templates for the element
					renderElement:()=>
						@removeSpinner()

						collection = new Backbone.Collection [	( 
																	image: 'dsds'
																	order: 1
																)
																( 
																	image: 'dsds'
																	order: 2
																)
																( 
																	image: 'dsds'
																	order: 3
																)
															]


						view = @_getSliderView collection
						@layout.elementRegion.show view