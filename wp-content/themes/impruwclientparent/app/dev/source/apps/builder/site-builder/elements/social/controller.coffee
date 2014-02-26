define ['app','apps/builder/site-builder/elements/social/views'
		'apps/builder/site-builder/elements/social/settings/controller'],
		(App)->

			App.module 'SiteBuilderApp.Element.Social', (Social, App, Backbone, Marionette, $, _)->

				# menu controller
				class Social.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->

						_.defaults options.modelData,
											element  	: 'Social'
											facebook	: '#'
											twitter		: '#'
											youtube		: '#'
											style 		: 'Default Style'

						super(options)
						
					bindEvents:->
						# start listening to model events.
						@listenTo @layout.model, "change:style", @renderElement
						super()

					_getAddressView:(model, template)->
						new Social.Views.SocialView
											model 	: model
											template : template
												

					# setup templates for the element
					renderElement:()=>
						@removeSpinner()
						# get the address element template
						template = @_getElementTemplate @layout.model
						view = @_getAddressView @layout.model, template
						@layout.elementRegion.show view