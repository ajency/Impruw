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

					_getAddressView:(collection, style)->
						new Social.Views.SocialView
											collection: collection
											style : style
												

					# setup templates for the element
					renderElement:()=>
						@removeSpinner()
						# get the social element collection
						style = @layout.model.get 'style'
						collection = App.request "get:site:social"
						view = @_getAddressView collection, style
						@layout.elementRegion.show view