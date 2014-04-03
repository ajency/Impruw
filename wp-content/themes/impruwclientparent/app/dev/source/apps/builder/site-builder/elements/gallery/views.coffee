define ['app'],(App)->

	# Row views
	App.module 'SiteBuilderApp.Element.Gallery.Views', (Views, App, Backbone, Marionette, $, _)->


		class GalleryItem extends Marionette.ItemView

			className: 'isotope-element'

			template : '<img src="{{thumb_url}}" alt="Slide" class="img-responsive" />'

			onRender:->
				randomW = if Math.random() * 50  > 25 then 1 else 2
				randomH = if Math.random() * 50  > 25 then 1 else 2
				@$el.addClass "width-#{randomW} height-#{randomH}"


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

				# set the template if single room
				isSingleRoom = Marionette.getOption @, 'inSingleRoom'
				if isSingleRoom
					@template = '<h3 class="gallery-title">Gallery</h3>
								<div class="if-required"></div>'
					@itemViewContainer = '.if-required'

			onShow:->

				return if @collection.length is 0

				@$el.imagesLoaded =>
					@$el.find('.if-required').isotope
						itemSelector: '.isotope-element'
						layoutMode : 'masonry'
						
					  
			events:
				'click' :(e)-> 
					@trigger "show:slides:manager"