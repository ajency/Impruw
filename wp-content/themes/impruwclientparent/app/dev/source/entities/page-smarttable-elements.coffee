define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.PageSmartTableElements", (PageSmartTableElements, App, Backbone, Marionette, $, _)->

        #Page model
        class PageSmartTableElements.SmartTableElementModel extends Backbone.Model
            name: 'pageTableElements'
            idAttribute: 'elementId'

        #Page Collection class
        class PageSmartTableElements.SmartTableElementCollection extends Backbone.Collection

            model: PageSmartTableElements.SmartTableElementModel

            url: ->
                AJAXURL + '?action=get-page-smart-tables'

        tableElementModel = new PageSmartTableElements.SmartTableElementModel


        #Public API
        API =

            getPageSmartTables:(pageId)->
                tableCollection = new PageSmartTableElements.SmartTableElementCollection
                tableCollection.fetch
                    data:
                        pageId : pageId
                tableCollection

        App.reqres.setHandler "get:smart:table:elements", (pageId) ->
            API.getPageSmartTables(pageId)