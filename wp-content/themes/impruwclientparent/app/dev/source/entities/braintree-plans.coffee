define ["app", 'backbone'], (App, Backbone) ->

    # App state entity
    App.module "Entities.BraintreePlans", (BraintreePlans, App, Backbone, Marionette, $, _)->

        # plan model
        class BraintreePlan extends Backbone.Model

            name: 'braintreeplan'

            idAttribute : 'id'

            sync: (method, entity, options = {})->
                xhr = window._bsync method, entity, options
                entity._fetch = xhr if method is 'read'

            url: ->
                "#{SITEURL}/api/ajbilling/braintreePlans/#{@get("id")}"


        # plan collection
        class BraintreePlanCollection extends Backbone.Collection

            model: BraintreePlan


        API =
            getBraintreePlansCollection: ->
                braintreePlanCollection = new BraintreePlanCollection
                braintreePlanCollection.fetch()
                braintreePlanCollection

            getPlanByPlanId : ( planId ) ->
                brainTreePlanModel = new BraintreePlan 'id' : planId
                brainTreePlanModel.fetch()
                brainTreePlanModel

        App.reqres.setHandler "get:braintree:plans", ->
            API.getBraintreePlansCollection()

        App.reqres.setHandler "get:braintreeplan:by:id",( planId ) ->
            API.getPlanByPlanId planId
