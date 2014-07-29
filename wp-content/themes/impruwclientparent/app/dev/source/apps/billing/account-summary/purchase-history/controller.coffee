define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/purchase-history/views' ], ( App, AppController )->
    App.module 'BillingApp.PurchaseHistory', ( PurchaseHistory, App, Backbone, Marionette, $, _ )->
        class PurchaseHistory.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                console.log opts
                console.log 'hiiiii'


                transaction = App.request "get:transactions"

                App.execute "when:fetched", transaction, =>
                    @view = @getView transaction

                    # trigger set:active:menu event
                    App.vent.trigger "set:active:menu", 'billing'

                    # show main layout
                    @show @view


            # get layout
            getView : ( transaction ) ->
                new PurchaseHistory.View.Transaction
                    collection : transaction

        App.commands.setHandler "show:purchase:history", ( opts ) ->
            new PurchaseHistory.Controller opts