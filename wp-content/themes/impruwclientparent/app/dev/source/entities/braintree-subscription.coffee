define ["app", 'backbone'], (App, Backbone) ->

    # App state entity
    App.module "Entities.BraintreeSubscription", (BraintreeSubscription, App, Backbone, Marionette, $, _)->

        # # subscription model
        # class BraintreeSubscription extends Backbone.Model

        #     name: 'braintreesubscription'

        #     idAttribute : 'subscription_id'

        class SiteBillingPlan extends Backbone.Model

            name: 'sitebillingplan'

            idAttribute : 'object_id'


            sync: (method, entity, options = {})->
                xhr = window._bsync method, entity, options
                entity._fetch = xhr if method is 'read'

            url: ->
                return SITEURL+'/api/ajbilling/plan/'+@id+'/site'

        # class BraintreePendingSubscription extends Backbone.Model

        #     name: 'braintreependingsubscription'

        #     idAttribute : 'new_subscription_id'


        API =

            # getSubscriptionById : ( subscriptionId ) ->
            #     subscriptionModel = new BraintreeSubscription 'subscription_id' : subscriptionId
            #     subscriptionModel.fetch()
            #     subscriptionModel

            getSiteBillingPlan : ( siteId ) ->
                siteBillingPlanModel = new SiteBillingPlan 'object_id' : siteId
                siteBillingPlanModel.fetch success: (model) ->
                    siteBillingPlanModel = model
                siteBillingPlanModel

            # getPendingSubscription : ( subscriptionId ) ->
            #     subscriptionModel = new BraintreePendingSubscription
            #     subscriptionModel.fetch
            #         data :
            #             'action' : 'get-pending-subscription'
            #             'old_subscription_id' : subscriptionId
            #     subscriptionModel


        # App.reqres.setHandler "get:subscription:by:id",( subscriptionId ) ->
        #     API.getSubscriptionById subscriptionId

        # App.reqres.setHandler "get:pending:subscription",( subscriptionId ) ->
        #     API.getPendingSubscription subscriptionId

        App.reqres.setHandler "get:site:billing:plan",( siteId ) ->
            API.getSiteBillingPlan siteId
