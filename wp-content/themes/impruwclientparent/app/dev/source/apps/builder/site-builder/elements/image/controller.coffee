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
                    link : '#'
                    target : '_self'

                if options.modelData.element is 'Logo'
                    options.modelData.image_id = window.LOGOID

                super(options)

            bindEvents: ->
                # start listening to model events
                @listenTo @layout.model, "change:image_id change:align change:link change:target", @renderElement
                super()

            # private etmplate helper function
            # this function will get the necessary template helpers for the element
            # template helper will return an object which will later get mixed with
            # serialized data before render
            _getTemplateHelpers: ->
                size: @layout.model.get 'size'
                alignment: @layout.model.get 'align'

            _getImageView: (imageModel)->
                console.log @layout.model
                new Image.Views.ImageView
                    model: imageModel
                    imageHeightRatio : @layout.model.get 'heightRatio'
                    positionTopRatio : @layout.model.get 'topRatio'
                    eleModel : @layout.model
                    templateHelpers: @_getTemplateHelpers()


            # setup templates for the element
            renderElement: ()=>
                @removeSpinner()
                # get logo attachment
                if not @imageModel
                    imageModel = App.request "get:media:by:id", @layout.model.get 'image_id'
                else
                    imageModel = @imageModel

                App.execute "when:fetched", imageModel, =>
                    view = @_getImageView imageModel

                    #trigger media manager popup and start listening to "media:manager:choosed:media" event
                    @listenTo view, "show:media:manager", (ratio = false)=>
                        App.navigate "media-manager", trigger: true
                        App.currentImageRatio = ratio
                        @listenTo App.vent, "media:manager:choosed:media", (media)=>
                            @layout.model.set 'image_id', media.get 'id'
                            App.currentImageRatio = false
                            @stopListening App.vent, "media:manager:choosed:media"
                            @layout.model.save()
                            @imageModel = media
                            @renderElement()
                            

                        @listenTo App.vent, "stop:listening:to:media:manager", =>
                            App.currentImageRatio = false
                            @stopListening App.vent, "media:manager:choosed:media"

                    @listenTo view, "image:size:selected", (size)=>
                        @layout.model.set 'size', size
                        if @layout.model.hasChanged()
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

							
							