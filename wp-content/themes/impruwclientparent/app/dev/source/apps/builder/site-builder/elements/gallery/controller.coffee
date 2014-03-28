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
											no_of_columns : 3

						super(options)
						
					bindEvents:->
						# start listening to model events
						@listenTo @layout.model, "change:slider_id", @renderElement

						super()

					_getGalleryView:(collection, columnCount)->
						new Gallery.Views.GalleryView
											collection 	: collection
											noOfColumns : columnCount

					_getSlidesCollection:->
						if not @slidesCollection
							if @layout.model.get('slider_id') > 0
								@slidesCollection =  App.request "get:slides:for:slide" , @layout.model.get 'slider_id'					
							else
								@slidesCollection = App.request "get:slides:collection"
								# listen to add event to set slider Id to element  model
								@slidesCollection.once "add",(model)=>
									@layout.model.set 'slider_id', model.get 'slider_id'
									# save the model
									@layout.model.save()
												
						@slidesCollection

					# setup templates for the element
					renderElement:()=>
						@removeSpinner()
						
						slidesCollection = @_getSlidesCollection()

						App.execute "when:fetched", slidesCollection, =>
							view = @_getGalleryView slidesCollection, @layout.model.get 'no_of_columns'

							@listenTo view, "show:slides:manager", =>
								App.execute "show:slides:manager", slidesCollection

							@listenTo @layout.model, "change:no_of_columns", =>
								@renderElement()

							@listenTo slidesCollection, "remove add slides:order:updated", =>
								@renderElement()

							@layout.elementRegion.show view