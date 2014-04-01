define ['app','controllers/base-controller'], (App, AppController)->
	
	App.module "RoomsApp.Gallery", (Gallery, App)->

		# class gallery controller
		class GalleryController extends AppController

			# initialize the controller
			initialize:(opt)->

				{collection} = opt 

				if not collection 
					throw new Error "Slides collection not found"

				@galleryView = @_getGalleryView collection
					
				@show @galleryView

			_getGalleryView : (collection)->
				new GalleryView 
						collection : collection


		class SingleGalleryItem extends Marionette.ItemView
			tagName : 'li'
			className : 'isotope-element'
			template : '<img src="{{thumb_url}}" class="img-responsive"/>'

			onRender:->
				randomW = if Math.random() * 50  > 25 then 1 else 2
				randomH = if Math.random() * 50  > 25 then 1 else 2
				@$el.addClass "width-#{randomW} height-#{randomH}"


		class NoGalleryItem extends Marionette.ItemView

			template : '<div class="empty-info">No images found. Please add images.</div>'


		class GalleryView extends Marionette.CompositeView

			tagName : 'ul'

			template : ''

			className : 'isotope'

			itemView : SingleGalleryItem

			emptyView : NoGalleryItem

			onShow:=>
				# run masonry if needed
				return if @collection.length is 0

				@$el.imagesLoaded =>
					@$el.isotope
						itemSelector: '.isotope-element'
						layoutMode : 'masonry'

				ww = $('#gallery-region').width()
				$('.isotope').width(ww)

		App.commands.setHandler "show:gallery:images",(opt)->
			new GalleryController opt