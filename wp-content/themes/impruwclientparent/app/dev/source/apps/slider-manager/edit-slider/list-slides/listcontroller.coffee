define ['app'
        'controllers/base-controller'], (App, AppController)->
    App.module 'SliderManager.EditSlider.SlidesList', (SlidesList, App, Backbone, Marionette, $, _)->
        
        class SlidesListController extends AppController

            initialize: (opt)->

                {collection} = opt

                # if slider id is not present
                if collection.length > 0
                    @sliderId = collection.at(0).get 'slider_id'
                else
                    collection.once "add", (model)=>
                        @sliderId = parseInt model.get 'slider_id'

                @layout = layout = @_getSlidesListLayout()

                @listView = listView = @_getSlidesListView collection

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
            _getSlidesListView: (collection)->
                new SlidesListView
                        collection: collection

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
						  <a class="accordion-toggle">
							<div class="aj-imp-image-item row">
								<div class="imgthumb col-sm-4">
									<img src="{{thumb_url}}" class="img-responsive">
								</div>
								<div class="imgname col-sm-5"></div>
								<div class="imgactions col-sm-3">
                                    <a href="#" class="blue-link add-text" > <span class="glyphicon glyphicon-edit"></span> {{#polyglot}}Add Caption{{/polyglot}} </a>
									<a href="#/edit-image" class="blue-link edit-image"> <span class="glyphicon glyphicon-edit"></span>{{#polyglot}}Edit{{/polyglot}}</a>&nbsp;
                                    <a class="remove-slide" title="Delete Image"><span class="glyphicon glyphicon-trash"></span>&nbsp;{{#polyglot}}Delete Image{{/polyglot}}</a>
								</div>
							</div>
						  </a>
						</div>'

            modelEvents : 
                'change:thumb_url change:full_url' : 'render'

            events:
                'click .update-slide': ->
                    data = Backbone.Syphon.serialize @
                    @trigger "slide:updated:with:data", data

                'click .remove-slide': (e)->
                    e.preventDefault()
                    e.stopPropagation()
                    if confirm(_.polyglot.t 'Are you sure?')
                        @trigger "remove:slide", @model

                'click .edit-image' : (e)->
                    e.preventDefault()
                    @trigger "edit:image"

                'click .add-text' :(e)->
                    e.preventDefault()
                    @trigger "add:text"

            onRender: ->
                @$el.attr 'data-slide-id', @model.get 'id'

        class NoSlidesView extends Marionette.ItemView

            template: '<div class="alert">{{#polyglot}}No images found. Please add images.{{/polyglot}}</div>'

        # colllection view
        class SlidesListView extends Marionette.CompositeView

            template: ' <div class="slides-list">
                            <div class="aj-imp-image-header row">
    							<div class="col-sm-4">
    								&nbsp;
    							</div>
    							<div class="col-sm-5">
    								{{#polyglot}}File Name{{/polyglot}}
    							</div>
    							<div class="col-sm-3">
    								{{#polyglot}}Actions{{/polyglot}}
    							</div>
    						</div>
    						<div class="panel-group" id="slides-accordion"></div>
                        </div>
                        <div id="edit-image-view" class="edit-image-view"></div>'


            itemView: SlideView

            emptyView: NoSlidesView

            itemViewContainer: '#slides-accordion'

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
                        <div class="col-sm-8">
                            <div id="slides-list-region"></div>
                        </div>
                        <div class="col-sm-4">
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
                            </div>
                            <div class="aj-imp-block-button add-new-slide">
                                <button class="btn btn-default btn-hg"><span class="bicon icon-uniF10C"></span>&nbsp;&nbsp;{{#polyglot}}Add Image{{/polyglot}}</button>
                            </div>
                        </div>
                        </div>
    					
    					<div id="add-slide-region"></div>'

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

        App.commands.setHandler "show:slides:manager", (slidesCollection)->
            new SlidesListController
                region: App.dialogRegion
                collection: slidesCollection
