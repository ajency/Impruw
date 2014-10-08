define ['app'
        'controllers/base-controller'], (App, AppController)->
    App.module 'SliderManager.EditSlider.SlidesList', (SlidesList, App, Backbone, Marionette, $, _)->
        
        class SlidesListController extends AppController

            initialize: (opt)->

                {collection, element} = opt

                @settingsModel = App.request "get:element:settings:options", 'Title'    

                # if slider id is not present
                if collection.length > 0
                    @sliderId = collection.at(0).get 'slider_id'
                else
                    collection.once "add", (model)=>
                        @sliderId = parseInt model.get 'slider_id'



                @layout = layout = @_getSlidesListLayout()

                @listView = listView = @_getSlidesListView collection, element

                @listenTo listView, "itemview:slide:updated:with:data", (iv, data)->
                    slide = iv.model
                    slide.set data
                    slide.save null,
                        wait: true
                        success: @slideModelUpdated


                @listenTo listView, "itemview:remove:slide", (iv, slide)->
                    slide.destroy wait: true

                @listenTo listView, "itemview:edit:image", (iv, imageId)->
                    mediaId = parseInt iv.model.get 'image_id'
                    ratio  = App.currentImageRatio 

                    editView = App.request "get:image:editor:view", mediaId, 
                                                                aspectRatio : ratio
                                                                                     
                    @updateImageThumb iv.model, editView.model                     
                    listView.triggerMethod "show:edit:image", editView
                    listView.listenTo editView, "image:editing:cancelled", ->
                        listView.triggerMethod "image:editing:cancelled"

                @listenTo listView, "itemview:add:text",(iv, imageId)->
                    App.execute 'show:slide:text:layer',
                        region : layout.slidesListRegion
                        model : iv.model

                @listenTo layout.slidesListRegion, 'slide:layers:saved',->
                    layout.slidesListRegion.show listView


                @listenTo layout, "show:add:new:slide", =>
                    App.execute "show:add:new:slide",
                        region: layout.addSlideRegion
                        sliderId: @sliderId

                @listenTo layout.addSlideRegion, "region:closed new:slide:created", (slide) =>
                    collection.add(slide) if _.isObject slide
                    layout.triggerMethod "show:add:slide"

                @listenTo layout, "show", ->
                    layout.slidesListRegion.show listView

                @listenTo listView, "slides:order:updated", (newOrder)->
                    _.each newOrder, (slideId, index)->
                        slide = collection.get slideId
                        slide.set('order', index + 1) if slide

                    collection.saveOrder
                        success: @showSuccessMessage

                @show layout, loading: true

            # update image thumb
            updateImageThumb : (slideModel, mediaModel)=>
                @listenTo mediaModel, 'change', (model)->
                    fullSize = model.get('sizes').large ?  model.get('sizes').full
                    thumbSize = model.get('sizes').thumbnail ?  model.get('sizes').full
                    slideModel.set 
                            thumb_url : thumbSize.url
                            full_url : fullSize.url

            # edit layout
            _getSlidesListView: (collection,element)->
                new SlidesListView
                        collection: collection
                        settingsModel : @settingsModel
                        element : element

            _getSlidesListLayout: ->
                new SlidesListLayout

            slideModelUpdated: =>

                # show success
            showSuccessMessage: =>
                @layout.triggerMethod "show:order:updated:msg"


        # views
        class SlideView extends Marionette.ItemView

            tagName: 'div'

            className: 'panel panel-default moveable'

            template: '<div class="panel-heading">
							<div class="aj-imp-image-item row">
                                {{^isSlider}}
								<div class="imgthumb full-w col-sm-12">
                                    <div class="arrange-slides">
                                        <div class="arrow">
                                            <span class="bicon icon-uniF140"></span>
                                        </div>
                                    </div>
									<img src="{{full_url}}" class="img-responsive">
                                    <div class="imgactions">
                                        <a href="#/edit-image" class="blue-link edit-image"> <span class="glyphicon glyphicon-edit"></span>{{#polyglot}}Edit Image{{/polyglot}}</a>
                                        <a class="red-link remove-slide" title="Delete Image"><span class="glyphicon glyphicon-trash"></span>&nbsp;{{#polyglot}}Delete Image{{/polyglot}}</a>
                                    </div>
								</div>
                                {{/isSlider}}
                                {{#isSlider}}
                                <div class="imgthumb col-sm-2">
                                    <div class="arrange-slides">
                                        <div class="arrange-slides">
                                        <div class="arrow">
                                            <span class="bicon icon-uniF140"></span>
                                        </div>
                                    </div>
                                    </div>
                                    <img src="{{thumb_url}}" class="img-responsive">
                                    <div class="imgactions">
                                        <a href="#/edit-image" class="blue-link edit-image"> <span class="glyphicon glyphicon-edit"></span>{{#polyglot}}Edit Image{{/polyglot}}</a>
                                        <a class="red-link remove-slide" title="Delete Image"><span class="glyphicon glyphicon-trash"></span>&nbsp;{{#polyglot}}Delete Image{{/polyglot}}</a>
                                    </div>
                                </div>
                                
								<div class="imgname col-sm-10">
                                    <form action="" method="POST" class="form-horizontal" role="form" validate>
                                        <div class="row">
                                            <div class="col-sm-5">
                                                <div class="form-group ">
                                                    <label for="" class="control-label col-sm-3">{{#polyglot}}Caption Title{{/polyglot}}</label>
                                                    <div class="col-sm-9">
                                                        <input  type="text" name="text" class="caption-title form-control" placeholder="{{#polyglot}}Caption Title{{/polyglot}}"/>
                                                    </div>
                                                </div>
                                                <div class="form-group caption-exist">
                                                    <label for="" class="control-label col-sm-3">{{#polyglot}}Caption Description{{/polyglot}}</label>
                                                    <div class="col-sm-9">
                                                        <textarea  type="text" name="text" class="caption-description form-control" placeholder="{{#polyglot}}Caption Description{{/polyglot}}">
                                                        </textarea>
                                                    </div>
                                                </div>
                                                <div class="form-group caption-exist">
                                                    <div class="col-sm-9 col-sm-offset-3">
                                                        <label for="" class="control-label checkbox">
                                                            <input type="checkbox" class="link-check" name="target"/>
                                                            {{#polyglot}}Add Link to Caption{{/polyglot}}
                                                        </label>
                                                    </div>
                                                </div>
                                                
                                                <div class="form-group caption-exist link-hide">
                                                    <label for="" class="control-label col-sm-3">{{#polyglot}}Caption Link{{/polyglot}}</label>
                                                    <div class="col-sm-9">
                                                        <input  type="text" name="text" class="caption-link form-control" placeholder="{{#polyglot}}Caption Link{{/polyglot}}"/>
                                                    </div>
                                                </div>
                                                <div class="form-group caption-exist link-hide">
                                                    <div class="col-sm-9 col-sm-offset-3">
                                                        <label for="" class="control-label checkbox">
                                                            <input type="checkbox" class="link-target" name="target"/>
                                                            {{#polyglot}}Open in new Tab{{/polyglot}}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-sm-9 col-sm-offset-3">
                                                        <button type="button" class="btn btn-xs aj-imp-orange-btn save-slide-layer" >{{#polyglot}}Save Caption{{/polyglot}}</button>
                                                        <a class="red-link delete-slide-layer caption-exist"><span class="glyphicon glyphicon-trash"></span>&nbsp;{{#polyglot}}Delete Caption{{/polyglot}}</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-7">
                                                <div class="form-group layout-opts caption-exist">
                                                    <div class="col-sm-7">
                                                        <div class="form-group">
                                                            <label for="" class="control-label col-sm-4">{{#polyglot}}Caption Style{{/polyglot}}</label>
                                                            <div class="col-sm-8">
                                                                <select name="style" class="form-control caption-style">
                                                                    {{#captionStyles}}
                                                                    <option value="title {{value}}">{{name}}</option>
                                                                    {{/captionStyles}}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="" class="control-label col-sm-4">{{#polyglot}}Caption Background{{/polyglot}}</label>
                                                            <div class="col-sm-8">
                                                                <select name="background" class="form-control caption-background">
                                                                    <option value="transparent-black">Transparent Black</option>
                                                                    <option value="transparent-white">Transparent White</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-5">
                                                        <div class="form-group">
                                                            <label for="" class="control-label col-sm-4">{{#polyglot}}Caption Position{{/polyglot}}</label>
                                                            <div class="caption-position col-sm-8">
                                                                <input type="radio" name="position" value="left,top">
                                                                <label><span><span></span></span></label>
                                                                <input type="radio" name="position" value="center,top">
                                                                <label><span><span></span></span></label>
                                                                <input type="radio" name="position" value="right,top">
                                                                <label><span><span></span></span></label>
                                                                <br>
                                                                <input type="radio" name="position" value="left,center">
                                                                <label><span><span></span></span></label>
                                                                <input type="radio" name="position" value="center,center">
                                                                <label><span><span></span></span></label>
                                                                <input type="radio" name="position" value="right,center">
                                                                <label><span><span></span></span></label>
                                                                <br>
                                                                <input type="radio" name="position" value="left,bottom">
                                                                <label><span><span></span></span></label>
                                                                <input type="radio" name="position" value="center,bottom">
                                                                <label><span><span></span></span></label>
                                                                <input type="radio" name="position" value="right,bottom">
                                                                <label><span><span></span></span></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {{/isSlider}}
							</div>
						</div>'

            mixinTemplateHelpers : (data)->
                data = super data
                captionStyles = Marionette.getOption @,'settingsModel'
                data.isSlider = if Marionette.getOption(@,'element') is 'Slider' then true else false
                data.captionStyles = []
                _.each captionStyles.get('styles'),(style)->
                    data.captionStyles.push 
                        name : style.name
                        value : _.slugify style.name
                data

            modelEvents : 
                'change:thumb_url change:full_url' : 'render'

            events:
                # 'click .update-slide': ->
                #     data = Backbone.Syphon.serialize @
                #     @trigger "slide:updated:with:data", data

                'click .remove-slide': (e)->
                    e.preventDefault()
                    e.stopPropagation()
                    if confirm(_.polyglot.t 'Are you sure?')
                        @trigger "remove:slide", @model

                'click .edit-image' : (e)->
                    e.preventDefault()
                    @trigger "edit:image"

                # 'click .add-text' :(e)->
                #     e.preventDefault()
                #     @$el.find('.imgname').removeClass 'hide'
                    # @trigger "add:text"

                'change .caption-title ' :(e)->
                    if $(e.target).val() isnt ''
                        @$el.find('.caption-exist').slideDown('fast')
                    # else
                    #     @$el.find('.caption-exist').hide()
                    #     @model.set 'layers',[]
                    #     @model.save()
                    #     @model.trigger 'model:changed'
                        # @setCaptionDefaults()
                        

                'click .save-slide-layer' : 'saveSlideLayer'

                'click .delete-slide-layer' : (e)->
                    @model.set 'layers',[]
                    @model.save()
                    @model.trigger 'model:changed'
                    @setCaptionDefaults()

                'change input.link-check' :(e)->
                    if $(e.target).is(':checked')
                        @$el.find('.form-group.link-hide').removeClass 'hide'
                    else
                        @$el.find('.form-group.link-hide').addClass 'hide'



            onRender: ->
                @$el.attr 'data-slide-id', @model.get 'id'

            onShow :->
                @$el.find('select').selectpicker()
                @$el.find('input[type="checkbox"]').checkbox()
                if Marionette.getOption(@,'element') is 'Slider'
                    @setCaptionDefaults()

            setCaptionDefaults:->
                if @model.get('layers').length and @model.get('layers')[0].text isnt ''
                    caption = @model.get('layers')[0]
                    @$el.find('.caption-exist').show()
                    captionHtml = $.parseHTML _.stripslashes caption.text

                    # console.log caption.text
                    # console.log captionHtml
                    # console.log "abc_#{$(captionHtml).first().find('a').first().html()}"

                    if $(captionHtml).first().find('a').length
                        @$el.find('.caption-title').val $(captionHtml).first().find('a').first().html()
                        @$el.find('.caption-link').val $(captionHtml).first().find('a').first().attr 'href'
                        @$el.find('input.link-check').checkbox('check')
                        @$el.find('input.link-target').checkbox('check') if $(captionHtml).first().find('a').first().attr('target') is '_blank'
                    else 
                        @$el.find('.form-group.link-hide').addClass('hide')
                        @$el.find('.caption-title').val $(captionHtml).first().html()
                        @$el.find('.caption-link').val ''

                    @$el.find('.caption-description').val $(captionHtml).last().html()
                    @$el.find('.caption-style').selectpicker 'val',$(captionHtml).first().attr 'class'
                    @$el.find('.caption-background').selectpicker 'val',caption.style
                    @$el.find("input[name='position'][value='#{caption.left},#{caption.top}']").prop 'checked',true
                else
                    @$el.find('.caption-exist').hide()
                    @$el.find('.form-group.link-hide').addClass('hide')
                    @$el.find('.caption-title').val ''
                    @$el.find('.caption-description').val ''
                    @$el.find('.caption-link').val ''
                    # @$el.find('.caption-style').selectpicker 'val',@layerDefault().style
                    @$el.find("input[name='position'][value='#{@layerDefault().left},#{@layerDefault().top}']").prop 'checked',true

            saveSlideLayer :(e)->
                    data = {}
                    if @model.get('layers').length
                        data = @model.get('layers')[0]
   
                    else
                        data = @layerDefault()

                    data.text = "<h3 class='#{@$el.find('.caption-style').val()}'>"
                    if @$el.find('input.link-check').is(':checked')
                        data.text += "<a href='#{@$el.find('.caption-link').val()}'" 
                        data.text += if @$el.find('input.link-target').is(':checked') then "target='_blank'>" else "target='_self'>"
                    data.text += @$el.find('.caption-title').val()
                    data.text += "</a>" if @$el.find('input.link-check').is(':checked')
                    data.text += "</h3><div class='text'>#{@$el.find('.caption-description').val()}</div>"
                    data.style = @$el.find('.caption-background').val()

                    position = @$el.find('input[name="position"]:checked').val()
                    position = position.split ','
                    data.left = position[0]
                    data.top = position[1]
                    
                    if @$el.find('.caption-title').val() isnt '' or @$el.find('.caption-description').val() isnt '' 
                        @model.set 'layers',[data]
                    else
                        @model.set 'layers',[]
                    @model.save()
                    @model.trigger 'model:changed'

            layerDefault : ->
                align_hor: "left"
                align_vert: "top"
                alt: ""
                animation: "tp-fade"
                attrClasses: ""
                attrID: ""
                attrRel: ""
                attrTitle: ""
                corner_left: "nothing"
                corner_right: "nothing"
                easing: "Power3.easeInOut"
                endSpeedFinal: 300
                endTimeFinal: 8700
                endanimation: "auto"
                endeasing: "nothing"
                endspeed: 300
                endsplit: "none"
                endsplitdelay: "10"
                endtime: ""
                height: -1
                hiddenunder: false
                left: 'center'
                link: ""
                link_open_in: "same"
                link_slide: "nothing"
                max_height: "auto"
                max_width: "auto"
                realEndTime: 9000
                resizeme: true
                scaleProportional: false
                scaleX: ""
                scaleY: ""
                scrollunder_offset: ""
                serial: 0
                speed: 300
                split: "none"
                splitdelay: "10"
                style: "transparent-black"
                text: "Caption Text"
                time: 500
                timeLast: 8500
                top: 'center'
                type: "text"
                whitespace: "nowrap"
                width: -1


        class NoSlidesView extends Marionette.ItemView

            template: '<div class="alert">{{#polyglot}}No images found. Please add images.{{/polyglot}}</div>'

        # colllection view
        class SlidesListView extends Marionette.CompositeView

            template: ' <div class="slides-list">
    						<div class="panel-group" id="slides-accordion"></div>
                        </div>
                        <div id="edit-image-view" class="edit-image-view"></div>'


            itemView: SlideView

            emptyView: NoSlidesView

            itemViewContainer: '#slides-accordion'

            mixinTemplateHelpers :(data)->
                data = super data
                data.isSlider = if Marionette.getOption(@,'element') is 'Slider' then true else false 
                data

            itemViewOptions : ->
                settingsModel : Marionette.getOption @,'settingsModel'
                element : Marionette.getOption @, 'element'

            onBeforeRender: ->
                @collection.sort()

            # make them sortable
            onShow: ->
                @$el.find('#slides-accordion').sortable
                    start: (e, ui)->
                        ui.placeholder.height ui.item.height()
                    update: @slidesSorted

            slidesSorted: (evt, ui)=>
                order = @$el.find('#slides-accordion').sortable 'toArray', attribute: 'data-slide-id'

                newOrder = _.map order, (o, i)->
                    parseInt o

                @trigger "slides:order:updated", newOrder

            onClose: ->
                @$el.find('#slides-accordion').sortable 'destroy'

            onShowEditImage : (editView)->
                @$el.find( '.slides-list' ).hide()
                @$el.find( '.edit-image-view' ).html( editView.$el ).show()
                $( '.crop-help' ).show()
                editView.triggerMethod 'show'

            onImageEditingCancelled : ->
                self = @
                @$el.find( '.edit-image-view' ).fadeOut 'fast', ->
                   $( @ ).empty()
                   self.$el.find( '.slides-list' ).show()
                $( '.crop-help' ).hide()



        class SlidesListLayout extends Marionette.Layout

            template: '<div class="row">
                            <div class="col-sm-12">
                                <div class="alert alert-info crop-help">
                                    <p><b>{{#polyglot}}Steps to fit your image edge to edge inside the slider{{/polyglot}}</b></p>
                                    <ul>
                                        <li>{{#polyglot}}Select the area to be cropped.{{/polyglot}}</li>
                                        <li>{{#polyglot}}Notice how initially the crop button is disabled. Crop is enabled once you have selected the image close to the aspect ratio of the slider.{{/polyglot}}</li>
                                        <li>{{#polyglot}}Your image dimensions are displayed in scale image area and the required dimensions are displayed under image crop area.{{/polyglot}}</li>
                                        <li>{{#polyglot}}As you increase the decrease your selection, the selection area height and width will also change.{{/polyglot}}</li>
                                        <li>{{#polyglot}}Once it reaches the maximum point for expected image width or height, you will not be able to increase the selection area anymore. If you want a larger image, we suggest you increase the width of the slider from sitebuilder for best results.{{/polyglot}}</li>
                                        <li>{{#polyglot}}When you are happy with your selection area to be cropped, click the crop button from the tool bar above.{{/polyglot}}</li>
                                    </ul>
                                </div>
                                <div id="slides-info">
                                    {{#polyglot}}Click the button to select images to add to your slider. You can change the order of the images by dragging them up or down in the list to the left.{{/polyglot}}
                                    <div class="aj-imp-block-button add-new-slide">
                                        <button class="btn btn-default btn-hg"><span class="bicon icon-uniF10C"></span>&nbsp;&nbsp;{{#polyglot}}Add Image{{/polyglot}}</button>
                                    </div>
                                </div>
                                <div id="add-slide-region"></div>
                                
                            </div>
                            <div class="col-sm-12">
                                <div id="slides-list-region"></div>
                            </div>
                        </div>'

            events:
                'click .add-new-slide': ->
                    @$el.find('.add-new-slide').hide()
                    @trigger "show:add:new:slide"

            dialogOptions:
                modal_title: _.polyglot.t 'Image Gallery'
                modal_size: 'wide-modal'

            onShowAddSlide: ->
                @$el.find('.add-new-slide').show()

            regions:
                slidesListRegion: '#slides-list-region'
                addSlideRegion: '#add-slide-region'

            # show order updated message
            onShowOrderUpdatedMsg: ->

                # remove previous alert message
                @$el.find('.alert').remove()

                @$el.prepend "<div class=\"alert alert-success\">" + _.polyglot.t("Updated successfully") + "</div>"


        App.commands.setHandler 'show:slides:list', (opts = {})->
            new SlidesListController opts

        App.commands.setHandler "show:slides:manager", (slidesCollection, element)->
            new SlidesListController
                region: App.dialogRegion
                collection: slidesCollection
                element : element
