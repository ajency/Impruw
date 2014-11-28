define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.SiteMenuElements", (SiteMenuElements, App, Backbone, Marionette, $, _)->

        class SiteMenuElements.MenuElementModel extends Backbone.Model
            name: 'menuElement'
            idAttribute: 'term_id'

        class SiteMenuElements.SiteMenuElementCollection extends Backbone.Collection

            model: SiteMenuElements.MenuElementModel

            url: ->
                AJAXURL + '?action=get-site-menu-elements'

        menuElementModel = new SiteMenuElements.MenuElementModel


        #Public API
        API =

            getSiteMenuElements:(language)->
                menuCollection = new SiteMenuElements.SiteMenuElementCollection
                menuCollection.fetch
                    data:
                        language : language
                menuCollection

        App.reqres.setHandler "get:site:menu:elements", (language) ->
            API.getSiteMenuElements(language)