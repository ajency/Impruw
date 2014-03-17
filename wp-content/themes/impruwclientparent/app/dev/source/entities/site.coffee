define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Site", (Site, App, Backbone, Marionette, $, _)->

            class SiteModel extends Backbone.Model

                name : 'site'

            class SiteSocialItem extends Backbone.Model
                idAttribute : 'socialname'

            class SiteSocialItemsCollection extends Backbone.Collection
                model : SiteSocialItem
                url : ->
                    "#{AJAXURL}?action=get-site-socials"

                

            #PUBLIC API FOR ENitity
            API =
                getSiteProfile: ()->
                    site = new SiteModel
                    site.url = AJAXURL + '?action=get-site-profile'
                    site.fetch()
                    site

                getSiteSocial:->
                    socialCollection = App.request "get:collection", 'socialcollection'
                    socialCollection = new SiteSocialItemsCollection if not socialCollection
                    socialCollection.fetch() if socialCollection.length is 0
                    socialCollection

                createSocialStoreCollection:->
                    socialCollection = new SiteSocialItemsCollection
                    App.request "set:collection", 'socialcollection', socialCollection


            #REQUEST HANDLERS
            App.reqres.setHandler "get:site:profile", ->
                API.getSiteProfile()

            App.reqres.setHandler "get:site:social", ->
                API.getSiteSocial()

            App.commands.setHandler "create:social:store", ->
                API.createSocialStoreCollection()
