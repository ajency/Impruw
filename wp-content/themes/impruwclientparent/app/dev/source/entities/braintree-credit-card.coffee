define ["app", 'backbone'], (App, Backbone) ->

    # App state entity
    App.module "Entities.CreditCard", (BraintreecreditCard, App, Backbone, Marionette, $, _)->

        # creditCard model
        class CreditCard extends Backbone.Model

            name: 'creditcard'
            idAttribute :'customer_id'


        API =

            getCardById : ( customerId ) ->
                creditCardModel = new CreditCard 'customer_id' : customerId
                creditCardModel.fetch()
                creditCardModel


        App.reqres.setHandler "get:card:info",( customerId ) ->
            API.getCardById customerId
