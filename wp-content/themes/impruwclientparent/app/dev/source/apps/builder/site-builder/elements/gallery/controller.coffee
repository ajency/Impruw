define ['app'
        'apps/builder/site-builder/elements/gallery/views'
        'apps/builder/site-builder/elements/gallery/settings/controller'],
(App)->
    App.module 'SiteBuilderApp.Element.Gallery', (Gallery, App, Backbone, Marionette, $, _)->

        # menu controller
        class Gallery.Controller extends App.SiteBuilderApp.Element.Controller

            # intializer
            initialize: (options)->
                _.defaults options.modelData,
                    element: 'Gallery'

                super(options)

            bindEvents: ->
                # start listening to model events
                @listenTo @layout.model, "change:slider_id", @renderElement

                super()

            _getGalleryView: (collection)->
                new Gallery.Views.GalleryView
                    collection: collection
                    inSingleRoom: @isSingleRoomPage()

            _getSlidesCollection: ->
                if not @slidesCollection

                    # check if Single Room Page
                    if @isSingleRoomPage() and not @layout.model.get('slider_id')
                        @slidesCollection = App.request "get:dummy:slides:collection"
                    else
                        if @layout.model.get('slider_id') > 0
                            @slidesCollection = App.request "get:slides:for:slide", @layout.model.get 'slider_id'
                        else
                            @slidesCollection = App.request "get:slides:collection"
                            # listen to add event to set slider Id to element  model
                            @slidesCollection.once "add", (model)=>
                                @layout.model.set 'slider_id', model.get 'slider_id'
                                # save the model
                                @layout.model.save()

                @slidesCollection

            isSingleRoomPage: ->
                pageName = App.request "get:current:editable:page:name"
                pageName is 'Single Room'

            # setup templates for the element
            renderElement: ()=>
                @removeSpinner()

                slidesCollection = @_getSlidesCollection()
                console.log @isSingleRoomPage()
                App.execute "when:fetched", slidesCollection, =>
                    view = @_getGalleryView slidesCollection

                    if not @isSingleRoomPage()
                        @listenTo view, "show:slides:manager", =>
                            App.execute "show:slides:manager", slidesCollection

                    @listenTo slidesCollection, "remove add slides:order:updated", =>
                        @renderElement()

                    @layout.elementRegion.show view