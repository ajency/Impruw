define ['app', 'holder'],(App, Holder)->

	# Row views
	App.module 'SiteBuilderApp.Element.Gallery.Views', (Views, App, Backbone, Marionette, $, _)->


		class GalleryItem extends Marionette.ItemView

			template : '<img src="{{thumb_url}}" alt="Slide" />'

			onRender:->
				noOfColumns = Marionette.getOption(this, 'noOfColumns')
				colClass = 12 / noOfColumns
				@$el.addClass "col-sm-#{colClass}"


		# if not gallery items are displayed
		class EmptyGallery extends Marionette.ItemView

			template : '<h2>Nothing found</h2> Please choose your gallery'

			className : 'col-md-12 well'

			
		# Menu item view
		class Views.GalleryView extends Marionette.CollectionView

			className : 'gallery row'

			id : _.uniqueId('gallery-')

			itemView : GalleryItem

			emptyView : EmptyGallery

			itemViewOptions:(model, index)->
				noOfColumns : Marionette.getOption this, 'noOfColumns'

			events:
				'click' :(e)-> 
					@trigger "show:slides:manager"