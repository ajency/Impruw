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
                    
                    @creditCardCollection = App.request "get:credit:cards"
                    App.execute "when:fetched", @creditCardCollection, =>
                        @braintreeClientToken = @creditCardCollection.models[0].get 'braintree_client_token'
                        existingCreditCards =@creditCardCollection.where(card_exists: true)
                        @existingCreditCardsCollection = new Backbone.Collection(existingCreditCards)
                        @view = @getCardListingView()
                        
                        # @listenTo @view , "add:new:credit:card", ( paymentMethodNonce )=>
                        #     @addCard paymentMethodNonce 

                        @layout.transactionListingRegion.show @view

                @show @layout,
                    loading : true

           
            getLayout : ->
                new SiteTransactionHistory.View.Layout

            getCardListingView:->
                new SiteTransactionHistory.View.TransactionListView
                    collection : @existingCreditCardsCollection

        App.commands.setHandler "show:site:transaction:history:app", ( opts ) ->
            new SiteTransactionHistory.Controller opts