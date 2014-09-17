define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.PageTableElements", (PageTableElements, App, Backbone, Marionette, $, _)->

        #Page model
        class PageTableElements.TableElementModel extends Backbone.Model
            name: 'pageTableElements'
            idAttribute: 'elementId'

        #Page Collection class
        class PageTableElements.TableElementCollection extends Backbone.Collection

            model: PageTableElements.TableElementModel

            url: ->
                AJAXURL + '?action=get-page-tables'

        tableElementModel = new PageTableElements.TableElementModel


        #Public API
        API =

            getPageTables:(pageId)->
                tableCollection = new PageTableElements.TableElementCollection
                tableCollection.fetch
                    data:
                        pageId : pageId
                tableCollection

        App.reqres.setHandler "get:page:table:elements", (pageId) ->
            API.getPageTables(pageId)