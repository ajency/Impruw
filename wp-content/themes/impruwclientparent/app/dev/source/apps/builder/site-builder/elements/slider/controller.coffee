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
						@listenTo @layout.model, "change:slider_id", @renderElement
						super()

					_getSliderView:(collection)->
						new Slider.Views.SliderView
											collection : collection
												

					# setup templates for the element
					renderElement:(slidesCollection)=>
						@removeSpinner()

						if not _.isObject slidesCollection
							slidesCollection = App.request "get:slides:for:slide" , @layout.model.get 'slider_id'

						App.execute "when:fetched", slidesCollection, =>
							view = @_getSliderView slidesCollection

							@listenTo view, "show:slides:manager", =>
								App.execute "show:slides:manager",slidesCollection

							@listenTo slidesCollection, "remove add", =>
								@renderElement slidesCollection

							@layout.elementRegion.show view