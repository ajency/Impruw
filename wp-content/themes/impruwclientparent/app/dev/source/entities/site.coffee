define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Site", (Site, App, Backbone, Marionette, $, _)->

            # Site Model
            class SiteModel extends Backbone.Model

                idAttribute : 'site_id'

                name : 'site'
                
            # create the empty site model
            siteModel = new SiteModel


            #PUBLIC API FOR ENitity
            API =
                getSiteModel: ()->
                    siteModel



            #REQUEST HANDLERS
            App.reqres.setHandler "get:site:model", ->
                API.getSiteModel()