define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.Gallery.Views', (Views, App, Backbone, Marionette, $, _)->
        class GalleryItem extends Marionette.ItemView

            className: 'isotope-element'

            template: '<img src="{{thumb_url}}" alt="Slide" class="img-responsive" />'

            # mixinTemplateHelpers : (data)->
            #     data = super data
                
            #     data

            onShow : ->
                @$el.find('img').error ()->
                    $(@).unbind("error").attr("src", THEMEURL+"/images/imageNotFound.jpg")


            onRender: ->
                randomW = if Math.random() * 50 > 25 then 1 else 2
                randomH = if Math.random() * 50 > 25 then 1 else 2
                @$el.addClass "width-#{randomW} height-#{randomH}"


        # if not gallery items are displayed
        class EmptyGallery extends Marionette.ItemView

            template: '<div class="empty-view"><span class="bicon icon-uniF10C"></span>{{#polyglot}}No images in Gallery{{/polyglot}}<br> {{#polyglot}}Click to add images{{/polyglot}}</div>'

            className: 'gallery-container'


        # Menu item view
        class Views.GalleryView extends Marionette.CompositeView

            className: 'gallery'

            id: _.uniqueId('gallery-')

            itemView: GalleryItem

            emptyView: EmptyGallery

            # itemViewOptions:(model, index)->
            # 	noOfColumns : Marionette.getOption this, 'noOfColumns'

            onBeforeRender: ->
                @collection.sort()

                # set the template if single room or if any other page
                isSingleRoom = Marionette.getOption @, 'inSingleRoom'
                if isSingleRoom
                    @template = '<div class="roomgallery"><h3 class="gallery-title">'+_.polyglot.t('Gallery')+'</h3>
                                                <div class="if-required"></div></div>'
                    @itemViewContainer = '.if-required'

                else
                    @template = '<div class="if-required"></div>'
                    @itemViewContainer = '.if-required'


            onShow: ->

                ###@$el.attr "data-content", _.polyglot.t("Manage room gallery")+" <a href='#{SITEURL}/dashboard/#/rooms'>"+_.polyglot.t("here")+"</a> "
                @$el.popover
                    html : true
                    placement : 'top'###

                return if @collection.length is 0

                @$el.imagesLoaded =>
                    @$el.find('.if-required').isotope
                        itemSelector: '.isotope-element'
                        layoutMode: 'masonry'




            events:
                'click': (e)->
                    @trigger "show:slides:manager"