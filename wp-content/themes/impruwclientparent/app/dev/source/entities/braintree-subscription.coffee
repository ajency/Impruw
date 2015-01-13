define ["app", 'backbone'], (App, Backbone) ->

    # App state entity
    App.module "Entities.BraintreeSubscriptions", (BraintreeSubscriptions, App, Backbone, Marionette, $, _)->

        class BraintreeSubscription extends Backbone.Model

            name: 'braintree-subscription'

            idAttribute : 'id'


            sync: (method, entity, options = {})->
                xhr = window._bsync method, entity, options
                entity._fetch = xhr if method is 'read'

            url: ->
                return "#{SITEURL}/api/ajbilling/braintreeSubscription/#{@get("object_id")}/site"


        class BraintreeSubscriptionCollection extends Backbone.Collection

            model: BraintreeSubscription

            url: ->
                "#{SITEURL}/api/ajbilling/braintreeSubscriptions/#{SITEID["id"]}/site"


        braintreeSubscriptionCollection = new BraintreeSubscriptionCollection

        API =

            getActiveBraintreeSubscription : ( siteId ) ->
                activeSubscriptionModel = new BraintreeSubscription 'object_id' : SITEID["id"]
                activeSubscriptionModel.fetch()
                activeSubscriptionModel

            getBraintreeSubscriptionCollection:->
                braintreeSubscriptionCollection.fetch() if braintreeSubscriptionCollection.length is 0
                braintreeSubscriptionCollection

        App.reqres.setHandler "get:active:subscription",( siteId ) ->
            API.getActiveBraintreeSubscription siteId

        # This collection would always return a collection with only one model since every site has only one collection associated to a site
        App.reqres.setHandler "get:site:subscriptions",()->
            API.getBraintreeSubscriptionCollection()
