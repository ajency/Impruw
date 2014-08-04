define [ "app", 'backbone' ], ( App, Backbone ) ->

    # App state entity
    App.module "Entities.BraintreeTransaction", ( BraintreeTransaction, App, Backbone, Marionette, $, _ )->

        # transaction model
        class BraintreeTransaction extends Backbone.Model

            name : 'braintreetransaction'
            idAttribute : 'transaction_id'


        class BraintreePlanCollection extends Backbone.Collection

            model : BraintreeTransaction

            url : ->
                "#{AJAXURL}?action=fetch-braintreetransaction"


        API =

            getTransactions : ( customerId ) ->
                transactionCollection = new BraintreePlanCollection
                transactionCollection.fetch
                    data :
                        'customerID' : customerId
                transactionCollection


        App.reqres.setHandler "get:transactions", ( customerId )->
            API.getTransactions customerId
