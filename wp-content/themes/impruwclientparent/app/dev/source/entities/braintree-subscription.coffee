define ["app", 'backbone'], (App, Backbone) ->

    # App state entity
    App.module "Entities.BraintreeSubscription", (BraintreeSubscription, App, Backbone, Marionette, $, _)->

        # subscription model
        class BraintreeSubscription extends Backbone.Model

            name: 'braintreesubscription'

            idAttribute : 'subscription_id'


        API =

            getSubscriptionById : ( subscriptionId ) ->
                subscriptionModel = new BraintreeSubscription 'subscription_id' : subscriptionId
                subscriptionModel.fetch()
                subscriptionModel


        App.reqres.setHandler "get:subscription:by:id",( subscriptionId ) ->
            API.getSubscriptionById subscriptionId
