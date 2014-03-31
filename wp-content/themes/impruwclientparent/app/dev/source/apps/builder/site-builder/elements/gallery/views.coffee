define ['app', 'holder'],(App, Holder)->

	# Row views
	App.module 'SiteBuilderApp.Element.Gallery.Views', (Views, App, Backbone, Marionette, $, _)->


		class GalleryItem extends Marionette.ItemView

			className: 'isotope-element'

			template : '<img src="{{thumb_url}}" alt="Slide" width="100%"/>'

			# onRender:->
			# 	noOfColumns = Marionette.getOption(this, 'noOfColumns')
			# 	colClass = 12 / noOfColumns
			# 	@$el.addClass "col-sm-#{colClass}"


		# if not gallery items are displayed
		class EmptyGallery extends Marionette.ItemView

			template : '<div class="empty-view"><span class="bicon icon-uniF10C"></span>No images in the Gallery.<br> Click to add images.</div>'

			className : 'gallery-container'

			
		# Menu item view
		class Views.GalleryView extends Marionette.CompositeView

			className : 'gallery'

			id : _.uniqueId('gallery-')

			itemView : GalleryItem

			emptyView : EmptyGallery

			# itemViewOptions:(model, index)->
			# 	noOfColumns : Marionette.getOption this, 'noOfColumns'

			onBeforeRender:->
				@collection.sort()

			onShow:->

				return if @collection.length is 0

				@$el.imagesLoaded =>
					@$el.isotope
						itemSelector: '.isotope-element'
						layoutMode : 'masonry'
						
					  
			events:
				'click' :(e)-> 
					@trigger "show:slides:manager"