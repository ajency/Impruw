define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.Image.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.ImageView extends Marionette.ItemView

            className : 'image imgLiquidFill'

            template : '{{#image}}
                          <img src="{{imageurl}}" alt="{{title}}" width="100%" class="{{alignclass}} img-responsive"/>
                          <div class="clearfix"></div>
                        {{/image}}
                        {{#placeholder}}
                          <div class="image-placeholder"><span class="bicon icon-uniF10E"></span>Upload Image</div>
                        {{/placeholder}}'

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

                data

            events :
                'click' : (e)->
                    e.stopPropagation()
                    @trigger "show:media:manager"

            # check if a valid image_id is set for the element
            # if present ignore else run the Holder.js to show a placeholder
            # after run remove the data-src attribute of the image to avoid
            # reloading placeholder image again
            onShow : ->
                return if @model.isNew()

                @$el.resizable
                    maxWidth : @$el.closest('.column').width()
                    helper : "ui-image-resizable-helper"
                    stop : (evt, ui)=>
                        @assignImagePath @$el.height()

                @assignImagePath 0


            assignImagePath :(height) ->
                # set the URL of the image depending on the available size
                width = @$el.width()
                image = @model.getBestFit width
                @$el.find('img').attr 'src', image.url
                @$el.css 'height', if height is 0 then @$el.height() else height
                @$el.imgLiquid()
                @trigger "image:size:selected", image.size


