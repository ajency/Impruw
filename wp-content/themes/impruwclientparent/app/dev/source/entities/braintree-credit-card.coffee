define [ "app", 'backbone' ], ( App, Backbone ) ->

    # App state entity
    App.module "Entities.BraintreecreditCard", ( BraintreecreditCard, App, Backbone, Marionette, $, _ )->

        # creditCard model
        class CreditCard extends Backbone.Model

            name : 'creditcard'
            idAttribute : 'token'

        # CreditCard Collection
        class CreditCardCollection extends Backbone.Collection

            model : CreditCard

            url : ->
                "#{SITEURL}/api/ajbilling/creditcards/#{SITEID["id"]}/site"

        # class BillingAddress extends Backbone.Model

        #     name : 'billingaddress'
        #     idAttribute : 'customerId'

        # creditCardCollection = new CreditCardCollection

        API =

            getCreditCards :->
                creditCardCollection = new CreditCardCollection
                creditCardCollection.fetch()
                creditCardCollection

            newCreditCard : ( newCard ) ->
                creditCardModel = new CreditCard newCard
                creditCardModel

        App.reqres.setHandler "get:credit:cards",->
            API.getCreditCards()

        App.reqres.setHandler "new:credit:card",(newCard)->
            API.newCreditCard(newCard)

            

            # getBillingAddress : ( customerId ) ->
            #     BillingAddressModel = new BillingAddress 'customerId' : customerId
            #     BillingAddressModel.fetch()
            #     BillingAddressModel

            


        # App.reqres.setHandler "get:card:info", ( cardToken ) ->
        #     API.getCardByToken cardToken

        
        # App.reqres.setHandler "get:billing:address", ( customerId ) ->
        #     API.getBillingAddress customerId
