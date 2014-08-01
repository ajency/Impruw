define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/account-info/controller'
         'apps/billing/account-summary/billing-info/controller'
         'apps/billing/account-summary/pending-subscription/controller'
         'apps/billing/account-summary/purchase-history/controller'
         'apps/billing/account-summary/views' ], ( App, AppController )->
    App.module 'BillingApp.AccountSummary', ( AccountSummary, App, Backbone, Marionette, $, _ )->
        class AccountSummary.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->

                @layout = @getLayout()

                @siteModel =  App.request "get:site:model"

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                @listenTo @layout ,"show",=>

                    App.execute "when:fetched",@siteModel,=>

                        subscriptionId = @siteModel.get 'braintree_subscription'
                        braintreeCustomerId = @siteModel.get 'braintree_customer_id'

                        App.execute "show:account:info",
                            region : @layout.accountInfoRegion
                            subscriptionId : subscriptionId

                        App.execute "show:pending:subscription",
                            region : @layout.pendingSubscriptionRegion
                            subscriptionId : subscriptionId

                        App.execute "show:billing:info",
                            region : @layout.billingInfoRegion
                            braintreeCustomerId : braintreeCustomerId

                        App.execute "show:purchase:history",
                            region : @layout.purchaseHistoryRegion
                            braintreeCustomerId : braintreeCustomerId


                # show main layout
                @show @layout


            # get layout
            getLayout : ->
                new AccountSummary.View.Layout

        App.commands.setHandler "show:account:summary:app", ( opts ) ->
            new AccountSummary.Controller opts