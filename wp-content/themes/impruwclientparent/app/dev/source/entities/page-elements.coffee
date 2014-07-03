define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.PageElements", (PageElements, App, Backbone, Marionette, $, _)->

        #Page model
        class PageElements.ElementModel extends Backbone.Model
            name: 'pageElements'
            idAttribute: 'elementId'

        #Page Collection class
        class PageElements.ElementCollection extends Backbone.Collection

            model: PageElements.ElementModel

            url: ->
                AJAXURL + '?action=get-page-elements'

        elementModel = new PageElements.ElementModel


        #Public API
        API =

            getPageElements:(pageId)->
                elementCollection = new PageElements.ElementCollection
                elementCollection.fetch
                    data:
                        pageId : pageId
                elementCollection

        App.reqres.setHandler "get:page:elements", (pageId) ->
            API.getPageElements(pageId)