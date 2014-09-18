define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.Image.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.ImageView extends Marionette.ItemView

            className : 'image'# imgLiquidFill'

            template : '
                        {{#image}}
                          <img src="{{imageurl}}" alt="{{title}}" width="100%" class="{{alignclass}} img-responsive"/>
                          <div class="clearfix"></div>
                        {{/image}}
                        {{#placeholder}}
                          <div class="image-placeholder" style="height:100%;"><span class="bicon icon-uniF10E"></span>{{#polyglot}}Upload Image{{/polyglot}}</div>
                        {{/placeholder}}
                        '

            # override serializeData to set holder property for the view
            mixinTemplateHelpers : (data)->
                data = super data

                if @model.isNew()
                    data.placeholder = true
                else
                    data.image = true
                    data.imageurl = ''

                    data.alignclass = ->
                        switch @alignment
                            when 'left'
                                return 'pull-left'
                            when 'right'
                                return 'pull-right'
                if @eleModel
                    data.hyperlink = @eleModel.get 'link'
                    data.linkTarget = @eleModel.get 'target'

                data

            events :
                'click' : 'imageClick'
                # 'click a' : (e)-> e.preventDefault()

            initialize :(options)->
                @imageHeightRatio = Marionette.getOption @,'imageHeightRatio'
                @positionTopRatio = Marionette.getOption @, 'positionTopRatio' 
                @eleModel = Marionette.getOption @, 'eleModel'
                


            _getImageRatio : ->
                width = @$el.width()
                height = @$el.height()
                "#{parseInt width}:#{parseInt height}"


            # check if a valid image_id is set for the element
            # if present ignore else run the Holder.js to show a placeholder
            # after run remove the data-src attribute of the image to avoid
            # reloading placeholder image again
            onShow : ->
                if @model.isNew()
                    @$el.resizable
                        helper : "ui-image-resizable-helper"
                        handles: "s"
                        stop : (evt, ui)=>
                            @$el.css 'width','auto'
                    return


                # to be done in css
                @$el.css 'overflow','hidden'

                if @imageHeightRatio isnt 'auto'
                    @$el.height parseFloat(@imageHeightRatio)*@$el.width()

                if @positionTopRatio 
                    @$el.find('img').css 'top',"#{@positionTopRatio*@$el.width()}px"

                @$el.resizable
                    helper : "ui-image-resizable-helper"
                    handles: "s"

                    stop : (evt, ui)=>
                        # @assignImagePath @$el.height()
                        @$el.css 'width','auto'
                        @trigger 'set:image:height',@$el.height(),@$el.width()
                        @adjustImagePosition()
                        

                    start:(evt,ui)=>
                        $(@).addClass('noclick')
                        #@$el.resizable( "option", "maxHeight", @$el.find('img').height() )



                    

                @$el.find('img').draggable
                    axis: "y" 
                    cursor: "move"

                    drag : (evt,ui)=>
                        topmarginpx = ui.position.top
                        if topmarginpx > 0
                            ui.position.top = 0

                        if topmarginpx < @$el.height()-@$el.find('img').height()
                            ui.position.top = @$el.height()-@$el.find('img').height()

                    stop:(evt,ui)=>
                        @trigger 'set:image:top:position',@$el.width(),parseInt @$el.find('img').css 'top'

                # @assignImagePath()
                

                @$el.closest('.column').on 'class:changed',=>
                    @assignImagePath()
                    if @$el.height() > @$el.find('img').height()
                        @$el.height( 'auto' )
                        @trigger 'set:image:height','auto'

                    else
                        @trigger 'set:image:height',@$el.height(),@$el.width()

                    @adjustImagePosition()

                @assignImagePath()

                

            imageClick : (e)->
                e.stopPropagation()

                if $(e.target).hasClass('noclick')
                    $(e.target).removeClass('noclick')

                else
                    ratio = @_getImageRatio()
                    @trigger "show:media:manager", ratio



            assignImagePath :->

                
                width = @$el.width()
                image = @model.getBestFit width
                @$el.find('img').attr 'src', image.url
                
                @trigger "image:size:selected", image.size
                # set the URL of the image depending on the available size
                
                # @$el.css 'height', if height is 0 then @$el.height() else height
                # @$el.imgLiquid()

            adjustImagePosition:->
                top = parseInt _(@$el.find('img').css('top')).rtrim('px')
#                if top < @$el.height()-@$el.find('img').height()
#                    @$el.find('img').css 'top', "#{@$el.height()-@$el.find('img').height()}px"
                if top > 0
                    @$el.find('img').css 'top','0px'

                @trigger 'set:image:top:position',@$el.width(),parseInt @$el.find('img').css 'top'

               


