define ["app", 'backbone'], (App, Backbone) ->

    # App state entity
    App.module "Entities.SiteBilling", (SiteBilling, App, Backbone, Marionette, $, _)->

        class SiteBillingPlan extends Backbone.Model

            name: 'sitebillingplan'

            idAttribute : 'id'


            sync: (method, entity, options = {})->
                xhr = window._bsync method, entity, options
                entity._fetch = xhr if method is 'read'

            url: ->
                return "#{SITEURL}/api/ajbilling/plan/#{@get("object_id")}/site"


        class SiteBillingPlanCollection extends Backbone.Collection

            model: SiteBillingPlan

            url: ->
                "#{SITEURL}/api/ajbilling/plans/#{SITEID["id"]}"


        activeBillingPlanModel = new SiteBillingPlan 'object_id' : SITEID["id"]

        siteBillingPlanCollection = new SiteBillingPlanCollection

        API =

            getSiteBillingPlan : ( siteId ) ->
                activeBillingPlanModel.fetch() if activeBillingPlanModel.isNew()
                activeBillingPlanModel

            getSiteBillingPlanCollection:->
                siteBillingPlanCollection.fetch() if siteBillingPlanCollection.length is 0
                siteBillingPlanCollection

        App.reqres.setHandler "get:site:billing:plan",( siteId ) ->
            API.getSiteBillingPlan siteId

        App.reqres.setHandler "get:all:billing:plans",()->
            API.getSiteBillingPlanCollection()
