define ['app','apps/builder/site-builder/elements/logo/views','apps/builder/site-builder/elements/logo/settings/controller'],
		(App)->

			App.module 'SiteBuilderApp.Element.Logo', (Logo, App, Backbone, Marionette, $, _)->

				# menu controller
				class Logo.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->

						_.defaults options.modelData,
											element  	: 'Logo'
											image_id	: 0
											size 		: 'thumbnail'

						super(options)
						
					bindEvents:->
						# start listening to model events
						@listenTo @layout.model, "change:image_id", @renderElement
						super()

					_getLogoView:(imageModel)->
						new Logo.Views.LogoView
										model : imageModel

					# setup templates for the element
					renderElement:()=>
						@removeSpinner()
						# get logo attachment
						if @layout.model.get('image_id') isnt 0
							imageModel = App.request "get:media:by:id",@layout.model.get 'image_id'
						else
							imageModel = new Backbone.Model

						App.execute "when:fetched", imageModel, =>
							view = @_getLogoView imageModel
							@listenTo view, "show:media:manager", ->
									App.navigate "media-manager", trigger : true
							@layout.elementRegion.show view