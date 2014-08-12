define ["app", 'backbone'], (App, Backbone) ->

    # App state entity
    App.module "Entities.BraintreePlans", (BraintreePlans, App, Backbone, Marionette, $, _)->

        # plan model
        class BraintreePlan extends Backbone.Model

            name: 'braintreeplan'

            idAttribute : 'plan_id'


        # plan collection
        class BraintreePlanCollection extends Backbone.Collection

            model: BraintreePlan

            url: ->
                "#{AJAXURL}?action=get-braintree-plans"


        API =
            getBraintreePlansCollection: ->
                braintreePlanCollection = new BraintreePlanCollection
                braintreePlanCollection.fetch()
                braintreePlanCollection

            getPlanByPlanId : ( planId ) ->
                brainTreePlanModel = new BraintreePlan 'plan_id' : planId
                brainTreePlanModel.fetch()
                brainTreePlanModel

        App.reqres.setHandler "get:braintree:plans", ->
            API.getBraintreePlansCollection()

        App.reqres.setHandler "get:braintreeplan:by:id",( planId ) ->
            API.getPlanByPlanId planId
