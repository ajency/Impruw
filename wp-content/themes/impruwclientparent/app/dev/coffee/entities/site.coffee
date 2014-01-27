define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Site", (Site, App)->

            class SiteModel extends Backbone.Model

            #PUBLIC API FOR ENitity
            API =
                getSiteProfile: ()->

                    site = new SiteModel
                    
                    site.url = AJAXURL + '?action=get-site-profile'
                    
                    site.fetch()
                                
                    site


            #REQUEST HANDLERS
            App.reqres.setHandler "get:site:profile", ->

                API.getSiteProfile()
