define ['app'
        'apps/builder/site-builder/elements/slider/views'
        'apps/builder/site-builder/elements/slider/settings/controller'],
(App)->
    App.module 'SiteBuilderApp.Element.Slider', (Slider, App, Backbone, Marionette, $, _)->

        # menu controller
        class Slider.Controller extends App.SiteBuilderApp.Element.Controller

            # intializer
            initialize: (options)->
                _.defaults options.modelData,
                    element: 'Slider'
                    height: 156
                    slider_id : 0
                    reset_transitions : 'fade'

                super(options)

            bindEvents: ->
                # start listening to model events
                @listenTo @layout.model, "change:slider_id", @renderElement
                super()

            _getSliderView: (collection)->
                new Slider.Views.SliderView
                    collection: collection
                    model : @layout.model

            _getSlidesCollection: ->
                if not @slidesCollection
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

            # setup templates for the element
            renderElement: ()=>
                @removeSpinner()

                slidesCollection = @_getSlidesCollection()

                App.execute "when:fetched", slidesCollection, =>
                    view = @_getSliderView slidesCollection

                    @listenTo view, "show:slides:manager", (ratio)=>
                        App.execute "show:slides:manager", slidesCollection
                        App.currentImageRatio = ratio

                    @listenTo view, "set:slider:height:width", (height,width)=>
                        @layout.model.set 'width', width
                        @layout.model.set 'height', height
                        @layout.model.save()

                    @listenTo slidesCollection, "remove add slides:order:updated", =>
                        @renderElement()

                    @listenTo view ,"render:slider",=>
                        @layout.model.save()
                        @layout.elementRegion.show view

                    @layout.elementRegion.show view