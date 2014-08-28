define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.FooterElements", (FooterElements, App, Backbone, Marionette, $, _)->

        #Page model
        class FooterElements.FooterElementModel extends Backbone.Model
            name: 'footerElements'
            idAttribute: 'elementId'

        #Page Collection class
        class FooterElements.FooterElementCollection extends Backbone.Collection

            model: FooterElements.FooterElementModel

            url: ->
                AJAXURL + '?action=get-footer-elements'

        footerElementModel = new FooterElements.FooterElementModel


        #Public API
        API =

            getFooterElements:()->
                footerElementCollection = new FooterElements.FooterElementCollection
                footerElementCollection.fetch()
                footerElementCollection

        App.reqres.setHandler "get:footer:elements", () ->
            API.getFooterElements()