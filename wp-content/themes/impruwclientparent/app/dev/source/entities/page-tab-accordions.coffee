define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.PageTabAccordionElements", (PageTabAccordionElements, App, Backbone, Marionette, $, _)->

        #Page model
        class PageTabAccordionElements.TabAccordionElementModel extends Backbone.Model
            name: 'pageTabAccordionElements'
            idAttribute: 'ID'

        #Page Collection class
        class PageTabAccordionElements.PageTabAccordionElementCollection extends Backbone.Collection

            model: PageTabAccordionElements.TabAccordionElementModel

            url: ->
                AJAXURL + '?action=get-page-tabs-accordions'

        tabAccordionModel = new PageTabAccordionElements.TabAccordionElementModel


        #Public API
        API =

            getTabAccordions:(pageId)->
                tabAccordionCollection = new PageTabAccordionElements.PageTabAccordionElementCollection
                tabAccordionCollection.fetch
                    data:
                        pageId : pageId
                tabAccordionCollection

        App.reqres.setHandler "get:tab:accordion:elements", (pageId) ->
            API.getTabAccordions(pageId)