define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.PageSliderElements", (PageSliderElements, App, Backbone, Marionette, $, _)->

        #Page model
        class PageSliderElements.SliderElementModel extends Backbone.Model
            name: 'pageSliderElement'
            idAttribute: 'slider_id'

        #Page Collection class
        class PageSliderElements.SliderElementCollection extends Backbone.Collection

            model: PageSliderElements.SliderElementModel

            url: ->
                AJAXURL + '?action=get-page-sliders'

        tableElementModel = new PageSliderElements.SliderElementModel


        #Public API
        API =

            getPageSliders:(pageId)->
                sliderCollection = new PageSliderElements.SliderElementCollection
                sliderCollection.fetch
                    data:
                        pageId : pageId
                sliderCollection

        App.reqres.setHandler "get:page:slider:elements", (pageId) ->
            API.getPageSliders(pageId)