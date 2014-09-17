define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.Seo", (Seo, App, Backbone, Marionette, $, _)->

        # Seo Model
        class SeoModel extends Backbone.Model

            idAttribute: 'post_id'

            name: 'page-seo'


        # PUBLIC API FOR ENitity
        API =
        # get site model
            getSeoModel: (post_id)->
                seoModel = new SeoModel 'post_id' : post_id
                seoModel.fetch()
                seoModel


                # REQUEST HANDLERS
        App.reqres.setHandler "get:seo:model", (post_id)->
            API.getSeoModel(post_id)
