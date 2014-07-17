define ["app", 'backbone'], (App, Backbone) ->

    # App state entity
    App.module "Entities.BraintreePlans", (BraintreePlans, App, Backbone, Marionette, $, _)->

        # plan model
        class BraintreePlan extends Backbone.Model

            name: 'braintreeplan'


        # plan collection
        class BraintreePlanCollection extends Backbone.Collection

            model: BraintreePlan

            url: ->
                "#{AJAXURL}?action=get-braintree-plans"


        API =
            getBraintreePlansCollection: ->
                planCollection = new BraintreePlanCollection
                planCollection.fetch()
                planCollection

        App.reqres.setHandler "get:braintree:plans", ->
            API.getBraintreePlansCollection()
