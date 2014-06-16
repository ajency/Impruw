define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.Slider.Views', (Views, App, Backbone, Marionette, $, _)->

        class SliderItem extends Marionette.ItemView

            template: '<img src="{{full_url}}" alt="Slide" data-bgfit="cover" data-bgposition="left top" data-bgrepeat="no-repeat"/>'

            tagName: 'li'

            onRender: ->
                @$el.attr 'data-transition', 'fade'
                .attr 'data-slotamount', '7'
                    .attr 'data-masterspeed', '1500'


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

            events:
                'click': (e)->
                    @trigger "show:slides:manager"
                'click .tp-rightarrow,.tp-leftarrow,.bullet': (e)->
                    e.stopPropagation()

            # close revolution slider on close
            onClose: ->
                delete @revapi

            initialize:->
                @sliderHeight = Marionette.getOption @,'sliderHeight'

            onShow: ->
                console.log "slider"
                return if @collection.length is 0

                defaults = @_getDefaults()

                console.log @sliderHeight

                options =
                    startheight: @sliderHeight

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
                        @trigger "set:slider:height", options.startheight

                    
                    

                @trigger "set:slider:height", options.startheight

            getTallestColumnHeight: ->
                column = @$el.closest('.column')
                if column.length is 0
                    return 350

                row = column.closest '.row'


                height = 350
                # loop through all columns and get tallest column
                $(row).children('.column').each (index, col)->
                    if $(col).height() >= height
                        height = $(col).height()

                height

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
                autoHeight: "off"
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