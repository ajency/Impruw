define ['app'
        'text!apps/billing/account-summary/templates/accountSubscriptionInfo.html'], (App, viewTpl)->

    App.module 'BillingApp.AccountSubscriptionInfo.View', (View, App, Backbone, Marionette, $, _)->

        class View.AccountSubscriptionInfoView extends Marionette.ItemView

            template: viewTpl



