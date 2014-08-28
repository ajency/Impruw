define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.HeaderElements", (HeaderElements, App, Backbone, Marionette, $, _)->

        #Page model
        class HeaderElements.HeaderElementModel extends Backbone.Model
            name: 'headerElements'
            idAttribute: 'elementId'

        #Page Collection class
        class HeaderElements.HeaderElementCollection extends Backbone.Collection

            model: HeaderElements.HeaderElementModel

            url: ->
                AJAXURL + '?action=get-header-elements'

        headerElementModel = new HeaderElements.HeaderElementModel


        #Public API
        API =

            getHeaderElements:()->
                headerElementCollection = new HeaderElements.HeaderElementCollection
                headerElementCollection.fetch()
                headerElementCollection

        App.reqres.setHandler "get:header:elements", () ->
            API.getHeaderElements()