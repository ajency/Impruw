define ["app", 'backbone'], (App, Backbone) ->

    # App state entity
    App.module "Entities.SiteFeaturePlans", (SiteFeaturePlans, App, Backbone, Marionette, $, _)->

        class SiteFeaturePlan extends Backbone.Model

            name: 'sitefeatureplan'

            idAttribute : 'id'


            sync: (method, entity, options = {})->
                xhr = window._bsync method, entity, options
                entity._fetch = xhr if method is 'read'

            url: ->
                return "#{SITEURL}/api/ajbilling/featureplan/#{@get("object_id")}/site"


        class SiteFeaturePlanCollection extends Backbone.Collection

            model: SiteFeaturePlan

            url: ->
                "#{SITEURL}/api/ajbilling/plans/#{SITEID["id"]}"


        siteBillingPlanCollection = new SiteFeaturePlanCollection

        API =

            getActiveFeaturePlan : ( siteId ) ->
                activeFeaturePlanModel = new SiteFeaturePlan 'object_id' : SITEID["id"]
                activeFeaturePlanModel.fetch()
                activeFeaturePlanModel

            getSiteFeaturePlanCollection:->
                siteBillingPlanCollection.fetch() if siteBillingPlanCollection.length is 0
                siteBillingPlanCollection

        App.reqres.setHandler "get:active:feature:plan",( siteId ) ->
            API.getActiveFeaturePlan siteId

        App.reqres.setHandler "get:all:feature:plans",()->
            API.getSiteFeaturePlanCollection()
