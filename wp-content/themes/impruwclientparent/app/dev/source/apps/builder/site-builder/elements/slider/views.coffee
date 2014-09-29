define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.Slider.Views', (Views, App, Backbone, Marionette, $, _)->

        class SliderItem extends Marionette.ItemView

            template: '<img src="{{full_url}}" alt="Slide" data-bgfit="contain" data-bgposition="center center" data-bgrepeat="no-repeat"/>'

            tagName: 'li'

            onRender: ->
                @$el.attr 'data-slotamount', '0'
                    .attr 'data-masterspeed', '500'
                    .attr 'data-transition', Marionette.getOption @,'slide_transition'
                    

            modelEvents : 
                'change:thumb_url change:full_url' : (model)->
                    model.collection.trigger 'slide:image:url:updated'



        class EmptySlider extends Marionette.ItemView

            template: '<div class="empty-view"><span class="bicon icon-uniF119"></span>{{#polyglot}}No images in slider{{/polyglot}}<br> {{#polyglot}}Add images to slider{{/polyglot}}</div>'


        # Menu item view
        class Views.SliderView extends Marionette.CompositeView

            className: 'fullwidthbanner-container roundedcorners'

            template: '<div class="fullwidthbanner"><ul></ul></div>'

            id: _.uniqueId('carousel-')

            itemView: SliderItem

            emptyView: EmptySlider

            itemViewContainer: '.fullwidthbanner > ul'

            itemViewOptions : ->
                slide_transition : @model.get 'reset_transitions'

            events:
                'click': 'sliderClick'
                'click .tp-rightarrow,.tp-leftarrow,.bullet': (e)->
                    e.stopPropagation()

            modelEvents : 
                'change:reset_transitions' : 'changeTransitions'

            collectionEvents : 
                'slide:image:url:updated' : ->
                    @render()
                    @triggerMethod 'show'

            # close revolution slider on close
            onClose: ->
                delete @revapi

            changeTransitions : (model,reset_transitions)->
                # @$el.find('.fullwidthbanner ul').children('li').attr 'data-transition',reset_transitions

                @trigger 'render:slider'

            _getSliderRatio : ->
                width = @$el.width()
                height = @$el.height()
                "#{parseInt width}:#{parseInt height}"


            initialize: (options = {}) ->
                super options


            onShow: ->
                
                if @collection.length is 0
                    @model.set 'height',@$el.height()
                    @model.set 'width',@$el.width()
                    @$el.resizable
                        helper : "ui-image-resizable-helper"
                        handles: "s"
                        stop : =>
                            @model.set 'height',@$el.height()
                    return

                defaults = @_getDefaults()

                options =
                    startheight:  @model.get 'height'

                options = _.defaults options, defaults

                @revapi = @$el.find(".fullwidthbanner").revolution options

                @$el.resizable
                    helper : "ui-image-resizable-helper"
                    handles: "s"

                    stop : (evt, ui)=>
                        # @assignImagePath @$el.height()
                        console.log @$el.height() 
                        options.startheight = @$el.height() 
                        @$el.width('auto') 
                        @revapi = @$el.find(".fullwidthbanner").revolution options
                        @_saveSliderHeightWidth()

                    start : (evt,ui)=>
                        $(@).addClass('noclick')

                # @trigger "set:slider:height", options.startheight

                $('.aj-imp-publish').on 'click',@_saveSliderHeightWidth

                # @_saveSliderHeightWidth()


            sliderClick : (e)->
                e.stopPropagation()

                if $(e.target).hasClass('noclick')
                    $(e.target).removeClass('noclick')

                else
                    ratio = @_getSliderRatio()
                    @trigger "show:slides:manager", ratio



            _saveSliderHeightWidth : =>
                @trigger "set:slider:height:width", @$el.height(), @$el.width()


            # getTallestColumnHeight: ->
            #     column = @$el.closest('.column')
            #     if column.length is 0
            #         return 350

            #     row = column.closest '.row'


            #     height = 350
            #     # loop through all columns and get tallest column
            #     $(row).children('.column').each (index, col)->
            #         if $(col).height() >= height
            #             height = $(col).height()

            #     height

            _getDefaults: ->
                delay: 9000
                startwidth: '100%'
                hideThumbs: 10
                thumbWidth: 100
                thumbHeight: 50
                thumbAmount: 5
                navigationType: "both"
                navigationArrows: "solo"
                navigationStyle: "round"
                touchenabled: "on"
                onHoverStop: "on"
                navigationHAlign: "center"
                navigationVAlign: "bottom"
                navigationHOffset: 0
                navigationVOffset: 0
                soloArrowLeftHalign: "left"
                soloArrowLeftValign: "center"
                soloArrowLeftHOffset: 20
                soloArrowLeftVOffset: 0
                soloArrowRightHalign: "right"
                soloArrowRightValign: "center"
                soloArrowRightHOffset: 20
                soloArrowRightVOffset: 0
                shadow: 0
                fullWidth: "on"
                fullScreen: "off"
                stopLoop: "off"
                stopAfterLoops: -1
                stopAtSlide: -1
                shuffle: "off"
                autoHeight: "on"
                forceFullWidth: "off"
                hideThumbsOnMobile: "off"
                hideBulletsOnMobile: "on"
                hideArrowsOnMobile: "on"
                hideThumbsUnderResolution: 0
                hideSliderAtLimit: 0
                hideCaptionAtLimit: 768
                hideAllCaptionAtLilmit: 0
                startWithSlide: 0
                fullScreenOffsetContainer: ""
                # reset_transitions : 'papercut'


            onBeforeClose :->
                $('.aj-imp-publish').off 'click',@_saveSliderHeightWidth