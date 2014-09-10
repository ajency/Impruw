define ['app', 'controllers/base-controller'], (App, AppController)->
    App.module "RoomsApp.Gallery", (Gallery, App)->

        # class gallery controller
        class GalleryController extends AppController

            # initialize the controller
            initialize: (opt)->
                {collection} = opt

                if not collection
                    throw new Error "Slides collection not found"

                @galleryView = @_getGalleryView collection

                @show @galleryView, loading: true

            _getGalleryView: (collection)->
                new GalleryView
                    collection: collection


        class SingleGalleryItem extends Marionette.ItemView
            tagName: 'li'
            className: 'isotope-element'
            template: '<a href="{{full_url}}" data-lightbox="gallery"><img src="{{thumb_url}}" class="img-responsive"/></a>'

            onRender: ->
                randomW = if Math.random() * 50 > 25 then 1 else 2
                randomH = if Math.random() * 50 > 25 then 1 else 2
                @$el.addClass "width-#{randomW} height-#{randomH}"

            events : 
                'click' : (e)->
                    e.preventDefault()


        class NoGalleryItem extends Marionette.ItemView

            template: '<div class="empty-info">{{#polyglot}}No images found. Please add images.{{/polyglot}}</div>'


        class GalleryView extends Marionette.CompositeView

            tagName: 'ul'

            template: ''

            className: 'isotope'

            itemView: SingleGalleryItem

            emptyView: NoGalleryItem

            onShow: =>
                # run masonry if needed
                return if @collection.length is 0

                @$el.imagesLoaded =>
                    @$el.isotope
                        itemSelector: '.isotope-element'
                        layoutMode: 'masonry'

                ww = $('#gallery-region').width()
                @$el.width(ww)

        App.commands.setHandler "show:gallery:images", (opt)->
            new GalleryController opt