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
                "#{SITEURL}/api/ajbilling/featureplans/#{SITEID["id"]}/site"


        siteFeaturePlanCollection = new SiteFeaturePlanCollection

        API =

            getActiveFeaturePlan : ( siteId ) ->
                activeFeaturePlanModel = new SiteFeaturePlan 'object_id' : SITEID["id"]
                activeFeaturePlanModel.fetch()
                activeFeaturePlanModel

            getFeaturePlanById : ( planId ) ->
                featurePlanModel = siteFeaturePlanCollection.get(planId)
                featurePlanModel

            getSiteFeaturePlanCollection:->
                siteFeaturePlanCollection.fetch() if siteFeaturePlanCollection.length is 0
                siteFeaturePlanCollection

        App.reqres.setHandler "get:active:feature:plan",( siteId ) ->
            API.getActiveFeaturePlan siteId

        App.reqres.setHandler "get:feature:plan:by:id",( planId ) ->
            API.getFeaturePlanById planId

        App.reqres.setHandler "get:all:feature:plans",()->
            API.getSiteFeaturePlanCollection()
