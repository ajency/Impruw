define ['app'
		'apps/builder/site-builder/elements/gallery/views'
		'apps/builder/site-builder/elements/gallery/settings/controller'],
		(App)->

			App.module 'SiteBuilderApp.Element.Gallery', (Gallery, App, Backbone, Marionette, $, _)->

				# menu controller
				class Gallery.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->

						_.defaults options.modelData,
											element  	: 'Gallery'
											gallery_id 	: 1
											no_of_columns : 3

						super(options)
						
					bindEvents:->
						# start listening to model events
						@listenTo @layout.model, "change:gallery_id", @renderElement null

						super()

					_getGalleryView:(collection, columnCount)->
						new Gallery.Views.GalleryView
											collection 	: collection
											noOfColumns : columnCount
												

					# setup templates for the element
					renderElement:(slidesCollection)=>
						@removeSpinner()
						
						if not _.isObject slidesCollection
							slidesCollection = App.request "get:slides:for:slide" , @layout.model.get 'gallery_id'

						App.execute "when:fetched", slidesCollection, =>
							view = @_getGalleryView slidesCollection, @layout.model.get 'no_of_columns'

							@listenTo view, "show:slides:manager", =>
								App.execute "show:slides:manager", @layout.model.get('gallery_id'), slidesCollection

							@listenTo @layout.model, "change:no_of_columns", =>
								@renderElement slidesCollection

							@listenTo slidesCollection, "remove add slides:order:updated", =>
								@renderElement slidesCollection

							@layout.elementRegion.show view