define ['app'
        'text!apps/billing/account-summary/templates/mainView.html'], (App, viewTpl)->

    App.module 'BillingApp.AccountSummary.View', (View, App, Backbone, Marionette, $, _)->

        class View.Layout extends Marionette.Layout

            template: viewTpl

            regions :
                accountPlanRegion : 'account-plan-info'
                accountSubscriptionRegion : 'account-subscription-info'
                # accountInfoRegion : '#account-info'
                siteAddOnRegion : '#site-addons-info'
                pendingSubscriptionRegion : '#pending-sub'
                billingInfoRegion : '#billing-info'
                purchaseHistoryRegion : '#purchase-history'


