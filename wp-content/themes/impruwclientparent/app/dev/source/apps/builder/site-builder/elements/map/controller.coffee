define ['app'
		'apps/builder/site-builder/elements/map/views'
		'apps/builder/site-builder/elements/map/settings/controller'],
		(App)->

			App.module 'SiteBuilderApp.Element.Map', (Map, App, Backbone, Marionette, $, _)->

				# menu controller
				class Map.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->

						_.defaults options.modelData,
											element  	: 'Map'
											lat 		: 59.913041
											lng 		: 10.756874
											zoom 		: 14
											address 	: 'Oslo, Norway'

						super(options)
						
					bindEvents:->
						# start listening to model events
						@listenTo @layout.model, "change:style", @renderElement
						super()

					_getMapView:(template, className)->
						data = {}
						data.className = className
						data.model = @layout.model
						data.template = template if not _(template).isBlank()
						new Map.Views.MapView data
													
					# setup templates for the element
					renderElement:()=>
						# get the address element template
						template = if not _(@layout.model.get('style')).isBlank() then @_getElementTemplate(@layout.model) else ''
						className = _.slugify @layout.model.get 'style'

						view = @_getMapView template, className
						@layout.elementRegion.show view