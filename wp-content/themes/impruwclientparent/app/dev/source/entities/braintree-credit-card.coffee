define ["app", 'backbone'], (App, Backbone) ->

    # App state entity
    App.module "Entities.CreditCard", (BraintreecreditCard, App, Backbone, Marionette, $, _)->

        # creditCard model
        class CreditCard extends Backbone.Model

            name: 'creditcard'
            idAttribute :'customer_id'

        class BillingAddress extends Backbone.Model

            name: 'billingaddress'
            idAttribute :'customerId'


        API =

            getCardById : ( customerId ) ->
                creditCardModel = new CreditCard 'customer_id' : customerId
                creditCardModel.fetch()
                creditCardModel

            getBillingAddress : ( customerId ) ->
                BillingAddressModel = new BillingAddress 'customerId' : customerId
                BillingAddressModel.fetch()
                BillingAddressModel


        App.reqres.setHandler "get:card:info",( customerId ) ->
            API.getCardById customerId

        App.reqres.setHandler "get:billing:address",( customerId ) ->
            API.getBillingAddress customerId
