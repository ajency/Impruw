define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/account-plan-info/controller'
         'apps/billing/account-summary/account-subscription-info/controller'
         'apps/billing/account-summary/site-addons-info/controller'
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
                    App.execute "show:account:plan:info",
                        region : @layout.accountPlanRegion

                    App.execute "show:account:subscription:info",
                        region : @layout.accountSubscriptionRegion

                    App.execute "show:site:addons:info",
                        region : @layout.siteAddOnRegion

                        # App.execute "show:pending:subscription",
                        #     region : @layout.pendingSubscriptionRegion
                        #     subscriptionId : subscriptionId

                        # App.execute "show:billing:info",
                        #     region : @layout.billingInfoRegion
                        #     subscriptionModel : subscriptionModel

                        # App.execute "show:purchase:history",
                        #     region : @layout.purchaseHistoryRegion
                        #     braintreeCustomerId : braintreeCustomerId

                @listenTo @layout.accountPlanRegion, "load:subscription:info:app", @loadSubscriptionInfoApp

                # show main layout
                @show @layout,
                    loading : true


            # get layout
            getLayout : ->
                new AccountSummary.View.Layout

            loadSubscriptionInfoApp :->
                App.execute "show:account:subscription:info",
                    region : @layout.accountSubscriptionRegion

        App.commands.setHandler "show:account:summary:app", ( opts ) ->
            new AccountSummary.Controller opts