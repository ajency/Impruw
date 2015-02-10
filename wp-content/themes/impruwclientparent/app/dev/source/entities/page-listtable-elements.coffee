define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.PageListTableElements", (PageListTableElements, App, Backbone, Marionette, $, _)->

        #Page model
        class PageListTableElements.ListTableElementModel extends Backbone.Model
            name: 'pageListTableElements'
            idAttribute: 'elementId'

        #Page Collection class
        class PageListTableElements.ListTableElementCollection extends Backbone.Collection

            model: PageListTableElements.ListTableElementModel

            url: ->
                AJAXURL + '?action=get-page-list-tables'

        listElementModel = new PageListTableElements.ListTableElementModel


        #Public API
        API =

            getPageListTables:(pageId)->
                listCollection = new PageListTableElements.ListTableElementCollection
                listCollection.fetch
                    data:
                        pageId : pageId
                listCollection

        App.reqres.setHandler "get:list:table:elements", (pageId) ->
            API.getPageListTables(pageId)