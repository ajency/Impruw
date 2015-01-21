define [
    'app'
    'apps/billing/account-summary/controller'
    'apps/billing/update-billing/controller'
    'apps/billing/pricing-plans/controller'
    'apps/billing/site-plans/controller'
    'apps/billing/site-payment-page/controller'
    'apps/billing/site-credit-cards/controller'
    'apps/billing/site-transaction-history/controller'
    'apps/billing/payment-page/controller' ], ( App )->
    App.module 'BillingApp', ( BillingApp, App, Backbone, Marionette, $, _ )->

        #@startWithParent = false
        class BillingApp.Router extends Marionette.AppRouter

            appRoutes :
                'billing' : 'summary'
                'billing/account-summary' : 'summary'
                'billing/credit-cards' : 'creditCards'
                'billing/update-billing' : 'updateBilling'
                'billing/pricing-plans' : 'plans'
                'billing/payment-page/:id/:braintreeId' : 'payment'
                'billing/payment-page/assisted-setup' : 'assistedSetupPayment'
                'billing/transaction-history' : 'transactionHistory'


        #public API
        API =

            summary : ->
                App.execute "show:account:summary:app",
                    region : App.rightRegion

            plans : ->
                App.execute "show:site:plans:app",
                    region : App.rightRegion

            payment : ( planId,braintreePlanId )->
                App.execute "show:site:payment:app",
                    region : App.rightRegion
                    planId  : planId
                    braintreePlanId  : braintreePlanId
                    subscription : true

            assistedSetupPayment :->
                App.execute "show:site:payment:app",
                    region : App.rightRegion
                    subscription : false

            creditCards : ->
                App.execute "show:site:credit:cards:app",
                    region : App.rightRegion

            updateBilling : ->
                App.execute "show:billing:info:app",
                    region : App.rightRegion

            transactionHistory : ->
                App.execute "show:site:transaction:history:app",
                    region : App.rightRegion

            # plans : ->
            #     App.execute "show:plans:app",
            #         region : App.rightRegion

            # payment : ( planId )->
            #     App.execute "show:payment:app",
            #         region : App.rightRegion
            #         planId  : planId


        BillingApp.on 'start' : ->
            new BillingApp.Router
                controller : API