define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/purchase-history/views' ], ( App, AppController )->
    App.module 'BillingApp.PurchaseHistory', ( PurchaseHistory, App, Backbone, Marionette, $, _ )->
        class PurchaseHistory.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->

                brainTreeCustomerId = opts.braintreeCustomerId

                if _.isEmpty brainTreeCustomerId
                    @view = @getEmptyView()
                else
                    transactionCollection = App.request "get:transactions", brainTreeCustomerId
                    @view = @getView transactionCollection


                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                @show @view,
                    loading: true

            getView : ( transactionCollection ) ->
                new PurchaseHistory.View.Transaction
                    collection : transactionCollection

            getEmptyView :->
                new PurchaseHistory.View.EmptyView

        App.commands.setHandler "show:purchase:history", ( opts ) ->
            new PurchaseHistory.Controller opts