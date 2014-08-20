define ['app', 'apps/builder/site-builder/elements/imagewithtext/views',
        'apps/builder/site-builder/elements/imagewithtext/settings/controller'],
(App)->
    App.module 'SiteBuilderApp.Element.ImageWithText', (ImageWithText, App, Backbone, Marionette, $, _)->

        # menu controller
        class ImageWithText.Controller extends App.SiteBuilderApp.Element.Controller

            # intializer
            initialize: (options)->
                data = {}

                data['en'] = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'

                data['nb'] = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'

                _.defaults options.modelData,
                    element: 'ImageWithText'
                    image_id: 0
                    size: 'thumbnail'
                    align: 'left'
                    style: ''
                    content: data

                super(options)

            bindEvents: ->
                # start listening to model events
                @listenTo @layout.model, "change:image_id", @renderElement
                @listenTo @layout.model, "change:style", @changeElementStyle
                @listenTo @layout.model, "change:size", @renderElement
                @listenTo @layout.model, "change:align", @renderElement
                super()

            # private etmplate helper function
            # this function will get the necessary template helpers for the element
            # template helper will return an object which will later get mixed with
            # serialized data before render
            _getTemplateHelpers: ->
                size: @layout.model.get 'size'
                align: @layout.model.get 'align'
                content: @layout.model.get 'content'

            _getImageWithTextView: (imageModel, style)->
                new ImageWithText.Views.ImageWithTextView
                    model: imageModel
                    templateHelpers: @_getTemplateHelpers()
                    style: style

            changeElementStyle: (model)->
                prevStyle = _.slugify model.previous 'style'
                newStyle = _.slugify model.get 'style'
                @layout.elementRegion.currentView.triggerMethod "style:upadted", newStyle, prevStyle

            # setup templates for the element
            renderElement: ()=>
                @removeSpinner()
                # get logo attachment
                imageModel = App.request "get:media:by:id", @layout.model.get('image_id')
                App.execute "when:fetched", imageModel, =>
                    view = @_getImageWithTextView imageModel, @layout.model.get('style')

                    #trigger media manager popup and start listening to "media:manager:choosed:media" event
                    @listenTo view, "show:media:manager", =>
                        App.navigate "media-manager", trigger: true
                        @listenTo App.vent, "media:manager:choosed:media", (media, size)=>
                            @layout.model.set 'image_id', media.get 'id'
                            @layout.model.set 'size', size
                            @layout.model.save()
                            #stop listening to event
                            @stopListening App.vent, "media:manager:choosed:media"

                        @listenTo App.vent, "stop:listening:to:media:manager", =>
                            @stopListening App.vent, "media:manager:choosed:media"

                    @listenTo view, "text:element:blur", (html) =>
                        #get original data
                        original_data =  @layout.model.get('content')

                        if _.isObject original_data
                          data = original_data
                        else
                          data = {}
                          data['en'] = original_data

                        data[WPML_DEFAULT_LANG] = html

                        @layout.model.set 'content', data
                        @layout.model.save()

                    @layout.elementRegion.show view