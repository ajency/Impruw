define ["app", 'backbone'], (App, Backbone) ->

    # App state entity
    App.module "Entities.BraintreeSubscription", (BraintreeSubscription, App, Backbone, Marionette, $, _)->

        # subscription model
        class BraintreeSubscription extends Backbone.Model

            name: 'braintreesubscription'

            idAttribute : 'subscription_id'

        class BraintreePendingSubscription extends Backbone.Model

            name: 'braintreependingsubscription'

            idAttribute : 'new_subscription_id'


        API =

            getSubscriptionById : ( subscriptionId ) ->
                subscriptionModel = new BraintreeSubscription 'subscription_id' : subscriptionId
                subscriptionModel.fetch()
                subscriptionModel

            getPendingSubscription : ( subscriptionId ) ->
                subscriptionModel = new BraintreePendingSubscription
                subscriptionModel.fetch
                    data :
                        'action' : 'get-pending-subscription'
                        'old_subscription_id' : subscriptionId
                subscriptionModel


        App.reqres.setHandler "get:subscription:by:id",( subscriptionId ) ->
            API.getSubscriptionById subscriptionId

        App.reqres.setHandler "get:pending:subscription",( subscriptionId ) ->
            API.getPendingSubscription subscriptionId
