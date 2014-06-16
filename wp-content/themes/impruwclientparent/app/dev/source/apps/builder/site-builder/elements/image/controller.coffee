define ['app', 'apps/builder/site-builder/elements/image/views',
        'apps/builder/site-builder/elements/image/settings/controller'],
(App)->
    App.module 'SiteBuilderApp.Element.Image', (Image, App, Backbone, Marionette, $, _)->

        # menu controller
        class Image.Controller extends App.SiteBuilderApp.Element.Controller

            # intializer
            initialize: (options)->
                _.defaults options.modelData,
                    element: 'Image'
                    image_id: 0
                    size: 'thumbnail'
                    align: 'left'
                    heightRatio : 'auto'
                    topRatio : 0

                super(options)

            bindEvents: ->
                # start listening to model events
                @listenTo @layout.model, "change:image_id", @renderElement
                # @listenTo @layout.model, "change:size", @renderElement
                @listenTo @layout.model, "change:align", @renderElement
                super()

            # private etmplate helper function
            # this function will get the necessary template helpers for the element
            # template helper will return an object which will later get mixed with
            # serialized data before render
            _getTemplateHelpers: ->
                size: @layout.model.get 'size'
                alignment: @layout.model.get 'align'

            _getImageView: (imageModel)->
                new Image.Views.ImageView
                    model: imageModel
                    imageHeightRatio : @layout.model.get 'heightRatio'
                    positionTopRatio : @layout.model.get 'topRatio'
                    templateHelpers: @_getTemplateHelpers()


            # setup templates for the element
            renderElement: ()=>
                @removeSpinner()
                # get logo attachment
                imageModel = App.request "get:media:by:id", @layout.model.get 'image_id'

                App.execute "when:fetched", imageModel, =>
                    view = @_getImageView imageModel

                    #trigger media manager popup and start listening to "media:manager:choosed:media" event
                    @listenTo view, "show:media:manager", =>
                        App.navigate "media-manager", trigger: true
                        @listenTo App.vent, "media:manager:choosed:media", (media)=>
                            @layout.model.set 'image_id', media.get 'id'
                            @stopListening App.vent, "media:manager:choosed:media"

                        @listenTo App.vent, "stop:listening:to:media:manager", =>
                            @stopListening App.vent, "media:manager:choosed:media"

                    @listenTo view, "image:size:selected", (size)=>
                        @layout.model.set 'size', size
                        if @layout.model.hasChanged()
                            console.log 'save     '+size
                            @layout.model.save()

                    @listenTo view, 'set:image:height',(height,width)=>
                        @layout.model.set 'height', height
                        if height is 'auto'
                            @layout.model.set 'heightRatio','auto'
                        else
                            @layout.model.set 'heightRatio',height/width
                        # console.log JSON.stringify @layout.model.toJSON()

                        @layout.model.save()

                    @listenTo view, 'set:image:top:position',(width,top)=>
                        @layout.model.set 'top',top
                        @layout.model.set 'topRatio',top/width
                        @layout.model.save()
                        # console.log JSON.stringify @layout.model.toJSON()

                    @layout.elementRegion.show view

							
							