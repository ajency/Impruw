define ["app", 'backbone'], (App, Backbone) ->

    # App state entity
    App.module "Entities.SiteBilling", (SiteBilling, App, Backbone, Marionette, $, _)->

        class SiteBillingPlan extends Backbone.Model

            name: 'sitebillingplan'

            idAttribute : 'object_id'


            sync: (method, entity, options = {})->
                xhr = window._bsync method, entity, options
                entity._fetch = xhr if method is 'read'

            url: ->
                return SITEURL+'/api/ajbilling/plan/'+@id+'/site'


        API =

            getSiteBillingPlan : ( siteId ) ->
                siteBillingPlanModel = new SiteBillingPlan 'object_id' : siteId
                siteBillingPlanModel.fetch success: (model) ->
                    siteBillingPlanModel = model
                siteBillingPlanModel

        App.reqres.setHandler "get:site:billing:plan",( siteId ) ->
            API.getSiteBillingPlan siteId
