define ['app'
        'text!apps/billing/account-summary/templates/accountPlanInfo.html'], (App, viewTpl)->

    App.module 'BillingApp.AccountPlanInfo.View', (View, App, Backbone, Marionette, $, _)->

        class View.AccountPlanInfoView extends Marionette.ItemView

            template: viewTpl



