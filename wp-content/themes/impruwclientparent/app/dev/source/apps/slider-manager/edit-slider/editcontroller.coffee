define ['app'
        'controllers/base-controller'
        'apps/slider-manager/edit-slider/setting/settingscontroller'
        'apps/slider-manager/edit-slider/list-slides/listcontroller'
        'apps/slider-manager/edit-slider/addedit-slide/addslidecontroller'
        'apps/slider-manager/edit-slider/slide-text-layer/slide-text-layer-controller'
], (App, AppController)->
    App.module 'SliderManager.EditSlider', (EditSlider, App, Backbone, Marionette, $, _)->
        class EditSliderController extends AppController

            initialize: (opt)->
                {@sliderId, collection} = opt

                if not collection
                    slider = App.request "get:slider:by:id", @sliderId

                @layout = layout = @_getEditLayout()

                @listenTo layout, "cancel:edit:slider", =>
                    Marionette.triggerMethod.call @region, "cancel:edit:slider"
                    layout.close()


                @listenTo layout, "show:edit:slide", (slideId)=>
                    @_startEditSlideApp @sliderId, slideId, layout.addEditSlideRegion

                @listenTo layout, "show", =>
                    #@_startSettingsApp slider, layout.sliderSettingsRegion
                    @_startSlidesListApp @sliderId, layout.slidesListRegion
                #@_startAddSlideApp @sliderId, layout.addEditSlideRegion

                @show layout

            #App.navigate  "slider-manager/edit/#{@sliderId}"

            # edit layout
            _getEditLayout: ->
                new EditSliderLayout

            _startSettingsApp: (slider, region)->
                App.execute "show:slider:edit:settings",
                    model: slider
                    region: region

            _startSlidesListApp: (id, region)->
                App.execute "show:slides:list",
                    sliderId: id
                    region: region

            _startAddSlideApp: (id, region)->
                App.execute "show:add:slide",
                    sliderId: id
                    region: region

            _startEditSlideApp: (id, slideId, region)->
                App.execute "show:edit:slide",
                    sliderId: id
                    slideId: slideId
                    region: region

            # clean up code
            onClose: ->
                App.navigate 'slider-manager'

            onShow: ->
                App.navigate "slider-manager/edit/#{sliderId}"


        # slider form
        class EditSliderLayout extends Marionette.Layout

            template: '<div class="row edit-slider">
            									<div class="col-sm-12 slider-right-region">
            										<div class="tab-content">
            											<div id="slider-settings-region" class="tab-pane">dsd</div>
            											<div id="slides-list-region" class="tab-pane active"></div>
            											<div id="add-edit-slide-region" class="tab-pane">dsds</div>
            										</div>
            									</div>
            								</div>'


            events:
                'click button.cancel-edit-slider': ->
                    @trigger "cancel:edit:slider"

            regions:
                sliderSettingsRegion: '#slider-settings-region'
                slidesListRegion: '#slides-list-region'
                addEditSlideRegion: '#add-edit-slide-region'


        App.commands.setHandler 'show:edit:slider', (opts = {})->
            new EditSliderController opts