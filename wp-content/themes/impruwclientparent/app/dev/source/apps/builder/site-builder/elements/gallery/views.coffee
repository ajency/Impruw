define ['app', 'holder'],(App, Holder)->

	# Row views
	App.module 'SiteBuilderApp.Element.Gallery.Views', (Views, App, Backbone, Marionette, $, _)->


		class GalleryItem extends Marionette.ItemView

			className: 'isotop-element'

			template : '<img src="{{thumb_url}}" alt="Slide" width="100%"/>'

			# onRender:->
			# 	noOfColumns = Marionette.getOption(this, 'noOfColumns')
			# 	colClass = 12 / noOfColumns
			# 	@$el.addClass "col-sm-#{colClass}"


		# if not gallery items are displayed
		class EmptyGallery extends Marionette.ItemView

			template : '<h2>Nothing found</h2> Please choose your gallery'

			className : 'col-md-12 well'

			
		# Menu item view
		class Views.GalleryView extends Marionette.CollectionView

			className : 'gallery'

			id : _.uniqueId('gallery-')

			itemView : GalleryItem

			emptyView : EmptyGallery

			# itemViewOptions:(model, index)->
			# 	noOfColumns : Marionette.getOption this, 'noOfColumns'

			onBeforeRender:->
				@collection.sort()

			onShow:->
				@$el.imagesLoaded ->
					@$el.isotope
						itemSelector: '.isotop-element'
						
					  

			events:
				'click' :(e)-> 
					@trigger "show:slides:manager"