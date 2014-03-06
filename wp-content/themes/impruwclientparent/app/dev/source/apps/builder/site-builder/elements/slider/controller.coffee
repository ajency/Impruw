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
											slider_id 	: 1

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

						slidesCollection = App.request "get:slides:for:slide" , @layout.model.get 'slider_id'

						App.execute "when:fetched", slidesCollection, =>
							view = @_getSliderView slidesCollection

							@listenTo view, "itemview:show:slider:manager", =>
								App.navigate "slider-manager", trigger : true

							@layout.elementRegion.show view