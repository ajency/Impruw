define [ "app", 'backbone' ], ( App, Backbone ) ->

    # App state entity
    App.module "Entities.BraintreeTransaction", ( BraintreeTransaction, App, Backbone, Marionette, $, _ )->

        # transaction model
        class BraintreeTransaction extends Backbone.Model

            name : 'braintreetransaction'
            idAttribute : 'transaction_id'


        class BraintreeTransactionCollection extends Backbone.Collection

            model : BraintreeTransaction

            url : ->
                "#{SITEURL}/api/ajbilling/braintreeTransactions"


        API =

            getTransactions : ( customerId ) ->
                transactionCollection = new BraintreeTransactionCollection
                transactionCollection.fetch
                    data :
                        'customerID' : customerId
                    type: "POST"
                transactionCollection


        App.reqres.setHandler "get:customer:transactions", ( customerId )->
            API.getTransactions customerId
