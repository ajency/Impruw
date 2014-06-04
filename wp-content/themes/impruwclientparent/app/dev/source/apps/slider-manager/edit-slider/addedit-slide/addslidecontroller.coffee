define ['app'
        'controllers/base-controller'], (App, AppController)->
    App.module 'SliderManager.EditSlider.AddSlide', (AddSlide, App, Backbone, Marionette, $, _)->
        class AddSlideController extends AppController

            initialize: (opt = {})->
                {@sliderId} = opt

                @layout = layout = @_getAddSlideLayout()

                addSlideView = @_getAddSlideView()

                @listenTo layout, "show", =>
                    layout.addSlideFormRegion.show addSlideView
                    App.execute "start:media:upload:app", region: layout.uploadMediaRegion
                    App.execute "start:media:grid:app", region: layout.gridMediaRegion

                @listenTo addSlideView, "create:new:slide", (data)=>
                    data.slider_id = @sliderId
                    slide = App.request "create:new:slide:model", data
                    slide.set data
                    slide.save null,
                        wait: true
                        success: @newSlideCreated

                @listenTo layout, "media:element:selected", (media)->
                    addSlideView.triggerMethod "slide:image:selected", media

                @listenTo layout, "image:selection:done", =>
                    addSlideView.triggerMethod "show:action:button"

                @listenTo addSlideView, "cancel:create:new:slide", (data)=>
                    Marionette.triggerMethod.call @region, "region:closed"
                    layout.close()

                @show layout

            newSlideCreated: (model, response, options)=>
                Marionette.triggerMethod.call @region, "new:slide:created", model
                @layout.close()

            _getAddSlideLayout: ->
                new AddSlideLayout

            _getAddSlideView: ->
                new AddSlideView


        class AddSlideView extends Marionette.ItemView

            tagName: 'form'

            template: '<div class="aj-imp-edit-image well">
            									<div class="row">
            										<div class="aj-imp-crop-link col-sm-4">
            											<div class="add-image-to-slide">
            												<span class="bicon icon-uniF10C"></span>
            												{{#polyglot}}Click to Add an Image to Your Slide{{/polyglot}}
            											</div>
            											<img src="{{thumb_url}}" class="img-responsive slide-image" style="display:none;">
            											<input type="hidden" name="background_type" value="image"/>
            											<input type="hidden" name="image" value="" required/>
            											<input type="hidden" name="image_id" value="" require/>
            										</div>
            										<div class="aj-imp-img-form col-sm-8">
            											<div class="row">
            												<div class="col-sm-6">
            													<input type="text" name="title" value="{{title}}" class="form-control" placeholder="{{#polyglot}}Title{{/polyglot}}">
            												</div>
            												<div class="col-sm-6">
            													<input type="url" type="link" name="link" value="{{link}}" class="form-control" placeholder="{{#polyglot}}Link{{/polyglot}}">
            												</div>
            											</div>
            											<div class="row">
            												<div class="col-sm-12">
            													<textarea name="description" class="form-control" placeholder="{{#polyglot}}Description{{/polyglot}}"></textarea>
            												</div>
            											</div>
            										</div>
            									</div>
            									<div class="aj-imp-img-save">
            										<button type="button" class="btn create-slide">{{#polyglot}}Add{{/polyglot}}</button>
            										<button type="button" class="btn cancel-create-slide">{{#polyglot}}Cancel{{/polyglot}}</button>
            									</div>
            							  	</div>'

            onSlideImageSelected: (media)->
                url = if media.get('sizes').thumbnail then media.get('sizes').thumbnail.url else media.get('sizes').full.url
                @$el.find('.add-image-to-slide').hide()
                @$el.find('.slide-image').attr 'src', url
                @$el.find('.slide-image').show()
                @$el.find('input[name="image"]').val media.get 'url'
                @$el.find('input[name="image_id"]').val media.get 'id'

            onShowActionButton: ->
                @$el.find('.aj-imp-img-save').show()

            events:
                'click .create-slide': (e)->
                    if @$el.valid()
                        data = Backbone.Syphon.serialize @
                        $(e.target).attr 'disabled', true
                        @trigger "create:new:slide", data

                'click .add-image-to-slide,.slide-image': ->
                    @$el.find('.aj-imp-img-save').hide()
                    @$el.closest('#add-slide-form-region').next().show()

                'click .cancel-create-slide': ->
                    @trigger "cancel:create:new:slide"


        class AddSlideLayout extends Marionette.Layout

            template: '<div id="add-slide-form-region"></div>
            								<div id="media-region" style="display:none">
            									<ul class="nav nav-tabs">
                                                    <li class="active all-media-tab"><a href="#grid-media-region" data-toggle="tab">{{#polyglot}}Gallery{{/polyglot}}</a></li>
            										<li class="upload-tab"><a href="#upload-media-region" data-toggle="tab">{{#polyglot}}Upload{{/polyglot}}</a></li>
            									</ul>
            									<div class="tab-content">
                                                    <div class="tab-pane active" id="grid-media-region"></div>
            										<div class="tab-pane" id="upload-media-region"></div>            										
            										<button class="btn btn-primary slide-image-selected">{{#polyglot}}Done{{/polyglot}}</button>
                                                </div>
            								</div>'

            events:
                'click .slide-image-selected': (e)->
                    @trigger "image:selection:done"
                    $(e.target).closest('#media-region').hide()

            initialize: ->
                @listenTo @gridMediaRegion, "media:element:selected", (media)->
                    @trigger "media:element:selected", media

            regions:
                addSlideFormRegion: '#add-slide-form-region'
                uploadMediaRegion: '#upload-media-region'
                gridMediaRegion: '#grid-media-region'


        App.commands.setHandler "show:add:new:slide", (options = {})->
            new AddSlideController options
