define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Site", (Site, App, Backbone, Marionette, $, _)->

            # Site Model
            class SiteModel extends Backbone.Model

                idAttribute : 'site_id'

                name : 'site'
                
            # create the empty site model
            siteModel = new SiteModel


            # PUBLIC API FOR ENitity
            API =
                # get site model
                getSiteModel: ()->
                    siteModel
                    siteModel.fetch()
                    siteModel

                # get site social
                getSiteSocial:->
                    new Backbone.Collection [
                                                (sociallink : '#facebook', socialname : 'facebook')
                                                (sociallink : '#twitter', socialname : 'twitter')
                                                (sociallink : '#youtube', socialname : 'youtube')
                                            ]
                getSiteProfile : ->


            # REQUEST HANDLERS
            App.reqres.setHandler "get:site:model", ->
                API.getSiteModel()

            App.reqres.setHandler "get:site:social", ->
                API.getSiteSocial()

            App.reqres.setHandler "get:site:profile", ->
                API.getSiteProfile()
