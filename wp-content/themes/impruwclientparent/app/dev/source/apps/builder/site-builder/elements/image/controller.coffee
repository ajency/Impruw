define ['app','apps/builder/site-builder/elements/image/views','apps/builder/site-builder/elements/image/settings/controller'],
		(App)->

			App.module 'SiteBuilderApp.Element.Image', (Image, App, Backbone, Marionette, $, _)->

				# menu controller
				class Image.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->

						_.defaults options.modelData,
											element  	: 'Image'
											image_id	: 0
											size 		: 'thumbnail'

						super(options)
						
					bindEvents:->
						# start listening to model events
						@listenTo @layout.model, "change:image_id", @renderElement
						@listenTo @layout.model, "change:size", @renderElement
						super()

					_getImageView:(imageModel)->
						new Image.Views.ImageView
										model : imageModel
										templateHelpers : 
												size : @layout.model.get 'size'

					# setup templates for the element
					renderElement:()=>
						@removeSpinner()
						# get logo attachment
						imageModel = App.request "get:media:by:id",@layout.model.get 'image_id'
						App.execute "when:fetched", imageModel, =>
							
							view = @_getImageView imageModel

							#trigger media manager popup and start listening to "media:manager:choosed:media" event
							@listenTo view, "show:media:manager", =>
									App.navigate "media-manager", trigger : true
									@listenTo App.vent,"media:manager:choosed:media",(media, size)=>
										@layout.model.set 'image_id', media.get 'id'
										@layout.model.set 'size',size
										@layout.model.save() if @layout.model.hasChanged()

							@layout.elementRegion.show view