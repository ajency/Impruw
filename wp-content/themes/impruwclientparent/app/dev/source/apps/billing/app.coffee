define [
    'app'
    'apps/billing/purchase-history/controller'
    'apps/billing/billing-info/controller'
    'apps/billing/pricing-plans/controller'
    'apps/billing/payment-page/controller'], (App)->

    App.module 'BillingApp', (BillingApp, App, Backbone, Marionette, $, _)->

        #@startWithParent = false
        class BillingApp.Router extends Marionette.AppRouter

            appRoutes:
                'billing': 'purchase'
                'billing/purchase-history': 'purchase'
                'billing/billing-info': 'billingInfo'
                'billing/pricing-plans': 'plans'
                'billing/payment-page': 'payment'


        #public API
        API =
            purchase :->
                App.execute "show:purchase:app",
                    region : App.rightRegion
            billingInfo :->
                App.execute "show:billing:info:app",
                    region : App.rightRegion
            plans :->
                App.execute "show:plans:app",
                    region : App.rightRegion
            payment :->
                App.execute "show:payment:app",
                    region : App.rightRegion


        BillingApp.on 'start': ->
            new BillingApp.Router
                controller: API