define [
    'app'
    'apps/billing/account-summary/controller'
    'apps/billing/update-billing/controller'
    'apps/billing/pricing-plans/controller'
    'apps/billing/site-plans/controller'
    'apps/billing/site-payment-page/controller'
    'apps/billing/payment-page/controller' ], ( App )->
    App.module 'BillingApp', ( BillingApp, App, Backbone, Marionette, $, _ )->

        #@startWithParent = false
        class BillingApp.Router extends Marionette.AppRouter

            appRoutes :
                'billing' : 'summary'
                'billing/account-summary' : 'summary'
                # 'billing/update-billing' : 'updateBilling'
                'billing/pricing-plans' : 'plans'
                'billing/payment-page/:id/:braintreeId' : 'payment'


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

            # updateBilling : ->
            #     App.execute "show:billing:info:app",
            #         region : App.rightRegion

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