define ['app'
		'apps/builder/site-builder/elements/address/views'
		'apps/builder/site-builder/elements/address/settings/controller'],
		(App)->

			App.module 'SiteBuilderApp.Element.Address', (Address, App, Backbone, Marionette, $, _)->

				# menu controller
				class Address.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->

						_.defaults options.modelData,
											element  	: 'Address'
											address 	: 'Your hotel address here'
											phoneno 	: '0000000'
											email 		: 'demo@email.com'
											style 		: 'Default Style'

						super(options)
						
					bindEvents:->
						# start listening to model events
						@listenTo @layout.model, "change:style", @renderElement
						super()

					_getAddressView:(model, template)->
						new Address.Views.AddressView
											model 	: model
											template : template
												

					# setup templates for the element
					renderElement:()=>
						@removeSpinner()
						# get the address element template
						template = @_getElementTemplate @layout.model
						view = @_getAddressView @layout.model, template
						console.log view
						@layout.elementRegion.show view