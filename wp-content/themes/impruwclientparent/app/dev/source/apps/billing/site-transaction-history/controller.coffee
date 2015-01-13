define [ 'app', 'controllers/base-controller'
         'apps/billing/site-transaction-history/views' ], ( App, AppController )->
    App.module 'BillingApp.SiteTransactionHistory', ( SiteTransactionHistory, App, Backbone, Marionette, $, _ )->
        class SiteTransactionHistory.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @siteModel = App.request "get:site:model"

                @layout = @getLayout()

                App.vent.trigger "set:active:menu", 'billing'

                @listenTo @layout, "show", =>
                    App.execute "when:fetched", @siteModel, =>
                        @braintree_customer_id = @siteModel.get 'braintree_customer_id'
                        if _.isEmpty @braintree_customer_id
                            @view = @getEmptyView()
                            @layout.transactionListingRegion.show @view
                        else
                            @transactionCollection = App.request "get:customer:transactions", @braintree_customer_id
                            App.execute "when:fetched", @transactionCollection, =>
                                @view = @getCardListingView()

                                @layout.transactionListingRegion.show @view

                @show @layout,
                    loading : true

           
            getLayout : ->
                new SiteTransactionHistory.View.Layout

            getCardListingView:->
                new SiteTransactionHistory.View.TransactionListView
                    collection : @transactionCollection

            getEmptyView :->
                new SiteTransactionHistory.View.EmptyView

        App.commands.setHandler "show:site:transaction:history:app", ( opts ) ->
            new SiteTransactionHistory.Controller opts