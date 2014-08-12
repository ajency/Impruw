define [ "app", 'backbone' ], ( App, Backbone ) ->

    # App state entity
    App.module "Entities.CreditCard", ( BraintreecreditCard, App, Backbone, Marionette, $, _ )->

        # creditCard model
        class CreditCard extends Backbone.Model

            name : 'creditcard'
            idAttribute : 'token'

        # plan collection
        class CreditCardCollection extends Backbone.Collection

            model : CreditCard

            url : ->
                "#{AJAXURL}?action=get-credit-cards"

        class BillingAddress extends Backbone.Model

            name : 'billingaddress'
            idAttribute : 'customerId'


        API =

            getCardByToken : ( cardToken ) ->
                creditCardModel = new CreditCard 'token' : cardToken
                creditCardModel.fetch()
                creditCardModel

            getBillingAddress : ( customerId ) ->
                BillingAddressModel = new BillingAddress 'customerId' : customerId
                BillingAddressModel.fetch()
                BillingAddressModel

            getCreditCards : ( customerId )->
                creditCardCollection = new CreditCardCollection
                creditCardCollection.fetch
                    data :
                        'customerId' : customerId
                creditCardCollection


        App.reqres.setHandler "get:card:info", ( cardToken ) ->
            API.getCardByToken cardToken

        App.reqres.setHandler "get:credit:cards", ( customerId ) ->
            API.getCreditCards customerId

        App.reqres.setHandler "get:billing:address", ( customerId ) ->
            API.getBillingAddress customerId
